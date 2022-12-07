const BASE_URL = "http://localhost:8080/v1";

export const API = {
  GET_BOARDS: `${BASE_URL}/board`,
  GET_NEWS_BY_BOARD_ID: (id: string) => `${BASE_URL}/board/${id}/news`,
  GET_NEWS_BY_ID: (id: string) => `${BASE_URL}/news/${id}`,
};

const headers = {
  'Content-Type': 'application/json'
}

export const postNews = async (payload: any): Promise<{ name: string; id: string }[]> => {
  return await (
    await fetch(`${BASE_URL}/news`, {
      headers,
      method: "POST",
      body: JSON.stringify(payload),
    })
  ).json();
};

export const deleteNewsById = async (id: string) => {
  return await (
    await fetch(`${BASE_URL}/news/${id}`, {
      headers,
      method: "DELETE",
    })
  ).json();
};

export const updateNewsById = async (payload: any) => {
  return (
    await fetch(`${BASE_URL}/news`, {
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
    await fetch(`${BASE_URL}/news/${id}/${status}`, {
      headers,
      method: "POST",
    })
  ).json();
};
