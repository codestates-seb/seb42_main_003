import axios from 'axios';
const url = process.env.REACT_APP_API_URL;

export const getData = endpoint => {
  return axios
    .get(`${url}/${endpoint}`)
    .then(res => res.data)
    .catch(err => console.log(err));
};

export const getArea = () => {
  return axios.get(`http://localhost:3001/area`).then(res => res.data);
};

export const getTheme = () => {
  return axios
    .get('http://localhost:3001/themes')
    .then(res => res.data)
    .catch(err => console.log(err));
};

export const getCategory = () => {
  return axios
    .get('http://localhost:3001/category')
    .then(res => res.data)
    .catch(err => console.log(err));
};

export const getReview = () => {
  return axios
    .get('http://localhost:3001/review')
    .then(res => res.data)
    .catch(err => console.log(err));
};

export const getCommunity = () => {
  return axios
    .get('http://localhost:3001/community')
    .then(res => res.data)
    .catch(err => console.log(err));
};
