if (module.hot) {
  module.hot.accept();
}
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import RecipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';
import ResultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import BookmarksView from './views/bookmarksView.js';
import bookmarksView from './views/bookmarksView.js';

const recipeContainer = document.querySelector('.recipe');
const recipeIngredientsList = document.querySelector(
  '.recipe__ingredient-list'
);

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controllRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    RecipeView.showSpinner();

    //0)update header
    ResultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    //1)Loading Recipe
    await model.recipeLoader(id);

    //2)render recipe
    RecipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};
const controllSearch = async function () {
  // 1) Get Search Query
  const query = SearchView.getQuery();
  if (!query) return;

  //render Spinner
  ResultsView.showSpinner();

  // 2)load search
  await model.searchLoader(query);

  // 3) render search
  ResultsView.render(model.getSearchResultsPage(model.state.curPage));

  //4)render pagination
  paginationView.renderPagination(model.state.curPage, model.state.pages);
};
const controllPagination = function (page) {
  if (model.state.results.length <= 10) {
    return;
  }

  // 1) render search
  ResultsView.render(model.getSearchResultsPage(page));

  //2) render pagination
  paginationView.renderPagination(page, model.state.pages);
};
const controllServings = function (servings) {
  //1)UpdateServings
  model.setServings(servings);
  //2)render recipe
  RecipeView.update(model.state.recipe);
};

const controllBookmarks = function () {
  if (
    model.state.bookmarks.some(
      bookmark => bookmark.id === model.state.recipe.id
    )
  ) {
    //add bookmark
    model.deleteBookmark(model.state.recipe.id);
  } else {
    model.addBookmark(model.state.recipe);
  }

  bookmarksView.render(model.state.bookmarks);
  //update the view
  recipeView.update(model.state.recipe);

  console.log(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controllRecipe);
  SearchView.addHandlerSearch(controllSearch);
  paginationView.addHandlerListener(controllPagination);
  recipeView.addServingsHandler(controllServings);
  recipeView.addHandlerBookmark(controllBookmarks);
};
init();
