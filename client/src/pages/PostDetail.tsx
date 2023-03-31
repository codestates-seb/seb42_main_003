import { MobileHeader } from '../styles/mobileStyle';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HiArrowSmLeft } from 'react-icons/hi';
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
  ButtonBoxStyle,
} from '../styles/pageStyle';
import { Input, TextArea, ImageInput } from '../styles/Input';
import { getDataTs, sendDataTs, sendFormDataTs } from '../api/tsapi';
import { Button } from '../styles/Button';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTK';
import { Modal } from '../styles/Modal';
import { HiOutlineX } from 'react-icons/hi';
import { FcLike } from 'react-icons/fc';
import { AiOutlineEye } from 'react-icons/ai';
import useUploadImage from '../hooks/useUploadImage';
import { useWindowSize } from '../hooks/useWindowSize';
import { loginModal } from '../store/loginModal';

function PostDetail() {
  const isLogin = useAppSelector((state) => state.isLogin);
  const { postId } = useParams();
  const [postData, setPostData] = useState<ArticleType | null>(null);
  const [commentData, setCommentData] = useState<any>(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getDataTs(`articles/${postId}`)
      .then((data) => {
        setPostData(data);
        setCommentData(data.comments);
      })
      .catch(() => navigate('/error'));
  }, []);

  const removeArticleHandler = () => {
    sendDataTs(`articles/${postId}`, 'delete', {})
      .then(() => {
        alert('삭제되었습니다.');
        navigate('/community');
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (postData) console.log(postData);
  }, [postData]);

  return (
    <>
      <Header width_M={'1000px'}></Header>

      <MobileHeader>
        <h1>커뮤니티</h1>
        <button onClick={() => navigate(-1)}>
          <HiArrowSmLeft />
        </button>
        {/* <button>삭제</button> */}
      </MobileHeader>
      {postData && (
        <PageMain bottom={'128px'}>
          <ViewContent
            post={postData}
            setIsSubmit={setIsSubmit}
            setIsDelete={setIsDelete}
          />
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
      {isDelete && (
        <DeleteConfirmModal
          removeArticleHandler={removeArticleHandler}
          setIsDelete={setIsDelete}
        />
      )}
    </>
  );
}

interface PostProps {
  post: ArticleType;
  setIsDelete: (T: boolean) => void;
  setIsSubmit: (T: boolean) => void;
}

function ViewContent({ post, setIsSubmit, setIsDelete }: PostProps) {
  const dispatch = useAppDispatch();
  const windowSize = useWindowSize();
  const isLogin = useAppSelector((state) => state.isLogin);
  const memberInfo = useAppSelector((state) => state.memberInfo);
  const [nowLike, setNowLike] = useState(post.likeCnt);
  const [isAlreadyLike, setIsAlreadyLike] = useState(false);

  const likeHandler = () => {
    if (!isLogin) {
      dispatch(loginModal(true));
      return;
    }
    sendDataTs(`articles/${post.id}/like`, 'post', {})
      .then(() => {
        setNowLike((prevState) => (prevState += 1));
      })
      .catch((err) => {
        console.log(err);
        setIsAlreadyLike(true);
      });
  };

  return (
    <PostArticle>
      <h2>{post.title}</h2>
      <div>
        <div>
          <img
              src={post.profileImg}
              alt='profile-img'
              className='profile-img'></img>
          <div className='member-info-upper'>
            <span className='member-info-nickname'>{post.nickname}</span>
            <span className='member-created-at'>
              {timeParser(post.createdAt)}
            </span>
          </div>
        </div>
        <div className='post-info'>
          <div>
            <span className='post-info-span'>
              <AiOutlineEye />
              <span>{post.memberId}</span>
            </span>
            <span className='post-info-span'>
              <button onClick={likeHandler}>
                <FcLike />
              </button>
              <span>{nowLike}</span>
            </span>
          </div>
          {isAlreadyLike && (
            <div
              style={{ fontSize: '14px', color: 'var(--chamong__color)' }}>
              이미 좋아요를 누른 게시글입니다.
            </div>
          )}
        </div>
      </div>

      <p>
      {post.articleImg &&
            <img
          src={post.articleImg}
          alt='article'
          className='article-image'
          style={{ maxWidth: windowSize.width }}></img>}
        <div>{post.content}</div>
      </p>
      <div className='post-buttonbox'>
        {isLogin && memberInfo.id === post.memberId && (
          <ButtonBox setIsSubmit={setIsSubmit} setIsDelete={setIsDelete} />
        )}
      </div>
    </PostArticle>
  );
}

interface ButtonBoxProps {
  setIsSubmit: (T: boolean) => void;
  setIsDelete: (T: boolean) => void;
}

function ButtonBox({ setIsSubmit, setIsDelete }: ButtonBoxProps) {
  return (
    <ButtonBoxStyle>
      <span className='button-wrapper'>
        <Button
          padding='8px'
          border={'var(--chamong__color)'}
          color={'var(--chamong__color)'}
          hcolor={'white'}
          hover={'var(--chamong__color)'}
          hborder={'var(--chamong__color)'}
          radius='12px'
          width='100%'
          onClick={() => setIsSubmit(true)}>
          <BsPencilSquare />
          <span className='button-desktop'> 수정하기</span>
        </Button>
      </span>
      <span className='button-wrapper'>
        <Button
          padding='8px'
          border={'var(--chamong__color)'}
          color={'var(--chamong__color)'}
          hcolor={'white'}
          hover={'var(--chamong__color)'}
          hborder={'var(--chamong__color)'}
          radius='12px'
          width='100%'
          onClick={() => setIsDelete(true)}>
          <HiOutlineX />
          <span className='button-desktop'> 삭제하기</span>
        </Button>
      </span>
    </ButtonBoxStyle>
  );
}

interface DeleteConfirmModalProps {
  removeArticleHandler: () => void;
  setIsDelete: (T: boolean) => void;
}

function DeleteConfirmModal({
  removeArticleHandler,
  setIsDelete,
}: DeleteConfirmModalProps) {
  return (
    <Modal maxWidth='200px'>
      <div className='wrapper'>
        <div className='modal-text'>정말로 삭제할까요?</div>
        <div className='modal-text'>
          <Button
            onClick={removeArticleHandler}
            border={'var(--chamong__color)'}
            color={'white'}
            bg={'var(--chamong__color)'}
            hcolor={'var(--chamong__color)'}
            hover={'white'}
            hborder={'var(--chamong__color)'}
            padding='14px 15px'
            radius='12px'>
            삭제
          </Button>
          <Button
            onClick={() => setIsDelete(false)}
            radius='12px'
            padding='14px 15px'
            border={'var(--chamong__color)'}
            color={'var(--chamong__color)'}
            hcolor={'white'}
            hover={'var(--chamong__color)'}
            hborder={'var(--chamong__color)'}>
            취소
          </Button>
        </div>
      </div>
    </Modal>
  );
}

interface CommentType {
  articleId: number;
  nickname: string;
  createdAt: string;
  updatedAt: string;
  profileImg: string;
  content: string;
  id: number;
  memberId: number;
}

interface CommentProps {
  comment: CommentType;
}

function ViewComment({ comment }: CommentProps) {
  const memberInfo = useAppSelector((state) => state.memberInfo);

  const commentDeleteHandler = () => {
    if (memberInfo.id === comment.memberId) {
      sendDataTs(
        `articles/${comment.articleId}/comments/${comment.id}`,
        'delete',
        {}
      )
        .then(() => {
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <CommentArticle>
      <div>
        <div>
          <img
            src={comment.profileImg}
            alt='profile-img'
            className='profile-img'></img>
          <div className='member-info-upper'>
            <span className='member-info-nickname'>
              {comment.nickname}
            </span>
            <span className='member-created-at'>
              {timeParser(comment.createdAt)}
              {memberInfo.id == comment.memberId && (
                <button
                  onClick={commentDeleteHandler}
                  className='comment-delete-button'>
                  <HiOutlineX />
                </button>
              )}
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
    if (!content) return;
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
  const [isPhotoEdit,setIsPhotoEdit]=useState(false);
  const [title, setTitle] = useState(postData.title);
  const [content, setContent] = useState(postData.content);
  const [errorMessage, setErrorMessage] = useState({
    title: '',
    content: '',
    submit: '',
  });

  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const contentHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const articleSubmitHandler = () => {
    if (isInputEmpty()) return;
    const data = { title, content };
    sendFormDataTs(
      `articles/${postData.id}`,
      'patch',
      data,
      image,
      'articleCreate',
      'articleImg'
    )
      .then(() => navigate('/articles'))
      .catch((err) =>
        setErrorMessage((prevState) => {
          return {
            ...prevState,
            submit: `글 수정이 실패했습니다. (${err.response.status})`,
          };
        })
      );
  };

  const isInputEmpty = () => {
    let pass = true;
    if (!title) {
      pass = false;
      setErrorMessage((prevState) => {
        return { ...prevState, title: '제목을 입력해주세요.' };
      });
    } else
      setErrorMessage((prevState) => {
        return { ...prevState, title: '' };
      });
    if (!content) {
      pass = false;
      setErrorMessage((prevState) => {
        return { ...prevState, content: '내용을 입력해주세요.' };
      });
    } else
      setErrorMessage((prevState) => {
        return { ...prevState, content: '' };
      });
    return !pass;
  };

  return (
    <Modal maxWidth='600px'>
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
          {imageSrc.length >= 1||!isPhotoEdit ? (
            <div className='preview'>
              <img alt='preview' src={isPhotoEdit?imageSrc:postData.articleImg}></img>
              <button onClick={()=>{
                if(isPhotoEdit) imageDelete();
                else {
                  setIsPhotoEdit(true);
                }
                }}>       
                <HiOutlineX />
              </button>
            </div>
          ) : (
            <label htmlFor='file'>이미지 첨부</label>
          )}
          <input type='file' id='file' onChange={imageChange}></input>
        </ImageInput>
        <Input placeholder='제목' onChange={titleHandler} value={title} />
        {errorMessage.title && (
          <span className='error-message'>{errorMessage.title}</span>
        )}
        <TextArea
          value={content}
          height={'200px'}
          placeholder='내용'
          onChange={contentHandler}
        />
        {errorMessage.content && (
          <span className='error-message'>{errorMessage.content}</span>
        )}
        <Button
          onClick={articleSubmitHandler}
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
        {errorMessage.submit && (
          <span className='error-message'>{errorMessage.submit}</span>
        )}
      </div>
    </Modal>
  );
}

export default PostDetail;
