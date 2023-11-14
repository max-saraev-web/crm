import createRow from './createElems.js';
import {calcTotal} from './utility.js';

export const openModal = overlay => overlay.classList.add('active');
export const closeModal = overlay => overlay.classList.remove('active');
const calcTotalForm = form => {
  const {count, price, total} = form;
  total.textContent = `
    $ ${count.value * price.value}
  `;
};

const modal = (overlay, form, discountTrigger, data, tableBody, totalPrice) => {
  closeModal(overlay);
  overlay.addEventListener('click', ev => {
    const target = ev.target;

    if (target.closest('.modal__close') || target === overlay) {
      closeModal(overlay);
    }

    if (form.discount.checked) {
      discountTrigger.disabled = false;
    } else if (form.discount.checked === false) {
      discountTrigger.disabled = true;
      discountTrigger.value = '';
    }
  });
  window.addEventListener('keydown', ev => {
    if (ev.code === 'Escape') {
      closeModal(overlay);
    }
  });
  form.addEventListener('change', () => calcTotalForm(form));

  form.addEventListener('submit', ev => {
    const target = ev.target;
    const formData = new FormData(target);

    const obj = Object.fromEntries(formData);
    obj.pic = obj.image.name;
    obj.id = +overlay.querySelector('.vendor-code__id').textContent;
    let ittr = 0;
    ev.preventDefault();

    for (let i = 1;
      i < document.querySelectorAll('.table__row').length + 1;
      i++) {
      ittr = i;
    }

    data.push(obj);
    tableBody.append(createRow(obj, ittr));
    totalPrice.textContent = `
      $ ${calcTotal(data)}
    `;
    target.total.textContent = `$ 0`;
    target.reset();
    overlay.classList.remove('active');
  });
};

export default modal;
