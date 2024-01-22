import createRow from './createElems.js';
import createPreview from './createPreview.js';
import {calcTotal, toBase64} from './utility.js';

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

  form.addEventListener('submit', async ev => {
    const target = ev.target;
    ev.preventDefault();
    const formData = new FormData(target);

    const obj = Object.fromEntries(formData);
    obj.image = await toBase64(obj.image);
    obj.pic = obj.image.name;
    obj.id = +overlay.querySelector('.vendor-code__id').textContent;
    let ittr = 0;

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

  const fileBtn = form.querySelector('.modal__file');
  const fileLabel = form.querySelector('.modal__label_file');

  fileBtn.addEventListener('change', async ({target}) => {
    const warning = form.querySelector('.file-warning');
    if (warning) warning.textContent = '';

    if (target.files[0].size > 1048567) {
      fileLabel.insertAdjacentHTML('beforebegin', `
        <span class='file-warning'
        style="color: red; text-transform: uppercase; 
        text-align: center; font-weight: 700;">
          ИЗОБРАЖЕНИЕ НЕ ДОЛЖНО ПРЕВЫЩАТЬ РАЗМЕР 1 МБ
        </span>
      `);
    } else {
      const previewWindow = createPreview(target.files[0]);
      const {wrap, btn} = previewWindow;
      form.append(wrap);

      const result = await toBase64(target.files[0]);

      btn.addEventListener('click', () => {
        wrap.remove();
      });
    }
  });
};

export default modal;
