import icons from 'url:../../img/icons.svg';
import View from './view';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');

  _generateMarkup(data) {
    return this._data.map(e => this.generatePreviewMarkup(e)).join('');
  }
  generatePreviewMarkup = e => {
    const id = window.location.hash.slice(1);

    return ` <li class="preview">
          <a
              class="preview__link ${
                e.id === id ? 'preview__link--active' : ''
              }"
              href="#${e.id}"
          >
          <figure class="preview__fig">
          <img src="${e.imageURL}" alt="Test" />
          </figure>
          <div class="preview__data">
          <h4 class="preview__title">${e.title}</h4>
          <p class="preview__publisher">${e.publisher}</p>
          <div class="preview__user-generated">
              <svg>
              <use href="${icons}#icon-user"></use>
              </svg>
          </div>
          </div>
          </a>
      </li>
        `;
  };
}
export default new ResultsView();
