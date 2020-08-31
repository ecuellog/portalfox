import {
  SET_ARTICLES,
  SET_ACTIVE_ARTICLE,
  SET_NEW_ARTICLE,
  RESET_NEW_ARTICLE
} from '../actions/articles';

var defaultNewArticle = {
  title: '',
  summary: '',
  content: '',
  mainImage: null,
  imageBinary: null
}

var defaultState = {
  articles: [],
  activeArticle: null,
  newArticle: defaultNewArticle
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
    case SET_NEW_ARTICLE:
      return {
        ...state,
        newArticle: action.article
      }
    case RESET_NEW_ARTICLE:
      return {
        ...state,
        newArticle: defaultNewArticle
      }
    default:
      return state;
  }
}


export default articles;
