import React from "react";
import axios from "axios";
import TeamAPI from "../0. API/TeamAPI";
import Cookies from 'universal-cookie';
import "./KakaoPayResult.css";
import { Link, Navigate } from "react-router-dom";

class PayResult extends React.Component {
  constructor(props) {
    super(props);
    const { params } = this.state;
    const search = window.location.search;

    console.log("props 가 뭘까 ? " + props)
    console.log(props)
    console.log("params데이터 : " + params)
    console.log(params)
    // url에 붙어서 온 pg_token을 결제 API에 줄 params에 할당
    params.pg_token = search.split("=")[1];
    console.log("params데이터2 : " + params)
    console.log("params pgtoken 데이터 : " + params.pg_token);
  }

  state = {
    params: {
      cid: "TC0ONETIME",
      // localstorage에서 tid값을 읽어온다.
      tid: window.sessionStorage.getItem("tid"),
      partner_order_id: "partner_order_id",
      partner_user_id: "partner_user_id",
      pg_token: "",
    },
  };

  componentDidMount() {
    const { params } = this.state;
    const cookies = new Cookies();
    const localId = cookies.get('rememberId');

    console.log("useEffect 밑의 파람" + params);
    console.log("useEffect 밑의 파람토큰" + params.pg_token);

    axios({
      url: "https://kapi.kakao.com/v1/payment/approve",
      method: "POST",
      headers: {
        Authorization: "KakaoAK de0e3076b485b703b1f1a4a2419440e6",
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      params,
    }).then((response) => {
      // 결제 승인에 대한 응답 출력
      console.log("response" + response);
      console.log(response);
      console.log(response.data);
      console.log(response.data.item_name);
      console.log(response.data.quantity);
      console.log(response.data.created_at);
      console.log(response.data.payment_method_type);
      console.log(response.data.amount.total);

      const kakaoPay = async () => {
        try {
          console.log('통신 들어가기 직전인데 들어가냐?');
          const kakaoPayResult = await TeamAPI.kakaoPayResult(localId, response.data.item_name, response.data.quantity, response.data.created_at, response.data.payment_method_type, response.data.amount.total);
          console.log(kakaoPayResult);
        } catch (e) {
          console.log(e);
        }
      }
      kakaoPay();
    }
    )
  }

  render() {
    return (
      <div className="No-Nav-Container">
        <div className="KakaoPay-Result-Container">
          <div>
            <h1>결제가 완료되었습니다!</h1>
          </div>
          <div>
            <Link to="/home">
              <button className="KakaoPay-Result-btn">
                확인
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default PayResult;

// const PayResult = () => { let search = window.location.search; const [state, setState] = useState({ params: { cid: "TC0ONETIME", tid : window.localStorage.getItem("tid"), partner_order_id: "partner_order_id", // 가맹점 회원 id partner_user_id: "partner_user_id", // 결제승인 요청을 인정하는 토큰 pg_token: search.split("=")[1], } });
