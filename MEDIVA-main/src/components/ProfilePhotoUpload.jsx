import { useRef, useState } from "react";
import styles from "./ProfilePhotoUpload.module.css";

const MAX_FILE_SIZE = 2 * 1024 * 1024;

export default function ProfilePhotoUpload({
  src,
  name,
  initials,
  size = 84,
  compact = false,
  onChange,
}) {
  const inputRef = useRef(null);
  const [error, setError] = useState("");

  function handleFileChange(event) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Pilih file gambar untuk foto profil.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("Ukuran foto maksimal 2 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        setError("Foto tidak dapat dibaca. Coba pilih file lain.");
        return;
      }

      const image = new Image();
      image.onload = () => {
        const scale = Math.min(1, 512 / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const context = canvas.getContext("2d");

        if (!context) {
          setError("Foto tidak dapat diproses di browser ini.");
          return;
        }

        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        try {
          onChange(canvas.toDataURL("image/jpeg", 0.82));
          setError("");
        } catch (uploadError) {
          setError(uploadError.message || "Foto profil gagal disimpan.");
        }
      };
      image.onerror = () => {
        setError("Foto tidak dapat dibuka. Coba pilih file gambar lain.");
      };
      image.src = reader.result;
    };
    reader.onerror = () => {
      setError("Foto tidak dapat dibaca. Coba pilih file lain.");
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className={styles.container}>
      <div
        className={`${styles.avatar} ${compact ? styles.compactAvatar : ""}`}
        style={{ "--photo-size": `${size}px` }}
      >
        {src ? (
          <img src={src} alt={`Foto profil ${name}`} />
        ) : (
          <span>{initials}</span>
        )}
      </div>

      {!compact && (
        <button
          type="button"
          className={styles.uploadButton}
          onClick={() => inputRef.current?.click()}
        >
          Ganti Foto
        </button>
      )}

      <input
        ref={inputRef}
        className={styles.fileInput}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        aria-label={`Pilih foto profil ${name}`}
      />
      {error && (
        <span className={styles.error} role="alert">
          {error}
        </span>
      )}
      {!compact && (
        <span className={styles.hint}>Format gambar, maksimal 2 MB.</span>
      )}
    </div>
  );
}
