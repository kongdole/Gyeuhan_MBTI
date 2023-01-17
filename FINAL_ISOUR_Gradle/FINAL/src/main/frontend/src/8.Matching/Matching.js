import React, { useState, useEffect, useContext } from 'react';
import TeamAPI from '../0. API/TeamAPI';
import SmsIcon from '@mui/icons-material/Sms';
import { IconButton } from '@mui/material';
import { db } from "../firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import FavoriteIcon from '@mui/icons-material/Favorite';
import EmailIcon from '@mui/icons-material/Email';
import face from '../images/기본 프로필.png'
import Cookies from 'universal-cookie';
import '../0. API/defultMain.css'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import NavigateNextIcon from '@mui/icons-material/ArrowBackIosNew';
import './Matching.css';
import { useNavigate } from 'react-router-dom';
import SadIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import { UserContext } from '../98. Context/UserStore';
import CoinModal from '../99. Modal/CoinModal';
import CoinModal2 from '../99. Modal/CoinModal2';
import CustomModal from '../99. Modal/CustomModal'


const Matching = () => {
  const cookies = new Cookies();
  // ▼ 로그인 안 되어 있으면 로그인 페이지로
  const localMyInfo = cookies.get('rememberMyInfo');
  const localId = localMyInfo.id;
  const localId_num = localMyInfo.idNum;

  const [url, setUrl] = useState(null);
  const [myId, setMyId] = useState('');
  const [id_num, setId_num] = useState('');
  const [myFace, setMyFace] = useState('');
  const [myNickname, setMyNickname] = useState('');
  const [myMbti, setMyMbti] = useState('');
  const [myIntroduce, setMyIntroduce] = useState('');
  const [myInfo, setMyInfo] = useState('');

  const [mat_memberInfo, setMat_MemberInfo] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [cnt, setCnt] = useState();

  //코인관련
  const context = useContext(UserContext);
  const [coin, setCoin] = useState('');

  const [maxPage, setMaxPage] = useState(1);


  /* ===== CustomModal 에 필요 ===== */
  const [state, setState] = useState({
    open: false, success: false, error: false,
    successMsg: "회원가입 성공", errorMsg: "입력된 값을 확인하세요!"
  });

  const onChangeState = () => {
    setState({ ...state, open: false, success: false, error: false });
  }

  /* ===== CustomModal 에 필요 ===== */
  const [state2, setState2] = useState({
    open: false, success: false, error: false,
    successMsg: "회원가입 성공", errorMsg: "입력된 값을 확인하세요!"
  });

  const onChangeState2 = () => {
    setState({ ...state, open: false, success: false, error: false });
  }



  /* ===== CustomModal 에 필요 ===== */
  const [state3, setState3] = useState({
    open: false, success: false, error: false,
    successMsg: "회원가입 성공", errorMsg: "코인이 부족합니다 결제페이지로 이동합니다."
  });
  const onChangeState3 = () => {
    setState3({ ...state3, open: false, success: false, error: false });
  }


  // 페이지 이동
  const onChangeNext = async (e) => {

    if (maxPage === pageNum) {
      if (coin >= 2) {
        setCoin(coin => coin - 2);
        tempCoin = coin - 2;

        setPageNum(pageNum + 1);
        console.log("pageNum : " + pageNum);
        setMaxPage(maxPage => maxPage + 1);

        const tempMaxPage = maxPage + 1;

        const restCoin = await TeamAPI.MaxPageUpdate(localId, tempCoin, tempMaxPage);
        if (restCoin.data.coin !== '') {
          alert("제대로 반영됐어요!")

          console.log(restCoin.data.coin)
          context['coin'] = restCoin.data.coin;
          console.log(context.coin);
          console.log(restCoin.data.coin);
          console.log(restCoin.data.maxPage);
          setMaxPage(restCoin.data.maxPage);

          // window.location.reload();


        } else {
          alert("반영 안됐어요!")
        }
      } else {
        setState3({ ...state3, open: true, error: true, errorMsg: "코인이 부족합니다 결제페이지로 이동합니다." });
        setTimeout(() => { nav("/shop") }, 2000);
      }

    } else {
      setPageNum(pageNum + 1);
      console.log("pgnum" + pageNum);
    }

  }

  const onChangePrev = () => {
    setPageNum(pageNum - 1);
    console.log("pageNum : " + pageNum);
  }



  // 내 정보 조회 
  useEffect(() => {
    const userData = async () => {
      console.log("\n>> 내정보 조회(useEffect)");
      console.log("\n\n현재 cookies 에 저장된 ID : " + localId);

      try {
        const response = await TeamAPI.memberInfo(localId);
        console.log(response.data);
        setMyInfo(response.data);
        setId_num(response.data.idNum);
        setMyId(response.data.id);
        setMyFace(response.data.face);
        setMyNickname(response.data.nickname);
        setMyMbti(response.data.mbti);
        setMyIntroduce(response.data.introduce);
        setCoin(response.data.coin);
        cookies.set('coinInfo', response.data.coin);
        setMaxPage(Number(response.data.maxPage));
        context['coin'] = response.data.coin;

      } catch (e) {
        console.log(e);
      }
    };
    userData();
  }, [coin, context.ModalOpen]);


  // 매칭 회원 정보 조회
  const nav = useNavigate();
  useEffect(() => {
    if (localId === undefined) nav("/login");
    // ▲ 로그인 안 되어 있으면 로그인 페이지로

    const memberData = async () => {

      try {
        const Mat = await TeamAPI.MatchingMember2(localId, localId_num, pageNum);
        console.log("****************");
        console.log(Mat.data);
        console.log(Mat.data[0].mat_id);
        console.log("****************");
        setMat_MemberInfo(Mat.data);
        const temp = Mat.data;
        // cookies.set('rememberfriendInfo', Mat.data[0].mat_id, {
        //   path: '/',
        //   expires: 0
        // })
        // 마지막 페이지 찾기
        const cnt = Number(Mat.data[0].cnt);
        console.log(typeof (cnt));
        setCnt(Math.ceil(cnt / 2));
        console.log("1", Mat.data);
        console.log("matIdNum : ", Mat.data[0].mat_id_num);
        console.log("matFace : ", Mat.data[0].mat_face);
        console.log("matNick : ", Mat.data[0].mat_nick);
        console.log("like_member_idx : ", Mat.data[0].like_member_idx);
        console.log("cnt : ", cnt);
      } catch (e) {
        console.log(e);

      }
    };
    memberData();
  }, [pageNum]);

  // 좋아요
  const [color, setColor] = useState('');
  const [like, setLike] = useState(0);

  const onClickLike = async (LikeIdNum) => {
    console.log("LikeIdNum :", LikeIdNum);
    setLike(LikeIdNum);

    try {
      const likeData = await TeamAPI.likeMember(localId_num, LikeIdNum);
      // 좋아요: 1
      // 좋아요 취소: 2
      // 아무것도 수행 안됨: 0
      console.log("%%%%% 좋아요 전송");
      console.log(likeData.data);

      if (likeData.data === 1) {
        // setColor('red-btn');
        document.getElementById(LikeIdNum).style.color = 'red';
      } else if (likeData.data === 2) {
        // setColor('');
        document.getElementById(LikeIdNum).style.color = '';
      } else {
        console.log("좋아요 오류");
      }
    } catch (e) {
      console.log(e);
    }
  }

  // 채팅하기 onClick
  const user1 = localId;
  console.log("user1 :", user1)
  let tempCoin = null;
  const onClickChatQ = (e) => {
    cookies.set('rememberfriendInfo', e);
    setState({ ...state, open: true, error: true, errorMsg: "코인 2개를 소모하시겠습니까?" });
  }



  const onClickPostQ = (e1, e2) => {
    console.log(e1);
    cookies.set('rememberFreindId', e1);

    console.log(e2);
    cookies.set('rememberFriendNick', e2);

    console.log('여기뭐임');
    setState2({ ...state2, open: true, error: true, errorMsg: "코인 2개를 소모하시겠습니까?" });

  }



  /* MBTI 검사하기 */
  const onClickTestStart = () => {
    nav("/MBTI");
  }


  /* 쪽지 기능 구현 */
  const [receiverId, setReceiverId] = useState("");
  const [receiverNickname, setReceiverNickname] = useState("");
  const [inputContent, setInputContent] = useState('');
  const [modalOn, setModalOn] = useState(false);
  const getInputContent = (content) => { setInputContent(content); }
  const openModal = () => { setModalOn(true); };
  const closeModal = () => { setModalOn(false); };

  const onClickPostIcon = (receiverId, receiverNickname) => {
    setReceiverId(receiverId);
    setReceiverNickname(receiverNickname);
    setModalOn(true);
  };

  /* 보내기 버튼 클릭 */
  const onSendPost = async (e) => {
    // e.preventDefault();
    try {
      const response = await TeamAPI.sendPost(myId, receiverId, inputContent);

      if (response.status == 200) {
        alert("쪽지 보내기 성공!!");
        closeModal();
      }
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <div className='Container'>
      <div className='Matching-Container' >
        <CoinModal state={state} changeState={onChangeState} />
        <CoinModal2 state={state2} changeState={onChangeState2} />
        <CustomModal state={state3} changeState={onChangeState3} />

        {/* <SendPostModal open={modalOn} close={closeModal} receiver={receiverNickname} getInputContent={getInputContent} onSendPost={onSendPost}/> */}

        <div className='User-Box'>
          <div className='User-profile'>
            {myFace != null
              ? <img src={myFace} alt="프로필 이미지" />
              : <img src={face} alt="프로필 이미지" />}
          </div>
          <div className="User-item">
            <input type="text" value={myMbti} disabled />
            <textarea type="text" value={myNickname} disabled />
          </div>
          <div className="User-item">
            <textarea className='User-Introduce' type="text" value={myIntroduce} disabled />
          </div>
        </div>

        {(myMbti === null) ?
          <div className='Matching-Message'>
            <p>아직 MBTI 검사를 하지 않았어요!</p>
            <button className='mbti-btn' onClick={onClickTestStart}>검사하러가기</button>
          </div>

          : (mat_memberInfo.length != 0) ?

            mat_memberInfo.map((mat) => (
              <div className='mat-cont'>
                <div className='Mat-Box' key={mat.id}>
                  <div className='Mat-profile'>
                    <img src={mat.mat_face || face} alt="프로필 이미지" />
                  </div>
                  <div className="Mat-item">
                    <input value={mat.mat_mbti} disabled />
                    <textarea value={mat.mat_nick} disabled />
                  </div>
                  <div className="Mat-item">
                    <textarea className='Mat-Introduce' type="text" value={mat.mat_introduce} />
                  </div>
                </div>
                <div className='Mat-icon'>
                  <IconButton>
                    {/* {`${like === mat.mat_id_num ? color : mat.like_member_idx === 'Y' ? 'red-btn' : ''}`} */}
                    {mat.like_member_idx}
                    {/* {like} */}
                    <FavoriteIcon className='' id={mat.mat_id_num} style={{
                      fontSize: 'xx-large', backgroundColor: 'unset', color: (mat.like_member_idx === 'Y')
                        ? 'red'
                        : 'unset'
                    }} onClick={() => onClickLike(mat.mat_id_num)} />
                    {mat.mat_id_num}
                  </IconButton>
                  <IconButton>
                    <SmsIcon className='Chat-icon' style={{ fontSize: 'xx-large' }} onClick={() => onClickChatQ(mat.mat_id)} />
                  </IconButton>
                  <IconButton>
                    <EmailIcon className='Post-icon' style={{ fontSize: 'xx-large' }} onClick={() => onClickPostQ(mat.mat_id, mat.mat_nick)} />
                  </IconButton>
                </div>
              </div>
            ))

            : <div className='Matching-Message'> 아쉽지만, 매칭된 친구가 없어요 <SadIcon style={{ fontSize: 'xx-large' }} /> </div>
        }

        <div className='page-btn1'>
          <div className='matching_MaxPageInfo'>
            내가 볼 수 있는 최대 Matching Page  :  <span>{maxPage}</span>
          </div>
          <IconButton className='prevbtn' style={{ backgroundColor: 'unset' }} onClick={onChangePrev} disabled={(pageNum === 1) ? true : false}>
            <ArrowBackIosNewIcon style={{ fontSize: 'xx-large' }} />
          </IconButton>
          {/* </div>
          
        <div className='page-btn2'> */}
          <div style={{ fontSize: 'x-large' }} >{pageNum}</div>
          <IconButton className='nextbtn' style={{ backgroundColor: 'unset' }} onClick={onChangeNext} disabled={(pageNum === ((mat_memberInfo.length === 0) ? 1 : cnt)) ? true : false}>
            <NavigateNextIcon style={{ transform: 'rotate(180deg)', fontSize: 'xx-large' }} />
          </IconButton>
          <div className='matching_MaxPageInfo2'>
            조회 할 수 있는 최대 Matching page:  <span>{cnt}</span>
          </div>
        </div>

      </div>
    </div>
  )
}
export default Matching;
