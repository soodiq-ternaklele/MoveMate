// Custom async function: membuat Promise object sendiri
// menggunakan pola Promise constructor: new Promise((resolve, reject) => {...}).
// Dipakai untuk memberi jeda (simulasi proses) di dalam service.

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    // resolve() dipanggil ketika operasi (setTimeout) selesai.
    setTimeout(resolve, ms);
  });
}
