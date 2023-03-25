import { Modal } from '../styles/Modal';
import { HiOutlineX } from 'react-icons/hi';
import { Input, TextArea, ImageInput } from '../styles/Input';
import { Button } from '../styles/Button';
import useUploadImage from '../hooks/useUploadImage';

type PostType = { setIsSubmit: (foo: any) => void };
function PostModal({ setIsSubmit }: PostType) {
  const { imageSrc, imageChange, imageFormData, imageDelete } =
    useUploadImage();

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
        <Input placeholder="제목" />
        <TextArea height={'200px'} placeholder="내용" />
        <Button
          border={'var(--chamong__color)'}
          color={'var(--chamong__color)'}
          hcolor={'white'}
          hover={'var(--chamong__color)'}
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
