import './App.css'
import { useState, useEffect } from 'react'
import Form from './Components/Common/Form'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Home'
import { app } from './firebase-config'
import Redirect from './Redirect'


export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  const handleAction = (id) => {
    console.log(id)
    const authentication = getAuth();
    if (id === 2) {
      createUserWithEmailAndPassword(authentication, email, password)
        .then((response) => {

          navigate('/home');
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
          localStorage.setItem('user', email)
        })
        .catch((error) => {
          if (error.code === 'auth/wrong-password') {
            toast.error('Please check the Password');
          }
          if (error.code === 'auth/user-not-found') {
            toast.error('Please check the Email');
          }
          if (error.code === 'auth/email-already-in-use') {
            toast.error('Email Already in Use');
          }
          if (error.code === 'auth/invalid-email') {
            toast.error('Invalid Email');
          }
        })
    }
    if (id === 1) {
      signInWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          navigate('/home')
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
          localStorage.setItem('user', email)
        })
        .catch((error) => {
          if (error.code === 'auth/wrong-password') {
            toast.error('Please check the Password');
          }
          if (error.code === 'auth/user-not-found') {
            toast.error('Please check the Email');
          }
          if (error.code === 'auth/invalid-email') {
            toast.error('Invalid Email');
          }
        })
    }
  }
  return (

    <main>
      <>
        <ToastContainer />
        <Routes>
          <Route path='/login' element={<Form
            title="Login"
            setEmail={setEmail}
            setPassword={setPassword}
            handleAction={() => handleAction(1)}
          />} />
          <Route path='/signup' element={<Form
            title="Sign-up"

            setEmail={setEmail}
            setPassword={setPassword}
            handleAction={() => handleAction(2)}
          />}

          />
          <Route
            path='/home'
            element={
              <Home />}
          />
          <Route exact path="/" element={<Redirect />} />
        </Routes>
      </>
    </main>
  )
}
