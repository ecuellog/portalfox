import ArticleService from "../../services/firebase/articles";
import * as _ from 'lodash';

export const SET_ARTICLES = 'SET_ARTICLES';
export const SET_ACTIVE_ARTICLE = 'SET_ACTIVE_ARTICLE';
export const SET_NEW_ARTICLE = 'SET_NEW_ARTICLE';
export const RESET_NEW_ARTICLE = 'RESET_NEW_ARTICLE';

// Basic
export function setArticles(articles) {
  return {
    type: SET_ARTICLES, 
    articles
  }
}

export function setActiveArticle(article) {
  return {
    type: SET_ACTIVE_ARTICLE,
    article
  }
}

export function setNewArticle(article) {
  return {
    type: SET_NEW_ARTICLE,
    article
  }
}

export function resetNewArticle() {
  return {
    type: RESET_NEW_ARTICLE
  }
}

// With middleware
export const fetchChannelArticles = (channelId) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    let orgId = _.get(getState().organizations, 'activeOrganization.id')
    ArticleService.listByChannel(orgId, channelId)
      .then((result) => {
        dispatch(setArticles(result.data.articles));
        resolve(result.message);
      })
      .catch((error) => {
        reject(error);
      });
  })
}

export const fetchAllArticles = () => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    let orgId = _.get(getState().organizations, 'activeOrganization.id')
    ArticleService.listByOrganization(orgId)
      .then((result) => {
        dispatch(setArticles(result.data.articles));
        resolve(result.message);
      })
      .catch((error) => {
        reject(error);
      });
  })
}

export const createArticle = (channelId, articleInfo) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    let orgId = _.get(getState().organizations, 'activeOrganization.id');
    ArticleService.create(orgId, channelId, {...articleInfo, creator: getState().auth.user.uid})
      .then((result) => {
        let newArticles = [...getState().articles.articles, result.data.article];
        dispatch(setArticles(newArticles));
        resolve(result.message);
      })
      .catch((error) => {
        reject(error);
      });
  })
}

export const fetchArticle = (channelId, articleId) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    let orgId = _.get(getState().organizations, 'activeOrganization.id');
    ArticleService.fetch(orgId, channelId, articleId)
      .then((result) => {
        dispatch(setActiveArticle(result.data.article));
        resolve(result.message);
      })
      .catch((error) => {
        reject(error);
      });
  })
}
