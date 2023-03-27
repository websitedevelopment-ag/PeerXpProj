import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Redirect() {
  let navigate = useNavigate();

  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')

    if (authToken) {
      navigate('/home')
    }

    if (!authToken) {
      navigate('/login')
    }
  }, [])
  return (
    <div>
    </div>
  )
}