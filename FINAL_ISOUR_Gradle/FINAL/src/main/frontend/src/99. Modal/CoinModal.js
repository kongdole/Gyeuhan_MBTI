import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './CoinModal.css';
import { db } from "../firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import Cookies from 'universal-cookie';
import TeamAPI from "../0. API/TeamAPI";
import { UserContext } from '../98. Context/UserStore';
import { useContext } from "react";
import CustomModal from '../99. Modal/CustomModal'



function CoinModal(props) {
  const cookies = new Cookies();
  const localMyInfo = cookies.get('rememberMyInfo');
  const friendInfo = cookies.get('rememberfriendInfo')
  const localId = localMyInfo.id;
  const { state, changeState } = props;
  const nav = useNavigate();
  const ModalInCoin = cookies.get('coinInfo');
  const context = useContext(UserContext);


  const onClickChat = async (e) => {
    if (ModalInCoin >= 2) {



      const tempCoin = ModalInCoin - 2;

      const restCoin = await TeamAPI.CoinUpdate(localId, tempCoin);
      if (restCoin.data.coin !== '') {

        console.log(restCoin.data.coin)
        context['coin'] = restCoin.data.coin;
        console.log(context.coin);
      } else {
        alert("반영이 안됐어요")
      }
      console.log("여기1");
      const user1 = localId;
      const user2 = e
      console.log(e);
      console.log("여기2");
      console.log(user1);
      const sodaRef = doc(db, "users", user1);
      try {
        await updateDoc(sodaRef, {
          friends: arrayUnion(user2)
        });
      } catch (e) {
        console.log(e);
      }
      nav("/chathome")
    } else {
      setState2({ ...state, open: true, error: true, errorMsg: "코인이 부족합니다 결제페이지로 이동합니다." });
      setTimeout(() => { nav("/shop") }, 2000);
    }
  }

  const onClickClose = (e) => {
    changeState();
  }
  /* ===== CustomModal 에 필요 ===== */
  const [state2, setState2] = useState({
    open: false, success: false, error: false,
    successMsg: "회원가입 성공", errorMsg: "코인이 부족합니다 결제페이지로 이동합니다."
  });
  const onChangeState2 = () => {
    setState2({ ...state2, open: false, success: false, error: false });
  }



  if (state.success) setTimeout(() => { changeState() }, 2000);

  return (

    <div className={state.open ? "CustomModal_wrapper active" : "CustomModal_wrapper"}>
      <div className="Shadow close_btn"></div>
      <CustomModal state={state2} changeState={onChangeState2} />


      <div className="CustomModal-Box">

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
              <div className="CoinModal-Btn1" onClick={() => { onClickChat(friendInfo) }} >
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

export default CoinModal;