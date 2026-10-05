import { useEffect, useState } from 'react'
import Login from './components/login'
import ProblemNotes from './components/problemnotes';
import ProblemForm from './components/problemform';
import axios from 'axios';
import './App.css'

function App() {
  const [user,setuser]=useState(null)
  const [view,setview]=useState("list")
  const [problem,setproblem]=useState([])
  useEffect(()=>{
    axios.get('https://problem-notes-1.onrender.com/api/v1/users/refresh',{
        withCredentials:true
    })
    .then((response)=>{
      console.log(response.data.data.user)
      setuser(response.data.data.user)
    })
    .catch((error)=>{
      console.log(error.response?.data)
    })
  },[])
  
  function OnLogin(data){
    const formdata=new FormData()
    formdata.append("email",data.email);
    formdata.append("password",data.password);
     axios.post('https://problem-notes-1.onrender.com/api/v1/users/login',formdata,{
      withCredentials:true
     })
     .then((response)=>{
      console.log(response.data.data.user)
      setuser(response.data.data.user)
     })
     .catch((error)=>{
      console.log(error.response?.data)
     })
  }
  if(!user) return <Login OnLogin={OnLogin}/>
    // useEffect(()=>{
    //     axios.get("/api/v1/problem/Allproblem",{},{
    //     withCredentials:true
    // })
    // .then((response)=>{
    //     console.log(response.data.data)
    // })
    // .catch((error)=>{
    //     console.log(error.response?.data)
    // })
    // },[])

  return ( 
  <div className='app'>
    <header className='header'>
      <h1 className='logo'>Problem Notes</h1>
      <div className='header-action'>
        {view==="list"?(
          <button  className="btn btn-primary btn-small" 
          onClick={()=>setview("new")}
          >
            + New Problem
          </button>
        ):(
        <button  className="btn btn-primary btn-small" 
        onClick={()=>setview("list")}
        >
          Back
        </button>)}
      </div>
    </header>

    <main className="main">
          {view==="new"?(
            <ProblemForm />
          ):(
            <ProblemNotes/>
          )}
    </main>
  </div>
   
  )
}

export default App
