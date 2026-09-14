// Service layer: business logic ada di sini, bukan di route handler.
// Route handler cukup memanggil fungsi-fungsi ini dan meneruskan hasilnya sebagai response.
import { articleRepository } from "@/lib/repositories/articleRepository";
import { generateCover } from "@/lib/services/coverService";
import type { ArticleStatus } from "@prisma/client";

export const articleService = {
  async searchPublicArticles(params: {
    query?: string;
    facultyId?: string;
    categoryId?: string;
    page?: number;
  }) {
    const page = params.page ?? 1;
    const take = 20;
    const skip = (page - 1) * take;

    return articleRepository.findPublished({ ...params, take, skip });
  },

  getHomepageSections() {
    return Promise.all([
      articleRepository.findPublished({ take: 8 }), // artikel terbaru
      articleRepository.findMostDownloaded(8),
    ]).then(([latest, mostDownloaded]) => ({ latest, mostDownloaded }));
  },

  getArticleDetail(id: string) {
    return articleRepository.findById(id);
  },

  getPendingQueue() {
    return articleRepository.findPendingForAdmin();
  },

  getArticlesByAuthor(authorId: string) {
    return articleRepository.findByAuthor(authorId);
  },

  async submitArticle(input: {
    title: string;
    abstract: string;
    keywords: string[];
    year: number;
    authorId: string;
    facultyId: string;
    categoryIds: string[];
    fileUrl: string;
    coverUrl?: string;
  }) {
    // Kalau dosen tidak upload cover sendiri, generate cover otomatis dari template.
    const coverUrl =
      input.coverUrl ??
      (await generateCover({
        title: input.title,
        facultyId: input.facultyId,
      }));

    return articleRepository.create({
      title: input.title,
      abstract: input.abstract,
      keywords: input.keywords,
      year: input.year,
      fileUrl: input.fileUrl,
      coverUrl,
      author: { connect: { id: input.authorId } },
      faculty: { connect: { id: input.facultyId } },
      categories: {
        create: input.categoryIds.map((categoryId) => ({
          category: { connect: { id: categoryId } },
        })),
      },
    });
  },

  // Dipanggil admin untuk menyetujui atau menolak artikel yang menunggu verifikasi.
  reviewArticle(id: string, decision: Extract<ArticleStatus, "PUBLISHED" | "REJECTED">, note?: string) {
    return articleRepository.updateStatus(id, decision, note);
  },

  async registerDownload(id: string) {
    return articleRepository.incrementDownloadCount(id);
  },
};
