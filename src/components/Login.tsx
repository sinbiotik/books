import { useAppDispatch } from "../hooks/redux-hooks"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Form } from "./Form";
import { setUser } from "../store/userSlice";
import { useState } from "react";

import { ErrorMessage } from "./ErrorMessage";
import { IErrorLogin } from "../models";


export function Login() {
  const dispatch = useAppDispatch()
  const [error, setError] = useState<IErrorLogin | null>(null)
  const handleLogin = (email: string, password: string) => {
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
      .then(({user}) => { 
        dispatch(setUser({
          email: user.email,
          id: user.uid,
          token: user.refreshToken
        }))        
      })
      .catch((error) => setError(error))
  }  

  return (
    <>
      {error && <ErrorMessage error={error.message}/>}
      <Form title="sign in" handleClick={handleLogin}/>      
    </>
  )
}