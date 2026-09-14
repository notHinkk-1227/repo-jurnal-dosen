// Storage abstraction: Strategy pattern.
// Service layer bergantung pada interface FileStorage ini (Dependency Inversion),
// bukan pada implementasi lokal/cloud secara langsung — supaya gampang di-swap
// antara development (lokal) dan production (Vercel Blob / Cloudflare R2).

export interface FileStorage {
  upload(file: Buffer, path: string): Promise<{ url: string }>;
  delete(path: string): Promise<void>;
}

export class LocalStorage implements FileStorage {
  async upload(_file: Buffer, path: string): Promise<{ url: string }> {
    // TODO: tulis file ke folder public/uploads saat development.
    throw new Error(`LocalStorage.upload belum diimplementasikan untuk path: ${path}`);
  }

  async delete(_path: string): Promise<void> {
    // TODO: hapus file dari folder public/uploads.
  }
}

export class CloudStorage implements FileStorage {
  async upload(_file: Buffer, path: string): Promise<{ url: string }> {
    // TODO: integrasikan dengan Vercel Blob atau Cloudflare R2 di production.
    throw new Error(`CloudStorage.upload belum diimplementasikan untuk path: ${path}`);
  }

  async delete(_path: string): Promise<void> {
    // TODO: hapus object dari bucket.
  }
}

// Pilih strategi berdasarkan environment — bagian ini satu-satunya tempat
// yang perlu tahu perbedaan lokal vs cloud.
export const storage: FileStorage =
  process.env.NODE_ENV === "production" ? new CloudStorage() : new LocalStorage();
