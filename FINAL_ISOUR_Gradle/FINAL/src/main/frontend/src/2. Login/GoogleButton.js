import GoogleLogin from "react-google-login";
import {useCallback} from "react";

const GoogleButton = ({setUserInfo, setIsLogin}) => {

    const googleLogin = useCallback((response) => {
        const userInfo = {
            profileImg: response.profileObj.imageUrl,
            email: response.profileObj.email,
            name: response.profileObj.name
        }
        setUserInfo(userInfo);
        setIsLogin(true);

        console.log(userInfo.email);
        console.log(userInfo.name);
    }, [])

    return (
        <GoogleLogin
            clientId="32798100349-4jf8hseid7s7dcgi2vi3h0fnsq67glb0.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={googleLogin}
            onFailure={(res) => console.log(res)}
            cookiePolicy={'single_host_origin'}/>
    );
}
export default GoogleButton;