function setSum() {
    let allSumma = 0;
    allSumma = parseInt((a1 + a2 + a3) * discount);
    allPrise.innerHTML = 'всего ' + allSumma + ' \&#8372';
    year.innerHTML = parseInt(allSumma / 12) + ' \&#8372';
}

function getTypePrice() {
    a1 = 0;
    for (let i = 0; i < type.length; i++) {
        let prisSteklo = parseInt(type[i].getAttribute('data-steklo-prise'));

        if (parseInt(type[i].value) < 0) type[i].value = 0;
        a1 += parseInt(type[i].value) * prisSteklo;
        numberClass[i].innerHTML = parseInt(type[i].value) * prisSteklo;
    }
    setSum();
}

function typeHouse(e) {
    target = e.target;
    let x = target.getAttribute('data-name');
    a3 = parseInt(x);
    setSum();
}


let type = document.querySelectorAll(".type");
let numberClass = document.querySelectorAll(".number");
let allPrise = document.getElementById('totalSum');
let year = document.getElementById('year');

let product = document.getElementById('product');
product.addEventListener('click', typeHouse);

let services = document.querySelectorAll(".services");
let a1 = a2 = a3 = 0;
let discount = 1;


document.getElementById('standart').addEventListener('click', function() {
    discount = 1.1;
    setSum();
})
document.getElementById('econom').addEventListener('click', function() {
    discount = 1;
    setSum();
})
document.getElementById('premium').addEventListener('click', function() {
    discount = 1.2;
    setSum();
})


for (let i = 0; i < type.length; i++) {
    type[i].addEventListener('input', function() {
        getTypePrice();
    })
}

for (let i = 0; i < services.length; i++) {
    services[i].addEventListener('click', function() {
        if (services[i].checked) a2 += parseInt(services[i].value);

        if (!services[i].checked) a2 -= parseInt(services[i].value);
        setSum();
    })
}
let popup = document.getElementById('Popup');

document.getElementById('result').addEventListener('click', function() {
    popup.style.display = 'block';

    let td = document.getElementsByTagName('td');
    let q = 4;
    for (let i = 0; i < type.length; i++) {
        td[q].innerHTML = type[i].value;
        td[q + 1].innerHTML = (type[i].value * parseInt(type[i].getAttribute('data-steklo-prise'))) + ' \&#8372';
        q += 3;
    }


    let w = 16;
    for (let i = 0; i < services.length; i++) {
        if (services[i].checked) {
            td[w].innerHTML = '&#10004;';
            td[w].setAttribute('class', 'act');
            td[w + 1].innerHTML = services[i].value + ' \&#8372';

        } else {
            td[w].innerHTML = '&#10006;';
            td[w].setAttribute('class', 'noAct');
            td[w + 1].innerHTML = 0 + ' \&#8372';
        }
        w += 3;
    }

    td[td.length - 1].innerHTML = '<p style="margin: 0;display: inline-block;font-size: 1.4em;">ИТОГО: </p>' + '<b style="font-size:1.5em;">' + year.innerHTML + '</b>' + '* в месяц ' + '<br>' + allPrise.innerHTML + '**';

    let mail = document.getElementById('mail');
    mail.addEventListener('change', function() {

        let regExp = /[a-zA-Zа-яА-Я0-9]+@+[a-z]+\.+[a-z]/g;

        if (!mail.value.match(regExp)) { mail.style.boxShadow = 'inset 2px 3px 8px 1px red' } else { mail.style.boxShadow = 'inset 2px 3px 8px 1px gray' }
    })

    let area = document.getElementById('message');
    area.addEventListener('input', function() {
        let temp = area.value.length;
        let l = parseInt(area.getAttribute('maxlength')) - parseInt(temp);
        document.getElementById('areaSymvols').innerHTML = 'Осталось ' + l + ' символ(-а;-ов)';
    })
})



document.getElementById('closePopup').addEventListener('click', function() {
    popup.style.display = 'none';
})