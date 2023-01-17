import { useNavigate } from "react-router-dom";
import '../12.Shop/Shop.css';
import { useContext } from "react";
import { UserContext } from "../98. Context/UserStore";
import Coin2 from "../images/Coin2.png";
import Coin3 from "../images/Coin3.png";
import Coin4 from "../images/Coin4.png";
import Coin5 from "../images/Coin5.png";


const Shop = () => {
    const context = useContext(UserContext);

    const nav = useNavigate();

 
    const One = () => {
        context['buyCoin'] = 10;
        nav('/KakaoPayOne')
    }
    
    const Three = () => {
        context['buyCoin'] = 30;
        nav('/KakaoPayThree')
    }
    const Ten = () => {
        context['buyCoin'] = 100;
        nav('/KakaoPayTen')

    }

    return (
        <div className="Container">
            <div className="Shop-Container">
                <div className="Shop-CoinShopWord">
                    <img src={Coin2} alt="coin"></img>
                    <span>Coin SHOP</span>
                </div>


                <div className="Shop-CoinPrice" onClick={One}>
                    <div className="Shop-priceHeader"> 코인 10개  </div>
                    <div className="Shop-priceBody">
                    <img src={Coin3} alt="coin"></img>
                    </div>
                    <div className="Shop-priceFooter"> 10000원 </div>
                </div>
                <div className="Shop-CoinPrice" onClick={Three}>
                    <div className="Shop-priceHeader"> 코인 30개  </div>
                    <div className="Shop-priceBody">
                    <img src={Coin5} alt="coin"></img>
                    </div>
                    <div className="Shop-priceFooter"> <span>30000</span> 24000원 </div>
                </div>
                <div className="Shop-CoinPrice" onClick={Ten}>
                    <div className="Shop-priceHeader"> 코인 100개  </div>
                    <div className="Shop-priceBody">
                    <img src={Coin4} alt="coin"></img>
                    </div>
                    <div className="Shop-priceFooter"> <span>100000</span>59900원 </div>
                </div>
                
            </div>
        </div>
    )




}

export default Shop;