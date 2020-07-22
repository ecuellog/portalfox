import {
  SET_ARTICLES
} from '../actions/articles';

var defaultState = {
  articles: [],
}

const articles = (state = defaultState, action) => {
  switch (action.type) {
    case SET_ARTICLES:
      return {
        ...state,
        articles: action.articles
      };
    default:
      return state;
  }
}


export default articles;
