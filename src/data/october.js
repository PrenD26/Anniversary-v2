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
      paragraphs: ['Jujur awalnya aku bingung dan grogi, setelah kita putuskan untuk pergi kencan yang pertama, aku langsung meminta saran dari teman-temanku, cari rekomendasi dari tiktok, dan merapikan outfitku, dan lucunya kamu udah nebak kalo mau aku ajak ke momoyo :)'],
    },
  },

  icecream: {
    title: 'Es krim di Momoyo',
    // Scoop pertama = strawberry. Boleh ganti nama/warna atau tambah/kurangi (maksimal 3 supaya muat)
    flavors: [
      { name: 'Strawberry', color: '#ff9db5' },
      { name: 'Vanilla', color: '#ece9f1' },
      { name: 'Coklat', color: '#361509' },
    ],
    hintStart: 'Ketuk untuk menambah es krim',
    done: 'Kamu ngira aku pendiem kan?? padahal aku sebenarnya raja yapping loh',
  },

  strip: {
    title: 'Jejak bulan itu',
    // FOTO FIRST DATE: taruh di  public/photos/okt-1.jpg, okt-2.jpg, okt-3.jpg
    photos: [
      { src: '/photos/okt-1.jpg', caption: 'Kamu diem aku yapping' },
      { src: '/photos/okt-2.jpg', caption: 'Ini otter atau anjing sih yangg?' },
      { src: '/photos/okt-3.mp4', caption: '[caption foto 3]' },
      { src: '/photos/okt-3.mp4', caption: '[caption foto 3]' },
    ],
  },

  gift: {
    title: 'Nice So',
    hintClosed: 'Ketuk kadonya',
    hintOpen: 'Ketuk bonekanya',
    egg: 'Bloop! Ikannya kaget',
    // TULIS CERITA PEMBERIAN BONEKA DI SINI
    story: 'Kamu awalnya malu-malu waktu mau aku beliin boneka otter? atau anjing bawa ikan sih ini???',
    // FOTO BONEKA: taruh di  public/photos/okt-4.jpg
    photo: { src: '/photos/okt-4.jpg', caption: '[caption boneka]' },
  },

  birthday: {
    title: '26 Oktober',
    subtitle: 'Ulang tahunku',
    age: 22,
    hint: 'Ketuk kue untuk meniup lilin',
    wish: 'Semoga aku bisa terus bersama Kyla',
  },

  wallet: {
    title: 'Hadiah dari Kyla',
    hint: 'Ketuk dompetnya',
    hintOpen: 'Ketuk fotonya untuk memperbesar',
    // FOTO DI DALAM DOMPET: taruh di  public/photos/okt-5.jpg
    photo: { src: '/photos/okt-5.jpg', caption: '[caption foto dompet]' },
    // PESAN DI KARTU DALAM DOMPET
    message: 'Terimakasih karena telah merayakan ulang tahunku',
  },

  // Penutup bulan: petunjuk menuju November
 
}