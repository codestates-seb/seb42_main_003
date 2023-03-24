export const loadAccessToken=()=>{
  return sessionStorage.getItem("authorization");
}

export const loadRefreshToken=()=>{
  return localStorage.getItem("refresh");
}