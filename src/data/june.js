// ============================================================
// KONTEN JUNI 2026: edit di sini saja, tanpa menyentuh animasi
//
// MEDIA: foto -> public/photos/, video -> public/videos/.
// Mau foto atau video? Cukup ganti ekstensi dan folder di 'src'.
// Baris media boleh dikurangi atau ditambah sesukamu.
// ============================================================
export const JUNE = {
  // LAGU: taruh di  public/audio/juni.mp3
  audio: '/audio/juni.mp3',

  title: 'Juni 2026',
  subtitle: 'Pantai, ayunan, dan satu lagu', // draf

  wake: {
    hint: 'Gulir pelan, jangan dibangunkan dulu',
    sleep: 'Zzz...',
    yawn: 'Hoaaam...',
    awake: 'Selamat pagi, Juni!',
  },

  beach: {
    title: 'Pantai Molang',
    subtitle: 'Pagi hari',
    date: '[TANGGAL PANTAI MOLANG]',
    hintSea: 'Ketuk lautnya',
    splash: ['splash!', 'byur!', 'cipraat', 'brr, dingin!', 'wuush'],

    walk: {
      title: 'Jalan bareng',
      hint: 'Gulir pelan, kita jalan berdua',
      done: 'Sudah berdampingan sejak awal',
      // TULIS CERITA JALAN BARENG DI SINI
      story: '[TULIS CERITA JALAN BARENG DI SINI]',
    },

    swing: {
      title: 'Ayunan',
      hint: 'Ketuk untuk mendorong ayunan',
      levels: ['Makin tinggi!', 'Wuuuss!', 'Tinggi banget!'],
      // TULIS CERITA AYUNAN DI SINI
      story: '[TULIS CERITA AYUNAN DI SINI]',
      // 3 MEDIA yang terbuka di langit saat ayunan makin tinggi
      media: [
        { src: '/photos/jun-1.jpg', caption: '[caption ayunan 1]' },
        { src: '/photos/jun-2.jpg', caption: '[caption ayunan 2]' },
        { src: '/videos/jun-3.mp4', caption: '[caption ayunan video]' },
      ],
    },

    gallery: {
      title: 'Potret hari itu',
      hint: 'Geser ke kiri atau kanan',
      // GALERI: taruh di public/photos/ dan public/videos/. Pilih yang paling cocok.
      media: [
        { src: '/photos/jun-4.jpg', caption: '[caption 1]' },
        { src: '/photos/jun-5.jpg', caption: '[caption 2]' },
        { src: '/photos/jun-6.jpg', caption: '[caption 3]' },
        { src: '/photos/jun-7.jpg', caption: '[caption 4]' },
        { src: '/videos/jun-8.mp4', caption: '[caption video 1]' },
        { src: '/photos/jun-9.jpg', caption: '[caption 5]' },
        { src: '/photos/jun-10.jpg', caption: '[caption 6]' },
        { src: '/videos/jun-11.mp4', caption: '[caption video 2]' },
        { src: '/photos/jun-12.jpg', caption: '[caption 7]' },
      ],
    },
  },

  music: {
    title: 'Lagu bulan ini',
    hint: 'Ketuk kaset untuk memasukkannya ke pemutar',
    song: '[JUDUL LAGU]',
    artist: '[NAMA ARTIS]',
    // TULIS KENAPA KAMU MEMILIH LAGU INI
    reason: '[TULIS KENAPA LAGU INI]',
    // TULIS KALIMAT PENUTUP JUNI DI SINI
    closing: '[TULIS KALIMAT PENUTUP JUNI DI SINI]',
  },
}