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

//* id -> contentId로 수정함
interface MyPlaceInfo {
  contentId: number;
  memo: string;
  keyword: string[];
  placeImg: string;
  shared: true;
  mapX: string;
  mapY: string;
  createdAt: string;
  updatedAt: string;
  address: string;
  memberId: number;
};