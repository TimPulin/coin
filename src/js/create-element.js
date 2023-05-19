export function createEl(el, elClasses = [], text) {
  const element = document.createElement(el);

  elClasses.forEach(elClass => {
    element.classList.add(elClass)
  })

  if (text) element.textContent = text;

  return element;
}
