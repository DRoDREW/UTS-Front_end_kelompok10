const wayangData = [
    { id: 1, nama: 'Arjuna', asal: 'Jawa Tengah', deskripsi: 'Satria tampan, ahli panah dan tokoh Pandawa. Arjuna adalah simbol kesempurnaan seorang ksatria yang memiliki ketenangan batin dan fokus tinggi.', image: 'assets/wayang-arjuna.png' },
    { id: 2, nama: 'Bima', asal: 'Jawa Tengah', deskripsi: 'Kuat, jujur, memiliki kuku pancanaka. Sering disebut Werkudara. Ia melambangkan keberanian, ketegasan, dan ketaatan pada guru.', image: 'assets/wayang-bima.png' },
    { id: 3, nama: 'Srikandi', asal: 'Jawa Tengah', deskripsi: 'Prajurit wanita, mahir memanah, istri Arjuna. Srikandi adalah lambang emansipasi dan kepahlawanan wanita.', image: 'assets/wayang-srikandi.png' },
    { id: 4, nama: 'Semar', asal: 'Jawa Tengah', deskripsi: 'Leluhur Punakawan, dewa yang menyamar. Memberikan nasihat bijak. Semar adalah pamong yang paling dihormati, mewakili rakyat jelata namun memiliki kearifan tertinggi.', image: 'assets/wayang-semar.png' },
    { id: 5, nama: 'Gatotkaca', asal: 'Jawa Timur', deskripsi: 'Otot kawat tulang besi, putra Bima, pahlawan udara. Ia dikenal karena kecepatan dan kekuatannya yang luar biasa dalam pertempuran.', image: 'assets/wayang-gatotkaca.png' },
    { id: 6, nama: 'Rama', asal: 'Bali', deskripsi: 'Tokoh utama epos Ramayana. Simbol kebenaran, kesatria, dan kebajikan. Ia dikenal sebagai raja yang adil dan suami yang setia.', image: 'assets/wayang-rama.png' },
    { id: 7, nama: 'Hanoman', asal: 'Jawa Barat', deskripsi: 'Kera putih sakti, jenderal pasukan kera Rama. Hanoman melambangkan pengabdian tanpa batas dan kesaktian yang didapat dari tapa.', image: 'assets/wayang-hanoman.png' },
    { id: 8, nama: 'Cepot', asal: 'Jawa Barat', deskripsi: 'Punakawan khas Sunda (Wayang Golek), jenaka dan kritis. Cepot adalah karakter humoris yang sering menyindir penguasa dengan cara yang santun.', image: 'assets/wayang-cepot.png' },
    { id: 9, nama: 'Kresna', asal: 'Jawa Tengah', deskripsi: 'Raja Dwarawati, titisan Wisnu, penasihat Pandawa. Kresna adalah ahli strategi yang cerdas dan penjelmaan dewa pemelihara alam.', image: 'assets/wayang-kresna.png' },
    { id: 10, nama: 'Drupadi', asal: 'Jawa Tengah', deskripsi: 'Istri para Pandawa. Simbol ketabahan, kesetiaan, dan wanita dengan martabat tinggi.', image: 'assets/wayang-drupadi.png' },
    { id: 11, nama: 'Dasamuka', asal: 'Bali', deskripsi: 'Rahwana, raja raksasa Alengka. Antagonis utama Ramayana, melambangkan sepuluh kejahatan atau nafsu duniawi.', image: 'assets/wayang-dasamuka.png' },
    { id: 12, nama: 'Petruk', asal: 'Jawa Tengah', deskripsi: 'Punakawan yang tinggi dan kurus, dikenal humoris dan cerdik. Petruk adalah anak Semar yang selalu siap memberi solusi dengan cara yang lucu.', image: 'assets/wayang-petruk.png' },
];

let currentFilter = 'Semua';

const createWayangCard = (wayang) => {
    return `
        <div class="koleksi-card" data-id="${wayang.id}">
            <div class="card-image-wrapper">
                <img src="${wayang.image}" alt="${wayang.nama}" loading="lazy" />
            </div>
            <div class="card-content">
                <h5>${wayang.nama}</h5>
            </div>
        </div>
    `;
};

const filterAndSearchWayang = () => {
    const searchTerm = $('#search-input').val().toLowerCase().trim();
    
    let filteredData = wayangData.filter(wayang => {
        const isFiltered = currentFilter === 'Semua' || wayang.asal === currentFilter;
        
        const wayangNameLower = wayang.nama.toLowerCase();

        const isSearched = wayangNameLower.startsWith(searchTerm);
                      
        return isFiltered && isSearched;
    });

    $('#koleksi-grid').html('');
    if (filteredData.length === 0) {
        $('#koleksi-grid').html('<p style="grid-column: 1 / -1; font-style: italic;">Tidak ada wayang yang ditemukan.</p>');
        return;
    }

    filteredData.forEach(wayang => {
        $('#koleksi-grid').append(createWayangCard(wayang));
    });
};

const showWayangDetail = (wayangId) => {
    const wayang = wayangData.find(w => w.id === wayangId);
    if (!wayang) return;

    $('#modal-image').attr('src', wayang.image).attr('alt', wayang.nama);
    $('#modal-nama').text(wayang.nama);
    $('#modal-asal').html('<strong>Asal:</strong> ' + wayang.asal);
    $('#modal-deskripsi').text(wayang.deskripsi);
    
    $('#wayang-modal').css('display', 'block');
    $('body').addClass('modal-open'); 
};

$(document).ready(function() {

    $('#search-input').on('keyup', filterAndSearchWayang);

    $('.filter-btn').on('click', function() {
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        currentFilter = $(this).data('filter');
        filterAndSearchWayang();
    });
    
    // Logika Scroll to Top
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 300) {
            $('.scroll-to-top').addClass('show');
        } else {
            $('.scroll-to-top').removeClass('show');
        }
    });

    $('.scroll-to-top').on('click', function(e) {
        e.preventDefault();
        // Menggunakan animasi jQuery yang sederhana dan cepat
        $('html, body').animate({ scrollTop: 0 }, 0);  
    });

    // Logika Form Kritik & Saran
    $('form.kritik-saran-form').on('submit', function(e) {
        e.preventDefault();
        alert("Pesan Terkirim! Terima kasih atas kritik dan saran Anda.");
        $(this)[0].reset();
    });
    
    // Logika Modal Detail (Klik Kartu)
    $('#koleksi-grid').on('click', '.koleksi-card', function() {
        const id = parseInt($(this).data('id'));
        showWayangDetail(id);
    });
    
    // Event listener tombol tutup modal
    $('.close-button').on('click', function() {
        $('#wayang-modal').css('display', 'none');
        $('body').removeClass('modal-open'); 
    });

    // Event listener klik di luar modal untuk menutup
    $(window).on('click', function(event) {
        if (event.target.id === 'wayang-modal') {
            $('#wayang-modal').css('display', 'none');
            $('body').removeClass('modal-open'); 
        }
    });

    // Panggil Awal
    filterAndSearchWayang();
});