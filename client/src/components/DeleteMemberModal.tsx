import { useState, useEffect } from 'react';
import { Modal } from '../styles/Modal';
import { Button } from '../styles/Button';
import { sendDataTs } from '../api/tsapi';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/reduxTK';
import { logout } from '../store/isLoginSlice';

interface DeleteMemberModalProps {
  deleteMemberHandler: () => void;
}

function DeleteMemberModal({
  deleteMemberHandler
}: DeleteMemberModalProps) {
  const dispatch=useAppDispatch();
  const navigate=useNavigate();
  const [submitError,setSubmitError]=useState('');
  const DeleteMemberHandler = () => {
    sendDataTs('members', 'delete', {}).then(() => {
      localStorage.removeItem('refresh');
      sessionStorage.removeItem('authorization');
      dispatch(logout());
      alert('정상적으로 회원탈퇴 되었습니다.');
      document.location.href = '/';
    }).catch(err=>{
      setSubmitError(`오류가 발생했습니다. ${err.response.status}`);
    })
  };

  return (
    <Modal maxWidth='300px'>
      <div className='wrapper'>
        <div className='modal-text'>정말로 차몽에서 탈퇴하시겠습니까?</div>
        <div className='modal-text'>
          <Button
            onClick={DeleteMemberHandler}
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
            onClick={deleteMemberHandler}
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
        {submitError&&<span className='error-message'>{submitError}</span>}
      </div>
    </Modal>
  );
}

export default DeleteMemberModal