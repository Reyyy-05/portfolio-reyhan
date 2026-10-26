# Portofolio Reyhan Albar Fahryan (v3 - Modern Obsidian Edition)

Website portofolio modern berkinerja tinggi yang terinspirasi dari arsitektur dan craftsmanship [mmirza.site](https://mmirza.site/en), dibangun menggunakan **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, dan **Web Audio API**.

---

## 🚀 Fitur Unggulan

1. **Hero 3D Depth Layer & Canvas Vortex:**
   - Layering tipografi Oswald editorial dengan foto profil transparan dan efek partikel vortex interaktif yang mengikuti pergerakan kursor.
2. **Dual Navigation System:**
   - **Desktop:** Floating pill bar dengan pendaran lampu aktif (*nav-lamp-top* glow), avatar, dan theme switch.
   - **Mobile:** Floating bottom bar dengan active slider transisi *cubic-bezier*.
3. **Procedural Web Audio Engine:**
   - Sintesis audio interaktif via Web Audio API (`AudioContext`) tanpa memerlukan aset file MP3 eksternal (0-byte overhead).
4. **Interactive Experience Accordion:**
   - Accordion riwayat kerja/magang (`Creativemu Academy`, `IMGN Concept`, `Kelompok Tani`, `BPS`) dengan logo perusahaan dan badge status aktif.
5. **Projects Showcase & Case Study Pages:**
   - Infinite horizontal marquee track pada beranda.
   - Filter kategori proyek (All, Web, Mobile, Systems/Data).
   - Halaman detail studi kasus dinamis (`/projects/[slug]`) dengan mockup frame browser, problem statement, dan sorotan rekayasa teknis.
6. **Live GitHub Contribution Widget:**
   - Visualisasi grid komit 52 minggu, streak, dan metrik repositori untuk akun `@Reyyy-05`.
7. **Contact Form Berbasis Next.js Server Actions:**
   - Terintegrasi langsung dengan **Resend API** untuk pengiriman email ke inbox Anda.
   - Dilengkapi *honeypot* anti-spam.

---

## 🛠️ Menjalankan di Komputer Lokal

```bash
# Masuk ke direktori
cd portfolio-v3

# Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---

## 🌐 Panduan Deploy ke Vercel (Online 1-Klik)

### Langkah 1: Push ke GitHub
Buat repository baru di akun GitHub Anda (misal: `portfolio-v3`), lalu jalankan:

```bash
cd /home/user/Projects/portofolio/portfolio-v3
git init
git add .
git commit -m "feat: initial commit modern portfolio v3"
git branch -M main
git remote add origin https://github.com/Reyyy-05/portfolio-v3.git
git push -u origin main
```

### Langkah 2: Import ke Vercel
1. Buka [vercel.com](https://vercel.com) dan login dengan akun GitHub Anda.
2. Klik tombol **"Add New..."** lalu pilih **"Project"**.
3. Pilih repository `portfolio-v3` yang baru saja Anda push.
4. Pada bagian **Environment Variables**, tambahkan:
   - `RESEND_API_KEY` : `your_resend_api_key_here`
   - `CONTACT_RECEIVER_EMAIL` : `rayhanalbar75@gmail.com`
   - `NEXT_PUBLIC_SITE_URL` : URL Vercel Anda (contoh `https://reyhanalbar.vercel.app`)
5. Klik **"Deploy"**! Dalam 1–2 menit website portofolio Anda sudah online dan dapat diakses publik.

### Langkah 3: Konfigurasi Custom Domain (Opsional Nanti)
Jika Anda nanti sudah membeli domain sendiri (misal `reyhanalbar.com` atau `reyhanalbar.dev`):
1. Masuk ke project di Dashboard Vercel -> tab **Settings** -> **Domains**.
2. Ketik nama domain Anda lalu klik **Add**.
3. Vercel akan menampilkan DNS Record (CNAME atau A record). Masukkan nilai tersebut di penyedia domain Anda (Cloudflare, Niagahoster, Domainesia, dsb.).
