import React, { useState } from "react";
import TeamAPI from '../0. API/TeamAPI';
import Cookies from 'universal-cookie';
import CustomModal from '../99. Modal/CustomModal'
import SendPostModal from '../99. Modal/SendPostModal'
import './PostModal.css';

const PostModal = (props) => {
  const { open, close, sender, content, senderId } = props;
  const cookies = new Cookies();
  // ▼ 로그인 안 되어 있으면 로그인 페이지로
  const myInfo = cookies.get('rememberMyInfo');
  const myId = myInfo.id


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
  const [inputContent, setInputContent] = useState('');

  const [modalOn, setModalOn] = useState(false);

  const getInputContent = (content) => { setInputContent(content); console.log(content); }
  const openModal = () => { setModalOn(true); };
  const closeModal = () => { setModalOn(false); };

  let sendMessage;

  const onClickReply = async() => {

    try {
      const isMember = await TeamAPI.memberRegCheck(senderId);

      if(isMember.data === true) {
        setModalOn(true);

      /* 탈퇴한 회원이라면 */  
      } else {
        setState({...state, open: true, error: true, errorMsg: "존재하지 않는(탈퇴한) 회원입니다."});
      }
    } catch (e) { console.log(e); }
  }

  /* 보내기 버튼 클릭 */
  const onSendPost = async(e) => {
    // e.preventDefault();
    try {
      const response = await TeamAPI.sendPost(myId, senderId, inputContent);
      console.log("\n보내는 사람(id) : " + myId);
      console.log("받는 사람(senderId) : " + senderId);
      console.log("쪽지 내용(inputContent) : " + inputContent);

      if(response.status == 200) {
        setState({...state, open: true, success: true, successMsg: "쪽지가 발송되었습니다."});
      }
      setReceiverId("")
      setInputContent("")
      closeModal();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={open ? 'openPostModal PostModal' : 'PostModal'}>
      {open ? (
        <section>

        {/* header 영역 */}
          <header>
            <h2>쪽지 자세히 보기</h2>
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>

        {/* main 영역 */}
          <main>
            <div className="PostModal-Form-item">
              <label className="form-label">보낸 사람</label>
              <input type="text" className="PostModal-Form-control" value={sender} readOnly/>
            </div>

            <div className="PostModal-Form-item">
              <label className="form-label">쪽지 내용</label>
              <textarea className="PostModal-Form-control textarea" value={content} readOnly/>
            </div>
          </main>

        {/* footer 영역 */}
          <footer>
            {/* <button className="close" onClick={close}>
              닫기
            </button> */}
            <button type="button" onClick={onClickReply}>
              답장하기
            </button>
          </footer>

        </section>
      ) : null}
      <SendPostModal open={modalOn} close={closeModal} receiver={sender} getInputContent={getInputContent} onSendPost={onSendPost}/>
      <CustomModal state={state} changeState={onChangeState}/>
    </div>
    // </>
  );
}

export default PostModal;