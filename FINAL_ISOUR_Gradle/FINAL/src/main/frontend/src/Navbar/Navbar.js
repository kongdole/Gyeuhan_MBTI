import React, { useState,useEffect } from 'react';
import './Navbar.css';
import logo from '../images/logo.png'
import Logout from '../other/Logout';
import { CiCoinInsert } from "react-icons/ci";
import Cookies from 'universal-cookie';
import TeamAPI from '../0. API/TeamAPI';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../98. Context/UserStore';
import { useContext } from 'react';

function Navbar() {
  const cookies = new Cookies();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAccount, setShowAccount] = useState(false); 

  const [coin, setCoin] = useState('');
  const context = useContext(UserContext);
  const localId = cookies.get('rememberId');

  const navigate= useNavigate();
  const goShop=()=>{
    navigate('/Shop');
  }

  useEffect(() => {
    
    const memberData = async (e) => {


      try {
        const response = await TeamAPI.memberInfo(localId); // 원래는 전체 회원 조회용
        setCoin(response.data.coin);
        context['coin']=response.data.coin;
        window.sessionStorage.setItem('coin',response.data.coin);


      } catch (e) {
        console.log(e);
      }
    };
    memberData();
  }, [context.coin]);



  // 반응형 - 메뉴 눌렀을 때
  const onClickMenu = () => {
    setIsMenuOpen(isMenuOpen => !isMenuOpen);
  }

  // User 아이콘 눌렀을 때
  const onClickAccount = () => {
    setShowAccount(showAccount => !showAccount);
  }

  return (
    <div className='Navbar-Container'>
      <header>

      {/* logo 영역 */}
        <a href='/home' className="logo">
          <img src={logo} alt="logo" />
          <span><h3>MBTISOUR</h3></span>
        </a>

      {/* Navbar 영역 */}
        <ul className= {isMenuOpen ? "Navbar open" : "Navbar"}>
          <div className="User">
            <span className="material-symbols-outlined" onClick={onClickAccount} id="User-icon">account_circle</span>
            <ul className={showAccount ? "User-submenu open" : "User-submenu-close"}>
              <li><a href="/mypage">마이페이지</a></li> 
              <li><a href="/postbox">쪽지함</a></li>
              <li><a href="/chathome">1:1채팅</a></li>
              {showAccount ? <li><Logout /></li> : null}
            </ul>
          </div>
          
          <div className="Menu">
            <ul className='Menu-submenu'>
              
              <li><a href="/aboutus">About Us</a></li>
              <li><a href="/mbti">MBTI 검사</a></li>
              <li><a href="/MBTITypes">MBTI 유형</a></li>
              <li><a href="/guestbook">방명록</a></li>
              <li><a href="/matching">MATCHING</a></li>
              <li className='Logout open'><Logout /></li>
            </ul>
          </div>
        </ul>

      {/* Main 영역 */}
        <div className="Main-Icon">
        <CiCoinInsert className='Nav-Coin' onClick={goShop} size={50} />
          <span className='HowManyCoin'>{": "}{context.coin}</span>
          <div className="material-symbols-outlined"
            id="menu-icon" onClick={onClickMenu}>
            {isMenuOpen ? "close" : "menu"}
          </div>
        </div>

      </header>
    </div>
  )
}

export default Navbar