import Choices from 'choices.js';

export function selectChoiceInit() {
  const selectList = document.querySelectorAll('.js-choice');
  selectList.forEach((selectItem) => {
    // eslint-disable-next-line
    const select = new Choices(selectItem, {
      allowHTML: true,
      placeholderValue: '',
      searchEnabled: false,
      itemSelectText: '',
    });
  });
}
