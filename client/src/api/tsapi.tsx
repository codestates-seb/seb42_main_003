import axios from 'axios';
import { loadAccessToken, loadRefreshToken } from '../utils/token';

const url = process.env.REACT_APP_API_URL;

//데이터를 받아올 때 사용하는 함수, params매개변수에 파라미터를 객체로 전달
export const getDataTs = async (endpoint: string, params: {} = {}) => {
  try {
    const res = await axios({
      method: 'get',
      url: `${url}/${endpoint}`,
      params: params,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

//이미지가 없는 데이터를 보낼 때 사용하는 함수
export const sendDataTs = async (
  endpoint: string,
  method: string,
  data: object
) => {
  try {
    const res = await axios({
      method: method,
      url: `${url}/${endpoint}`,
      data: data,
      headers: {
        Authorization: loadAccessToken(),
        Refresh: loadRefreshToken(),
      },
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

//이미지가 있는 데이터를 보낼 때 사용하는 함수
export const sendFormDataTs = async (
  endpoint: string,
  method: string,
  data: object,
  image: FileList | undefined,
  key:string
) => {
  let formData = new FormData();
  formData.append(key, JSON.stringify(data));
  if (image) formData.append('image', image[0]);
  try {
    const res = await axios({
      method,
      url: `${url}/${endpoint}`,
      data: formData,
      headers: {
        Authorization: loadAccessToken(),
        Refresh: loadRefreshToken(),
        'Content-Type': 'multipart/form-data',
      },
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const loginTs = async (data: {}) => {
  try {
    const res = await axios({
      method: 'post',
      url: `${url}/members/login`,
      data: data,
      headers: {
        Authorization: loadAccessToken(),
        Refresh: loadRefreshToken(),
      },
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};