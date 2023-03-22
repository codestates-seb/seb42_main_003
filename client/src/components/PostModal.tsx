import { Modal } from "../styles/Modal";
import { HiOutlineX } from "react-icons/hi";
import { Input,TextArea } from "../styles/Input";
import { Button } from "../styles/Button";

function PostModal () {
return (
  <Modal>
    <div className='wrapper'>
        <div className='header'>
          <h2>글 작성하기</h2>
          <button>
            <HiOutlineX />
          </button>
        </div>
        <Input placeholder='제목' />
        <TextArea placeholder='내용'/>
        <Button
          border={'var(--chamong__color)'}
          color={'var(--chamong__color)'}
          hcolor={'white'}
          hover={'var(--chamong__color)'}
          hborder={'var(--chamong__color)'}
          padding='13px 15px'
          radius='12px'
          width='100%'>
          작성 완료
        </Button>
      </div>
  </Modal>
)
}

export default PostModal;