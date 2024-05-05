import View from "./View.js";
import icons from "url:../icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--inline");

      if (!btn) return;

      const goToPage = +btn.getAttribute("data-go-to");
      window.scrollTo({ top: 0, behavior: "smooth" });

      handler(goToPage);
    });
  }

  generateMarkup() {
    //numPage obtains the number of pages that that genre or search query has, and it is vital to present the buttons for switching the page that are needed at the time.
    const numPage = Math.ceil(
      (this._data.total_pages * 20) / this._data.resultsPerPage
    );
    const currPage = this._data.page;
    const buttons = this._generateMarkupButtons(currPage);

    if (currPage === 1 && numPage > 1) {
      return buttons.nextBtn;
    }

    if (currPage === numPage && numPage > 1) {
      return buttons.prevBtn;
    }

    if (currPage < numPage) {
      return `${buttons.prevBtn}${buttons.nextBtn}`;
    }
    return "";
  }

  _generateMarkupButtons(currPage) {
    const prevBtn = `
    <button data-go-to = "${
      currPage - 1
    }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currPage - 1}</span>
    </button>
    `;

    const nextBtn = `
    <button data-go-to = "${
      currPage + 1
    }" class="btn--inline pagination__btn--next">
        <span>Page ${currPage + 1}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>
    `;

    return { prevBtn: prevBtn, nextBtn: nextBtn };
  }
}

export default new PaginationView();
