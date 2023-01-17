import React, { useState } from 'react';
import styled from 'styled-components';
import TeamAPI from '../0. API/TeamAPI';
import FindInfoModal from './FindInfoModal';
import EmailModal from './EmailModal';
import ChangePwdModal from '../99. Modal/ChangePwdModal';
import { useNavigate } from "react-router-dom";
import '../0. API/defultMain.css';






const Find_Container = styled.div`
    width:700px;
    height: 800px;
    border: 1px  ;
    position: relative;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 25px;
    z-index: 1;
    box-sizing: border-box;
    margin:0 auto;
    padding:50px;
    background-color: white;
    
    @media screen and (max-width: 750px){
        width:550px;

    }
    @media screen and (max-width: 570px){
        width:450px;
        padding: 0px;
        padding-top:40px;

    }
    @media screen and (max-width: 450px){
        width:360px;
        padding: 0px;
        padding-top:40px;
        height: 650px;

    }


`

const ErrorMsg = styled.p`
    text-align: right;
    color:red;
`

const FindIdMode = styled.div`
    background-color: #29335c;
`
const FindIdMode2 = styled.div`
    background-color: #29335c;
    opacity: 0.4;
`
const FindPwdMode = styled.div`
    background-color: #29335c;
`
const FindPwdMode2 = styled.div`
    background-color: #29335c;
    opacity: 0.4;
`


const SelectMode = styled.div`
    display: flex;
    align-items:center;
    justify-content: center;
    
    
    div{
        margin: 0 auto;
        font-size: 35px;
        width: 300px;
        height: 135px;
        text-align: center;
        position: relative;
        line-height: 135px;
        color:whitesmoke;
        font-family: 'MaplestoryOTFBold';

        &:nth-of-type(1){
            border: solid ;
            border-left:none;
            border-top:none;
            border-bottom:none;
            border-color: rgb(0,0,0,0.15);
        }
        @media screen and (max-width: 750px) {
            font-size: 30px;

        }
        @media screen and (max-width: 570px) {
            font-size: 25px;

        }
        @media screen and (max-width: 400px) {
            font-size: 20px;

        }


        
    }

    
`


const Input_Container = styled.div`
    position: relative;
    top: 160px;
    margin-top:50px;


    table{
        margin: 0 auto;
        div{
            margin-bottom: 70px;
            position: relative;
            bottom: 140px;

            @media screen and (max-width: 450px) {
                bottom: 140px;
                margin-bottom: 40px;

            }
            
        }
        
    }
    label{
        font-family: 'LINESeedKR-Bd';
        
    }

    th{
        poition: relative;
        width: 130px;
        font-size: 25px;
            @media screen and (max-width: 450px) {
            font-size: 20px;

            width:300px;
            min-width: 80px;

        }
    }

    .findInfo-btn{
        border : none;
        background-color: white;
        background: black;
        color: white;
        width: 600px;
        height: 50px;
        border-radius: 100px;
        letter-spacing: 2px;
        font-size: 25px;
        background-color: skyblue;
        border: 0px none;
        font-weight: 900;  
        position: relative;
        font-family: 'MaplestoryOTFBold';

            @media screen and (max-width: 750px) {
            width:420px;
            margin-left: 40px;
            right:24px;
            }
            @media screen and (max-width: 450px) {
            width:300px;
            right:10px;

        }
    }
    .findInfo-btn2{
        color: gray;
      position: relative;
      left: 470px;
      border-style: none;
      background: none;
      margin-bottom: 30px;
      border-bottom: 1px solid gray;

        @media screen and (max-width: 750px) {
           left:300px;
           font-size: 13px;
        }
        @media screen and (max-width: 450px) {
            font-size: 13px;
            width:125px;
            bottom:10px;
            left:200px;

    }

}
    
    
`

const Input = styled.input`
        width:340px;
        height: 50px;
        position: relative;
        margin-left: 80px;
        border : none;
        background-color: white;
        color: black;
        padding: 0.1rem;
        border-radius: 100px;
        letter-spacing: 2px;
        padding-left: 40px;
        font-size: 15px;
        border: 0px none;
        font-weight: 900;  
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        font-family: 'MaplestoryOTFBold';

        @media screen and (max-width: 750px) {
        width:270px;
        margin-left: 40px;

        }
        @media screen and (max-width: 450px) {
            width:240px;
            margin-left: 10px;
            margin-right: 10px;
    }

`



const FindInfo = () => {
    const navigate = useNavigate();

    const regexName = /^[ㄱ-ㅎ가-힣]{2,20}$/;
    const regexId = /^\w{5,20}$/;
    const regexEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);


    const [getId, setGetId] = useState('');
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [birth, setBirth] = useState('');
    const [name, setName] = useState('');
    const [inputPwd, setInputPwd] = useState('');
    const [nickname, setNickname] = useState('');
    const [introduce, setIntroduce] = useState('');
    const [gender, setGender] = useState('');
    const [region1, setRegion1] = useState("");
    const [region2, setRegion2] = useState("");
    const [url, setUrl] = useState("");
    const [mbti, setMbti] = useState("");

    const [isName, setIsName] = useState(false);
    const [isId, setIsId] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isBirth, setIsBirth] = useState(false);
    const [isFind, setIsFind] = useState(true);

    const [showReqName, setShowReqName] = useState(false);
    const [showReqId, setShowReqId] = useState(false);
    const [showReqEmail, setShowReqEmail] = useState(false);

    const [findDate, setFindDate] = useState(false);

    const reqName = "이름을 정확히 입력하세요."
    const reqId = "아이디를 입력하세요."
    const reqEmail = "이메일을 정확히 입력하세요."

    const regexPw = /^\w{8,20}$/;

    const [pwd, setPwd] = useState('');
    const [pwdcheck, setPwdcheck] = useState('');
    const [changePwdModalOpen, setChangePwdModalOpen] = useState(false);




    /* 비밀번호 저장 */
    const getPwd = (pwd) => { setPwd(pwd); }
    const openChangePwdModal = () => { setChangePwdModalOpen(true); };
    const closeChangePwdModal = () => { setChangePwdModalOpen(false); };
    const onSavePwd = async (e) => {

        try {
            const response = await TeamAPI.memberUpdate(id, pwd, nickname, introduce, email, region1, region2);

            if (response.status == 200) {
                alert("비밀번호 수정 완료!!");
                navigate('/login');
            }
        } catch (e) { console.log(e); }

    }


    const onChangeName = e => {
        let temp_name = e.target.value;
        setName(temp_name);
        if (temp_name === '' || !regexName.test(temp_name)) {
            setIsName(false);
            setShowReqName(true); //이름을 정확히 입력하세요.
        } else {
            setIsName(true);
            setShowReqName(false);
        }
    }
    const onChangeId = e => {
        let temp_id = e.target.value;
        setId(temp_id);
        if (temp_id === '' || !regexId.test(temp_id)) {
            setIsId(false);
            setShowReqId(true); // 아이디을 정확히 입력하세요.
        } else {
            setIsId(true);
            setShowReqId(false); // 아이디을 정확히 입력하세요.
        }
    }
    const onChangeEmail = e => {
        let temp_email = e.target.value;
        setEmail(temp_email);
        if (temp_email === '' || !regexEmail.test(temp_email)) {
            setIsEmail(false);
            setShowReqEmail(true); // 이메일을 정확히 입력하세요.
        } else {
            setIsEmail(true);
            setShowReqEmail(false);
        }
    }
    const onChangeBirth = e => {
        let temp_birth = e.target.value;
        setBirth(temp_birth);
        if (temp_birth !== null) {
            setIsBirth(true);
        }
    }

    const [states, setStates] = useState({
        mode: 'findId',
    });

    function changeMode(mode) {
        setStates({ ...states, ['mode']: mode })
    }

    const onClickFindPwd = async (e) => {
        e.preventDefault();
        try {
            const findPwd = await TeamAPI.findPwd(id, email, birth);

            if (findPwd.data === '') {
                setId("");
                setEmail("");
                setBirth("");
            } else {
                setFindDate(true);
                setIsBirth(false);
                setIsFind(false);
                setName(findPwd.data.name);
                setId(findPwd.data.id);
                setBirth(findPwd.data.birth);
                setGender(findPwd.data.gender);
                setPwd(findPwd.data.pwd);
                setNickname(findPwd.data.nickname);
                setIntroduce(findPwd.data.introduce);
                setEmail(findPwd.data.email);
                setRegion1(findPwd.data.region1);
                setRegion2(findPwd.data.region2);
                setUrl(findPwd.data.face);
                setMbti(findPwd.data.mbti);
            }
        } catch (e) {
            console.log(e);
        }
    };
    /*이메일 인증*/
    const onClickEmailAdress = async (e) => {
        e.preventDefault();
        try {
            const changeResult = await TeamAPI.emailCheck(email);
            if (changeResult.status === 200) {
                setOpen(true);
                setEmail(email);
            } else {
                setEmail("");
            }
        } catch (e) {
            console.log(e);
        }
    }


    const onClickFindId = async (e) => {
        e.preventDefault();
        try {
            if (isName && isEmail && isBirth) {
                const findId = await TeamAPI.findId(name, email, birth);
                if (findId.data === '') {
                    setId("");
                    setEmail("");
                    setBirth("");
                    alert('일치하지 않는 정보입니다.');

                } else {
                    setGetId(findId.data.id);
                    setOpen(true);
                }

            } else {
                alert('입력된 값을 확인하세요.');
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className='No-Nav-Container'>
            {/* mode 가 main 일 때 */}
            {states.mode === 'findId'
                ?
                <Find_Container>
                    <SelectMode>
                        <FindIdMode>
                            아이디 찾기
                        </FindIdMode>
                        <FindIdMode2 onClick={() => changeMode('findPwd')}>
                            비밀번호 찾기
                        </FindIdMode2>
                    </SelectMode>
                    <Input_Container>
                        <FindInfoModal open={open} modalName={getId} onHide={() => setOpen(false)} />
                        <form>
                            <table>
                                <div>
                                    <th>
                                        <label>이름</label>
                                    </th>
                                    <td>
                                        <Input type="text" placeholder="이름" value={name} onChange={onChangeName} required />
                                    </td>
                                    <ErrorMsg>{showReqName && reqName}</ErrorMsg>
                                </div>
                                <div>
                                    <th>
                                        <label>이메일</label>
                                    </th>
                                    <td>
                                        <Input type="text" placeholder="이메일" value={email} onChange={onChangeEmail} required />
                                    </td>
                                    <ErrorMsg>{showReqEmail && reqEmail}</ErrorMsg>
                                </div>
                                <div>
                                    <th>
                                        <label>생년월일</label>
                                    </th>
                                    <td>
                                        <Input type="date" value={birth} onChange={onChangeBirth} />
                                    </td>
                                </div>
                                <div>
                                    <button className='findInfo-btn' onClick={onClickFindId}>아이디 찾기</button>
                                </div>
                                <div>
                                    <button className='findInfo-btn2' onClick={()=>navigate('/login')}>로그인으로 돌아가기</button>
                                </div>
                            </table>
                        </form>
                    </Input_Container>
                </Find_Container>
                : null
            }

            {
                states.mode === 'findPwd'
                    ?
                    <Find_Container>
                        <SelectMode>
                            <FindPwdMode2 onClick={() => changeMode('findId')}>
                                아이디 찾기
                            </FindPwdMode2>
                            <FindPwdMode>
                                비밀번호 찾기
                            </FindPwdMode>
                        </SelectMode>
                        <Input_Container>
                            <EmailModal open={open} modalName={email} modalContent={() => setChangePwdModalOpen(true)} onHide={() => setOpen(false)} />
                            <ChangePwdModal open={changePwdModalOpen} close={closeChangePwdModal} getPwd={getPwd} onSavePwd={onSavePwd}></ChangePwdModal>
                            <form>
                                <table>
                                    <div>
                                        <th>
                                            <label >아 이 디</label>
                                        </th>
                                        <td>
                                            <Input type="text" placeholder="아이디" value={id} onChange={onChangeId} required />
                                        </td>
                                        <ErrorMsg>{showReqId && reqId}</ErrorMsg>
                                    </div>
                                    <div>
                                        <th>
                                            <label>이 메 일</label>
                                        </th>
                                        <td>
                                            <Input type="text" placeholder="이메일" value={email} onChange={onChangeEmail} disabled={findDate ? true : false} />
                                        </td>

                                        <ErrorMsg>{showReqEmail && reqEmail}</ErrorMsg>
                                    </div>
                                    <div>
                                        <th>
                                            <label>생 년 월 일</label>
                                        </th>
                                        <td>
                                            <Input type="date" value={birth} onChange={onChangeBirth} />
                                        </td>
                                    </div>
                                    <div>
                                        {isFind && <button className='findInfo-btn' onClick={onClickFindPwd}>정보 조회 하기</button>}
                                        {findDate && <button className='findInfo-btn' onClick={onClickEmailAdress}>이메일 인증</button>}
                                    </div>
                                    <div>
                                    <button className='findInfo-btn2' onClick={()=>navigate('/login')}>로그인으로 돌아가기</button>
                                </div>
                                </table>
                            </form>

                        </Input_Container>
                    </Find_Container>
                    : null
            }

        </div >

    )





}

export default FindInfo;