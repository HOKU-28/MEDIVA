export function sanitizePhoneInput(value) {
  if (value.startsWith("+")) {
    return `+${value.slice(1).replace(/[^\d-]/g, "")}`;
  }

  return value.replace(/[^\d-]/g, "");
}

export function getIndonesianPhoneError(value, label = "Nomor telepon") {
  const cleanPhone = value;
  if (!cleanPhone) return "";

  if (/\s/.test(cleanPhone)) {
    return `${label} tidak boleh memakai spasi. Gunakan angka dan tanda hubung (-) bila perlu.`;
  }

  if (
    !/^[0-9+-]+$/.test(cleanPhone) ||
    (cleanPhone.includes("+") && !cleanPhone.startsWith("+"))
  ) {
    return `${label} hanya boleh berisi angka dan tanda hubung (-); tanda + hanya boleh di awalan kode negara.`;
  }

  const digitsOnly = cleanPhone.replace(/\D/g, "");
  if (digitsOnly.length < 12) {
    return `${label} minimal 12 angka.`;
  }

  const normalizedPhone = cleanPhone.replace(/-/g, "");
  if (!/^(?:\+62|0)[0-9]{8,14}$/.test(normalizedPhone)) {
    return `${label} harus memakai format lokal 08... atau kode negara +62 (bukan 62 tanpa +).`;
  }

  return "";
}

export function normalizeIndonesianPhone(value) {
  const digitsOnly = value.replace(/\D/g, "");
  if (!digitsOnly) return "";

  return value.startsWith("+") ? `+${digitsOnly}` : `+62${digitsOnly.slice(1)}`;
}
