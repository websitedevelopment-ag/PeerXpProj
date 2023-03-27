import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Table from './Table'

export default function Home() {

  let navigate = useNavigate();
  const handleLogOut = () => {
    console.log("logging out")
    sessionStorage.removeItem('Auth Token');
    navigate('/login')
  }

  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')
    if (!authToken) {
      navigate('/login')
    }
  }, [])
  return (
    <div>
      <div className="container">
        <button className="btn btn-primary text-right" onClick={handleLogOut}>Log Out</button>
      </div>
      <h1 class="display-3">MY EXPENSE MANAGER</h1>
      <div className='p-2 m-2'>
        <Table></Table>
      </div>
    </div>
  )
}
    //<div>
      //<Button title="Log out" handleAction={handleLogOut} />
    //</div>
