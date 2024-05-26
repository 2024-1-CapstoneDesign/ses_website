import {GoogleLogin} from "@react-oauth/google";
import {GoogleOAuthProvider} from "@react-oauth/google";

const GoogleLoginButton = (props) => {
  const {setGoogleRes} = props;
  const clientId = process.env.REACT_APP_CLIENT_ID
  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={(res) => {
            console.log(res);
            setGoogleRes(res);
          }}
          onFailure={(err) => {
            console.log(err);
            setGoogleRes(null);
          }}
          width={"300px"}
        />
      </GoogleOAuthProvider>
    </>
  );
};

export default GoogleLoginButton