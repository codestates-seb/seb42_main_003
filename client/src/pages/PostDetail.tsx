import { MobileHeader } from '../styles/mobileStyle';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HiArrowSmLeft } from 'react-icons/hi';
import { GrFormView } from 'react-icons/gr';
import { FaThumbsUp } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs';
import Header from '../components/destop/Header';
import Footer from '../components/destop/Footer';
import { timeParser } from '../utils/timeParser';
import {
  PageMain,
  PostArticle,
  CommentArticle,
  PostCommentStyle,
  CommentCounter,
} from '../styles/pageStyle';
import { Input, TextArea, ImageInput } from '../styles/Input';
import { getDataTs, sendDataTs, sendFormDataTs } from '../api/tsapi';
import { Button } from '../styles/Button';
import { useAppSelector } from '../hooks/reduxTK';
import { Modal } from '../styles/Modal';
import { HiOutlineX } from 'react-icons/hi';
import useUploadImage from '../hooks/useUploadImage';

function PostDetail() {
  const isLogin = useAppSelector((state) => state.isLogin);
  const { postId } = useParams();
  const [postData, setPostData] = useState<ArticleType | null>(null);
  const [commentData, setCommentData] = useState<any>(null);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    getDataTs(`articles/${postId}`).then((data) =>{
      setPostData(data);
      setCommentData(data.comments);
    });
  }, []);

  useEffect(() => {
    if (postData) console.log(postData);
  }, [postData]);

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
          <ViewContent post={postData} setIsSubmit={setIsSubmit} />
          <CommentCounter>
            댓글 {postData.commentCnt ? postData.commentCnt : '0'}개
          </CommentCounter>
          {isLogin && <PostCommentMobile articleId={postId} />}
          {commentData &&
            commentData.map((comment: CommentType) => (
              <ViewComment comment={comment} key={comment.createdAt} />
            ))}
          {/* <PostCommentDesktop /> */}
        </PageMain>
      )}
      {/* <PostModal></PostModal> */}
      <Footer></Footer>
      {isSubmit && postData && (
        <PostEditModal setIsSubmit={setIsSubmit} postData={postData} />
      )}
    </>
  );
}

interface PostProps {
  post: ArticleType;
  setIsSubmit: (T: boolean) => void;
}

function ViewContent({ post, setIsSubmit }: PostProps) {
  const navigate=useNavigate();
  const isLogin=useAppSelector(state=>state.isLogin);
  const memberInfo=useAppSelector(state=>state.memberInfo);

  const removeArticleHandler=()=>{
    sendDataTs(`articles/${post.id}`,'delete',{}).then(()=>navigate('/community'))
  }

  return (
    <PostArticle>
      <h2>{post.title}</h2>
      <div>
        <div>
          <img src={post.profileImg} alt='profile-img'></img>
          <div className='member-info-upper'>
            <span className='member-info-nickname'>{post.nickname}</span>
            <span className='member-created-at'>
              {timeParser(post.createdAt)}
            </span>
          </div>
        </div>
        <div className='post-info'>
          
          <span className='post-info-span'>
            <GrFormView />
            <span>{post.memberId}</span>
          </span>
          <span className='post-info-span'>
            <button>
              <FaThumbsUp />
            </button>
            <span>{post.likeCnt}</span>
          </span>
          {isLogin&&memberInfo.id===post.memberId&&
          <><span className='post-info-span'>
            <Button
              padding='8px'
              border={'var(--chamong__color)'}
              color={'var(--chamong__color)'}
              hcolor={'white'}
              hover={'var(--chamong__color)'}
              hborder={'var(--chamong__color)'}
              radius='12px'
              width='100%'
              onClick={()=>setIsSubmit(true)}
              >
              <BsPencilSquare />
            </Button>
          </span>
          <span className='post-info-span'>
            <Button
              padding='8px'
              border={'var(--chamong__color)'}
              color={'var(--chamong__color)'}
              hcolor={'white'}
              hover={'var(--chamong__color)'}
              hborder={'var(--chamong__color)'}
              radius='12px'
              width='100%'
              onClick={()=>setIsSubmit(true)}
              >
              <HiOutlineX/>
            </Button>
          </span>
          </>}
        </div>
      </div>
      <p>{post.content}</p>
    </PostArticle>
  );
}

interface CommentType {
  nickname: string;
  createdAt: string;
  profileImg: string;
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
          <img src={comment.profileImg} alt='profile-img'></img>
          <div className='member-info-upper'>
            <span className='member-info-nickname'>
              {comment.nickname}
            </span>
            <span className='member-created-at'>
              {timeParser(comment.createdAt)}
            </span>
          </div>
        </div>
      </div>
      <p>{comment.content}</p>
    </CommentArticle>
  );
}

interface PostCommentProps {
  articleId: string | undefined;
}

function PostCommentMobile({ articleId }: PostCommentProps) {
  const [content, setContent] = useState('');
  const postCommentHandler = (e: any) => {
    e.preventDefault();
    const data = { content };
    sendDataTs(`articles/${articleId}/comments`, 'post', data).then(() =>
      window.location.reload()
    );
  };

  return (
    <PostCommentStyle>
      <div className='post-comment-input'>
        <Input
          placeholder='댓글을 남겨주세요!'
          value={content}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setContent(e.target.value)
          }></Input>
        <button
          className='post-comment-mobile-button'
          onClick={postCommentHandler}>
          <BsPencilSquare />
        </button>
        <Button
          border={'var(--chamong__color)'}
          color={'white'}
          bg={'var(--chamong__color)'}
          hcolor={'var(--chamong__color)'}
          hover={'white'}
          hborder={'var(--chamong__color)'}
          padding='14px 15px'
          radius='12px'
          onClick={postCommentHandler}>
          작성
        </Button>
      </div>
    </PostCommentStyle>
  );
}

type PostType = {
  postData: ArticleType;
  setIsSubmit: (T: boolean) => void;
};
function PostEditModal({ postData, setIsSubmit }: PostType) {
  const navigate = useNavigate();
  const { image, imageSrc, imageChange, imageDelete } = useUploadImage();
  const [title, setTitle] = useState(postData.title);
  const [content, setContent] = useState(postData.content);

  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const contentHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const articleSubmitHandler = () => {
    const data = { title, content };
    sendFormDataTs('articles', 'patch', data, image).then(() =>
      navigate('/articles')
    );
  };

  return (
    <Modal>
      <div className='wrapper'>
        <div className='header'>
          <h2>글 수정하기</h2>
          <button>
            <HiOutlineX onClick={() => setIsSubmit(false)} />
          </button>
        </div>
        <ImageInput
          border={'var(--chamong__color)'}
          color={'var(--chamong__color)'}
          hcolor={'white'}
          hover={'var(--chamong__color)'}
          hborder={'var(--chamong__color)'}
          padding='8px 14px'
          radius='12px'>
          {imageSrc.length >= 1 ? (
            <div className='preview'>
              <img alt='preview' src={imageSrc}></img>
              <button onClick={imageDelete}>
                <HiOutlineX />
              </button>
            </div>
          ) : (
            <label htmlFor='file'>이미지 첨부</label>
          )}
          <input type='file' id='file' onChange={imageChange}></input>
        </ImageInput>
        <Input placeholder='제목' onChange={titleHandler} value={title}/>
        <TextArea
        value={content}
          height={'200px'}
          placeholder='내용'
          onChange={contentHandler}
        />
        <Button
          border={'var(--chamong__color)'}
          color={'white'}
          bg={'var(--chamong__color)'}
          hcolor={'var(--chamong__color)'}
          hover={'white'}
          hborder={'var(--chamong__color)'}
          padding='13px 15px'
          radius='12px'
          width='100%'>
          수정 완료
        </Button>
      </div>
    </Modal>
  );
}

export default PostDetail;
