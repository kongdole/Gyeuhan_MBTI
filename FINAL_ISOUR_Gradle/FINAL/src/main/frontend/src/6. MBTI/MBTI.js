import '../6. MBTI/MBTIStart.css';
import '../6. MBTI/MBTIQuiz.css';
import '../6. MBTI/MBTIResult.css';
import { useEffect, useState } from "react";
import TeamAPI from '../0. API/TeamAPI';
import 논리술사 from '../images/논리술사.png';
import 통솔자 from '../images/통솔자.png';
import 변론가 from '../images/변론가.png';
import 옹호자 from '../images/옹호자.png';
import 중재자 from '../images/중재자.png';
import 선도자 from '../images/선도자.png';
import 활동가 from '../images/활동가.png';
import 현실주의자 from '../images/현실주의자.png';
import 수호자 from '../images/수호자.png';
import 경영자 from '../images/경영자.png';
import 집정관 from '../images/집정관.png';
import 장인 from '../images/장인.png';
import 모험가 from '../images/모험가.png';
import 사업가 from '../images/사업가.png';
import 연예인 from '../images/연예인.png';
import Cookies from 'universal-cookie';
import { VscArrowRight } from "react-icons/vsc";
import { IoPeople, IoPersonAdd } from "react-icons/io5";
import { MdPsychology, MdQuiz } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import '../0. API/defultMain.css';


//퀴즈 컴포넌트
const Quiz = (props) => {
  const navigate = useNavigate();

  const OnclickGetFreind = () => {
    navigate('/matching');
  }


  const cookies = new Cookies();

  const localId = cookies.get('rememberId');
  if (localId === undefined) navigate("/");


  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(1);
  const [EnI, setEnI] = useState(0);
  const [SnN, setSnN] = useState(0);
  const [TnF, setTnF] = useState(0);
  const [JnP, setJnP] = useState(0);



  const [testMBTI, setTestMBTI] = useState("");
  useEffect(() => {
  }, [EnI, SnN, TnF, JnP]);

  const answerNoList = {
    answer: ["I", "N", "F", "P"]
  };
  const answerYesList = {
    answer: ["E", "S", "T", "J"]
  };

  // 결과 페이지
  if (count === props.questionList.length) {
    if (testMBTI === "ISTJ") {
      return (
        <div className='MBTI-ResultContainer'>
          <div>
            <div className='MBTI-MyMbti'>
              <td>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-istj" target='_blank'>
                  <img src={현실주의자}></img>
                </a>
                <p>{"ISTJ"}</p>
              </td>
              <span>
                <div className='MBTI-Character'>{"#진실한 삶"}</div>
                <div className='MBTI-Character'>{"#책임감 추구"}</div>
              </span>
            </div>
            <button className='MBTI-StyledButton' onClick={OnclickGetFreind}>
              <span>단짝 친구 찾으러 가기</span>
              <VscArrowRight className="arrow" size={35} />
            </button>
            <div className='MBTI-Underline' />
            <div className='MBTI-Mbtiment'>{testMBTI}의 단짝 유형</div>



            <div className='MBTI-Recommend'>
              <div className='MBTI-RecommendByOne'>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-esfp" target='_blank'>
                  <img src={연예인}></img>
                </a>
                <p>{'ESFP'}</p>
              </div>            </div>
            <div className='MBTI-Mbtiment2'>이미지를 클릭하면 해당 유형의 상세페이지로 이동합니다.</div>
          </div>

        </div>
      );
    } else if (testMBTI === "ESTJ") {
      return (
        <div className='MBTI-ResultContainer'>
          <div>
            <div className='MBTI-MyMbti'>
              <td>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-estj" target='_blank'>
                  <img src={경영자}></img>
                </a>
                <p>{"ESTJ"}</p>
              </td>
              <span>
                <div className='MBTI-Character'>{"#높은 책임감"}</div><br />
                <div className='MBTI-Character'>{"#지도력"}</div>
              </span>
            </div>
            <button className='MBTI-StyledButton' onClick={OnclickGetFreind}>
              <span>단짝 친구 찾으러 가기</span>
              <VscArrowRight className="arrow" size={35} />
            </button>
            <div className='MBTI-Underline' />
            <div className='MBTI-Mbtiment'>{testMBTI}의 단짝 유형</div>
            <div className='MBTI-Recommend'>
              <div className='MBTI-RecommendByOne'>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-intp" target='_blank'>
                  <img src={논리술사}></img>
                </a>
                <p>{'INTP'}</p>
              </div>              <div className='MBTI-RecommendByOne'>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-isfp" target='_blank'>
                  <img src={모험가}></img>
                </a>
                <p>{'ISFP'}</p>
              </div>              <div className='MBTI-RecommendByOne'>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-istp">
                  <img src={장인}></img>
                </a>
                <p>{'ISTP'}</p>
              </div>            </div>
            <div className='MBTI-Mbtiment2'>이미지를 클릭하면 해당 유형의 상세페이지로 이동합니다.</div>
          </div>
        </div>
      );
    } else if (testMBTI === "ESFJ") {
      return (
        <div className='MBTI-ResultContainer'>
          <div>
            <div className='MBTI-MyMbti'>
              <td>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-esfj" target='_blank'>
                  <img src={집정관}></img>
                </a>
                <p>{"ESFJ"}</p>
              </td>
              <span>
                <div className='MBTI-Character'>{"#오랜관계 추구"}</div>
                <div className='MBTI-Character'>{"#책임감"}</div>
              </span>
            </div>

            <button className='MBTI-StyledButton' onClick={OnclickGetFreind}>
              <span>단짝 친구 찾으러 가기</span>
              <VscArrowRight className="arrow" size={35} />
            </button>
            <div className='MBTI-Underline' />
            <div className='MBTI-Mbtiment'>{testMBTI}의 단짝 유형</div>


            <div className='MBTI-Recommend'>
              <div className='MBTI-RecommendByOne'>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-isfp" target='_blank'>
                  <img src={모험가}></img>
                </a>
                <p>{'ISFP'}</p>
              </div>              <div className='MBTI-RecommendByOne'>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-istp">
                  <img src={장인}></img>
                </a>
                <p>{'ISTP'}</p>
              </div>            </div>
            <div className='MBTI-Mbtiment2'>이미지를 클릭하면 해당 유형의 상세페이지로 이동합니다.</div>
          </div>

        </div>
      );
    } else if (testMBTI === "ISFJ") {
      return (
        <div className='MBTI-ResultContainer'>
          <div>
            <div className='MBTI-MyMbti'>
              <td>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-isfj" target='_blank'>
                  <img src={수호자}></img>
                </a>
                <p>{"ISFJ"}</p>
              </td>
              <span>
                <div className='MBTI-Character'>{"#소통 추구"}</div>
                <div className='MBTI-Character'>{"#충실한 성격"}</div>
              </span>
            </div>

            <button className='MBTI-StyledButton' onClick={OnclickGetFreind}>
              <span>단짝 친구 찾으러 가기</span>
              <VscArrowRight className="arrow" size={35} />
            </button>
            <div className='MBTI-Underline' />
            <div className='MBTI-Mbtiment'>{testMBTI}의 단짝 유형</div>


            <div className='MBTI-Recommend'>
              <div className='MBTI-RecommendByOne'>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-esfp" target='_blank'>
                  <img src={연예인}></img>
                </a>
                <p>{'ESFP'}</p>
              </div>              <div className='MBTI-RecommendByOne'>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-estp" target='_blank'>
                  <img src={사업가}></img>
                </a>
                <p>{'ESTP'}</p>
              </div>            </div>
            <div className='MBTI-Mbtiment2'>이미지를 클릭하면 해당 유형의 상세페이지로 이동합니다.</div>
          </div>

        </div>
      );
    } else if (testMBTI === "ESTP") {
      return (
        <div className='MBTI-ResultContainer'>
          <div>
            <div className='MBTI-MyMbti'>
              <td>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-estp" target='_blank'>
                  <img src={사업가}></img>
                </a>
                <p>{"ESTP"}</p>
              </td>
              <span>
                <div className='MBTI-Character'>{"#높은 관찰력"}</div>
                <div className='MBTI-Character'>{"#실천 추구"}</div>
              </span>
            </div>
            <button className='MBTI-StyledButton' onClick={OnclickGetFreind}>
              <span>단짝 친구 찾으러 가기</span>
              <VscArrowRight className="arrow" size={35} />
            </button>
            <div className='MBTI-Underline' />
            <div className='MBTI-Mbtiment'>{testMBTI}의 단짝 유형</div>



            <div className='MBTI-Recommend'>
              <div className='MBTI-RecommendByOne'>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-isfj" target='_blank'>
                  <img src={수호자}></img>
                </a>
                <p>{'ISFJ'}</p>
              </div>            </div>
            <div className='MBTI-Mbtiment2'>이미지를 클릭하면 해당 유형의 상세페이지로 이동합니다.</div>
          </div>

        </div>
      );
    } else if (testMBTI === "ISTP") {
      return (
        <div className='MBTI-ResultContainer'>
          <div>
            <div className='MBTI-MyMbti'>
              <td>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-istp">
                  <img src={장인}></img>
                </a>
                <p>{"ISTP"}</p>
              </td>
              <span>
                <div className='MBTI-Character'>{"#장인"}</div>
                <div className='MBTI-Character'>{"#색다름 추구"}</div>
              </span>
            </div>

            <button className='MBTI-StyledButton' onClick={OnclickGetFreind}>
              <span>단짝 친구 찾으러 가기</span>
              <VscArrowRight className="arrow" size={35} />
            </button>
            <div className='MBTI-Underline' />
            <div className='MBTI-Mbtiment'>{testMBTI}의 단짝 유형</div>


            <div className='MBTI-Recommend'>
              <div className='MBTI-RecommendByOne'>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-esfj" target='_blank'>
                  <img src={집정관}></img>
                </a>
                <p>{'ESFJ'}</p>
              </div>              <div className='MBTI-RecommendByOne'>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-estj" target='_blank'>
                  <img src={경영자}></img>
                </a>
                <p>{'ESTJ'}</p>
              </div>            </div>
            <div className='MBTI-Mbtiment2'>이미지를 클릭하면 해당 유형의 상세페이지로 이동합니다.</div>
          </div>

        </div>
      );
    } else if (testMBTI === "ESFP") {
      return (
        <div className='MBTI-ResultContainer'>
          <div>
            <div className='MBTI-MyMbti'>
              <td>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-esfp" target='_blank'>
                  <img src={연예인}></img>
                </a>
                <p>{"ESFP"}</p>
              </td>
              <span>
                <div className='MBTI-Character'>{"#열정적"}</div>
                <div className='MBTI-Character'>{"#즐거움 추구"}</div>
              </span>
            </div>

            <button className='MBTI-StyledButton' onClick={OnclickGetFreind}>
              <span>단짝 친구 찾으러 가기</span>
              <VscArrowRight className="arrow" size={35} />
            </button>
            <div className='MBTI-Underline' />
            <div className='MBTI-Mbtiment'>{testMBTI}의 단짝 유형</div>


            <div className='MBTI-Recommend'>
              <div className='MBTI-RecommendByOne'>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-isfj" target='_blank'>
                  <img src={수호자}></img>
                </a>
                <p>{'ISFJ'}</p>
              </div>              <div className='MBTI-RecommendByOne'>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-istj" target='_blank'>
                  <img src={현실주의자}></img>
                </a>
                <p>{'ISTJ'}</p>
              </div>            </div>
            <div className='MBTI-Mbtiment2'>이미지를 클릭하면 해당 유형의 상세페이지로 이동합니다.</div>
          </div>

        </div>
      );
    } else if (testMBTI === "ISFP") {
      return (
        <div className='MBTI-ResultContainer'>
          <div>
            <div className='MBTI-MyMbti'>
              <td>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-isfp" target='_blank'>
                  <img src={모험가}></img>
                </a>
                <p>{"ISFP"}</p>
              </td>
              <span>
                <div className='MBTI-Character'>{"#개방적"}</div>
                <div className='MBTI-Character'>{"#조화로운 삶"}</div>
              </span>
            </div>

            <button className='MBTI-StyledButton' onClick={OnclickGetFreind}>
              <span>단짝 친구 찾으러 가기</span>
              <VscArrowRight className="arrow" size={35} />
            </button>
            <div className='MBTI-Underline' />
            <div className='MBTI-Mbtiment'>{testMBTI}의 단짝 유형</div>


            <div className='MBTI-Recommend'>
              <div className='MBTI-RecommendByOne'>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-esfj" target='_blank'>
                  <img src={집정관}></img>
                </a>
                <p>{'ESFJ'}</p>
              </div>              <div className='MBTI-RecommendByOne'>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-estj" target='_blank'>
                  <img src={경영자}></img>
                </a>
                <p>{'ESTJ'}</p>
              </div>            </div>
            <div className='MBTI-Mbtiment2'>이미지를 클릭하면 해당 유형의 상세페이지로 이동합니다.</div>
          </div>

        </div>
      );
    } else if (testMBTI === "ENTP") {
      return (
        <div className='MBTI-ResultContainer'>
          <div>
            <div className='MBTI-MyMbti'>
              <td>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-entp" target='_blank'>
                  <img src={변론가}></img>
                </a>
                <p>{"ENTP"}</p>
              </td>
              <span>
                <div className='MBTI-Character'>{"#규칙파괴자"}</div>
                <div className='MBTI-Character'>{"#풍부한 지식"}</div>
              </span>
            </div>

            <button className='MBTI-StyledButton' onClick={OnclickGetFreind}>
              <span>단짝 친구 찾으러 가기</span>
              <VscArrowRight className="arrow" size={35} />
            </button>
            <div className='MBTI-Underline' />
            <div className='MBTI-Mbtiment'>{testMBTI}의 단짝 유형</div>


            <div className='MBTI-Recommend'>
              <div className='MBTI-RecommendByOne'>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-infj" target='_blank'>
                  <img src={옹호자}></img>
                </a>
                <p>{'INFJ'}</p>
              </div>              <div className='MBTI-RecommendByOne'>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-intj" target='_blank'>
                  <img src={논리술사}></img>
                </a>
                <p>{'INTJ'}</p>
              </div>            </div>
            <div className='MBTI-Mbtiment2'>이미지를 클릭하면 해당 유형의 상세페이지로 이동합니다.</div>
          </div>

        </div>
      );
    } else if (testMBTI === "INTP") {
      return (
        <div className='MBTI-ResultContainer'>
          <div>
            <div className='MBTI-MyMbti'>
              <td>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-intp" target='_blank'>
                  <img src={논리술사}></img>
                </a>
                <p>{"INTP"}</p>
              </td>
              <span>
                <div className='MBTI-Character'>{"#아이디어 뿜뿜"}</div>
                <div className='MBTI-Character'>{"#생각많음"}</div>
              </span>
            </div>

            <button className='MBTI-StyledButton' onClick={OnclickGetFreind}>
              <span>단짝 친구 찾으러 가기</span>
              <VscArrowRight className="arrow" size={35} />
            </button>
            <div className='MBTI-Underline' />
            <div className='MBTI-Mbtiment'>{testMBTI}의 단짝 유형</div>


            <div className='MBTI-Recommend'>
              <div className='MBTI-RecommendByOne'>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-entj" target='_blank'>
                  <img src={통솔자}></img>
                </a>
                <p>{'ENTJ'}</p>
              </div>            </div>
            <div className='MBTI-Mbtiment2'>이미지를 클릭하면 해당 유형의 상세페이지로 이동합니다.</div>
          </div>

        </div>
      );
    } else if (testMBTI === "ENTJ") {
      return (
        <div className='MBTI-ResultContainer'>
          <div>
            <div className='MBTI-MyMbti'>
              <td>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-entj" target='_blank'>
                  <img src={통솔자}></img>
                </a>
                <p>{"ENTJ"}</p>
              </td>
              <span>
                <div className='MBTI-Character'>{"#목표 갈망"}</div>
                <div className='MBTI-Character'>{"#현실적"}</div>
              </span>
            </div>

            <button className='MBTI-StyledButton' onClick={OnclickGetFreind}>
              <span>단짝 친구 찾으러 가기</span>
              <VscArrowRight className="arrow" size={35} />
            </button>
            <div className='MBTI-Underline' />
            <div className='MBTI-Mbtiment'>{testMBTI}의 단짝 유형</div>


            <div className='MBTI-Recommend'>
              <div className='MBTI-RecommendByOne'>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-infj" target='_blank'>
                  <img src={옹호자}></img>
                </a>
                <p>{'INFJ'}</p>
              </div>              <div className='MBTI-RecommendByOne'>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-intp" target='_blank'>
                  <img src={논리술사}></img>
                </a>
                <p>{'INTP'}</p>
              </div>            </div>
            <div className='MBTI-Mbtiment2'>이미지를 클릭하면 해당 유형의 상세페이지로 이동합니다.</div>
          </div>

        </div>
      );
    } else if (testMBTI === "INTJ") {
      return (
        <div className='MBTI-ResultContainer'>
          <div>
            <div className='MBTI-MyMbti'>
              <td>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-intj" target='_blank'>
                  <img src={논리술사}></img>
                </a>
                <p>{"INTJ"}</p>
              </td>
              <span>
                <div className='MBTI-Character'>{"#개척자정신"}</div>
                <div className='MBTI-Character'>{"#지적갈망"}</div>
              </span>
            </div>

            <button className='MBTI-StyledButton' onClick={OnclickGetFreind}>
              <span>단짝 친구 찾으러 가기</span>
              <VscArrowRight className="arrow" size={35} />
            </button>
            <div className='MBTI-Underline' />
            <div className='MBTI-Mbtiment'>{testMBTI}의 단짝 유형</div>


            <div className='MBTI-Recommend'>
              <div className='MBTI-RecommendByOne'>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-enfp" target='_blank'>
                  <img src={활동가}></img>
                </a>
                <p>{'ENFP'}</p>
              </div>              <div className='MBTI-RecommendByOne'>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-entp" target='_blank'>
                  <img src={변론가}></img>
                </a>
                <p>{'ENTP'}</p>
              </div>            </div>
            <div className='MBTI-Mbtiment2'>이미지를 클릭하면 해당 유형의 상세페이지로 이동합니다.</div>
          </div>

        </div>
      );
    } else if (testMBTI === "ENFJ") {
      return (
        <div className='MBTI-ResultContainer'>
          <div>
            <div className='MBTI-MyMbti'>
              <td>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-enfj" target='_blank'>
                  <img src={선도자}></img>
                </a>
                <p>{"ENFJ"}</p>
              </td>
              <span>
                <div className='MBTI-Character'>{"#깊은 배려"}</div>
                <div className='MBTI-Character'>{"#신념 추구"}</div>
              </span>
            </div>

            <button className='MBTI-StyledButton' onClick={OnclickGetFreind}>
              <span>단짝 친구 찾으러 가기</span>
              <VscArrowRight className="arrow" size={35} />
            </button>
            <div className='MBTI-Underline' />
            <div className='MBTI-Mbtiment'>{testMBTI}의 단짝 유형</div>


            <div className='MBTI-Recommend'>
              <div className='MBTI-RecommendByOne'>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-infp" target='_blank'>
                  <img src={중재자} />
                </a>
                <p>{'INFP'}</p>
              </div>              <div className='MBTI-RecommendByOne'>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-isfp" target='_blank'>
                  <img src={모험가}></img>
                </a>|
                <p>{'ISFP'}</p>
              </div>            </div>
            <div className='MBTI-Mbtiment2'>이미지를 클릭하면 해당 유형의 상세페이지로 이동합니다.</div>
          </div>

        </div>
      );
    } else if (testMBTI === "INFJ") {
      return (
        <div className='MBTI-ResultContainer'>
          <div>
            <div className='MBTI-MyMbti'>
              <td>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-infj" target='_blank'>
                  <img src={옹호자}></img>
                </a>
                <p>{"INFJ"}</p>
              </td>
              <span>
                <div className='MBTI-Character'>{"#목적 중시"}</div>
                <div className='MBTI-Character'>{"#소통 추구"}</div>
              </span>
            </div>

            <button className='MBTI-StyledButton' onClick={OnclickGetFreind}>
              <span>단짝 친구 찾으러 가기</span>
              <VscArrowRight className="arrow" size={35} />
            </button>
            <div className='MBTI-Underline' />
            <div className='MBTI-Mbtiment'>{testMBTI}의 단짝 유형</div>


            <div className='MBTI-Recommend'>
              <div className='MBTI-RecommendByOne'>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-enfp" target='_blank'>
                  <img src={활동가}></img>
                </a>
                <p>{'ENFP'}</p>
              </div>              <div className='MBTI-RecommendByOne'>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-entp" target='_blank'>
                  <img src={변론가}></img>
                </a>
                <p>{'ENTP'}</p>
              </div>            </div>
            <div className='MBTI-Mbtiment2'>이미지를 클릭하면 해당 유형의 상세페이지로 이동합니다.</div>
          </div>

        </div>
      );
    } else if (testMBTI === "ENFP") {
      return (
        <div className='MBTI-ResultContainer'>
          <div>
            <div className='MBTI-MyMbti'>
              <td>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-enfp" target='_blank'>
                  <img src={활동가}></img>
                </a>
                <p>{"ENFP"}</p>
              </td>
              <span>
                <div className='MBTI-Character'>{"#사교적"}</div>
                <div className='MBTI-Character'>{"#즐거움 추구"}</div>
              </span>
            </div>

            <button className='MBTI-StyledButton' onClick={OnclickGetFreind}>
              <span>단짝 친구 찾으러 가기</span>
              <VscArrowRight className="arrow" size={35} />
            </button>
            <div className='MBTI-Underline' />
            <div className='MBTI-Mbtiment'>{testMBTI}의 단짝 유형</div>


            <div className='MBTI-Recommend'>
              <div className='MBTI-RecommendByOne'>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-infj" target='_blank'>
                  <img src={옹호자}></img>
                </a>
                <p>{'INFJ'}</p>
              </div>              <div className='MBTI-RecommendByOne'>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-intj" target='_blank'>
                  <img src={논리술사}></img>
                </a>
                <p>{'INTJ'}</p>
              </div>            </div>
            <div className='MBTI-Mbtiment2'>이미지를 클릭하면 해당 유형의 상세페이지로 이동합니다.</div>
          </div>

        </div>
      );
    } else if (testMBTI === "INFP") {
      return (
        <div className='MBTI-ResultContainer'>
          <div>
            <div className='MBTI-MyMbti'>
              <td>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-infp" target='_blank'>
                  <img src={중재자} />
                </a>
                <p>{"INFP"}</p>
              </td>
              <span>
                <div className='MBTI-Character'>{"#공감능력"}</div>
                <div className='MBTI-Character'>{"#솔직함 추구"}</div>
              </span>
            </div>

            <button className='MBTI-StyledButton' onClick={OnclickGetFreind}>
              <span>단짝 친구 찾으러 가기</span>
              <VscArrowRight className="arrow" size={35} />
            </button>
            <div className='MBTI-Underline' />
            <div className='MBTI-Mbtiment'>{testMBTI}의 단짝 유형</div>


            <div className='MBTI-Recommend'>
              <div className='MBTI-RecommendByOne'>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-enfj" target='_blank'>
                  <img src={선도자}></img>
                </a>
                <p>{'ENFJ'}</p>
              </div>              <div className='MBTI-RecommendByOne'>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-entj" target='_blank'>
                  <img src={통솔자}></img>
                </a>

                <p>{'ENTJ'}</p>

              </div>            </div>
            <div className='MBTI-Mbtiment2'>이미지를 클릭하면 해당 유형의 상세페이지로 이동합니다.</div>
          </div>
        </div>
      );
    }
  }

  //선택지
  function onClick3Yes1() {
    let index = count2 / 5 - 1;
    setCount(count + 1);
    setCount2(count2 + 1);
    setEnI(EnI => EnI + 3.1);
    let current = EnI + 3.1;
    if (current < 0 && (count2 / 5) === 1) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
    } else if (current > 0 && (count2 / 5) === 1) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
    }
  }
  function onClick2Yes1() {
    let index = count2 / 5 - 1;
    setCount(count + 1);
    setCount2(count2 + 1);
    setEnI(EnI => EnI + 2.1);
    let current = EnI + 2.1;
    if (current < 0 && (count2 / 5) === 1) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
    } else if (current > 0 && (count2 / 5) === 1) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
    }
  }
  function onClick1Yes1() {
    let index = count2 / 5 - 1;
    setCount(count + 1);
    setCount2(count2 + 1);
    setEnI(EnI => EnI + 1.1);
    let current = EnI + 1.1;
    if (current < 0 && (count2 / 5) === 1) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
    } else if (current > 0 && (count2 / 5) === 1) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
    }
  }

  function onClick1No1() {

    let index = count2 / 5 - 1;
    let index2 = count / EnI
    setCount(count + 1);
    setCount2(count2 + 1);
    setEnI(EnI - 1.1);
    let current = EnI - 1.1;

    if (current < 0 && (count2 / 5) === 1) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
    } else if (current > 0 && (count2 / 5) === 1) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
    }
  }
  function onClick2No1() {

    let index = count2 / 5 - 1;
    let index2 = count / EnI
    setCount(count + 1);
    setCount2(count2 + 1);
    setEnI(EnI - 2.1);
    let current = EnI - 2.1;

    if (current < 0 && (count2 / 5) === 1) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
    } else if (current > 0 && (count2 / 5) === 1) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
    }
  }
  function onClick3No1() {

    let index = count2 / 5 - 1;
    let index2 = count / EnI
    setCount(count + 1);
    setCount2(count2 + 1);
    setEnI(EnI - 3.1);
    let current = EnI - 3.1;

    if (current < 0 && (count2 / 5) === 1) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
    } else if (current > 0 && (count2 / 5) === 1) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
    }
  }

  function onClick3Yes2() {

    let index = count2 / 5 - 1;
    setCount(count + 1);
    setCount2(count2 + 1);
    setSnN((SnN) => SnN + 3.1);
    let current = SnN + 3.1;

    if (current < 0 && (count2 / 5) === 2) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
    } else if (current > 0 && (count2 / 5) === 2) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
    }
  }
  function onClick2Yes2() {

    let index = count2 / 5 - 1;
    setCount(count + 1);
    setCount2(count2 + 1);
    setSnN((SnN) => SnN + 2.1);
    let current = SnN + 2.1;

    if (current < 0 && (count2 / 5) === 2) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
    } else if (current > 0 && (count2 / 5) === 2) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
    }
  }

  function onClick1Yes2() {
    let index = count2 / 5 - 1;
    setCount(count + 1);
    setCount2(count2 + 1);
    setSnN((SnN) => SnN + 1.1);
    let current = SnN + 1.1;

    if (current < 0 && (count2 / 5) === 2) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
    } else if (current > 0 && (count2 / 5) === 2) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
    }
  }

  function onClick1No2() {
    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);
    setSnN((SnN) => SnN - 1.1);
    let current = SnN - 1.1;


    if (current < 0 && (count2 / 5) === 2) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
    } else if (current > 0 && (count2 / 5) === 2) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
    }
  }
  function onClick2No2() {
    let index = count2 / 5 - 1;
    setCount(count + 1);
    setCount2(count2 + 1);
    setSnN((SnN) => SnN - 2.1);
    let current = SnN - 2.1;

    if (current < 0 && (count2 / 5) === 2) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
    } else if (current > 0 && (count2 / 5) === 2) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
    }
  }
  function onClick3No2() {
    let index = count2 / 5 - 1;
    setCount(count + 1);
    setCount2(count2 + 1);
    setSnN((SnN) => SnN - 3.1);
    let current = SnN - 3.1;

    if (current < 0 && (count2 / 5) === 2) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
    } else if (current > 0 && (count2 / 5) === 2) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
    }
  }
  function onClick3Yes3() {
    let index = count2 / 5 - 1;
    setCount(count + 1);
    setCount2(count2 + 1);
    setTnF((TnF) => TnF + 3.1);
    let current = TnF + 3.1;

    if (current < 0 && (count2 / 5) === 3) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
    } else if (current > 0 && (count2 / 5) === 3) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
    }
  }
  function onClick2Yes3() {
    let index = count2 / 5 - 1;
    setCount(count + 1);
    setCount2(count2 + 1);
    setTnF((TnF) => TnF + 2.1);
    let current = TnF + 2.1;

    if (current < 0 && (count2 / 5) === 3) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
    } else if (current > 0 && (count2 / 5) === 3) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
    }
  }
  function onClick1Yes3() {
    let index = count2 / 5 - 1;
    setCount(count + 1);
    setCount2(count2 + 1);
    setTnF((TnF) => TnF + 1.1);
    let current = TnF + 1.1;

    if (current < 0 && (count2 / 5) === 3) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
    } else if (current > 0 && (count2 / 5) === 3) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
    }
  }

  function onClick1No3() {
    let index = count2 / 5 - 1;
    setCount(count + 1);
    setCount2(count2 + 1);
    setTnF((TnF) => TnF - 1.1);
    let current = TnF - 1.1;

    if (current < 0 && (count2 / 5) === 3) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
    } else if (current > 0 && (count2 / 5) === 3) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
    }

  }
  function onClick2No3() {
    let index = count2 / 5 - 1;
    setCount(count + 1);
    setCount2(count2 + 1);
    setTnF((TnF) => TnF - 2.1);
    let current = TnF - 2.1;

    if (current < 0 && (count2 / 5) === 3) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
    } else if (current > 0 && (count2 / 5) === 3) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
    }
  }

  function onClick3No3() {
    let index = count2 / 5 - 1;
    setCount(count + 1);
    setCount2(count2 + 1);
    setTnF((TnF) => TnF - 3.1);
    let current = TnF - 3.1;

    if (current < 0 && (count2 / 5) === 3) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
    } else if (current > 0 && (count2 / 5) === 3) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
    }

  }
  const onClick3Yes4 = async (e) => {
    let index = count2 / 5 - 1;
    setCount(count + 1);
    setCount2(count2 + 1);
    setJnP((JnP) => JnP + 3.1);
    let current = JnP + 3.1;

    if (current < 0 && (count2 / 5) === 4) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      let MBTI = testMBTI + answerNoList.answer[index];
      try {
        const res = await TeamAPI.mbtiReg(MBTI, localId);

      } catch (e) {
        console.log(e);
      }

    } else if (current > 0 && (count2 / 5) === 4) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      let MBTI = testMBTI + answerYesList.answer[index];
      try {
        const res = await TeamAPI.mbtiReg(MBTI, localId);

      } catch (e) {
        console.log(e);
      }
    }
  }
  const onClick2Yes4 = async (e) => {
    let index = count2 / 5 - 1;
    setCount(count + 1);
    setCount2(count2 + 1);
    setJnP((JnP) => JnP + 2.1);
    let current = JnP + 2.1;


    if (current < 0 && (count2 / 5) === 4) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      let MBTI = testMBTI + answerNoList.answer[index];
      try {
        const res = await TeamAPI.mbtiReg(MBTI, localId);
      } catch (e) {
        console.log(e);
      }
    } else if (current > 0 && (count2 / 5) === 4) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      let MBTI = testMBTI + answerYesList.answer[index];
      try {
        const res = await TeamAPI.mbtiReg(MBTI, localId);
      } catch (e) {
        console.log(e);
      }
    }
  }
  const onClick1Yes4 = async (e) => {
    let index = count2 / 5 - 1;
    setCount(count + 1);
    setCount2(count2 + 1);
    setJnP((JnP) => JnP + 1.1);
    let current = JnP + 1.1;

    if (current < 0 && (count2 / 5) === 4) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      let MBTI = testMBTI + answerNoList.answer[index];
      try {
        const res = await TeamAPI.mbtiReg(MBTI, localId);

      } catch (e) {
        console.log(e);
      }


    } else if (current > 0 && (count2 / 5) === 4) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      let MBTI = testMBTI + answerYesList.answer[index];

      try {
        const res = await TeamAPI.mbtiReg(MBTI, localId);

      } catch (e) {
        console.log(e);
      }
    }
  }

  const onClick1No4 = async (e) => {
    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);
    setJnP((JnP) => JnP - 1.1);
    let current = JnP - 1.1;


    if (current < 0 && (count2 / 5) === 4) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      let MBTI = testMBTI + answerNoList.answer[index];
      try {
        const res = await TeamAPI.mbtiReg(MBTI, localId);
      } catch (e) {
        console.log(e);
      }

    } else if (current > 0 && (count2 / 5) === 4) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      let MBTI = testMBTI + answerYesList.answer[index];
      try {
        const res = await TeamAPI.mbtiReg(MBTI, localId);

      } catch (e) {
        console.log(e);
      }
    }
  }
  const onClick2No4 = async (e) => {
    let index = count2 / 5 - 1;
    setCount(count + 1);
    setCount2(count2 + 1);
    setJnP((JnP) => JnP - 2.1);
    let current = JnP - 2.1;


    if (current < 0 && (count2 / 5) === 4) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      let MBTI = testMBTI + answerNoList.answer[index];

      try {
        const res = await TeamAPI.mbtiReg(MBTI, localId);
      } catch (e) {
        console.log(e);
      }


    } else if (current > 0 && (count2 / 5) === 4) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      let MBTI = testMBTI + answerYesList.answer[index];

      try {
        const res = await TeamAPI.mbtiReg(MBTI, localId);
      } catch (e) {
        console.log(e);
      }
    }
  }
  const onClick3No4 = async (e) => {
    let index = count2 / 5 - 1;
    setCount(count + 1);
    setCount2(count2 + 1);
    setJnP((JnP) => JnP - 3.1);
    let current = JnP - 3.1;

    if (current < 0 && (count2 / 5) === 4) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      let MBTI = testMBTI + answerNoList.answer[index];

      try {
        const res = await TeamAPI.mbtiReg(MBTI, localId);

      } catch (e) {
        console.log(e);
      }


    } else if (current > 0 && (count2 / 5) === 4) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      let MBTI = testMBTI + answerYesList.answer[index];
      try {
        const res = await TeamAPI.mbtiReg(MBTI, localId);
      } catch (e) {
        console.log(e);
      }
    }
  }

  //문제 및 선택지 출력
  return (
    <div className='MBTI-QuizContainer'>
      {props.questionList.map((e, idx) => {
        if (count === idx && idx < 5) {
          return (
            <>
              <div className='MBTI-NumContainer' key={idx}>
                <span className='MBTI-Num'>{count + 1}번 문제</span>
                <p>{e.question}</p>
                <div className='MBTI-OXContainer'>
                  <div className='MBTI-ObuttonContainer'>
                    <div className='MBTI-O3' onClick={onClick3Yes1}></div>
                    <div className='MBTI-O2' onClick={onClick2Yes1}></div>
                    <div className='MBTI-O1' onClick={onClick1Yes1}></div>
                    <div className='MBTI-X1' onClick={onClick1No1}></div>
                    <div className='MBTI-X2' onClick={onClick2No1}></div>
                    <div className='MBTI-X3' onClick={onClick3No1}></div>
                  </div>
                </div>
                <div className='MBTI-wordBox'>

                  <span className='MBTI-Word1'>동의</span>
                  <span className='MBTI-Word2'>비동의</span>
                </div>
              </div>
            </>
          );
        } else if (count === idx && idx < 10) {
          return (
            <>
              <div className='MBTI-NumContainer' key={idx}>
                <span className='MBTI-Num'>{count + 1}번 문제</span>
                <p>{e.question}</p>
                <div className='MBTI-OXContainer'>
                  <div className='MBTI-ObuttonContainer'>
                    <div className='MBTI-O3' onClick={onClick3Yes2}></div>
                    <div className='MBTI-O2' onClick={onClick2Yes2}></div>
                    <div className='MBTI-O1' onClick={onClick1Yes2}></div>
                    <div className='MBTI-X1' onClick={onClick1No2}></div>
                    <div className='MBTI-X2' onClick={onClick2No2}></div>
                    <div className='MBTI-X3' onClick={onClick3No2}></div>
                  </div>
                </div>
                <div className='MBTI-wordBox'>
                  <span className='MBTI-Word1'>동의</span>
                  <span className='MBTI-Word2'>비동의</span>
                </div>
              </div>
            </>
          );
        } else if (count === idx && idx < 15) {
          return (
            <>
              <div className='MBTI-NumContainer' key={idx}>
                <span className='MBTI-Num'>{count + 1}번 문제</span>
                <p>{e.question}</p>
                <div className='MBTI-OXContainer'>
                  <div className='MBTI-ObuttonContainer'>

                    <div className='MBTI-O3' onClick={onClick3Yes3}></div>
                    <div className='MBTI-O2' onClick={onClick2Yes3}></div>
                    <div className='MBTI-O1' onClick={onClick1Yes3}></div>
                    <div className='MBTI-X1' onClick={onClick1No3}></div>
                    <div className='MBTI-X2' onClick={onClick2No3}></div>
                    <div className='MBTI-X3' onClick={onClick3No3}></div>
                  </div>

                </div>
                <div className='MBTI-wordBox'>
                  <span className='MBTI-Word1'>동의</span>
                  <span className='MBTI-Word2'>비동의</span>
                </div>
              </div>
            </>
          );
        } else if (count === idx && idx < 20) {
          return (
            <>
              <div className='MBTI-NumContainer' key={idx}>
                <span className='MBTI-Num'>{count + 1}번 문제</span>
                <p>{e.question}</p>
                <div className='MBTI-OXContainer'>
                  <div className='MBTI-ObuttonContainer'>
                    <div className='MBTI-O3' onClick={onClick3Yes4}></div>
                    <div className='MBTI-O2' onClick={onClick2Yes4}></div>
                    <div className='MBTI-O1' onClick={onClick1Yes4}></div>
                    <div className='MBTI-X1' onClick={onClick1No4}></div>
                    <div className='MBTI-X2' onClick={onClick2No4}></div>
                    <div className='MBTI-X3' onClick={onClick3No4}></div>
                  </div>
                </div>
                <div className='MBTI-wordBox'>
                  <div className='MBTI-wordBox'>
                    <span className='MBTI-Word1'>동의</span>
                    <span className='MBTI-Word2'>비동의</span>
                  </div>
                </div>
              </div>
            </>
          );
        }
      })}

    </div>
  );
}



const MBTI = () => {
  const navigate = useNavigate();

  const cookies = new Cookies();
  const localId = cookies.get('rememberId');
  if (localId === undefined) navigate("/login");

  const currentId = window.localStorage.getItem("userId");
  const currentPw = window.localStorage.getItem("userPw");

  const [states, setStates] = useState({
    mode: 'start',
    questionList: [
      { question: "나는 사교적이며 활동적이다.", check_O: "O", check_X: "X" },
      { question: "나는 사람들과 함께 있을때 에너지를 얻는다.", check_O: "O", check_X: "X" },
      { question: "대인관계를 넓고 다양하게 유지하는 편이다.", check_O: "O", check_X: "X" },
      { question: "글보다는 말로 표현하는 것이 좋다.", check_O: "O", check_X: "X" },
      { question: "생각보다 행동이 앞선다.", check_O: "O", check_X: "X" },
      { question: "나는 섬세한 성격이다", check_O: "O", check_X: "X" },
      { question: "나는 새로운 시도보다는 기존의 것들에 따르는 경향이 있다.", check_O: "O", check_X: "X" },
      { question: "미래에 대한 생각보다는 현재에 집중한다.", check_O: "O", check_X: "X" },
      { question: "일처리에 있어서 느리더라도 철저하게 하는게 더 좋다", check_O: "O", check_X: "X" },
      { question: "본인이 명확함, 사실, 실용적 등의 단어와 어울린다.", check_O: "O", check_X: "X" },
      { question: "나는 분석적이고 논리적이다.", check_O: "O", check_X: "X" },
      { question: "나는 감정적인 호소 보다는 논리적인 호소에 설득이 잘된다.", check_O: "O", check_X: "X" },
      { question: "비교적 협력보다 경쟁을 통해 성장할 수 있다고 생각한다.", check_O: "O", check_X: "X" },
      { question: "나는 어떠한 일에 동정심을 느끼기 보다는 해결책을 제시한다.", check_O: "O", check_X: "X" },
      { question: "나의 논리적인 부분이 감정적인 부분을 컨트롤 할 수 있다.", check_O: "O", check_X: "X" },
      { question: "나는 철처하고 계획적이다", check_O: "O", check_X: "X" },
      { question: "나는 데이트를 할때 모든 계획을 세워두고 만나는 편이다.", check_O: "O", check_X: "X" },
      { question: "나는 선택의 여지를 주는것을 좋아하지 않는다.", check_O: "O", check_X: "X" },
      { question: "나는 머릿속에 늘 체크리스트를 가지고 다닌다.", check_O: "O", check_X: "X" },
      { question: "나는 당장의 흥미보다는 미래의 안정이 더 중요하다.", check_O: "O", check_X: "X" }
    ]
  });

  function changeMode(mode) {
    setStates({ ...states, ['mode']: mode })
  }

  return (

    <div className='Container'>
      <div className='MBTI-Container'>
        {/* mode 가 main 일 때 */}
        {states.mode === 'start'
          ?
          <div className='MBTI-StartContainer'>

            <div className='MBTI-Sentence2'><>
              <span>m</span>
              <span>b</span>
              <span>t</span>
              <span>i</span>
              검사를 통해서<p /> 여러분의 특성을 파악하고<p> 그 특성을 통한</p>인생 최고의 친구를 찾으세요!
            </>
            </div>

            <button className='MBTI-Startbtn' onClick={() => { changeMode('quiz') }}><p>검 사 시 작 <VscArrowRight className="arrow" size={35} /></p></button>
            <p className='MBTI-Mbtiword'>
              <span>m</span>
              <span>b</span>
              <span>t</span>
              <span>i</span>
            </p>
            <MdQuiz size={75} className='mbti-quiz' /><MdPsychology size={90} className='mbti-brain' />
            <p></p>
            <IoPeople className='mbti-person1' size={160} />
            <IoPersonAdd className='mbti-person2' size={120} />
            <IoPersonAdd className='mbti-person3' size={140} />

          </div>

          : null
        }
        {/* mode 가 quiz 일 때 */}
        {states.mode === 'quiz'
          ? <Quiz questionList={states.questionList} />
          : null
        }
      </div>
    </div>
  )
}

export default MBTI;