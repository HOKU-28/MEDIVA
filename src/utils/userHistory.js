const LEGACY_KEYS = {
  ongoing: "riwayat",
  scheduled: "riwayat_terjadwal",
  completed: "riwayat_selesai",
};

export function readUserHistory(userId, list, fallback = []) {
  if (!userId || !LEGACY_KEYS[list]) {
    throw new Error("Pengguna dan jenis riwayat harus ditentukan.");
  }

  const key = `mediva_${list}_${userId}`;
  const stored = localStorage.getItem(key);
  if (stored !== null) {
    try {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : fallback;
    } catch {
      return fallback;
    }
  }

  if (userId === "demo-customer") {
    const legacy = localStorage.getItem(LEGACY_KEYS[list]);
    if (legacy !== null) {
      try {
        const parsed = JSON.parse(legacy);
        return Array.isArray(parsed) ? parsed : fallback;
      } catch {
        return fallback;
      }
    }
  }

  return fallback;
}

export function writeUserHistory(userId, list, entries) {
  if (!userId || !LEGACY_KEYS[list] || !Array.isArray(entries)) {
    throw new Error("Pengguna, jenis riwayat, dan data riwayat harus valid.");
  }

  localStorage.setItem(
    `mediva_${list}_${userId}`,
    JSON.stringify(entries)
  );
}
