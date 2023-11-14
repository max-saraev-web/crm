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
      totalPrice.textContent = `
        $ ${calcTotal(data)}
      `;
    }
    if (target.matches('.table__btn_pic')) {
      const middleHeight = (screen.height / 2) - (600 / 2);
      const middleWidth = (screen.width / 2) - (800 / 2);

      const path = target.dataset.pic;
      const popup = open('about:blank', '', 'popup', 'width=800', 'height=600');
      const img = document.createElement('img');
      img.src = path;
      img.style.cssText = `
        display: block;
        width: 100%;
      `;
      popup.document.body.append(img);
      popup.moveTo(middleWidth, middleHeight);
    }
  });
};
