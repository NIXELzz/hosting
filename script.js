//Mapa
function iniciarMap() {
    var coord = { lat: 41.908507501146296, lng: 1.8826463517976824 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: coord
    });
    var marker = new google.maps.Marker({
        position: coord,
        map: map
    });
}

//Calendari
// Calendari pensat amb la possibilitat d'afegir dies assenyalats amb activitats
const header = document.querySelector('.calendar h3');
const dates = document.querySelector('.dates');
const navs = document.querySelectorAll('#prev, #next');
const months = [
    "Gener",
    "Febrer",
    "Març",
    "Abril",    
    "Maig",
    "Juny",
    "Juliol",
    "Agost",
    "Septembre",
    "Octubre",
    "Novembre",
    "Desembre",
];

let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();

function processaCalendari() {
    const start = new Date(year, month, 1).getDay();
    const endDate = new Date(year, month + 1, 0).getDate();
    const end = new Date(year, month, endDate).getDay();
    const endDatePrev = new Date(year, month, 0).getDate();

    let datesHTML = "";
    //Dies mes anterior
    for (let i = start === 0 ? 6 : start - 1; i > 0; i--) {
        datesHTML += `<li class="inactive">${endDatePrev - i + 1}</li>`;
    }
    //Dies mes acrtual
    for (let i = 1; i <= endDate; i++) {
        let className = (i === date.getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) ? 'today' : '';
        datesHTML += `<li class="${className}">${i}</li>`;
    }

    //Dies pròxim mes
    for (i = end; i < 6; i++) {
        datesHTML += `<li class="inactive">${i - end + 1}</li>`;
    }

    dates.innerHTML = datesHTML;
    header.textContent = `${months[month]} ${year}`;
}

navs.forEach(nav => {
    nav.addEventListener('click', e => {
        const btnId = e.target.id;
        if (btnId === 'prev' && month === 0) {
            year--
            month = 11;
        } else if (btnId === 'next' && month == 11) {
            year++;
            month = 0;
        }
        else {
            month = (btnId === 'next') ? month + 1 : month - 1;
        }

        date = new Date(year, month, new Date().getDate());
        year = date.getFullYear();
        month = date.getMonth();

        processaCalendari();
    });
});

processaCalendari();