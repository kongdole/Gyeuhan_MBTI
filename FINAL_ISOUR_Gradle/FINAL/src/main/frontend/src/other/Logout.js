import Cookies from 'universal-cookie';
import { db } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

function Logout() {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const onClickLogout = async () => {
    console.log("id : ", cookies.get('rememberId'));
    await updateDoc(doc(db, "users", cookies.get('rememberId')), {
      isOnline: false,
    });

    cookies.remove('rememberId');
    cookies.remove('rememberEmail');
    cookies.remove('rememberMyInfo');
    
    window.sessionStorage.setItem("id", '');
    window.sessionStorage.setItem("kakaoId_num", '');
    window.sessionStorage.setItem("nickname", '');
    window.sessionStorage.setItem("kakaoNickname", '');
    window.sessionStorage.setItem("kakaoEmail",'');

    navigate("/");
  }

  return (
    <a> 
      {/* <span className="material-symbols-outlined" onClick={onClickLogout}>logout */}
        <h id="logout" onClick={onClickLogout}>로그아웃</h>
      {/* </span> */}
    </a>
  );
}

export default Logout;