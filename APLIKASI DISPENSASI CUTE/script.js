document.addEventListener('DOMContentLoaded', () => {
    // Inisialisasi Elemen Form Surat
    const noSuratInput = document.getElementById('noSurat');
    const tglSuratInput = document.getElementById('tglSurat');
    const pilihSiswaSelect = document.getElementById('pilihSiswa');
    const namaCustomInput = document.getElementById('namaCustom');
    const inputCustomGroup = document.getElementById('inputCustomGroup');
    const kategoriUmurInput = document.getElementById('kategoriUmur');
    const kegiatanInput = document.getElementById('kegiatan');

    // Inisialisasi Elemen Preview Surat
    const viewNoSurat = document.getElementById('viewNoSurat');
    const viewTglSurat = document.getElementById('viewTglSurat');
    const viewNamaSiswa = document.getElementById('viewNamaSiswa');
    const viewKU = document.getElementById('viewKU');
    const viewKegiatan = document.getElementById('viewKegiatan');

    // Data Bawaan Jadwal Pertandingan
    let daftarJadwal = [
        { hariTgl: 'Jumat, 8 Mei 2026', waktu: '14:00 - Selesai', laga: 'Cute Ballers Academy vs Team A', lokasi: 'GOR Ngurah Rai Denpasar' },
        { hariTgl: 'Sabtu, 9 Mei 2026', waktu: '10:00 - Selesai', laga: 'Cute Ballers Academy vs Team B', lokasi: 'GOR Ngurah Rai Denpasar' }
    ];

    // Sinkronisasi Input Surat
    noSuratInput.addEventListener('input', (e) => viewNoSurat.textContent = e.target.value || '-');
    tglSuratInput.addEventListener('input', (e) => viewTglSurat.textContent = e.target.value || '-');
    kategoriUmurInput.addEventListener('input', (e) => viewKU.textContent = e.target.value || '-');
    kegiatanInput.addEventListener('input', (e) => viewKegiatan.textContent = e.target.value || '-');

    pilihSiswaSelect.addEventListener('change', (e) => {
        if (e.target.value === 'custom') {
            inputCustomGroup.style.display = 'block';
            viewNamaSiswa.textContent = namaCustomInput.value || '...';
        } else {
            inputCustomGroup.style.display = 'none';
            viewNamaSiswa.textContent = e.target.value;
        }
    });

    namaCustomInput.addEventListener('input', (e) => {
        if (pilihSiswaSelect.value === 'custom') {
            viewNamaSiswa.textContent = e.target.value || '...';
        }
    });

    // Fitur Kelola Jadwal Pertandingan
    const btnTambahJadwal = document.getElementById('btnTambahJadwal');
    const jadwalHariTgl = document.getElementById('jadwalHariTgl');
    const jadwalWaktu = document.getElementById('jadwalWaktu');
    const jadwalLaga = document.getElementById('jadwalLaga');
    const jadwalLokasi = document.getElementById('jadwalLokasi');
    const jadwalTableBody = document.getElementById('jadwalTableBody');

    function renderTableJadwal() {
        jadwalTableBody.innerHTML = '';
        daftarJadwal.forEach((item, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="text-align: center;">${index + 1}</td>
                <td>${item.hariTgl}</td>
                <td>${item.waktu}</td>
                <td>${item.laga}</td>
                <td>${item.lokasi}</td>
                <td class="no-print" style="text-align: center;">
                    <button class="btn-del" onclick="hapusJadwal(${index})">🗑️</button>
                </td>
            `;
            jadwalTableBody.appendChild(tr);
        });
    }

    btnTambahJadwal.addEventListener('click', () => {
        if (!jadwalHariTgl.value || !jadwalLaga.value) {
            alert('Silakan isi Tanggal dan Pertandingan!');
            return;
        }

        daftarJadwal.push({
            hariTgl: jadwalHariTgl.value,
            waktu: jadwalWaktu.value || '-',
            laga: jadwalLaga.value,
            lokasi: jadwalLokasi.value || '-'
        });

        // Reset Input Jadwal
        jadwalHariTgl.value = '';
        jadwalWaktu.value = '';
        jadwalLaga.value = '';
        jadwalLokasi.value = '';

        renderTableJadwal();
    });

    window.hapusJadwal = function(index) {
        daftarJadwal.splice(index, 1);
        renderTableJadwal();
    };

    // Render Awal Jadwal
    renderTableJadwal();
});