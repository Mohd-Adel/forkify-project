import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  renderPagination(pageNumber, pages) {
    this._clear();
    this._parentElement.insertAdjacentHTML(
      'afterbegin',
      this._conditionalMarkup(pageNumber, pages)
    );
  }

  _conditionalMarkup(pageNumber, pages) {
    this.pageNumber = pageNumber;
    this.pages = pages;

    if (this.pageNumber === 1 && this.pageNumber < this.pages) {
      return `<button data-goto="${
        this.pageNumber + 1
      }" class="btn--inline pagination__btn--next">
          <span>Page ${this.pageNumber + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>`;
    }

    if (this.pageNumber === this.pages) {
      return `<button data-goto="${
        this.pageNumber - 1
      }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${this.pageNumber - 1}</span>
        </button>`;
    }

    if (this.pageNumber !== 1 && this.pageNumber < this.pages) {
      return `<button data-goto="${
        this.pageNumber - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this.pageNumber - 1}</span>
      </button>
      <button data-goto="${
        this.pageNumber + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${this.pageNumber + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    }
  }
  addHandlerListener(handler) {
    this._parentElement.addEventListener('click', e => {
      e.preventDefault;
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      if (!goToPage) return;
      handler(goToPage);
    });
  }
}
export default new PaginationView();
