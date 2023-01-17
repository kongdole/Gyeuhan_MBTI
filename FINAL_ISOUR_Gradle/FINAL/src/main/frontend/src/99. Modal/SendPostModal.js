import React, { useState } from 'react';
import TeamAPI from '../0. API/TeamAPI';
import './SendPostModal.css';


const SendPostModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, receiver, getInputContent, onSendPost } = props;

  const [content, setContent] = useState("");

  /* 쪽지 내용 작성 */
  const onChangeContent = e => {
    let temp_content = e.target.value;
    setContent(temp_content);
    getInputContent(temp_content);
  };

  /* 보내기 버튼 클릭 */
  const onClickButton = e => {
    if(content === null || content.length < 1) {
      alert("내용을 입력하세요.");
      return;
    }
    // e.preventDefault();
    onSendPost(e);
    setContent("");
  };
  
  
  return (
    <div className={open ? 'openSendPostModal SendPostModal' : 'SendPostModal'}>
      {open ? (
        <section>

        {/* header 영역 */}
          <header>
            <h2>쪽지 보내기</h2>
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>

        {/* main 영역 */}
          <main>
            <div className="SendPostModal-Form-item">
              <label className="form-label">받는 사람</label>
              <input type="text" className="SendPostModal-Form-control" value={receiver} disabled/>
            </div>

            <div className="SendPostModal-Form-item">
              <label className="form-label">쪽지 내용</label>
              <textarea className="PostModal-Form-control textarea" value={content} onChange={onChangeContent}/>
            </div>
          </main>

        {/* footer 영역 */}
          <footer>
            {/* <button className="close" onClick={close}>
              취소
            </button> */}
            <button type="button" onClick={onClickButton}>
              보내기
            </button>
          </footer>

        </section>
      ) : null}
    </div>
  );
};

export default SendPostModal;