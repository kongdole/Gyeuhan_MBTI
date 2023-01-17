import React from "react";
import { useNavigate } from 'react-router-dom';
import './CoinModal.css';
import Cookies from 'universal-cookie';
import TeamAPI from "../0. API/TeamAPI";
import { UserContext } from '../98. Context/UserStore';
import { useContext, useState } from "react";
import SendPostModal from '../99. Modal/SendPostModal';
import CustomModal from '../99. Modal/CustomModal'



function CoinModal2(props) {

  const { setModalOpen } = props;

  console.log("여기오냐 모달2");
  const cookies = new Cookies();
  const localMyInfo = cookies.get('rememberMyInfo');
  const localId = localMyInfo.id;
  const myId = localMyInfo.id;

  const { state, changeState } = props;
  const nav = useNavigate();
  const ModalInCoin = cookies.get('coinInfo');
  const context = useContext(UserContext);
  const [modalOn, setModalOn] = useState(false);
  const [receiverId, setReceiverId] = useState("");
  const [receiverNickname, setReceiverNickname] = useState("");
  const [inputContent, setInputContent] = useState('');
  const openModal = () => { setModalOn(true); };
  const closeModal = () => { setModalOn(false); };
  const getInputContent = (content) => { setInputContent(content); }
  
  const reciever = cookies.get('rememberFreindId');
  const recieverNick = cookies.get('rememberFriendNick');

  /* ===== CustomModal 에 필요 ===== */
  const [state2, setState2] = useState({
    open: false, success: false, error: false,
    successMsg: "회원가입 성공", errorMsg: "코인이 부족합니다 결제페이지로 이동합니다."
  });
  const onChangeState2 = () => {
    setState2({ ...state2, open: false, success: false, error: false });
  }


  const onClickPost = async (e1, e2) => {

    console.log(e1);
    console.log(e2);
    if (ModalInCoin >= 2) {
      const tempCoin = ModalInCoin - 2;

      const restCoin = await TeamAPI.CoinUpdate(localId, tempCoin);
      if (restCoin.data.coin !== '') {

        console.log(restCoin.data.coin)
        context['coin'] = restCoin.data.coin;
        console.log(context.coin);

        console.log(reciever);
        console.log(recieverNick);

        setReceiverId(reciever);
        console.log("받는 사람 ID(receiverId) : " + receiverId);
        setReceiverNickname(recieverNick);
        console.log("받는 사람 닉네임(receiverNickname) : " + receiverNickname);

        setModalOn(true);

        


      } else {
        alert("반영 안됐어요!")
      }

    }else{
      setState2({ ...state, open: true, error: true, errorMsg: "코인이 부족합니다 결제페이지로 이동합니다." });
      setTimeout(() => { nav("/shop") }, 2000);
    }
  }
  


  /* 보내기 버튼 클릭 */
  const onSendPost = async (e) => {
    // e.preventDefault();
    try {
      const response = await TeamAPI.sendPost(myId, receiverId, inputContent);

      if (response.status == 200) {
        alert("쪽지 보내기 성공!!");
        changeState();
        
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onClickClose = (e) => {
    changeState();
  }



  if (state.success) setTimeout(() => { changeState() }, 2000);

  return (

    <div className={state.open ? "CustomModal_wrapper active" : "CustomModal_wrapper"}>
      <div className="Shadow close_btn"></div>
      <CustomModal state={state2} changeState={onChangeState2} />


      <div className="CustomModal-Box">
        <SendPostModal open={modalOn} close={closeModal} receiver={recieverNick} getInputContent={getInputContent} onSendPost={onSendPost} />

        {/* 성공(Success) */}
        {state.open ?
          <div className={state.success ? "modal_item s_modal active" : "modal_item s_modal"}>
            <div className="close close_btn" onClick={onClickClose}>
              <span className="material-symbols-outlined" >close</span>
            </div>
            <div className="modal_body">
              <div className="s_icon">
                <span className="material-symbols-outlined">check</span>
              </div>
              <div className="s_text">
                <h1>SUCCESS</h1>
                <p>{state.successMsg}</p>
              </div>
            </div>
            <div className="s_button" onClick={onClickClose}>
              <button className="success_btn">닫기</button>
            </div>
          </div>
          : null}

        {/* 실패(Error) */}
        {state.open ?
          <div className={state.error ? "modal_item e_modal active" : "modal_item e_modal"}>
            <div className="close close_btn" onClick={onClickClose} >
              <span className="material-symbols-outlined" name="error">close</span>
            </div>
            <div className="CoinModal_body">
              <div className="s_icon">
                <span className="material-symbols-outlined">question_mark</span>
              </div>
              <div className="s_text">
                <h1>Need Coin</h1>
                <p>{state.errorMsg}</p>
              </div>
              <div className="CoinModal-Btn1" onClick={() => { onClickPost() }} >
                <button className="error_btn">확 인</button>
              </div>
              <div className="CoinModal-Btn2" onClick={onClickClose} >
                <button className="error_btn">취 소</button>
              </div>
            </div>
          </div>
          : null}
      </div>
    </div>
  )
}

export default CoinModal2;