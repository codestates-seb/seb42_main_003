import axios from 'axios';
import { loadAccessToken, loadRefreshToken } from '../utils/token';

const url = process.env.REACT_APP_API_URL;

//데이터를 받아올 때 사용하는 함수, params매개변수에 파라미터를 객체로 전달
export const getDataTs = (endpoint: string, params: {} = {}) => {
  return axios({
    method: 'get',
    url: `${url}/${endpoint}`,
    params: params,
  })
    .then(res => res.data)
    .catch(err => err);
};

//이미지가 없는 데이터를 보낼 때 사용하는 함수
export const sendDataTs = (endpoint: string, method: string, data: object) => {
  return axios({
    method: method,
    url: `${url}/${endpoint}`,
    data: data,
    headers: {
      Authorization: loadAccessToken(),
      Refresh: loadRefreshToken(),
    },
  })
    .then(res => res.data)
    .catch(err => err);
};

//이미지가 있는 데이터를 보낼 때 사용하는 함수
export const sendFormDataTs = (
  endpoint: string,
  method: string,
  data: object,
  image: FileList | undefined
) => {
  let formData = new FormData();
  formData.append('data', JSON.stringify(data));
  if (image) formData.append('image', image[0]);
  return axios({
    method,
    url: `${url}/${endpoint}`,
    data: formData,
    headers: {
      Authorization: loadAccessToken(),
      Refresh: loadRefreshToken(),
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(res => res.data)
    .catch(err => err);
};

export const loginTs = (data: {}) => {
  return axios({
    method: 'post',
    url: `${url}/members/login`,
    data: data,
    headers: {
      Authorization: loadAccessToken(),
      Refresh: loadRefreshToken(),
    },
  })
    .then(res => {
      sessionStorage.setItem('authorization', res.headers.authorization);
      localStorage.setItem('refresh', res.headers.refresh);
      return res.data;
    })
    .catch(err => err);
};
