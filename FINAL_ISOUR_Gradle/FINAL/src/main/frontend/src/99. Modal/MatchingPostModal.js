import React, { useState } from 'react';
import TeamAPI from '../0. API/TeamAPI';
import './ChangePwdModal.css';


export const MatchingPostModal = (props) => {
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
  };
  
  
  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>

        {/* header 영역 */}
          <header>
            쪽지 보내기
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>

        {/* main 영역 */}
          <main>
            <div className="Modal-Form-item">
              <label className="form-label">받는 사람 닉네임</label>
              <input type="text" className="Modal-Form-control" value={receiver} disabled/>
            </div>

            <div className="Modal-Form-item">
              <label className="form-label">쪽지 내용</label>
              <input type="text" className="Modal-Form-control" onChange={onChangeContent}/>
            </div>
          </main>

        {/* footer 영역 */}
          <footer>
            <button className="close" onClick={close}>
              취소
            </button>
            <button type="button" onClick={onClickButton}>
              보내기
            </button>
          </footer>

        </section>
      ) : null}
    </div>
  );
};

