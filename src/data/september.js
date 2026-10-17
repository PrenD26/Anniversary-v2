// ============================================================
// KONTEN SEPTEMBER 2025: edit di sini saja, tanpa menyentuh animasi
// ============================================================
export const SEPTEMBER = {
  // LAGU: taruh file di  public/audio/september.mp3
  audio: '/audio/september.mp3',

  title: 'September 2025',
  subtitle: 'Awal kita kenal',

  receipt: {
    store: 'GOLDEN SWALAYAN',
    city: 'Tulungagung',
    date: '[01/09/2025]', // GANTI dengan tanggal pertama kalian bertemu
    part: 'Kasir',
    items: [
      ['1x Cewek Imut (Kyla)', 1],
      ['1x Cewek Cantik (Kyla)', 1],
      ['1x Cewek Manis (Kyla)', 1],
    ],
    total: '1 cerita',
    note: 'Kenangan yang sudah dibeli tidak dapat dikembalikan.',
    hint: 'Ketuk nota untuk membaca ceritanya',
    egg: 'Nomor WA ditukar: berhasil', // muncul saat Kyla mengetuk barcode
  },

  // CERITA di kartu yang terbuka saat nota diketuk (draf dari ceritamu, silakan ganti)
  story: {
    title: 'Awal Kita Kenal',
    paragraphs: [
      'Aku kasir dan kamu anak PKL yang bantu packing.',
      'Kamu bantu cariin aku koin',
      'Dari situ kita jadi sering ngobrol, sampai akhirnya tukeran nomor WA.',
      'Sesimpel itu, tapi dari situ semuanya mulai.',
    ],
  },

  // FOTO: taruh di  public/photos/sept-1.jpg, sept-2.jpg, dst.
  // Boleh tambah atau kurangi baris. Kalau file belum ada, tampil kotak kosong penanda.
  photos: [
    { src: '/photos/sept-1.jpg', caption: 'Mochi ini harusnya buatmu loh' },
    { src: '/photos/sept-2.jpg', caption: 'Aku bingung waktu kamu jawab chatku setelah aku nyatain perasaan' },
    { src: '/photos/sept-3.jpg', caption: 'Ku ulangi lagi kalo aku ingin jadi pacarmu' },

  ],

  // FUN FACT: muncul bergantian saat tombol "Tahu gak yangg?" diketuk
  funFacts: [
    'Aku dulu mau minta no wa mu malu loh, sampe akhirnya ditantang mbak bunga',
    'Ingat ga? saat aku tiba-tiba nembak kamu, kamunya langsung pergi',
  ],

  // PESAN RAHASIA setelah bintang tertangkap
  secret: {
    title: 'Kamu berhasil nangkep!',
    text: 'Terimakasih atas cinta yang telah kamu berikan padaku',
    hintStart: 'Tangkap bintangnya untuk membuka pesan',
    hintMiss: 'Hampir! Dia cepet banget ya',
    hintMiss2: 'Sabar, sayang. Dia lagi pemalu.',
  },
}