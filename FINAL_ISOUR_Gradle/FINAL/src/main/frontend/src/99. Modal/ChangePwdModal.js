import React, { useState } from 'react';
import './ChangePwdModal.css';
import styled from 'styled-components';


export const ChangePwdModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, getPwd, onSavePwd } = props;

  const regexPw = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[a-z\d@$!%*?&]{8,20}$/;
  const [pwd, setPwd] = useState('');
  const [pwdcheck, setPwdcheck] = useState('');

  const [isPwd, setIsPwd] = useState(false);
  const [isPwdcheck, setIsPwdcheck] = useState(false);

  const guidePwd = "영문/숫자/특수문자 조합 (8~20자)"
  const acceptPwd = "사용 가능한 비밀번호입니다."
  const errorPwdcheck = "비밀번호가 일치하지 않습니다."
  const acceptPwdcheck = "비밀번호가 일치합니다."

  const [showGuidePwd, setShowGuidePwd] = useState(false);
  const [showAcceptPwd, setShowAcceptPwd] = useState(false);
  const [showErrorPwdcheck, setShowErrorPwdcheck] = useState(false);
  const [showAcceptPwdcheck, setShowAcceptPwdcheck] = useState(false);
 
  const Msg = styled.div`
  color: orangered;
  font-size: calc(1rem * .8);
  display: flex;
  justify-content: flex-end;
  height: 1.5rem;
  margin-top: 0.5rem;
  margin-right: 20px;
  align-items: center; // 세로 기준으로 가운데 정렬
`;

  /* 비밀번호 변경 */
  const onChangePwd = e => {
    setIsPwd(false);
    setIsPwdcheck(false);
    
    let temp_pwd = e.target.value;
    setPwd(temp_pwd);

    if (regexPw.test(temp_pwd)) {
      setIsPwd(true);
      setShowAcceptPwd(true); // 사용 가능한 비밀번호입니다.
      setShowGuidePwd(false); // 영문/숫자/특수문자 조합 (8~20자)
    } else {
      setIsPwd(false);
      setShowAcceptPwd(false); // 사용 가능한 비밀번호입니다.
      setShowGuidePwd(true); // 영문/숫자/특수문자 조합 (8~20자)
    }

    if (pwdcheck == '') console.log(pwdcheck);
    else if (pwdcheck !== '' && (temp_pwd !== '' && temp_pwd === pwdcheck)) {
      setIsPwdcheck(true);
      setShowAcceptPwdcheck(true); // 비밀번호가 일치합니다.
      setShowErrorPwdcheck(false); // 비밀번호가 일치하지 않습니다.
    } else {
      setIsPwdcheck(false);
      setShowErrorPwdcheck(true); // 비밀번호가 일치하지 않습니다.
      setShowAcceptPwdcheck(false); // 비밀번호가 일치합니다.
    }
  };

  /*
  비밀번호 확인 변경 */
  const onChangePwdcheck = e => {
    const temp_pwdcheck = e.target.value;
    setPwdcheck(temp_pwdcheck);

    if (pwd === temp_pwdcheck) {
      setIsPwdcheck(true);
      setShowAcceptPwdcheck(true); // 비밀번호가 일치합니다.
      setShowErrorPwdcheck(false); // 비밀번호가 일치하지 않습니다.
    } else {
      setIsPwdcheck(false);
      setShowErrorPwdcheck(true); // 비밀번호가 일치하지 않습니다.
      setShowAcceptPwdcheck(false); // 비밀번호가 일치합니다.
    }
  };
  
  /* 변경 버튼 클릭 */
  const onClickButton = (e) => {
    e.preventDefault();
    if(isPwd && isPwdcheck) {
      getPwd(pwd);
      onSavePwd(e);
      setShowGuidePwd(false);
      setShowAcceptPwd(false);
      setShowErrorPwdcheck(false);
      setShowAcceptPwdcheck(false);
      close();
    } else {
      alert("비밀번호를 확인하세요.");
      return;
    }
  }
  
  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>

        {/* header 영역 */}
          <header>
            비밀번호 변경
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>

        {/* main 영역 */}
          <main>
            <div className="Modal-Form-item">
              <label className="form-label"> 새로운 비밀번호</label>
              <input type="password" className="Modal-Form-control" onChange={onChangePwd}/>
              <Msg>
                {showGuidePwd && guidePwd}
                {showAcceptPwd && acceptPwd}
              </Msg>
            </div>
            <div className="Modal-Form-item">
              <label className="form-label"> 새로운 비밀번호 확인</label>
              <input type="password" className="Modal-Form-control" onChange={onChangePwdcheck} disabled={!regexPw.test(pwd)}/>
              <Msg>
                {showErrorPwdcheck && errorPwdcheck}
                {showAcceptPwdcheck && acceptPwdcheck}
              </Msg>
            </div>
          </main>

        {/* footer 영역 */}
          <footer>
            <button className="close" onClick={close}>
              취소
            </button>
            <button className="close" onClick={onClickButton}>
              변경
            </button>
          </footer>

        </section>
      ) : null}
    </div>
  );
};

export default ChangePwdModal;