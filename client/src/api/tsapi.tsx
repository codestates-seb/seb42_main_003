import axios from 'axios';
import { loadAccessToken, loadRefreshToken } from '../utils/token';

const url = process.env.REACT_APP_API_URL;

//데이터를 받아올 때 사용하는 함수, params매개변수에 파라미터를 객체로 전달
export const getDataTs = async (endpoint: string, params: {} = {}) => {
  let headers={};
  //액세스 토큰이 있을 경우에만 같이 보냅니다.
  if(loadAccessToken()) {
    headers={Authorization:loadAccessToken()}
  }
  try {
    const res = await axios({
      method: 'get',
      url: `${url}/${endpoint}`,
      params,
      headers
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
  key: string,
  imageKey: string
) => {
  let formData = new FormData();
  formData.append(key, new Blob([JSON.stringify(data)],{ type: "application/json" }));
  let headers:any={
    Authorization: loadAccessToken(),
    Refresh: loadRefreshToken(),
    'Content-Type': 'multipart/form-data',
    [key]:'application/json',
  }
  if (image) {
    let imgType=image[0].type;
    formData.append(imageKey, image[0],imgType);
    headers={...headers, [imageKey]:image[0].type.split('/')[1]}
  }
  else {
    formData.append(imageKey,new Blob(undefined));
    headers={...headers, [imageKey]:null}
  }
  console.log(headers);
  try{
    const res = await axios({
      method,
      url: `${url}/${endpoint}`,
      data: formData,
      headers: headers
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const loginTs = async (data: {}, endpoint: string) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${url}/${endpoint}`,
      data: data,
      headers: {
        Authorization: loadAccessToken(),
        Refresh: loadRefreshToken(),
      },
    });
    sessionStorage.setItem('authorization', response.headers.authorization);
    localStorage.setItem('refresh', response.headers.refresh);
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const refreshTs = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: `${url}/members/token`,
      headers: {
        Refresh: loadRefreshToken(),
      },
    });
    sessionStorage.setItem('authorization', response.headers.authorization);
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const logoutTs = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: `${url}/members/logout`,
      headers: {
        Authorization: loadAccessToken(),
      },
    });
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  } finally {
    console.log('finally')
    sessionStorage.removeItem('authorization');
    localStorage.removeItem('refresh');
  }
};
