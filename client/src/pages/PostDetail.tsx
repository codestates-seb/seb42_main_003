import { MobileHeader } from '../styles/mobileStyle';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { HiArrowSmLeft } from 'react-icons/hi';
import { GrFormView } from 'react-icons/gr';
import { FaThumbsUp } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs';
import PostModal from '../components/PostModal';

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
  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:3001/post/${postId}`,
    })
      .then((res) => setPostData(res.data))
      .catch((err) => console.log(err));
  }, []);
  //api로 대체해야 함

  return (
    <>
      <MobileHeader>
        <h1>커뮤니티</h1>
        <button>
          <HiArrowSmLeft />
        </button>
      </MobileHeader>
      {postData && (
        <PageMain bottom={'128px'}>
          <ViewContent post={postData.post} />
          <PageArticle>
            댓글 {postData.comment ? postData.comment.length : '0'}개
          </PageArticle>
          {postData.comment.map((comment: CommentType) => (
            <ViewComment comment={comment} />
          ))}
        </PageMain>
      )}
      <PostComment />
      <PostModal></PostModal>
    </>
  );
}

interface PostProps {
  post: {
    like: number;
    view: number;
    title: string;
    author: string;
    authorProfileImg: string;
    content: string;
    createdAt: string;
    isLike: boolean;
  };
}

function ViewContent({ post }: PostProps) {
  return (
    <PostArticle>
      <h2>{post.title}</h2>
      <div>
        <div>
          <img src={post.authorProfileImg} alt='profile-img'></img>
          <div className='member-info-upper'>
            <span className='member-info-nickname'>{post.author}</span>
            <span className='member-created-at'>{post.createdAt}</span>
          </div>
        </div>
        <div className='post-info'>
          <span>
            <GrFormView />
            <span>{post.view}</span>
          </span>
          <span>
            <button>
              <FaThumbsUp />
            </button>
            <span>{post.like}</span>
          </span>
        </div>
      </div>
      <p>{post.content}</p>
      
    </PostArticle>
  );
}

interface CommentType {
  author: string;
  createdAt: string;
  authorProfileImg: string;
  text: string;
}

interface CommentProps {
  comment: CommentType;
}

function ViewComment({ comment }: CommentProps) {
  return (
    <CommentArticle>
      <div>
        <div>
          <img src={comment.authorProfileImg} alt='profile-img'></img>
          <div className='member-info-upper'>
            <span className='member-info-nickname'>{comment.author}</span>
            <span className='member-created-at'>{comment.createdAt}</span>
          </div>
        </div>
      </div>
      <p>{comment.text}</p>
    </CommentArticle>
  );
}

function PostComment() {
  const postCommentHandler = (e:any) => {
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
