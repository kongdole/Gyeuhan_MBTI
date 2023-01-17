import React from "react";
import axios from "axios";
import "../97. KakaoPay/KakaoPayment.css";
import { Link } from "react-router-dom";

class KakaoPayTen extends React.Component {



  state = {
    // 응답에서 가져올 값들
    next_redirect_pc_url: "",
    tid: "",
    // 요청에 넘겨줄 매개변수들
    params: {
      cid: "TC0ONETIME",
      partner_order_id: "partner_order_id",
      partner_user_id: "partner_user_id",
      item_name: "코인 100개 묶음 상품",
      quantity: 100,
      total_amount: 59900,
      //부과가치세
      vat_amount: 0,
      //세금어쩌구?
      tax_free_amount: 0,
      // // //결제 승인 이후 보이는 화면
      // approval_url: "http://localhost:3000/payresult",
      // //결제 실패 이후 보이는 화면
      // fail_url: "http://localhost:3000/payresult",
      // //취소 이후 보이는 화면
      // cancel_url: "http://localhost:3000/payresult",

      //웹 연결
      //결제 승인 이후 보이는 화면
      approval_url: "http://gyeuhan.site:8282/payresult",
      //결제 실패 이후 보이는 화면
      fail_url: "http://gyeuhan.site:8282/payresult",
      //취소 이후 보이는 화면
      cancel_url: "http://gyeuhan.site:8282/payresult",
      //웹 연결
      //결제 승인 이후 보이는 화면
      // approval_url: "http://52.79.169.107:8282/payresult",
      // //결제 실패 이후 보이는 화면
      // fail_url: "http://52.79.169.107:8282/payresult",
      // //취소 이후 보이는 화면
      // cancel_url: "http://52.79.169.107:8282/payresult",
    },
  };

  componentDidMount() {
    const { params } = this.state;
    axios({
      // 프록시에 카카오 도메인을 설정했으므로 결제 준비 url만 주자
      url: "https://kapi.kakao.com/v1/payment/ready",
      // 결제 준비 API는 POST 메소드라고 한다.
      method: "POST",
      headers: {
        // 카카오 developers에 등록한 admin키를 헤더에 줘야 한다.
        Authorization: "KakaoAK 374875c3160e005eecb08701b407806b",
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      // 설정한 매개변수들
      params,
    }).then(response => {
      // 응답에서 필요한 data만 뽑는다.
      const {
        data: { next_redirect_pc_url, tid }
      } = response;
      window.sessionStorage.setItem("url", next_redirect_pc_url);
      window.sessionStorage.setItem("tid", tid);
      console.log(tid);
      console.log(next_redirect_pc_url);
      console.log(tid);
      // 응답 data로 state 갱신 및 저장
      this.setState({ next_redirect_pc_url, tid });
    });
  }

  render() {
    const { next_redirect_pc_url } = this.state;
    return (

      <div className="Payment-Container">
        <h2>결제금액 [59900원] 을 결제하시겠습니까?</h2>
        <a  href={next_redirect_pc_url}>
          <span className="Payment-Yes">
            예
          </span>
        </a>
        <Link to="/shop">
        <span className="Payment-No">
          아니요
        </span>
        </Link>
      </div>);
  }
}

export default KakaoPayTen;