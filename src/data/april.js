// ============================================================
// KONTEN APRIL 2026: edit di sini saja, tanpa menyentuh animasi
//
// MEDIA: foto -> public/photos/, video -> public/videos/.
// Mau foto atau video? Cukup ganti ekstensi dan folder di 'src'.
// ============================================================
export const APRIL = {
  // DUA LAGU: taruh di public/audio/
  audio: '/audio/april-1.mp3', // Simpang Lima Gumul dan Kediri Town Square
  audio2: '/audio/april-2.mp3', // Pantai dan buket

  title: 'April 2026',
  subtitle: 'Jalan-jalan, pantai, dan satu buket yang belum jadi', // draf

  slg: {
    title: 'Simpang Lima Gumul',
    subtitle: 'Pagi bersama fotografer',
    hint: 'Ketuk tombol rana untuk memotret',
    sheetTitle: 'Lembar kontak',
    sheetHint: 'Ketuk hati untuk memilih 3 favoritmu',
    showFavs: 'Lihat favorit',
    favTitle: 'Tiga favoritmu',
    pickAgain: 'Pilih ulang',
    again: 'Ambil lagi',
    // TULIS CERITA SIMPANG LIMA GUMUL DI SINI
    story: '[TULIS CERITA SIMPANG LIMA GUMUL DI SINI]',
    // 9 FOTO FOTOGRAFER: taruh di public/photos/apr-1.jpg sampai apr-9.jpg
    // Jumlahnya bebas, tapi 9 paling pas untuk lembar kontak 3x3.
    photos: [
      { src: '/photos/apr-1.jpg', caption: '[caption 1]' },
      { src: '/photos/apr-2.jpg', caption: '[caption 2]' },
      { src: '/photos/apr-3.jpg', caption: '[caption 3]' },
      { src: '/photos/apr-4.jpg', caption: '[caption 4]' },
      { src: '/photos/apr-5.jpg', caption: '[caption 5]' },
      { src: '/photos/apr-6.jpg', caption: '[caption 6]' },
      { src: '/photos/apr-7.jpg', caption: '[caption 7]' },
      { src: '/photos/apr-8.jpg', caption: '[caption 8]' },
      { src: '/photos/apr-9.jpg', caption: '[caption 9]' },
    ],
  },

  kts: {
    title: 'Kediri Town Square',
    subtitle: 'Jalan-jalan siang hari',
    hint: 'Geser kiri-kanan untuk jalan-jalan',
    done: 'Jalan-jalan yang menyenangkan', // draf
    // TULIS CERITA KEDIRI TOWN SQUARE DI SINI
    story: '[TULIS CERITA KEDIRI TOWN SQUARE DI SINI]',
    // VIDEO KTS: taruh di public/videos/apr-10.mp4
    video: { src: '/videos/apr-10.mp4', caption: '[caption KTS]' },
  },

  beach: {
    title: 'Pantai Pudak',
    subtitle: 'Di hari yang lain, pagi hari',
    hint: 'Tulis di pasir dengan jarimu',
    prompt: 'Tulis nama kita', // draf
    waveTitle: 'Ombak menghapusnya', // draf
    // TULIS CERITA PANTAI PUDAK DI SINI
    story: '[TULIS CERITA PANTAI PUDAK DI SINI]',
    // FOTO PANTAI: taruh di public/photos/apr-11.jpg
    photo: { src: '/photos/apr-11.jpg', caption: '[caption pantai]' },
  },

  bouquet: {
    title: 'Buket satin',
    subtitle: 'Lilac dan putih, belum jadi',
    hint: 'Ketuk gulungan pita untuk merangkai',
    fill: 8, // jumlah mawar yang bisa dirangkai (maksimal 10). Sisanya sengaja kosong
    unit: 'tangkai',
    unfinished: 'Belum selesai, nanti ya', // draf
    // TULIS CERITA BUKET SATIN DI SINI
    story: '[TULIS CERITA BUKET SATIN DI SINI]',
    // FOTO BUKET (yang belum jadi): taruh di public/photos/apr-12.jpg
    photo: { src: '/photos/apr-12.jpg', caption: '[caption buket]' },
  },

  // TULIS KALIMAT PENUTUP BULAN APRIL DI SINI (tampil di bawah buket)
  closing: '[TULIS KALIMAT PENUTUP DI SINI]',
}