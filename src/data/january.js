// ============================================================
// KONTEN JANUARI 2026: edit di sini saja, tanpa menyentuh animasi
// ============================================================
export const JANUARY = {
  // LAGU: taruh di  public/audio/januari.mp3
  audio: '/audio/januari.mp3',

  title: 'Januari 2026',
  subtitle: 'Wahana, tawa, dan photobooth', // boleh diganti

  park: {
    title: 'Blitar Park',
    subtitle: 'Hari kita mencoba semua wahana',
    cardTitle: 'Kartu Petualangan',
    cardHint: 'Ketuk cap untuk naik wahana',
    stageEmpty: 'Pilih satu wahana dari kartumu',
    allDone: 'Semua cap terkumpul!',

    // FOTO TIAP WAHANA: taruh di  public/photos/jan-1.jpg sampai jan-5.jpg
    gokart: {
      label: 'Gokart',
      hint: 'Ketuk TAP secepat mungkin!',
      win: 'Menang tipis!',
      story: '[TULIS CERITA GOKART DI SINI]',
      photo: { src: '/photos/jan-1.jpg', caption: '[caption gokart]' },
    },
    water: {
      label: 'Sepeda air',
      hint: 'Ketuk kiri dan kanan bergantian',
      wobble: 'Kompak dong, gantian ya!',
      win: 'Sampai!',
      story: '[TULIS CERITA SEPEDA AIR DI SINI]',
      photo: { src: '/photos/jan-2.jpg', caption: '[caption sepeda air]' },
    },
    haunted: {
      label: 'Rumah hantu',
      hint: 'Geser kiri-kanan untuk menyorot',
      found: 'Ditemukan',
      boo: 'BOO!',
      story: '[TULIS CERITA RUMAH HANTU DI SINI, misalnya siapa yang lebih takut]',
      photo: { src: '/photos/jan-3.jpg', caption: '[caption rumah hantu]' },
    },
    snow: {
      label: 'Ruang salju',
      hint: 'Gosok kiri-kanan untuk menghapus embun',
      reveal: 'Dingin banget!',
            brr: ['brrr...', 'brr!', 'b-brrr...', 'brrrr'],
      story: '[TULIS CERITA RUANG SALJU DI SINI]',
      photo: { src: '/photos/jan-4.jpg', caption: '[caption ruang salju]' },
    },
    arcade: {
      label: 'Arcade',
      hint: 'Geser tuas, lalu ketuk AMBIL',
      miss: 'Hampir! Coba lagi',
      win: 'Dapat!',
      story: '[TULIS CERITA ARCADE DI SINI]',
      photo: { src: '/photos/jan-5.jpg', caption: '[caption arcade]' },
    },
  },

  booth: {
    title: 'Photobooth',
    date: '[TANGGAL PHOTOBOOTH, contoh: di hari yang lain]',
    hint: 'Pilih warna bingkai, lalu ketuk Foto!',
    button: 'Foto!',
    zoomHint: 'Ketuk foto untuk memperbesar',
    // Pilihan warna bingkai strip foto
    colors: [
      { name: 'Lilac', c: '#c9a2d8' },
      { name: 'Pink', c: '#ffb3cc' },
      { name: 'Krem', c: '#fff1d6' },
    ],
    // TULIS CERITA PHOTOBOOTH DI SINI (muncul setelah foto keluar)
    story: '[TULIS CERITA PHOTOBOOTH DI SINI]',
    // FOTO PHOTOBOOTH (hasil aslinya): taruh di  public/photos/jan-6.jpg
       // FOTO PHOTOBOOTH (3 potong): taruh di  public/photos/jan-6.jpg, jan-7.jpg, jan-8.jpg
    photos: [
      { src: '/photos/jan-6.jpg', caption: '[caption photobooth 1]' },
      { src: '/photos/jan-7.jpg', caption: '[caption photobooth 2]' },
      { src: '/photos/jan-8.jpg', caption: '[caption photobooth 3]' },
    ],
    // Tulisan di bagian bawah strip
    stripCaption: '[caption strip photobooth]',
  },
}