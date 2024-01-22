const createPreview = file => {
  const wrap = document.createElement('div');
  wrap.classList.add('preview');

  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'Закрыть';
  closeBtn.classList.add('preview__btn');

  const wrapImg = new Image();
  wrapImg.classList.add('preview__img');
  wrapImg.src = URL.createObjectURL(file);

  wrap.append(closeBtn, wrapImg);

  return {
    wrap,
    btn: closeBtn,
  };
};

export default createPreview;
