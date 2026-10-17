// ============================================================
// KONTEN OKTOBER 2025: edit di sini saja, tanpa menyentuh animasi
// ============================================================
export const OCTOBER = {
  // LAGU: taruh di  public/audio/oktober.mp3
  audio: '/audio/oktober.mp3',

  title: 'Oktober 2025',
  subtitle: 'Pertama kalinya kita jalan berdua',

  calendar: {
    hint: 'Ketuk tanggal yang dilingkari',
    hint26: 'Yang satu ini nanti malam ya...',
    story: {
      title: 'First Date',
      // TULIS CERITA FIRST DATE (5 Oktober) DI SINI, boleh tambah paragraf
      paragraphs: ['[TULIS CERITA FIRST DATE DI SINI]'],
    },
  },

  icecream: {
    title: 'Es krim di Momoyo',
    // Scoop pertama = strawberry. Boleh ganti nama/warna atau tambah/kurangi (maksimal 3 supaya muat)
    flavors: [
      { name: 'Strawberry', color: '#ff9db5' },
      { name: '[rasa 2]', color: '#c9b2ff' },
      { name: '[rasa 3]', color: '#a8e6cf' },
    ],
    hintStart: 'Ketuk untuk menambah es krim',
    done: '[CAPTION / CERITA SINGKAT ES KRIM DI MOMOYO]',
  },

  strip: {
    title: 'Jejak first date',
    // FOTO FIRST DATE: taruh di  public/photos/okt-1.jpg, okt-2.jpg, okt-3.jpg
    photos: [
      { src: '/photos/okt-1.jpg', caption: '[caption foto 1]' },
      { src: '/photos/okt-2.jpg', caption: '[caption foto 2]' },
      { src: '/photos/okt-3.jpg', caption: '[caption foto 3]' },
    ],
  },

  gift: {
    title: 'Nice So',
    hintClosed: 'Ketuk kadonya',
    hintOpen: 'Ketuk bonekanya',
    egg: 'Bloop! Ikannya kaget',
    // TULIS CERITA PEMBERIAN BONEKA DI SINI
    story: '[TULIS CERITA SAAT KAMU MEMBERI BONEKA]',
    // FOTO BONEKA: taruh di  public/photos/okt-4.jpg
    photo: { src: '/photos/okt-4.jpg', caption: '[caption boneka]' },
  },

  birthday: {
    title: '26 Oktober',
    subtitle: 'Ulang tahunmu',
    age: 26,
    hint: 'Ketuk kue untuk meniup lilin',
    wish: 'Make a wish',
  },

  wallet: {
    title: 'Hadiah dari Kyla',
    hint: 'Ketuk dompetnya',
    hintOpen: 'Ketuk fotonya untuk memperbesar',
    // FOTO DI DALAM DOMPET: taruh di  public/photos/okt-5.jpg
    photo: { src: '/photos/okt-5.jpg', caption: '[caption foto dompet]' },
    // PESAN DI KARTU DALAM DOMPET
    message: '[TULIS PESAN DI SINI]',
  },

  // Penutup bulan: petunjuk menuju November
  foreshadow: [
    'Dari first date sampai hari jadi kita: 51 hari',
    'Dari ulang tahunmu sampai hari jadi kita: tepat 30 hari',
  ],
}