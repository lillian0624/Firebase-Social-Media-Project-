import {auth, provider} from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";



export const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user); // user info
      navigate('/');
    } catch (error: any) {
      console.error('Google login failed:', error);
      alert(error.message);
    }
  };

  return (
    <div>
      <p>Sign In With Google to continue</p>
      <button onClick={signInWithGoogle}>Sign in With Google</button>
    </div>
  );
};