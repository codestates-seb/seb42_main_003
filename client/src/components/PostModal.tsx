import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../styles/Modal';
import { HiOutlineX } from 'react-icons/hi';
import { Input, TextArea, ImageInput } from '../styles/Input';
import { Button } from '../styles/Button';
import useUploadImage from '../hooks/useUploadImage';
import { sendFormDataTs } from '../api/tsapi';

type PostType = {
  setIsSubmit: (foo: any) => void
  maxWidth?:string
};
function PostModal({ setIsSubmit, maxWidth='600px' }: PostType) {
  const { image, imageSrc, imageChange, imageDelete } = useUploadImage();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errorMessage,setErrorMessage]=useState({title:'',content:'',submit:''});

  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const contentHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const articleSubmitHandler = () => {
    if(isInputEmpty()) return;
    else {
      console.log('start submit');
    const data = { title, content };
    sendFormDataTs('articles', 'post', data, image, 'articleCreate','articleImg').then((data) =>
      navigate(`/community/${data.id}`)
    ).catch((err)=>setErrorMessage(prevState=>{return {...prevState,submit:`글 작성이 실패했습니다. (${err.response.status})`}}))
  }};

  const isInputEmpty=()=>{
    let pass=true
    if(!title) {
      console.log('닉네임 없음')
      pass=false;
      setErrorMessage(prevState=>{return {...prevState,title:'제목을 입력해주세요.'}});
    } else setErrorMessage(prevState=>{return {...prevState,title:''}});
    if(!content) {
      pass=false;
      setErrorMessage(prevState=>{return {...prevState,content:'내용을 입력해주세요.'}});
    } else setErrorMessage(prevState=>{return {...prevState,content:''}});
    return !pass;
  }

  return (
    <Modal maxWidth={maxWidth}>
      <div className='wrapper'>
        <div className='header'>
          <h2>글 작성하기</h2>
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
        <Input placeholder='제목' onChange={titleHandler} />
        {errorMessage.title&&<span className='error-message'>{errorMessage.title}</span>}
        <TextArea
          height={'200px'}
          placeholder='내용'
          onChange={contentHandler}
        />
        {errorMessage.content&&<span className='error-message'>{errorMessage.content}</span>}
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
          작성 완료
        </Button>
        {errorMessage.submit&&<span className='error-message'>{errorMessage.submit}</span>}
      </div>
    </Modal>
  );
}

export default PostModal;
