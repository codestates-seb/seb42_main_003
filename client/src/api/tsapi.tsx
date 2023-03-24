import axios from "axios";
const url = process.env.REACT_APP_API_URL;

//데이터를 받아올 때 사용하는 함수, params매개변수에 파라미터를 객체로 전달
export const getDataTs=(endpoint:string,params:{}={})=>{
  return axios({
    method:'get',
    url:`${url}/${endpoint}`,
    params:params
  }).then(res => res.data).catch(err=>console.log(err));
}

//이미지가 없는 데이터를 보낼 때 사용하는 함수
export const postDataTs=(endpoint:string,data:object)=>{
  return axios({
    method:'post',
    url:`${url}/${endpoint}`,
    data:data,
    headers:{
      Authorization:'여기에 리덕스에서 받은 액세스 토큰을 넣어주세요.'
    }
  }).then(res => res.data).catch(err=>console.log(err));
}

//이미지가 있는 데이터를 보낼 때 사용하는 함수
export const postFormDataTs=(endpoint:string,data:object,image:FileList)=>{
  let formData=new FormData();
  formData.append('data',JSON.stringify(data));
  formData.append('image',image[0]);
  return axios({
    method:'post',
    url:`${url}/${endpoint}`,
    data:formData,
    headers:{
      Authorization:'여기에 리덕스에서 받은 액세스 토큰을 넣어주세요.',
     'Content-Type': 'multipart/form-data',
    }
  }).then(res => res.data).catch(err=>console.log(err));
}