import { useState, useEffect } from 'react';
import TeamAPI from '../0. API/TeamAPI';
import hangjungdong from '../other/hangjungdong';
import face from '../images/기본 프로필.png'
import { ChangePwdModal } from '../99. Modal/ChangePwdModal';
import { UnregisterModal } from '../99. Modal/UnregisterModal';
import CustomModal from '../99. Modal/CustomModal'
import '../5. MyPage/MyPage.css';
import '../0. API/defultMain.css';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EmailModal from './EmailModal';

// 파이어베이스 설치 ☞ yarn add firebase
import { storage, db } from '../firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { doc, updateDoc } from "firebase/firestore";
//쿠키
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';


const regexNickName = /^[가-힣]{2,7}$/;
const regexEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const MyPage = () => {
  const cookies = new Cookies();
  const localId = cookies.get('rememberId');
  const myInfo = cookies.get('rememberMyInfo');
  const myId = myInfo.id
  const nav = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    loading: false,
    id: "",
    nickname: "",
    friends: [],
  });



  /* ===== CustomModal 에 필요 ===== */
  const [state, setState] = useState({
    open: false, success: false, error: false,
    successMsg: "회원가입 성공", errorMsg: "입력된 값을 확인하세요!"
  });

  const onChangeState = () => {
    setState({ ...state, open: false, success: false, error: false });
  }
  /* ============================== */

  const [isEmail, setIsEmail] = useState('');
  const [changePwdModalOpen, setChangePwdModalOpen] = useState(false);
  const [unregisterModalOpen, setUnregisterModalOpen] = useState(false);
  const [memberInfo, setMemberInfo] = useState(""); // 현재 로그인 되어 있는 회원의 정보 저장용

  // 이름, 아이디, 비밀번호, 비밀번호 확인, 생년월일, 나이, 성별, 주소 1, 주소 2
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');
  const [inputPwd, setInputPwd] = useState('');
  const [nickname, setNickname] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [birth, setBirth] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const { sido, sigugun } = hangjungdong;
  const [region1, setRegion1] = useState("");
  const [region2, setRegion2] = useState("");
  const [mbti, setMbti] = useState("");
  const [keySido, setKeySido] = useState("");
  const [nicknameBefore, setNicknameBefore] = useState("");
  const [introduceBefore, setIntroduceBefore] = useState("");
  const [emailBefore, setEmailBefore] = useState("");
  const [region1Before, setRegion1Before] = useState("");
  const [region2Before, setRegion2Before] = useState("");
  const [isNicknamecheck, setIsNicknamecheck] = useState(false);

  // 변경 여부 변수 선언
  const [isCheckedNickname, setIsCheckedNickname] = useState(true);
  const [isChangeNickname, setIsChangeNickname] = useState(false);
  const [isChangeIntroduce, setIsChangeIntroduce] = useState(false);
  const [isChangeEmail, setIsChangeEmail] = useState(false);
  const [isChangeAddress, setIsChangeAddress] = useState(false);
  const [isSetImage, setIsSetImage] = useState(false);
  const [isFixEmail, setIsFixEmail] = useState(false);

  /* 
  최초 통신(useEffect) */
  useEffect(() => {
    const myId = cookies.get('rememberId');
    // ▲ 로그인 안 되어 있으면 로그인 페이지로 


    const memberData = async () => {
      try {
        const response = await TeamAPI.memberInfo(myId); // 회원 정보 조회
        if (response.status == 200) {
          const member = response.data;
          setMemberInfo(member);
          setUrl(member.face);
          setName(member.name);
          setId(member.id);
          setBirth(member.birth);
          setGender(member.gender);
          setMbti(member.mbti);
          setPwd(member.pwd);
          setNickname(member.nickname);
          setIntroduce(member.introduce);
          setEmail(member.email);
          setRegion1(member.region1);
          setRegion2(member.region2);
          setNicknameBefore(member.nickname);
          setIntroduceBefore(member.introduce);
          setEmailBefore(member.email);
          setRegion1Before(member.region1);
          setRegion2Before(member.region2);

        } 
      } catch (e) {
        console.log(e);
      }
    };
    memberData();
  }, []);

  // 프사 변경 및 미리보기
  const onChangeFace = (e) => {
    const temp_face = e.target.files[0];
    const preview = URL.createObjectURL(temp_face);
    setUrl(temp_face);
    if (temp_face) {
      setImage(temp_face);
    }

    const imageRef = ref(storage, `profile/${myId}`);

    uploadBytes(imageRef, temp_face).then(() => {
      getDownloadURL(imageRef).then(async (url) => {
        setUrl(url);

        await updateDoc(doc(db, "users", myId), {
          profile: url,
        });
        /* ----- (시작) 통신 ----- */
        try {
          const response = await TeamAPI.changeFace(url, myId);
          const response2 = await TeamAPI.memberInfo(localId); 
          setImage(response.data.result)
          if (response.status == 200) {
            setState({ ...state, open: true, success: true, successMsg: "프사 저장 성공" });
            cookies.set('rememberMyInfo', response2.data, {
              path: '/',
              expires: 0
            })

          } else {
            setState({ ...state, open: true, error: true, errorMsg: "통신 실패 : " + response.status });

          }
        } catch (e) {
          console.log(e);
        } // try-catch 문의 끝

      }).catch((error) => {
        console.log(error.message, "error getting the image url");
      });
      setImage(null);
    }).catch((error) => {
      console.log(error.message);
    });
  };

  // 프사 삭제 버튼
  const onDeleteFace = async () => {
    if (url === null) alert("삭제할 사진이 없습니다.")
    else {
      const temp_url = null;
      setUrl(temp_url);

      try {
        const response = await TeamAPI.changeFace(temp_url, myId);
        if (response.status == 200) {
          setState({ ...state, open: true, success: true, successMsg: "프사 삭제 성공" });
          setIsSetImage(false);
        } else {
          setState({ ...state, open: true, error: true, errorMsg: "통신 실패 : " + response.status });
        }

      } catch (e) {
        console.log(e);
      }

    } // if-else 문의 끝
  }

  /**
▶ 변경 가능 항목(비밀번호, 닉네임, 자기소개, 이메일, 주소) 
  */

  /* 비밀번호 저장 */
  const getPwd = (pwd) => { setPwd(pwd); }
  const openChangePwdModal = () => { setChangePwdModalOpen(true); };
  const closeChangePwdModal = () => { setChangePwdModalOpen(false); };
  const onSavePwd = async (e) => {


    try {
      const response = await TeamAPI.memberUpdate(id, pwd, nickname, introduce, email, region1, region2);


      if (response.status == 200) {
        setState({ ...state, open: true, success: true, successMsg: "비밀번호 수정 완료!!" });

      }
    } catch (e) { console.log(e); }

  }

  /* 닉네임 변경 */
  const onChangeNickname = e => {
    let temp_nickname = e.target.value;
    setNickname(temp_nickname);
  }

  /* 닉네임 중복확인 버튼 클릭 */
  const onClickNicknameCheck = async (e) => {
    e.preventDefault();
    setIsNicknamecheck(false);

    if (nickname === '' || !regexNickName.test(nickname)) {
      setState({ ...state, open: true, error: true, errorMsg: "먼저, 닉네임을 확인하세요." });
    } else {
      try {
        const nicknameCheck = await TeamAPI.nicknameCheck(nickname);
        if (nicknameCheck.data === true) {
          setNickname("");
          setState({ ...state, open: true, error: true, errorMsg: "사용할 수 없는 닉네임 입니다." });
        } else {
          setIsNicknamecheck(true);
          setState({ ...state, open: true, success: true, successMsg: "사용 가능한 닉네임 입니다." });

          setIsCheckedNickname(false);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }


  /* 닉네임 변경 취소 */
  const cancelNickname = () => {
    setIsChangeNickname(false);
    setNickname(nicknameBefore);
  }

  /* 닉네임 저장 */
  const onSaveNickname = async (e) => {
    if (!isNicknamecheck) {
      setState({ ...state, open: true, error: true, errorMsg: "닉네임을 다시 확인하거나 중복확인이 필요합니다." });

      return;
    }

    e.preventDefault();
    setNickname(nickname);
    setIsChangeNickname(false);

    try {
      const response = await TeamAPI.memberUpdate(id, pwd, nickname, introduce, email, region1, region2);
      const response2 = await TeamAPI.memberInfo(localId); // 원래는 전체 회원 조회용
      setNickname(response.data.nickname)

      if (response.status == 200) {
        setState({ ...state, open: true, success: true, successMsg: "닉네임 수정 완료!!" });
        cookies.set('rememberMyInfo', response2.data, {
          path: '/',
          expires: 0
        })

        updateDoc(doc(db, "users", id), {
          nickname
        });


      }

    } catch (e) { console.log(e); }
  }

  console.log("xptmxdkddsfl");
  /* 자기소개 변경 취소 */
  const cancelIntroduce = () => {
    setIsChangeIntroduce(false);
    setIntroduce(introduceBefore);
  }

  /* 자기소개 변경 */
  const onChangeIntroduce = e => {
    let temp_introduce = e.target.value;
    setIntroduce(temp_introduce);
  }

  /* 자기소개 저장 */
  const onSaveIntroduce = async (e) => {
    e.preventDefault();
    setIntroduce(introduce);
    setIsChangeIntroduce(false);

    try {
      const response = await TeamAPI.memberUpdate(id, pwd, nickname, introduce, email, region1, region2);
      if (response.status == 200) {
        setState({ ...state, open: true, success: true, successMsg: "자기소개 수정 완료!!" });
      }

    } catch (e) { console.log(e); }
  }

  /*이메일 변경*/
  const OnChangeEmail = e => {

    let temp_email = e.target.value;
    setEmail(temp_email);

    if (temp_email === '' || !regexEmail.test(temp_email)) {
      setEmailDuplicateCheck(false);

    } else {
      setEmailDuplicateCheck(true);
    }
  };



  /* 이메일 변경 취소 */
  const cancelEmail = () => {
    setIsChangeEmail(false);
    setEmail(emailBefore);
    setEmailDoubleCheck(false);
    setConfirmEmail(false);
  }

  const OnclickRepairNickname = () => {
    setIsChangeNickname(true);
    setIsNicknamecheck(false);
    setIsCheckedNickname(true);
  }

  const RepairEmail = () => {
    setIsChangeEmail(true);
    setIsFixEmail(true);
  }

  const [emailDuplicateCheck, setEmailDuplicateCheck] = useState(false);
  const [emailDoubleCheck, setEmailDoubleCheck] = useState(false);

  /*이메일 중복확인*/
  const onClickEmailCheck = async (e) => {
    e.preventDefault();

    if (emailDuplicateCheck === true) {
      try {
        const emailResult = await TeamAPI.emailDuplicateCheck(email);
        if (emailResult.data === false) {
          setState({ ...state, open: true, success: true, successMsg: "이용가능한 이메일 입니다" });
          setConfirmEmail(true);
          setIsFixEmail(false);

        } else {
          setState({ ...state, open: true, success: false, successMsg: "이메일 중복입니다" });
          setEmail("");
        }
      } catch (e) {
        console.log(e);
      }

    } else {
      setState({ ...state, open: true, error: true, errorMsg: "이메일을 변경해주세요." });
    }
  }


  const [confirmEmail, setConfirmEmail] = useState(false);
  const [open, setOpen] = useState(false);

  /*이메일 인증*/
  const onClickEmailAdress = async (e) => {
    e.preventDefault();
    try {
      const changeResult = await TeamAPI.emailCheck(email);
      if (changeResult.status === 200) {
        setOpen(true);
        setConfirmEmail(false);
        setEmailDoubleCheck(true);
      } else {
      }
    } catch (e) {
      console.log(e);
    }
  }

  /* 이메일 저장 */
  const onSaveEmail = async (e) => {
    e.preventDefault();
    setEmail(email);
    setIsChangeEmail(false);


    try {
      const response = await TeamAPI.memberUpdate(id, pwd, nickname, introduce, email, region1, region2);
      if (response.status == 200) {
        setEmailDoubleCheck(false);
        setEmailBefore(email);
        setState({ ...state, open: true, success: true, successMsg: "이메일 수정 완료!!" });
        updateDoc(doc(db, "users", id), {
          email
        });
      }

    } catch (e) { console.log(e); }
  }
  const [regeion1Check, setRegion1Check] = useState(false);
  const [regeion2Check, setRegion2Check] = useState(false);


  const onClickCancelRegion = (e) => {
    setRegion1(region1Before);
    setRegion2(region2Before);
    setIsChangeAddress(false);
  }

  /* 주소 ☞ 시도 변경 */
  const onChangeRegion1 = (e) => {

    let temp_region1 = e.target.value;
    setRegion1(temp_region1);

    const indexSido = sido.findIndex(e => e.codeNm === temp_region1);
    let temp_keySido = sido.at(indexSido).sido;
    setKeySido(temp_keySido);

    if (temp_region1 !== '') {
      setRegion1Check(true);
    }
  };

  /* 주소 ☞ 시구군 변경 */
  const onChangeRegion2 = (e) => {

    let temp_region2 = e.target.value;
    setRegion2(temp_region2);
    if (temp_region2 !== '') {
      setRegion2Check(true);
    }
  }

  /* 주소 저장 */
  const onSaveAddress = async (e) => {
    setRegion1(region1);
    setRegion2(region2);
    setIsChangeAddress(false);

    try {
      const response = await TeamAPI.memberUpdate(id, pwd, nickname, introduce, email, region1, region2);

      if (response.status == 200) {
        setRegion2Check(false);
        setState({ ...state, open: true, success: true, successMsg: "주소 수정 완료!!" });
      }
    } catch (e) { console.log(e); }
  }

  /* MBTI 검사하기 */
  const onClickTestStart = () => {
    nav("/MBTI");
  }

  /* 탈퇴하기 */
  const getInputPwd = (pwd) => { setInputPwd(pwd); }
  const openUnregisterModal = () => { setUnregisterModalOpen(true); };
  const closeUnregisterModal = () => { setUnregisterModalOpen(false); };
  const onDeleteMember = async (e) => {
    const recheck = "해당 아이디로 재가입이 불가능합니다."
      + "\n탈퇴시 모든 정보가 삭제되며 복구가 어렵습니다."
      + "\n정말로 탈퇴하시겠습니까?"
    let recheckResult = window.confirm(recheck);

    if (recheckResult) {
      try {
        const response = await TeamAPI.memberDelete(myId, inputPwd);

        if (response.data === true) {
          window.localStorage.setItem("userId", "");
          window.localStorage.setItem("userPw", "");
          window.localStorage.setItem("isLogin", "FALSE");
          closeUnregisterModal();
          setState({ ...state, open: true, success: true, successMsg: "회원 탈퇴 성공" });

          window.location.replace("/");
        } else {
          setState({ ...state, open: true, error: true, errorMsg: "비밀번호를 확인하세요." });
        }
      } catch (e) {
        setState({ ...state, open: true, error: true, errorMsg: "오류 발생!!" });
        console.log(e);
      }
    }
  };

  return (
    <div className='Container'>
      <div className='Middle-Container'>
        <div className='Mypage-Container'>
          <div className='Mypage-box'>
            <EmailModal open={open} modalName={email} modalContent={() => setChangePwdModalOpen(true)} onHide={() => setOpen(false)} />
            <CustomModal state={state} changeState={onChangeState} />
            <ChangePwdModal open={changePwdModalOpen} close={closeChangePwdModal} getPwd={getPwd} onSavePwd={onSavePwd} />
            <UnregisterModal open={unregisterModalOpen} close={closeUnregisterModal} id={id} getInputPwd={getInputPwd} onDeleteMember={onDeleteMember} />
            <div className='MyPage-header'>
              <h1>마이페이지</h1>

            </div>
            {/* MyPage-Table 영역 */}
            <div className='Mypage-OuterBox'>
              <div className="profile_container">
                <div className="img_container">
                  <img src={url || face} alt="avatar" />
                  <div className="overlay">
                    <label htmlFor="photo">
                      <CameraAltIcon style={{ fontSize: "2rem", cursor: "pointer" }} />
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      id="photo"
                      onChange={onChangeFace}
                    />
                    {url ? <DeleteForeverIcon style={{ fontSize: "2rem", cursor: "pointer" }} onClick={onDeleteFace} /> : null}
                  </div>
                </div>
              </div>
              <table action="" className="MyPage-Table">
                <tr className="Form-item">
                  <div className="Form-Name">
                    <span>이름</span>
                  </div>
                  <div className='mypage-input'>
                    <input className='inputBox' type="text" value={name} disabled />
                  </div>
                  <div className='s' />
                </tr>


                <tr className="Form-item">
                  <div className="Form-Name">
                    <span>아이디</span>
                  </div>
                  <div className='mypage-input'>
                    <input className='inputBox' type="text" value={id} disabled />
                  </div>
                  <div className='s'></div>
                </tr>


                <tr className="Form-item">
                  <div className="Form-Name">
                    <span>생년월일</span>
                  </div>
                  <div className='mypage-input'>
                    <input className='inputBox' type="text" value={birth} disabled />
                  </div>
                  <div className='s'></div>
                </tr>


                <tr className="Form-item">
                  <div className="Form-Name">
                    <span>성별</span>
                  </div>
                  <div className='mypage-input'>
                    <input className='inputBox' type="text" value={gender} disabled />
                  </div>
                  <div className='s' />
                </tr>


                <tr className="Form-item">
                  <div className="Form-Name">
                    <span>MBTI</span>
                  </div>
                  <div className='mypage-input'>
                    {mbti ? <input className='inputBox' type="text" value={mbti} />
                      : <button className='Mypage-examine' onClick={onClickTestStart}>검사하기</button>}
                  </div>
                  <div className='s' />
                </tr>

                {/* 비밀번호 */}
                <tr className="Form-item">
                  <div className="Form-Name">
                    <span>비밀번호</span>
                  </div>
                  <div className='mypage-input'>
                    <input className='inputBox' type="password" value={pwd} />
                  </div>
                  <button className='mypage-btn' onClick={openChangePwdModal}>수정</button>
                </tr>


                {/* 닉네임 */}
                <tr className="Form-item">
                  <div className="Form-Name">
                    <span>닉네임</span>
                  </div>
                  {!isChangeNickname ?
                    <>
                      <div className='mypage-input'>
                        <input className='inputBox' disabled={onChangeNickname ? true : false} type="text" value={nickname} />
                      </div>
                      <button className='mypage-btn' onClick={OnclickRepairNickname}>수정</button>
                    </>
                    :
                    <>
                      <div className='mypage-input'>
                        <input className='inputBox ' disabled={isNicknamecheck ? true : false} type="text" onChange={onChangeNickname} />
                      </div>
                      <div>
                        {isCheckedNickname &&
                          <button className='mypage-btn-nick' onClick={onClickNicknameCheck} >중복확인</button>}
                        {isCheckedNickname &&
                          <button className='mypage-btn-nick2' onClick={cancelNickname}>취소</button>}
                        {isNicknamecheck &&
                          <button className='mypage-btn-nick' onClick={onSaveNickname}>저장</button>}
                        {isNicknamecheck &&
                          <button className='mypage-btn-nick2' onClick={cancelNickname}>취소</button>}
                      </div>
                    </>
                  }
                </tr>


                {/* 자기소개 */}
                <tr className="Form-item">
                  <div className="Form-Name">
                    <span>자기소개</span>
                  </div>

                  {!isChangeIntroduce ?
                    <>
                      <div className='mypage-input'>
                        <input className='inputBox' type="text" value={introduce} />
                      </div>
                      <button className='mypage-btn' onClick={e => setIsChangeIntroduce(true)}>수정</button>
                    </>
                    :
                    <>
                      <div className='mypage-input'>
                        <input className='inputBox' type="text" onChange={onChangeIntroduce} />
                      </div>
                      <button className='mypage-btn-int1' onClick={onSaveIntroduce}>저장</button>
                      <button className='mypage-btn-int2' onClick={cancelIntroduce}>취소</button>
                    </>
                  }
                </tr>


                {/* 이메일 */}
                <tr className="Form-item">
                  <div className="Form-Name">
                    <span>이메일</span>
                  </div>
                  {!isChangeEmail ?
                    <>
                      <div className='mypage-input'>
                        <input className='inputBox' type="mail" value={email} />
                      </div>
                      <button className='mypage-btn' onClick={RepairEmail}>수정</button>
                    </>
                    :
                    <>
                      <div className='mypage-input'>
                        <input className='inputBox' type="mail" onChange={OnChangeEmail} />
                      </div>
                      {isFixEmail &&
                        <button className='mypage-btn-ema1' onClick={onClickEmailCheck}>중복확인</button>}
                      {isFixEmail &&
                        <button className='mypage-btn-ema2' onClick={cancelEmail}>취소</button>}
                      {confirmEmail &&
                        <button className='mypage-btn-ema1' onClick={onClickEmailAdress}>이메일 인증</button>}
                      {confirmEmail &&
                        <button className='mypage-btn-ema2' onClick={cancelEmail}>취소</button>}
                      {emailDoubleCheck &&
                        <button className='mypage-btn-ema1' onClick={onSaveEmail}>저장</button>}
                      {emailDoubleCheck &&
                        <button className='mypage-btn-ema2' onClick={cancelEmail}>취소</button>}
                    </>
                  }
                </tr>


                {/* 주소 */}
                {isChangeAddress ?
                  <tr className="Form-item">
                    <div className="Form-Name">
                      <span>주소</span>
                    </div>
                    <div className='mypage-input'>
                      <select className='mypage-input-select1' onChange={onChangeRegion1}>
                        <option disabled selected>시도선택</option>
                        {sido.map((e) => (
                          <option key={e.sido} value={e.codeNm}>
                            {e.codeNm}
                          </option>
                        ))}
                      </select>
                      <select className='mypage-input-select2' onChange={onChangeRegion2}>
                        <option disabled selected>시/구/군선택</option>
                        {sigugun
                          .filter((e) => e.sido === keySido)
                          .map((e) => (
                            <option key={e.sigugun} value={e.codeNm}>
                              {e.codeNm}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div>
                      {regeion2Check && <button className='mypage-btn-select' onClick={onSaveAddress}>저장</button>}
                      <button className='mypage-btn-select' onClick={onClickCancelRegion}>취소</button>
                    </div>
                  </tr>
                  :
                  <div>
                    <tr className="Form-item">
                      <div className="Form-Name">
                        <span>주소</span>
                      </div>
                      <div className='mypage-input'>
                        <input className='mypage-input-addr1' type="text" value={region1} />
                        <input className='mypage-input-addr2' type="text" value={region2} />
                      </div>
                      <button className='mypage-btn-addr' onClick={e => setIsChangeAddress(true)}>수정</button>
                    </tr>
                  </div>
                }
              </table>

              <div className="Mypage-leave">
                <button className='Mypage-leave-btn' onClick={openUnregisterModal}>탈퇴하기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;