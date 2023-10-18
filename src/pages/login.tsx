import {auth, provider} from "../config/firebase";
import { signInWithPopup } from "firebase/auth";

export const Login =()=>{


    const signInWithGoogle= async()=>{
        const result = signInWithPopup(auth, provider);
        console.log(result)
    }
    return <div><p>Sign In With Google to continue</p>
    <button onClick={signInWithGoogle}>Sign in With Google</button>
    </div>
}