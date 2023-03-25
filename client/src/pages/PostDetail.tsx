import { MobileHeader } from '../styles/mobileStyle';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { HiArrowSmLeft } from 'react-icons/hi';
import { GrFormView } from 'react-icons/gr';
import { FaThumbsUp } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs';
import PostModal from '../components/PostModal';
import { getData } from '../api/api';
import Header from '../components/destop/Header';
import Footer from '../components/destop/Footer';
import { timeParser } from '../utils/timeParser';

import {
  PageMain,
  PageArticle,
  PostArticle,
  CommentArticle,
  PostCommentStyle,
} from '../styles/pageStyle';
import axios from 'axios';
import { Input } from '../styles/Input';

function PostDetail() {
  const { postId } = useParams();
  const [postData, setPostData] = useState<any>(null);

  //api화 필요한 코드---------------------------
  // useEffect(() => {
  //   axios({
  //     method: 'get',
  //     url: `http://localhost:3001/post/${postId}`,
  //   })
  //     .then((res) => setPostData(res.data))
  //     .catch((err) => console.log(err));
  // }, []);
  //api로 대체해야 함
  useEffect(()=>{
    getData(`articles/${postId}`).then(res=>setPostData(res))
  },[])

  useEffect(()=>{
    if(postData) console.log(postData.comments)
  },[postData])

  return (
    <>
    <Header></Header>
      <MobileHeader>
        <h1>커뮤니티</h1>
        <button>
          <HiArrowSmLeft />
        </button>
        <button>삭제</button>
      </MobileHeader>
      {postData && (
        <PageMain bottom={'128px'}>
          <ViewContent post={postData} />
          <PageArticle>
            댓글 {postData.comments ? postData.comments.length : '0'}개
          </PageArticle>
          {postData.comments.map((comment: CommentType) => (
            <ViewComment comment={comment} />
          ))}
        </PageMain>
      )}
      <PostCommentMobile />
      {/* <PostModal></PostModal> */}
      <Footer></Footer>
    </>
  );
}

interface PostProps {
  post:ArticleType;
}

function ViewContent({ post }: PostProps) {
  return (
    <PostArticle>
      <h2>{post.title}</h2>
      <div>
        <div>
          <img src={post.profileImg} alt='profile-img'></img>
          <div className='member-info-upper'>
            <span className='member-info-nickname'>{post.nickname}</span>
            <span className='member-created-at'>{timeParser(post.createdAt)}</span>
          </div>
        </div>
        <div className='post-info'>
          <span>
            <GrFormView />
            <span>{post.memberId}</span>
          </span>
          <span>
            <button>
              <FaThumbsUp />
            </button>
            <span>{post.likeCnt}</span>
          </span>
        </div>
      </div>
      <p>{post.content}</p>
    </PostArticle>
  );
}

interface CommentType {
  author: string;
  created_at: string;
  img: string;
  content: string;
}

interface CommentProps {
  comment: CommentType;
}

function ViewComment({ comment }: CommentProps) {
  return (
    <CommentArticle>
      <div>
        <div>
          <img src={comment.img} alt='profile-img'></img>
          <div className='member-info-upper'>
            <span className='member-info-nickname'>{comment.author}</span>
            <span className='member-created-at'>{timeParser(comment.created_at)}</span>
          </div>
        </div>
      </div>
      <p>{comment.content}</p>
    </CommentArticle>
  );
}

function PostCommentMobile() {
  const postCommentHandler = (e: any) => {
    e.preventDefault();
  };

  return (
    <PostCommentStyle>
      <div className='post-comment-input'>
        <Input placeholder='댓글을 남겨주세요!'></Input>
        <button onClick={postCommentHandler}>
          <BsPencilSquare />
        </button>
      </div>
    </PostCommentStyle>
  );
}

export default PostDetail;
