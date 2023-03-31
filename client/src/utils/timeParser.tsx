export const timeParser = (date:string) => {
  if (!date) return "";
  let result = "";
  const dateObj = new Date(date);
  dateObj.setHours(dateObj.getHours() + 9);
  const today = new Date();
  let hours:number|string=dateObj.getHours();
  if(hours<10) hours='0'+hours;
  let minutes:number|string=dateObj.getMinutes();
  if(minutes<10) minutes='0'+minutes;
  if (today.getFullYear() === dateObj.getFullYear() && today.getMonth() === dateObj.getMonth() && today.getDate() === dateObj.getDate()) {
    result = `${hours}:${minutes}`;
}
  else if (today.getFullYear() === dateObj.getFullYear()) result = `${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일 ${hours}:${minutes}`
  else result = `${dateObj.getFullYear()}년 ${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일 ${hours}:${minutes}`;
  return result;
}

export const dateStrictParser = (date:string) => {
  if (!date) return "";
  let result = "";
  const dateObj = new Date(date);
  result = `${dateObj.getFullYear()}년 ${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`;
  return result;
}

export const dateToString = (dateObj:Date) => {
  let month = String(dateObj.getMonth() + 1);
  if (Number(month) < 10) month = `0` + month;
  let date = String(dateObj.getDate());
  if (Number(date) < 10) date = `0` + date;
  return `${dateObj.getFullYear()}-${month}-${date}`;
}