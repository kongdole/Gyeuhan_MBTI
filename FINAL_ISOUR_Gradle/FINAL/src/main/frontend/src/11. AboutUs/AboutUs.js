import React, { useState } from 'react'
import TeamAPI from '../0. API/TeamAPI';
import Cookies from 'universal-cookie';
import SendPostModal from '../99. Modal/SendPostModal';
import CustomModal from '../99. Modal/CustomModal'
import 조혜경 from '../images/조혜경.png'
import 이동균 from '../images/이동균.png'
import 이민형 from '../images/이민형.png'
import 전규한 from '../images/전규한.png'
import 우혜정 from '../images/우혜정.png'
import './AboutUs.css'

import CallIcon from '@mui/icons-material/Call';

function AboutUs() {
  const cookies = new Cookies();
  // ▼ 로그인 안 되어 있으면 로그인 페이지로
  const MyInfo = cookies.get('rememberMyInfo');
  const myId = MyInfo.id;

  /* ===== CustomModal 에 필요 ===== */
  const [state, setState] = useState({
    open: false, success: false, error: false,
    successMsg: "", errorMsg: ""
  });

  const onChangeState = () => {
    setState({...state, open: false, success: false, error: false});
  }
  /* ============================== */

  /* 쪽지 기능 구현 */
  const [receiverId, setReceiverId] = useState("");
  const [receiverNickname, setReceiverNickname] = useState("");
  const [inputContent, setInputContent] = useState('');

  const [modalOn, setModalOn] = useState(false);

  const getInputContent = (content) => { setInputContent(content); }
  const openModal = () => { setModalOn(true); };
  const closeModal = () => { setModalOn(false); };

  const onClickPostIcon = (receiverId, receiverNickname) => {
    setReceiverId(receiverId);
    setReceiverNickname(receiverNickname);
    setModalOn(true);
  };

  /* 보내기 버튼 클릭 */
  const onSendPost = async(e) => {
    // e.preventDefault();
    try {
      const response = await TeamAPI.sendPost(myId, receiverId, inputContent);


      if(response.status == 200) {
        setState({...state, open: true, success: true, successMsg: "쪽지가 발송되었습니다."});
        closeModal();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='Container'>
      <div className='Middle-Container'>
        <div className='AboutUs-Container'>
          <div className='AboutUs-header'>
            <h1>About Us</h1>
          </div>
          <div className='AboutUs-main'>
            <div className='OurInfo'>
              <img src={우혜정} alt="face"/>
              <h4>우혜정</h4>
              <h6>Backend / Frontend</h6>
              <div className='AboutUs-icon'>
                <CallIcon />              
                <span class="material-symbols-outlined" onClick={()=>onClickPostIcon("kkongkkong", "손이시려워")}>mail</span>
              </div>
            </div>
            <div className='OurInfo'>
              <img src={조혜경} alt="face"/>
              <h4>조혜경</h4>
              <h6>Backend / Frontend</h6>
              <div className='AboutUs-icon'>
                <CallIcon />
                <span class="material-symbols-outlined" onClick={()=>onClickPostIcon("9lovejhk", "개발자조혜경")}>mail</span>
              </div>
            </div>
            <div className='OurInfo'>
              <img src={전규한} alt="face"/>
              <h4>전규한</h4>
              <h6>Backend / Frontend</h6>
              <div className='AboutUs-icon'>
                <CallIcon />
                <span class="material-symbols-outlined" onClick={()=>onClickPostIcon("kongdole", "콩돌형")}>mail</span>
              </div>
            </div>
            <div className='OurInfo'>
              <img src={이민형} alt="face"/>
              <h4>이민형</h4>
              <h6>Backend / Frontend</h6>
              <div className='AboutUs-icon'>
                <CallIcon />
                <span class="material-symbols-outlined" onClick={()=>onClickPostIcon("min1234", "감자돌이")}>mail</span>
              </div>
            </div>
            <div className='OurInfo'>
              <img src={이동균} alt="face"/>
              <h4>이동균</h4>
              <h6>Backend / Frontend</h6>
              <div className='AboutUs-icon'>
                <CallIcon />
                <span class="material-symbols-outlined" onClick={()=>onClickPostIcon("hungryman", "배고픈개발자")}>mail</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SendPostModal open={modalOn} close={closeModal} receiver={receiverNickname} getInputContent={getInputContent} onSendPost={onSendPost}/>
      <CustomModal state={state} changeState={onChangeState}/>
    </div>
  )
}

export default AboutUs