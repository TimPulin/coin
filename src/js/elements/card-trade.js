import { el } from 'redom';
import { createSelect } from '../elements/buttons.js';
import { createCardTemplate } from '../elements/card-template.js';

export function createCardCurrenciesTrade(dataAllCurrencies) {
  const selectFrom = createSelect(dataAllCurrencies, 'from');
  const selectTo = createSelect(dataAllCurrencies, 'to');
  const inputAmount = el('input.form-control.', { name: 'amount' });
  const form = el(
    'form.form.form--currencies-buy',
    el(
      '.form__wrap',
      el(
        '.form__side',
        el(
          'label.form-label.form__label',
          el('span.form__label-text', 'Из'),
          selectFrom
        ),
        el(
          'label.form-label.form__label',
          el('span.form__label-text', 'в'),
          selectTo
        ),
        el(
          'label.form-label.form__label',
          el('span.form__label-text', 'Сумма'),
          inputAmount
        )
      ),
      el(
        '.form__side.form__side--left',
        el('button.btn.btn-primary.button', 'Обменять')
      )
    )
  );
  const card = createCardTemplate('card--currencies-buy', 'Обмен валюты', form);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    handleSubmit(event);
  });

  return card;
}

function handleSubmit(event) {
  const formData = new FormData(event.target);
  const formObj = Object.fromEntries(formData);
  event.target.dispatchEvent(
    new CustomEvent('submit-currencies-buy', {
      bubbles: true,
      detail: { data: formObj },
    })
  );
}
