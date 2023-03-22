import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { MobileHeader } from '../../styles/mobileStyle';
import { Tab } from '../../styles/Tab';
import { Post } from '../Review';
import { FiArrowLeft } from 'react-icons/fi';

const ViewHistoryModalContainer = styled.section`
  position: absolute;
  top: 0px;
  background-color: white;
  width: 100%;
  height: 100%;
  z-index: 500;
  .view-history-modal-main {
    padding:60px 12px 64px;
  }
`;

function ViewHistoryModal({ viewHistoryHandler, myPost, commentedPost, likePost }: any) {

  const [tabState,setTabState]=useState(1);

  const tabHandler=(e:any)=>{
    setTabState(e.target.value);
  }

  return (
    <ViewHistoryModalContainer>
      <MobileHeader>
        <h1>커뮤니티 활동기록</h1>
        <button onClick={viewHistoryHandler}><FiArrowLeft/></button>
      </MobileHeader>
      <div className='view-history-modal-main'>
        <Tab state={tabState}>
          <button value={1} onClick={tabHandler}>내가 쓴 글</button>
          <button value={2} onClick={tabHandler}>댓글 단 글</button>
          <button value={3} onClick={tabHandler}>좋아요 누른 글</button>
        </Tab>
        <Post></Post>
      </div>
    </ViewHistoryModalContainer>
  );
}

export default ViewHistoryModal;
