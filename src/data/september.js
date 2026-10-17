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
      'Aku kasir, kamu PKL yang bantu packing.',
      'Dari situ kita jadi sering ngobrol, sampai akhirnya tukeran nomor WA.',
      'Sesimpel itu, tapi dari situ semuanya mulai.',
    ],
  },

  // FOTO: taruh di  public/photos/sept-1.jpg, sept-2.jpg, dst.
  // Boleh tambah atau kurangi baris. Kalau file belum ada, tampil kotak kosong penanda.
  photos: [
    { src: '/photos/sept-1.jpg', caption: '[caption foto 1]' },
    { src: '/photos/sept-2.jpg', caption: '[caption foto 2]' },
    { src: '/photos/sept-3.jpg', caption: '[caption foto 3]' },
    { src: '/photos/sept-4.jpg', caption: '[caption foto 4]' },
    { src: '/photos/sept-5.jpg', caption: '[caption foto 5]' },
  ],

  // FUN FACT: muncul bergantian saat tombol "Tahukah kamu?" diketuk
  funFacts: [
    '[fun fact 1, misalnya berapa lama Kyla PKL di sini]',
    '[fun fact 2, misalnya obrolan pertama kalian soal apa]',
  ],

  // PESAN RAHASIA setelah bintang tertangkap
  secret: {
    title: 'Kamu berhasil nangkep!',
    text: '[TULIS PESAN ROMANTIS UNTUK KYLA DI SINI]',
    hintStart: 'Tangkap bintangnya untuk membuka pesan',
    hintMiss: 'Hampir! Dia cepet banget ya',
    hintMiss2: 'Sabar, sayang. Dia lagi pemalu.',
  },
}