import type { NewsItemType } from "../components/news";

const BASE_URL = "http://localhost:8080/v1";

export const API = {
  GET_BOARDS: `${BASE_URL}/board`,
  GET_NEWS_BY_BOARD_ID: (id: string) => `${BASE_URL}/board/${id}/news`,
  GET_NEWS_BY_ID: (id: string) => `${BASE_URL}/news/${id}`,
  POST_NEWS: `${BASE_URL}/news`,
  DELETE_NEWS_BY_ID: (id: string) => `${BASE_URL}/news/${id}`,
  UPDATE_NEWS_BY_ID: `${BASE_URL}/news`,
  UPDATE_NEWS_STATUS_BY_ID: (id: string, status: NEWS_STATUS) => `${BASE_URL}/news/${id}/${status}`

};

const headers = {
  'Content-Type': 'application/json'
}

export const postNews = async (payload: NewsItemType): Promise<{ name: string; id: string }[]> => {
  return await (
    await fetch(API.POST_NEWS, {
      headers,
      method: "POST",
      body: JSON.stringify(payload),
    })
  ).json();
};

export const deleteNewsById = async (id: string) => {
  return await (
    await fetch(API.DELETE_NEWS_BY_ID(id), {
      headers,
      method: "DELETE",
    })
  ).json();
};

export const updateNewsById = async (payload: NewsItemType) => {
  return (
    await fetch(API.UPDATE_NEWS_BY_ID, {
      headers,
      method: "PUT",
      body: JSON.stringify(payload),
    })
  ).json();
};

export enum NEWS_STATUS {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVE = "archive",
}

export const updateNewsStatusById = async (id: string, status: NEWS_STATUS) => {
  return (
    await fetch(API.UPDATE_NEWS_STATUS_BY_ID(id, status), {
      headers,
      method: "POST",
    })
  ).json();
};
