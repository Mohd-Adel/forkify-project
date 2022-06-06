import icons from 'url:../../img/icons.svg';
import View from './view';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks');
  _generateMarkup(data) {
    return this._data.map(e => this.generatePreviewMarkup(e)).join('');
  }
  generatePreviewMarkup(bookmark) {
    return `<li class="preview">
    <a class="preview__link" href="#${bookmark.id}">
      <figure class="preview__fig">
        <img src="${bookmark.imageURL}" alt="${bookmark.title}" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__name">
          ${bookmark.title}
        </h4>
        <p class="preview__publisher">${bookmark.publisher}</p>
      </div>
    </a>
  </li>`;
  }
}

export default new BookmarksView();
