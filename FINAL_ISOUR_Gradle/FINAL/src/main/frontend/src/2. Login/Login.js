import React, { useState, useEffect } from 'react';
import TeamAPI from '../0. API/TeamAPI';
import '../2. Login/Login.css';
import "../images/아이셔용.png"
import { motion } from "framer-motion";
import Cookies from 'universal-cookie';
import kakao from '../images/kakao2.png';
import { REST_API_KEY, REDIRECT_URI } from '../0. API/kakaoAPI';
import { useNavigate } from "react-router-dom";
import lock from "../images/lock.png";
import person from "../images/person.png";
import google from "../images/google_logo_icon.png";
import CustomModal from '../99. Modal/CustomModal'
import logo from '../images/logo.png';
import { db } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";
import GoogleLogin from '@leecheuk/react-google-login';
import { gapi } from 'gapi-script';

function Login({ setUserInfo, setIsLogin }) {
  const cookies = new Cookies();
  const localId = cookies.get('rememberId');
  const navigate = useNavigate();
  if (localId !== undefined) navigate("/home");

  /* ===== CustomModal 에 필요 ===== */
  const [state, setState] = useState({
    open: false, success: false, error: false,
    successMsg: "회원가입 성공", errorMsg: "아이디 또는 비밀번호를 확인하세요!"
  });

  const onChangeState = () => {
    setState({ ...state, open: false, success: false, error: false });
  }

  const EnterPress = (e) => {
    if (e.key === 'Enter') {
      onClickLogin();
    }
  }

  const clientId = '32798100349-4jf8hseid7s7dcgi2vi3h0fnsq67glb0.apps.googleusercontent.com';

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: ''
      });
    };
    gapi.load('client:auth2', initClient);
  }, []);
  const onSuccess = (res) => {
    console.log('success:', res);
    console.log(res.wt.cu);
    cookies.set('rememberEmail', res.wt.cu, {
      path: '/',
      expires: 0
    }
    );
    googleInfo();
  };
  const onFailure = (err) => {
    console.log('failed:', err);
  };
  const googleInfo = async (e) => {
    try {
      const res = await TeamAPI.googleInfo(cookies.get('rememberEmail'));

      if (res.data.id != null) {
        cookies.set('rememberId', res.data.id, {
          path: '/',
          expires: 0
        }
        );
        navigate("/home");

      } else {

        navigate("/signup");
      }
    } catch {
      console.log(e)
    }
  };



  // 카카오톡 로그인
  const kakao_Auth_Url = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [checkedItems, setCheckedItems] = useState(false);

  const onClickAutologin = () => {
    if (checkedItems === false) {
      setCheckedItems(true);
    } else {
      setCheckedItems(false);
    }
  }

  /*
  아이디 변경 */
  const onChangeId = (e) => {
    let temp_id = e.target.value;
    setId(temp_id);
  }

  /*
  비밀번호 변경 */
  const onChangePwd = (e) => {
    let temp_pwd = e.target.value;
    setPwd(temp_pwd);
  }


  /*
  Login 버튼 클릭 */
  const onClickLogin = async (e) => {
    // e.preventDefault();
    try {
      const res = await TeamAPI.userLogin(id, pwd);
      window.sessionStorage.setItem("isLogin", "TRUE");
      if (res.data === true) {
        if (checkedItems === true) {
          const Autologin = new Date();
          Autologin.setDate(Autologin.getDate() + 10);
          cookies.set('rememberId', id, {
            path: '/',
            expires: Autologin
          }
          );

        } else {
          cookies.set('rememberId', id, {
            path: '/',
            expires: 0
          },
          );

        }

        navigate("/home");
        updateDoc(doc(db, "users", id), {
          isOnline: true
        });
      } else {
        setState({ ...state, open: true, error: true, errorMsg: "아이디 또는 비밀번호를 확인하세요!" });
      }
    } catch (e) {
      console.log(e);
    }
  }



  return (
    <div className='No-Nav-Container'>
      <CustomModal state={state} changeState={onChangeState} />
      <div className="Login-Container">

        <div className="Login-Main-Header">
          <img src={logo} alt="logo" />
          <h1>MBTISOUR</h1>
        </div>

        {/* 아이디 */}
        <div className='Login-Body'>
          <div className="Login-Id">
            <img src={person} />
            <input className="Login-input" type="text" placeholder="Enter ID" value={id} onKeyDown={EnterPress} onChange={onChangeId} required />
          </div>

          {/* 비밀번호 */}

          <div className="Login-PW">
            <img className="Login-input-img" src={lock} />
            <input className="Login-input" type="password" placeholder="Enter Password" onKeyDown={EnterPress} value={pwd} onChange={onChangePwd} />
          </div>

          <div className='Auto-Login' >
            <label>
              <input className='Auto-Login-input' type="checkbox" id='checkbox' onClick={onClickAutologin} />
              <span className='Auto-Login-text'>자동로그인</span>
            </label>
            <span>|</span>
            <a href="/FindInfo">아이디/비밀번호 찾기</a>
          </div>
        </div>
        <motion.button className="Login-botton" type="submit" onClick={onClickLogin}>로그인</motion.button>
        <div className='Login-kakao'>
          <a className='login-logo'>
            <a href={kakao_Auth_Url}>
              <div className='img-circle'>
                <img className='kakao-img' style={{ width: "4rem", height: "4rem", objectFit: "cover" }} src={kakao} />
              </div>
            </a>
            카카오 로그인
          </a>
          <a className='login-logo'>
            <div className='img-circle'>

              <GoogleLogin className='Login-GoogleLogin' src={google} style={{ width: "2rem", height: "2rem", objectFit: "cover" }}
                clientId={clientId}
                buttonText=""
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
              // isSignedIn={true}
              />

            </div>
            구글 로그인
          </a>
          {/* <GoogleLogin className='Login-GoogleLogin'
            clientId={clientId}
            buttonText=""
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            // isSignedIn={true}
          /> */}

        </div>
        <div className="Login-footer">
          가입하고 친구를 만들어봐요! <a href="/signup">  회원가입</a>
        </div>
      </div>
    </div>
  );
}

export default Login;