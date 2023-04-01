interface ArticleType {
  id:number;
  memberId:number;
  title:string;
  content:string;
  nickname:string;
  articleImg:string;
  profileImg:string;
  carName:string;
  isLiked:boolean;
  viewCnt:number;
  commentCnt:number;
  likeCnt:number;
  createdAt:string;
  updatedAt:string;
  isLiked:boolean;
}

interface MemberInfo {
  id:number,
  email:string,
  nickname:string,
  profileImg:string,
  about:string,
  carName:string,
  oilInfo:string
}


interface MyPlaceInfo {
  id: number;
  address: string;
  memo: string;
  keyword: [];
  placeImg: string;
  shared: true;
  mapX: string;
  mapY: string;
  createdAt: string;
  updatedAt: string;
  address: string;
  memberId: number;
};