import React, { useState } from 'react';
import './ChangePwdModal.css';


export const UnregisterModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, id, getInputPwd, onDeleteMember } = props;
  console.log("\n>> UnregisterModal : " + open);
  // console.log("넘겨받은 props(open) : " + open);
  // console.log("넘겨받은 props(close) : " + close);
  // console.log("넘겨받은 props(id) : " + id);
  // console.log("넘겨받은 props(onDeleteMember) : " + onDeleteMember);

  const [pwd, setPwd] = useState('');

  /* 비밀번호 변경 */
  const onChangePwd = e => {
    let temp_pwd = e.target.value;
    setPwd(temp_pwd);
    getInputPwd(temp_pwd);
  };

  /* 탈퇴하기 버튼 클릭 */
  const onClickButton = (e) => {
    if(pwd === '') {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    e.preventDefault();
    onDeleteMember(e);
  }
  
  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>

        {/* header 영역 */}
          <header>
            회원 탈퇴
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>

        {/* main 영역 */}
          <main>
            <div className="Modal-Form-item">
              <label className="form-label">아이디</label>
              <input type="text" className="Modal-Form-control" value={id} disabled/>
            </div>

            <div className="Modal-Form-item">
              <label className="form-label"> 비밀번호 확인</label>
              <input type="password" className="Modal-Form-control" onChange={onChangePwd}/>
            </div>
          </main>

        {/* footer 영역 */}
          <footer>
            <button className="close" onClick={close}>
              취소
            </button>
            <button className="close" onClick={onClickButton}>
              탈퇴하기
            </button>
          </footer>

        </section>
      ) : null}
    </div>
  );
};

