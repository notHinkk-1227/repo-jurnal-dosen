// Cover generator: Strategy pattern.
// Saat ini hanya ada TemplateCoverStrategy (auto-generate). Jika nanti perlu strategi lain
// (mis. generate dari halaman pertama PDF), tinggal tambah class baru yang implement
// interface CoverGenerator ini — tidak perlu ubah kode yang memanggilnya.

export interface CoverGenerator {
  generate(input: { title: string; facultyId: string }): Promise<string>;
}

// Warna & ikon per fakultas — sumber untuk Factory di bawah.
// TODO: pindahkan ke database (tabel Faculty) begitu skema final, supaya admin bisa atur dari dashboard.
const FACULTY_STYLE_MAP: Record<string, { color: string; icon: string }> = {
  default: { color: "#5B6472", icon: "file-text" },
};

// Factory kecil: pilih warna & ikon berdasarkan fakultas.
function resolveFacultyStyle(facultyId: string) {
  return FACULTY_STYLE_MAP[facultyId] ?? FACULTY_STYLE_MAP.default;
}

export class TemplateCoverStrategy implements CoverGenerator {
  async generate({ title, facultyId }: { title: string; facultyId: string }): Promise<string> {
    const { color, icon } = resolveFacultyStyle(facultyId);

    // TODO: implementasi render sesungguhnya pakai library `sharp` atau `canvas`,
    // lalu upload hasilnya lewat storage provider (lib/storage) dan kembalikan URL-nya.
    // Placeholder di bawah hanya menandai kontrak fungsi ini untuk development lanjutan.
    void color;
    void icon;
    void title;
    throw new Error("TemplateCoverStrategy.generate belum diimplementasikan");
  }
}

// Dipakai oleh articleService — cukup ganti instance ini kalau mau ganti strategi default.
const defaultStrategy: CoverGenerator = new TemplateCoverStrategy();

export async function generateCover(input: { title: string; facultyId: string }): Promise<string> {
  return defaultStrategy.generate(input);
}
