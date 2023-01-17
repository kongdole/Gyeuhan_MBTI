import React from 'react'
import { REST_API_KEY, REDIRECT_URI } from '../0. API/kakaoAPI';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TeamAPI from '../0. API/TeamAPI';
import Cookies from 'universal-cookie';
import { useNavigate  } from "react-router-dom";

export default function KakaoToken() {
    const kakao_Auth_Url = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    const [kakaoData, setKakaoData] = useState([]);
    const [kakao_id, setKakao_id] = useState('');
    const cookies = new Cookies();
    const navigate = useNavigate();


    useEffect(() => {
        // const kakao = () => {
        let params = new URL(document.location.toString()).searchParams;
        let code = params.get("code"); // 인가코드 받는 부분
        let grant_type = "authorization_code";
        let client_id = `${REST_API_KEY}`;

        axios.post(`https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${REDIRECT_URI}&code=${code}`
            , {
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            }).then((res) => {
                const access_token = (res.data.access_token);
                if (access_token) {
                    const kakaologinData = async () => {
                        try {
                            const res = await TeamAPI.KakaoLogin(access_token);
                            setKakaoData(res.data);
                            setKakao_id(res.data.id);
                            window.sessionStorage.setItem('kakaoNickname', res.data.kakaoNickname);
                            window.sessionStorage.setItem('kakaoEmail', res.data.kakaoEmail);
                            window.sessionStorage.setItem('kakaoId', res.data.kakaoId);

                            if (res.status === 201) {    // 201: 카카오톡 인증 완료 (로그인 성공)
                                cookies.set('rememberId', res.data.id, {
                                    path: '/',
                                    expires: 0
                                }
                                );
                                navigate('/home');
                                
                            } else if (res.data.CODE === "999") {   // 999: 카카오톡 인증 실패
                                alert('카카오계정을 다시 확인해주세요')

                            } else if (res.data !== null) {   // 카카오톡 인증 완료 (회원가입 이동)
                                navigate('/signup');
                                cookies.set('rememberEmail', res.data.kakaoEmail, {
                                    path: '/',
                                    expires: 0
                                }
                                );
                                
                            }

                        } catch (e) {
                            console.log("토큰 통신 오류 : ", e);
                        }
                    }
                    kakaologinData();
                }
            })
        // }
    }, [])


    return (
        <>
        </>
    );
}
