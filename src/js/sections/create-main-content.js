import { el, setChildren } from 'redom';
import { createTitleBlock } from './create-main-top-elements.js';
export {
  createTitleBlock,
  createAccountInfo,
} from './create-main-top-elements.js';

export function createMainContent(title) {
  const mainTop = el('div.main__top');
  const { titleBlock } = createTitleBlock('Tect');
  mainTop.append(titleBlock);
  return mainTop;
}
