import {openModal} from './modal.js';
import {calcTotal, countRows, getId} from './utility.js';

export const rowControl = (data, selector, overlay, add, totalPrice) => {
  selector.addEventListener('click', ev => {
    const target = ev.target;

    if (target === add) {
      overlay.querySelector('.vendor-code__id').textContent = getId();
      openModal(overlay);
    }
    if (target.matches('.table__btn_del')) {
      data.splice([...document.querySelectorAll('.table__row')]
        .indexOf(target.closest('.table__row')), 1);

      target.closest('.table__row').remove();

      countRows();
      calcTotal(data, totalPrice);
    }
  });
};
