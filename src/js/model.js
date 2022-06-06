import { API_URL } from './config.js';
import { TIMEOUT_SEC } from './config.js';
import { getJSON } from './helpers.js';
export let state = {
  recipe: {},
  query: '',
  results: {},
  pages: 1,
  curPage: 1,
  bookmarks: [],
};
export const recipeLoader = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    let { recipe } = data.data;
    state.recipe = {
      title: recipe.title,
      publisher: recipe.publisher,
      cookingTime: recipe.cooking_time,
      id: recipe.id,
      imageURL: recipe.image_url,
      ingredients: recipe.ingredients,
      servings: recipe.servings,
      sourceURL: recipe.source_url,
    };

    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    throw err;
  }
};
export const searchLoader = async function (query) {
  try {
    state.query = query;
    const results = await getJSON(`${API_URL}?search=${query}`);
    state.results = results.data.recipes.map(
      rec =>
        (rec = {
          title: rec.title,
          publisher: rec.publisher,
          id: rec.id,
          imageURL: rec.image_url,
        })
    );

    state.pages = Math.ceil(state.results.length / 10);
    //3) restart pagination counter
    state.curPage = 1;
  } catch (err) {
    throw err;
  }
};
export const getSearchResultsPage = function (page = state.curPage) {
  const start = page * 10 - 10;
  const end = page * 10;
  return state.results.slice(start, end);
};

export const setServings = function (newServings) {
  state.recipe.ingredients.map(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

export const addBookmark = function (recipe) {
  //mark the bookmarked recipe
  recipe.bookmarked = true;

  //add bookmark
  state.bookmarks.push(recipe);
};

export const deleteBookmark = function (id) {
  //finding index
  const i = state.bookmarks.findIndex(bookmark => bookmark.id === id);

  state.bookmarks[i].bookmarked = false;
  state.recipe.bookmarked = false;

  //deleting bookmark
  state.bookmarks.splice(i, 1);
};
