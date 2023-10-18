import {auth, provider} from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Login =()=>{
const navigate = useNavigate();

    const signInWithGoogle= async()=>{
        const result = signInWithPopup(auth, provider);
        console.log(result);
        navigate('/') //after logined, automaticallly transfer to home page
    }
    return <div><p>Sign In With Google to continue</p>
    <button onClick={signInWithGoogle}>Sign in With Google</button>
    </div>
}