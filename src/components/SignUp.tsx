import { useAppDispatch } from "../hooks/redux-hooks"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Form } from "./Form";
import { setUser } from "../store/userSlice";
import { useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { IErrorLogin } from "../models";

export function SignUp() {
  const dispatch = useAppDispatch()
  const [error, setError] = useState<IErrorLogin | null>(null)

  const handleRegister = (email: string, password: string) => {
    const auth = getAuth()
    console.log(auth)
    createUserWithEmailAndPassword(auth, email, password)
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
      <Form title="register" handleClick={handleRegister}/>
    </>
  )
}



