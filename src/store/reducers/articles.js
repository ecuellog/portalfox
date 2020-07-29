import {
  SET_ARTICLES,
  SET_ACTIVE_ARTICLE
} from '../actions/articles';

var defaultState = {
  articles: [],
  activeArticle: null
}

const articles = (state = defaultState, action) => {
  switch (action.type) {
    case SET_ARTICLES:
      return {
        ...state,
        articles: action.articles
      };
    case SET_ACTIVE_ARTICLE:
      return {
        ...state,
        activeArticle: action.article
      };
    default:
      return state;
  }
}


export default articles;
