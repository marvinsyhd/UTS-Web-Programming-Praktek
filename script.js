// ============================================================
// script.js — JerseyKing.id
// SOAL 4: Validasi Form JavaScript
// SOAL 5: DOM Dinamis — Render, Tambah, Hapus Produk
// ============================================================


// ============================================================
// NAVIGASI MOBILE
// ============================================================
function toggleNav() {
  document.getElementById('nav-menu').classList.toggle('open');
}


// ============================================================
// SOAL 5: DATA PRODUK — Array of Object (min. 4 item)
// ============================================================
const jerseyData = [
  {
    id: 1,
    nama: 'Manchester City Home 25/26',
    liga: 'Premier League',
    jenis: 'Home Kit',
    deskripsi: 'Jersey kandang resmi Man City musim 25/26 dengan teknologi DryCELL yang menjaga tubuh tetap kering dan nyaman sepanjang pertandingan.',
    harga: 3500000,
    hargaCoret: 5800000,
    stok: true,
    bg: '#c9e3f7',
    foto: 'mancity.png'
  },
  {
    id: 2,
    nama: 'Real Madrid Home 25/26',
    liga: 'La Liga',
    jenis: 'Home Kit',
    deskripsi: 'Jersey kandang Real Madrid dengan desain elegan berwarna putih edisi terbatas musim 2025/26 dari Adidas.',
    harga: 4500000,
    hargaCoret: 6200000,
    stok: true,
    bg: '#e8e4f0',
    foto: 'madrid.png'
  },
  {
    id: 3,
    nama: 'Liverpool Home 25/26',
    liga: 'Premier League',
    jenis: 'Home Kit',
    deskripsi: 'Jersey kandang Liverpool warna merah ikonik. Dibuat dengan bahan daur ulang berkualitas tinggi dari Nike.',
    harga: 3950000,
    hargaCoret: 5200000,
    stok: true,
    bg: '#f7d5d8',
    foto: 'liverpool.png'
  },
  {
    id: 4,
    nama: 'Bayern Munich Away 25/26',
    liga: 'Bundesliga',
    jenis: 'Away Kit',
    deskripsi: 'Jersey tandang Bayern Munich dengan warna putih khas dan detail corak minimalis. Koleksi eksklusif musim baru.',
    harga: 4100000,
    hargaCoret: 5600000,
    stok: true,
    bg: '#f9dbd0',
    foto: 'Munchen.png'
  },
  {
    id: 5,
    nama: 'PSG Home Kit 25/26',
    liga: 'Ligue 1',
    jenis: 'Home Kit',
    deskripsi: 'Jersey kandang PSG edisi khusus dengan motif gradasi biru-hitam premium, lengkap dengan patch logo Champions League.',
    harga: 4650000,
    hargaCoret: 6400000,
    stok: false,
    bg: '#d1d8f0',
    foto: 'psg.png'
  },
  {
    id: 6,
    nama: 'Persib Bandung Home',
    liga: 'Liga 1',
    jenis: 'Home Kit',
    deskripsi: 'Jersey kandang Persib Bandung kebanggaan Bobotoh. Warna Biru dengan desain modern dari Specs.',
    harga: 280000,
    hargaCoret: 380000,
    stok: true,
    bg: '#fde8c8',
    foto: 'Persib.png'
  }
];

let nextId = 7;
let keranjang = [];

// Pilihan acak untuk produk baru
const warnaList = [
  { bg: '#c9e3f7', foto: '' },
  { bg: '#f7d5d8', foto: '' },
  { bg: '#d4f0e0', foto: '' },
  { bg: '#fde8c8', foto: '' },
  { bg: '#e8e4f0', foto: '' },
  { bg: '#fef9cc', foto: '' }
];

const ligaList = ['Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'Liga 1', 'Ligue 1'];
const jenisKitList = ['Home Kit', 'Away Kit', 'Third Kit', 'GK Kit'];

const deskripsiAcak = [
  'Jersey original berlisensi resmi dengan bahan polyester premium anti-keringat, nyaman untuk pertandingan maupun sehari-hari.',
  'Edisi terbatas dengan teknologi kain terkini. Desain modern yang memadukan identitas klub dan estetika streetwear.',
  'Dibuat dari bahan daur ulang berkualitas tinggi. Ringan, adem, dan cocok dipakai di iklim tropis Indonesia.',
  'Koleksi eksklusif musim ini dengan patch bordir resmi dan material breathable untuk kenyamanan maksimal.'
];


// ============================================================
// FORMAT RUPIAH
// ============================================================
function formatRupiah(angka) {
  return 'Rp ' + Number(angka).toLocaleString('id-ID');
}


// ============================================================
// SOAL 5: RENDER SEMUA PRODUK KE HALAMAN
// ============================================================
function renderProduk() {
  const grid = document.getElementById('produk-grid');
  grid.innerHTML = '';

  jerseyData.forEach(function (p) {
    const sudahDiKeranjang = keranjang.includes(p.id);

    const card = document.createElement('div');
    card.className = 'produk-card';
    card.id = 'card-' + p.id;

    card.innerHTML =
      // -- FOTO --
      '<div class="produk-foto" style="background:' + p.bg + '">' +
      '<img src="' + p.foto + '" alt="' + p.nama + '" ' +
      'style="width:100%;height:100%;object-fit:cover;display:block;" ' +
      'onerror="this.style.display=\'none\'" />' +
      '<span class="badge-stok ' + (p.stok ? 'stok-ada' : 'stok-habis') + '">' +
      (p.stok ? 'Tersedia' : 'Habis') +
      '</span>' +
      '</div>' +

      // -- BODY --
      '<div class="produk-body">' +
      // Kategori kecil — seperti "PREMIER LEAGUE · HOME KIT"
      '<div class="produk-kategori">' + p.liga.toUpperCase() + ' &middot; ' + p.jenis.toUpperCase() + '</div>' +

      // Nama produk
      '<div class="produk-nama">' + p.nama + '</div>' +

      // Deskripsi
      '<div class="produk-deskripsi">' + p.deskripsi + '</div>' +

      // Footer: harga + tombol keranjang
      '<div class="produk-footer">' +
      '<div class="produk-harga">' +
      formatRupiah(p.harga) +
      '<s>' + formatRupiah(p.hargaCoret) + '</s>' +
      '</div>' +
      '<button class="btn-keranjang ' + (sudahDiKeranjang ? 'ditambah' : '') + '" ' +
      'onclick="toggleKeranjang(' + p.id + ')" ' +
      (p.stok ? '' : 'disabled style="opacity:0.4;cursor:not-allowed"') + '>' +
      (sudahDiKeranjang ? '✓ Ditambah' : '+ Keranjang') +
      '</button>' +
      '</div>' +

      // Tombol hapus
      '<button class="btn-hapus-card" onclick="hapusProduk(' + p.id + ')">🗑 Hapus Produk</button>' +

      '</div>';

    grid.appendChild(card);
  });

  // Update counter stat
  const statEl = document.getElementById('stat-produk');
  if (statEl) statEl.textContent = jerseyData.length;
}


// ============================================================
// SOAL 5: TAMBAH PRODUK BARU (tanpa reload)
// ============================================================
function tambahProduk() {
  const input = document.getElementById('input-produk');
  const nama = input.value.trim();

  if (!nama) {
    input.style.borderColor = '#b5152b';
    input.focus();
    return;
  }

  input.style.borderColor = '';

  const w = warnaList[Math.floor(Math.random() * warnaList.length)];
  const liga = ligaList[Math.floor(Math.random() * ligaList.length)];
  const jenis = jenisKitList[Math.floor(Math.random() * jenisKitList.length)];
  const harga = Math.floor(Math.random() * 250000) + 200000;
  const desk = deskripsiAcak[Math.floor(Math.random() * deskripsiAcak.length)];

  jerseyData.push({
    id: nextId++,
    nama: nama,
    liga: liga,
    jenis: jenis,
    deskripsi: desk,
    harga: harga,
    hargaCoret: harga + Math.floor(Math.random() * 100000) + 80000,
    stok: Math.random() > 0.2,
    bg: w.bg,
    foto: w.foto
  });

  input.value = '';
  renderProduk();
}


// ============================================================
// SOAL 5: HAPUS PRODUK (tanpa reload)
// ============================================================
function hapusProduk(id) {
  const idx = jerseyData.findIndex(function (p) { return p.id === id; });
  if (idx > -1) {
    jerseyData.splice(idx, 1);
    // Hapus juga dari keranjang jika ada
    keranjang = keranjang.filter(function (k) { return k !== id; });
    renderProduk();
    updateKeranjangUI();
  }
}


// ============================================================
// KERANJANG: Toggle tambah/hapus dari keranjang
// ============================================================
function toggleKeranjang(id) {
  const idx = keranjang.indexOf(id);
  if (idx > -1) {
    keranjang.splice(idx, 1);
  } else {
    keranjang.push(id);
  }
  renderProduk();
  updateKeranjangUI();
}

function kosongkanKeranjang() {
  keranjang = [];
  renderProduk();
  updateKeranjangUI();
}

function updateKeranjangUI() {
  const el = document.getElementById('keranjang-count');
  if (el) el.textContent = keranjang.length;
}


// ============================================================
// SOAL 4: HELPER VALIDASI
// ============================================================
function setError(grpId, errId, pesan) {
  const grup = document.getElementById(grpId);
  const err = document.getElementById(errId);
  if (pesan) {
    grup.classList.add('error');
    err.textContent = pesan;
  } else {
    grup.classList.remove('error');
    err.textContent = '';
  }
  return pesan !== '';
}


// ============================================================
// SOAL 4: SUBMIT & VALIDASI FORM PEMBELIAN
// ============================================================
function submitForm() {
  let adaError = false;

  // 1. Nama — wajib isi
  const nama = document.getElementById('nama').value.trim();
  if (setError('grp-nama', 'err-nama', nama ? '' : 'Nama lengkap wajib diisi.')) adaError = true;

  // 2. Telepon — wajib & positif
  const telepon = document.getElementById('telepon').value.trim();
  let pesanTelepon = '';
  if (!telepon) pesanTelepon = 'No. WhatsApp wajib diisi.';
  else if (Number(telepon) <= 0) pesanTelepon = 'No. WhatsApp harus berupa angka positif.';
  if (setError('grp-telepon', 'err-telepon', pesanTelepon)) adaError = true;

  // 3. Email — format valid
  const email = document.getElementById('email').value.trim();
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let pesanEmail = '';
  if (!email) pesanEmail = 'Email wajib diisi.';
  else if (!emailRe.test(email)) pesanEmail = 'Format email tidak valid.';
  if (setError('grp-email', 'err-email', pesanEmail)) adaError = true;

  // 4. Password — min 6 karakter
  const pw = document.getElementById('password').value;
  let pesanPw = '';
  if (!pw) pesanPw = 'Password wajib diisi.';
  else if (pw.length < 6) pesanPw = 'Password minimal 6 karakter.';
  if (setError('grp-password', 'err-password', pesanPw)) adaError = true;

  // 5. Pilihan jersey
  const jersey = document.getElementById('jersey').value;
  if (setError('grp-jersey', 'err-jersey', jersey ? '' : 'Pilih jersey yang ingin dipesan.')) adaError = true;

  // 6. Ukuran
  const ukuran = document.getElementById('ukuran').value;
  if (setError('grp-ukuran', 'err-ukuran', ukuran ? '' : 'Pilih ukuran jersey.')) adaError = true;

  // 7. Harga — wajib & positif
  const harga = document.getElementById('harga').value;
  let pesanHarga = '';
  if (!harga) pesanHarga = 'Harga wajib diisi.';
  else if (Number(harga) <= 0) pesanHarga = 'Harga harus bernilai positif.';
  if (setError('grp-harga', 'err-harga', pesanHarga)) adaError = true;

  // 8. Metode pembayaran (radio)
  const bayar = document.querySelector('input[name="pembayaran"]:checked');
  if (setError('grp-pembayaran', 'err-pembayaran', bayar ? '' : 'Pilih metode pembayaran.')) adaError = true;

  // 9. Alamat
  const alamat = document.getElementById('alamat').value.trim();
  if (setError('grp-alamat', 'err-alamat', alamat ? '' : 'Alamat pengiriman wajib diisi.')) adaError = true;

  // 10. Syarat & ketentuan
  const syarat = document.getElementById('syarat').checked;
  if (setError('grp-syarat', 'err-syarat', syarat ? '' : 'Centang persetujuan syarat & ketentuan.')) adaError = true;

  // Tampilkan hasil
  const elSukses = document.getElementById('form-success');
  if (!adaError) {
    elSukses.style.display = 'block';
    elSukses.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    elSukses.style.display = 'none';
    const firstErr = document.querySelector('.form-group.error');
    if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}


// ============================================================
// INIT
// ============================================================
renderProduk();

// ============================================================
// KERANJANG BELANJA — Sistem lengkap
// Struktur: keranjang = [ { id, qty }, ... ]
// ============================================================

// Override keranjang lama dengan array of objects
keranjang = [];

// ID produk yang akan dihapus (disimpan saat modal dibuka)
let modalHapusId = null;


// ============================================================
// RENDER ULANG produk — override fungsi lama agar pakai
// sistem keranjang baru (qty-based, bukan toggle)
// ============================================================
function renderProduk() {
  const grid = document.getElementById('produk-grid');
  grid.innerHTML = '';

  jerseyData.forEach(function (p) {
    const itemKeranjang = keranjang.find(function (k) { return k.id === p.id; });
    const sudahDiKeranjang = !!itemKeranjang;

    const card = document.createElement('div');
    card.className = 'produk-card';
    card.id = 'card-' + p.id;

    card.innerHTML =
      '<div class="produk-foto" style="background:' + p.bg + '">' +
      '<img src="' + p.foto + '" alt="' + p.nama + '" ' +
      'style="width:100%;height:100%;object-fit:cover;display:block;" ' +
      'onerror="this.style.display=\'none\'" />' +
      '<span class="badge-stok ' + (p.stok ? 'stok-ada' : 'stok-habis') + '">' +
      (p.stok ? 'Tersedia' : 'Habis') +
      '</span>' +
      '</div>' +
      '<div class="produk-body">' +
      '<div class="produk-kategori">' + p.liga.toUpperCase() + ' &middot; ' + p.jenis.toUpperCase() + '</div>' +
      '<div class="produk-nama">' + p.nama + '</div>' +
      '<div class="produk-deskripsi">' + p.deskripsi + '</div>' +
      '<div class="produk-footer">' +
      '<div class="produk-harga">' +
      formatRupiah(p.harga) +
      '<s>' + formatRupiah(p.hargaCoret) + '</s>' +
      '</div>' +
      '<button class="btn-keranjang ' + (sudahDiKeranjang ? 'ditambah' : '') + '" ' +
      'onclick="tambahKeKeranjang(' + p.id + ')" ' +
      (p.stok ? '' : 'disabled style="opacity:0.4;cursor:not-allowed"') + '>' +
      (sudahDiKeranjang ? '✓ Ditambah' : '+ Keranjang') +
      '</button>' +
      '</div>' +
      '<button class="btn-hapus-card" onclick="hapusProduk(' + p.id + ')">🗑 Hapus Produk</button>' +
      '</div>';

    grid.appendChild(card);
  });

  const statEl = document.getElementById('stat-produk');
  if (statEl) statEl.textContent = jerseyData.length;

  updateKeranjangUI();
}


// ============================================================
// TAMBAH KE KERANJANG (dari tombol di card produk)
// ============================================================
function tambahKeKeranjang(id) {
  const item = keranjang.find(function (k) { return k.id === id; });
  if (item) {
    item.qty += 1;
  } else {
    keranjang.push({ id: id, qty: 1 });
  }
  renderProduk();
  // Animasi badge
  const badge = document.getElementById('cart-badge');
  if (badge) {
    badge.style.transform = 'scale(1.4)';
    setTimeout(function () { badge.style.transform = 'scale(1)'; }, 200);
  }
}


// ============================================================
// UPDATE COUNTER & BADGE
// ============================================================
function updateKeranjangUI() {
  const totalItem = keranjang.reduce(function (sum, k) { return sum + k.qty; }, 0);

  const badge = document.getElementById('cart-badge');
  const counter = document.getElementById('keranjang-count');
  if (badge) badge.textContent = totalItem;
  if (counter) counter.textContent = totalItem;
}


// ============================================================
// BUKA HALAMAN KERANJANG
// ============================================================
function bukaKeranjang() {
  document.getElementById('konten-utama').classList.add('hidden');
  document.getElementById('halaman-keranjang').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  renderKeranjang();
}


// ============================================================
// TUTUP / KEMBALI DARI KERANJANG
// ============================================================
function tutupKeranjang() {
  document.getElementById('halaman-keranjang').classList.add('hidden');
  document.getElementById('konten-utama').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


// ============================================================
// RENDER ISI KERANJANG
// ============================================================
function renderKeranjang() {
  const list = document.getElementById('keranjang-list');
  const empty = document.getElementById('keranjang-empty');
  const footer = document.getElementById('keranjang-footer');
  const totalEl = document.getElementById('total-harga');

  list.innerHTML = '';

  if (keranjang.length === 0) {
    empty.classList.remove('hidden');
    footer.classList.add('hidden');
    return;
  }

  empty.classList.add('hidden');
  footer.classList.remove('hidden');

  let grandTotal = 0;

  keranjang.forEach(function (k) {
    const produk = jerseyData.find(function (p) { return p.id === k.id; });
    if (!produk) return;

    const subtotal = produk.harga * k.qty;
    grandTotal += subtotal;

    const item = document.createElement('div');
    item.className = 'keranjang-item';
    item.id = 'kitem-' + k.id;

    item.innerHTML =
      '<img class="keranjang-item-foto" src="' + produk.foto + '" ' +
      'alt="' + produk.nama + '" ' +
      'onerror="this.style.background=\'#dce7ff\'" />' +
      '<div class="keranjang-item-info">' +
      '<div class="keranjang-item-nama">' + produk.nama + '</div>' +
      '<div class="keranjang-item-satuan">' + formatRupiah(produk.harga) + ' / pcs</div>' +
      '</div>' +
      '<div class="qty-stepper">' +
      '<button class="qty-btn" onclick="ubahQty(' + k.id + ', -1)">&#8722;</button>' +
      '<span class="qty-value" id="qty-' + k.id + '">' + k.qty + '</span>' +
      '<button class="qty-btn" onclick="ubahQty(' + k.id + ', 1)">&#43;</button>' +
      '</div>' +
      '<div class="keranjang-item-total" id="subtotal-' + k.id + '">' + formatRupiah(subtotal) + '</div>' +
      '<button class="btn-hapus-item" onclick="bukaModal(' + k.id + ')" title="Hapus">&#10005;</button>';

    list.appendChild(item);
  });

  if (totalEl) totalEl.textContent = formatRupiah(grandTotal);
}


// ============================================================
// UBAH QTY ITEM DI KERANJANG
// ============================================================
function ubahQty(id, delta) {
  const item = keranjang.find(function (k) { return k.id === id; });
  if (!item) return;

  item.qty += delta;

  if (item.qty <= 0) {
    // Jika qty jadi 0, langsung buka modal konfirmasi hapus
    item.qty = 1; // reset dulu sebelum modal
    bukaModal(id);
    return;
  }

  // Update tampilan tanpa render ulang semua
  const produk = jerseyData.find(function (p) { return p.id === id; });
  const qtyEl = document.getElementById('qty-' + id);
  const subtotalEl = document.getElementById('subtotal-' + id);
  const totalEl = document.getElementById('total-harga');

  if (qtyEl) qtyEl.textContent = item.qty;
  if (subtotalEl) subtotalEl.textContent = formatRupiah(produk.harga * item.qty);

  // Hitung ulang grand total
  let grandTotal = 0;
  keranjang.forEach(function (k) {
    const p = jerseyData.find(function (p) { return p.id === k.id; });
    if (p) grandTotal += p.harga * k.qty;
  });
  if (totalEl) totalEl.textContent = formatRupiah(grandTotal);

  updateKeranjangUI();
  renderProduk();
}


// ============================================================
// MODAL KONFIRMASI HAPUS
// ============================================================
function bukaModal(id) {
  modalHapusId = id;
  const produk = jerseyData.find(function (p) { return p.id === id; });
  const namaEl = document.getElementById('modal-nama-produk');
  if (namaEl && produk) namaEl.textContent = produk.nama;

  document.getElementById('modal-overlay').classList.add('aktif');
  document.body.style.overflow = 'hidden';
}

function tutupModal() {
  modalHapusId = null;
  document.getElementById('modal-overlay').classList.remove('aktif');
  document.body.style.overflow = '';
}

function konfirmasiHapus() {
  if (modalHapusId === null) return;

  // Hapus dari keranjang
  keranjang = keranjang.filter(function (k) { return k.id !== modalHapusId; });
  tutupModal();
  renderKeranjang();
  updateKeranjangUI();
  renderProduk();
}


// ============================================================
// CHECKOUT
// ============================================================
function checkout() {
  tutupKeranjang();
  document.getElementById('beli').scrollIntoView({ behavior: 'smooth' });
}


// ============================================================
// Override kosongkanKeranjang lama
// ============================================================
function kosongkanKeranjang() {
  keranjang = [];
  renderProduk();
  renderKeranjang();
  updateKeranjangUI();
}


// Re-render setelah semua fungsi override siap
renderProduk();