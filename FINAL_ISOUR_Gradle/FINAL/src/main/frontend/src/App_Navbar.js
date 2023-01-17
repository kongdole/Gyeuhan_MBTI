import { Route, Routes } from 'react-router-dom';
import MBTI from './6. MBTI/MBTI';
import MbtiTypes from './6. MBTI/MbtiTypes';
import Home from './4. Home/Home';
import Postbox from './7. PostBOX/Postbox';
import GuestBook from './10. GuestBook/GuestBook';
import ChatHome from './9.Chat/ChatHome';
import Matching from './8.Matching/Matching';
import MyPage from './5. MyPage/MyPage';
import Navbar from './Navbar/Navbar';
import '../src/App.css';
import KakaoToken from './2. Login/KakaoToken';
import AboutUs from './11. AboutUs/AboutUs';
import UserStore from './98. Context/UserStore';
import KakaoPayOne from './97. KakaoPay/KakaoPayOne';
import KakaoPayTwo from './97. KakaoPay/KakaoPayTen';
import KakaoPayThree from './97. KakaoPay/KakaoPayThree';
import KakaoPayTen from './97. KakaoPay/KakaoPayTen';
import Shop from './12.Shop/Shop';

function LoginUser() {

  return (
    <>
      <UserStore>
        <Navbar />
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/mypage' element={<MyPage />} />
          <Route path='/MBTI' element={<MBTI />} />
          <Route path='/MbtiTypes' element={<MbtiTypes />} />
          <Route path='/Postbox' element={<Postbox />} />
          <Route path='/GuestBook' element={<GuestBook />} />
          <Route path='/ChatHome' element={<ChatHome />} />
          <Route path='/Matching' element={<Matching />} />
          <Route path='/login/kakao' element={<KakaoToken />} />
          <Route path="/KakaoPayOne" element={<KakaoPayOne />} />
          <Route path="/KakaoPayTwo" element={<KakaoPayTwo />} />
          <Route path="/KakaoPayThree" element={<KakaoPayThree />} />
          <Route path="/KakaoPayTen" element={<KakaoPayTen />} />
          <Route path="/Shop" element={<Shop />} />
        </Routes>
      </UserStore>

    </>
  );
}

export default LoginUser;