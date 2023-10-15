'use strict';
const GOODS_DB = [
    {
    'id': 48736521485963,
    'title': 'Смартфон Xiaomi 11T 8/128GB',
    'price': 27000,
    'description': 'Смартфон Xiaomi 11T – это представитель флагманской линейки, выпущенной во второй половине 2021 года. И он полностью соответствует такому позиционированию, предоставляя своим обладателям возможность пользоваться отличными камерами, ни в чем себя не ограничивать при запуске игр и других требовательных приложений.',
    'category': 'mobile-phone',
    'discont': false,
    'count': 3,
    'units': 'шт',
    'images': {
        'small': 'img/smrtxiaomi11t-m.jpg',
        'big': 'img/smrtxiaomi11t-b.jpg',
    },
  },
  {
    'id': 92173468054231,
    'title': 'Радиоуправляемый автомобиль Cheetan',
    'price': 4000,
    'description': 'Внедорожник на дистанционном управлении. Скорость 25км/ч. Возраст 7 - 14 лет',
    'category': 'toys',
    'discont': 5,
    'count': 1,
    'units': 'шт',
    'images': {
      'small': 'img/cheetancar-m.jpg',
      'big': 'img/cheetancar-b.jpg',
    },
  },
  {
    'id': 56329781402648,
    'title': 'ТВ приставка MECOOL KI',
    'price': 12400,
    'description': 'Всего лишь один шаг сделает ваш телевизор умным, Быстрый и умный MECOOL KI PRO, прекрасно спроектированный, сочетает в себе прочный процессор Cortex-A53 с чипом Amlogic S905D',
    'category': 'tv-box',
    'discont': 15,
    'count': 4,
    'units': 'шт',
    'images': {
      'small': 'img/tvboxmecool-m.jpg',
      'big': 'img/tvboxmecool-b.jpg',
    },
  },
  {
    'id': 14386920573126,
    'title': 'Витая пара PROConnect 01-0043-3-25',
    'price': 22,
    'description': 'Витая пара Proconnect 01-0043-3-25 является сетевым кабелем с 4 парами проводов типа UTP, в качестве проводника в которых используется алюминий, плакированный медью CCA. Такая неэкранированная витая пара с одножильными проводами диаметром 0.50 мм широко применяется в процессе сетевых монтажных работ. С ее помощью вы сможете обеспечить развертывание локальной сети в домашних условиях или на предприятии, объединить все необходимое вам оборудование в единую сеть.',
    'category': 'cables',
    'discont': false,
    'count': 420,
    'units': 'v',
    'images': {
      'small': 'img/lan_proconnect43-3-25.jpg',
      'big': 'img/lan_proconnect43-3-25-b.jpg',
    },
  },
];


const overlay = document.querySelector('.overlay');

const modalTitle = overlay.querySelector('.modal__title');

const modalForm = overlay.querySelector('.modal__form');

const modalCheckBox = overlay.querySelector('.modal__checkbox');

const modalInputDiscount = overlay.querySelector('.modal__input_discount');

const tableBody = document.querySelector('.table__body');

const controls = document.querySelector('.panel');

const addBtn = document.querySelector('.panel__add-goods');

const cms = document.querySelector('.cms');

// ? - Создание элемента
const createElement = (tag, attr, {append, appends, parent, cb} = {}) => {
  const element = document.createElement(tag);

  if (attr) {
    Object.assign(element, attr);
  }

  if (append && append instanceof HTMLElement) {
    element.append(append);
  }

  if (appends && appends.every(elem => elem instanceof HTMLElement)) {
    element.append(...appends);
  }

  if (parent && parent instanceof HTMLElement) {
    parent.append(element);
  }

  if (cb && typeof cb === 'function') {
    cb(element);
  }

  return element;
};

// ? - Создание строки
const createRow = (obj, i) => {
  const elem = createElement('tr');
  elem.classList.add('table__row');

  if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
    const {id, title, category, count, price, units} = obj;
    elem.innerHTML = `
      <td class="table__cell table__counter">${i + 1}</td>
      <td class="table__cell table__cell_left table__cell_name" 
        data-id="${id}">
      <span class="table__cell-id">
        id: ${id}</span>${title}</td>
      <td class="table__cell table__cell_left">${category}</td>
      <td class="table__cell">${units}</td>
      <td class="table__cell">${count}</td>
      <td class="table__cell">$${price}</td>
      <td class="table__cell">$${price * count}</td>
      <td class="table__cell table__cell_btn-wrapper">
        <button class="table__btn table__btn_pic"></button>
        <button class="table__btn table__btn_edit"></button>
        <button class="table__btn table__btn_del"></button>
      </td>
    `;
  } else {
    console.log('Это не объект!');
  }
  return elem;
};

// ? - Перебор массива
const renderGoods = arr => {
  if (Array.isArray(arr)) {
    tableBody.innerHTML = '';
    arr.forEach((elem, i) => {
      tableBody.append(createRow(elem, i));
    });
  } else {
    return 'Это не массив!';
  }
};

// ! - Задание 1 - готово!
overlay.classList.remove('active');

// ! - Задание 2 + 3 - готово!
renderGoods(GOODS_DB);

// ! - Задание 1 - урок 5
overlay.addEventListener('click', ev => {
  const target = ev.target;

  if (target.closest('.modal__close') || target === overlay) {
    overlay.classList.remove('active');
  }
});

cms.addEventListener('click', ev => {
  const target = ev.target;

  if (target === addBtn) {
    overlay.classList.add('active');
  }
  if (target.matches('.table__btn_del')) {
    GOODS_DB.splice([...document.querySelectorAll('.table__row')]
      .indexOf(target.closest('.table__row')), 1);

    target.closest('.table__row').remove();

    [...document.querySelectorAll('.table__row')].forEach((elem, i) => {
      elem.querySelector('.table__counter').textContent = i + 1;
    });

    console.log(GOODS_DB);
  }
});
