import {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from "../styles/Modal";
import { HiOutlineX } from "react-icons/hi";
import { Input,TextArea,ImageInput } from "../styles/Input";
import { Button } from "../styles/Button";
import useUploadImage from "../hooks/useUploadImage";
import { sendFormDataTs } from '../api/tsapi';

function PostModal () {

const {image,imageSrc,imageChange,imageDelete}=useUploadImage();
const navigate=useNavigate();
const [title,setTitle]=useState('');
const [content,setContent]=useState('');

const titleHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
  setTitle(e.target.value);
}
const contentHandler=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
  setContent(e.target.value);
}

const articleSubmitHandler=()=>{
  const data={title,content};
  sendFormDataTs('articles','post',data,image).then(()=>navigate('/articles'))
}


  return (
    <Modal>
      <div className="wrapper">
        <div className="header">
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
          padding="8px 14px"
          radius="12px"
        >
          {imageSrc.length >= 1 ? (
            <div className="preview">
              <img alt="preview" src={imageSrc}></img>
              <button onClick={imageDelete}>
                <HiOutlineX />
              </button>
            </div>
          ) : (
            <label htmlFor="file">이미지 첨부</label>
          )}
          <input type="file" id="file" onChange={imageChange}></input>
        </ImageInput>
        <Input placeholder="제목" onChange={titleHandler}/>
        <TextArea height={'200px'} placeholder="내용"  onChange={contentHandler}/>
        <Button
          border={'var(--chamong__color)'}
          color={'white'}
          bg={'var(--chamong__color)'}
          hcolor={'var(--chamong__color)'}
          hover={'white'}
          hborder={'var(--chamong__color)'}
          padding="13px 15px"
          radius="12px"
          width="100%"
        >
          작성 완료
        </Button>
      </div>
    </Modal>
  );
}

export default PostModal;
