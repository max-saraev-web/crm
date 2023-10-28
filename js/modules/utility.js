export const getId = (min = 1, max = 9) => {
  const fullId = [];

  for (let i = 0; i < 14; i++) {
    if (i === 0) {
      fullId[i] = Math.round(Math.random() * (max - min) + min);
    } else fullId.push(Math.round(Math.random() * (max - min) + min));
  }
  return fullId.join('');
};

export const countRows = () => {
  [...document.querySelectorAll('.table__row')].forEach((elem, i) => {
    elem.querySelector('.table__counter').textContent = i + 1;
  });
};

export const calcTotal = (elems, output) => {
  const pureElems = elems.map(elem => elem.count * elem.price);
  const total = pureElems.reduce((acc, val) => acc + val, 0);

  output.textContent = `
    $ ${total}
  `;
};
