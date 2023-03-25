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