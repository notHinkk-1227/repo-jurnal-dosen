// Pola dekoratif "stiker" (bentuk ikon sederhana: buku, topi wisuda, labu
// erlenmeyer, dst) yang ditata tidak beraturan (posisi & rotasi acak) dalam
// satu ubin (tile) SVG 260x260px. Ubin ini di-repeat sebagai CSS background,
// jadi otomatis "melanjutkan diri" selama tinggi halaman bertambah — tidak
// perlu tahu panjang halaman sebelumnya, CSS background-repeat yang urus.
// Opacity sengaja sangat rendah (di bawah 10%) supaya jadi tekstur latar,
// bukan elemen yang bersaing dengan konten di atasnya.
const STICKER_TILE_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="260" height="260">
  <g fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round">
    <g transform="translate(18,28) rotate(-14)">
      <rect x="0" y="0" width="28" height="20" rx="2"/>
      <line x1="0" y1="7" x2="28" y2="7"/>
    </g>
    <g transform="translate(150,12) rotate(16)">
      <path d="M0 11 L16 2 L32 11 L16 7 Z"/>
      <line x1="16" y1="7" x2="16" y2="18"/>
    </g>
    <circle cx="215" cy="95" r="3.5" fill="rgba(255,255,255,0.09)" stroke="none"/>
    <g transform="translate(55,150) rotate(22)">
      <path d="M5 0 H17 L21 22 Q11 28 1 22 Z"/>
    </g>
    <g transform="translate(195,175) rotate(-18)">
      <rect x="0" y="0" width="20" height="20" rx="3"/>
    </g>
    <circle cx="35" cy="225" r="3" fill="rgba(255,255,255,0.08)" stroke="none"/>
    <g transform="translate(118,225) rotate(12)">
      <path d="M0 9 L9 0 L18 9 L9 18 Z"/>
    </g>
    <g transform="translate(230,220) rotate(-8)">
      <path d="M0 0 H10 M5 0 V8 L0 16 H10 L5 8"/>
    </g>
  </g>
</svg>`.trim();

function toDataUri(svg: string) {
  return `url("data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}")`;
}

// Nilai mentah CSS background-image-nya, diekspor terpisah supaya komponen
// lain (Hero, banner kedua) bisa menumpuknya DI ATAS warna solid mereka
// sendiri — supaya motif stiker terasa menyambung ke seluruh halaman,
// bukan cuma muncul tiba-tiba begitu area hero berakhir.
export const stickerBackgroundImage = toDataUri(STICKER_TILE_SVG);

// Style siap-pakai: spread ke elemen pembungkus halaman.
// Ukuran tile 260px — perbesar/perkecil angka ini kalau ingin motifnya
// terasa lebih renggang/rapat.
export const stickerBackgroundStyle: React.CSSProperties = {
  backgroundImage: stickerBackgroundImage,
  backgroundRepeat: "repeat",
  backgroundSize: "260px 260px",
};
