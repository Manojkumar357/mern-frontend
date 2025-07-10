import "./Register.css"
import { useState } from "react";
//import { useRef } from "react";
import axios from "axios";
function Register(){

const[user,setUser]=useState({});
const [error,setError]=useState();
const handleSubmit=async()=>{
   try{
     const url="https://mern-backend-a-9527.vercel.app/api/users/register";
     const result=await axios.post(url,user);
    setError("Data saved Successfully")
   }catch(err){
    console.log(err)
    setError("Something Went Wrong")
   }
}

    return(
        <div className="App-Register-Row">
            <div>
            <h2>Registration Form</h2>
            {error}
           
    <p>  <input type="text" onChange={(e)=>setUser({...user,firstName:e.target.value})} 
        placeholder="Enter first name"/></p>
    <p> <input type="text" onChange={(e)=>setUser({...user,lastName:e.target.value})} 
        placeholder="Enter last name"/></p>
    <p>  <input type="email" onChange={(e)=>setUser({...user,email:e.target.value})}
        placeholder="Enter email Address"/></p>
    <p> <input type="password" onChange={(e)=>setUser({...user,password:e.target.value})}
        placeholder="Enter password"/></p>

            <p><button onClick={handleSubmit}>Submit</button></p>
           </div> 
        </div>
    )

}
export default Register;


//using useRef
// function Register(){
//     const firstName=useRef();
//     const lastName=useRef();
//     const email=useRef();
//     const password=useRef();



// const handleSubmit=()=>{
//     const user={
//         firstName:firstName.current.value,
//         lastName:lastName.current.value,
//         email:email.current.value,
//         password:password.current.value
//     }

//     console.log(user)
// }

//     return(
//         <div className="App-Register-Row">
//             <div>
//             <h2>Registration Form</h2>
           
//     <p>  <input type="text"  ref={firstName}
//         placeholder="Enter first name"/></p>
//     <p> <input type="text" ref={lastName}
//         placeholder="Enter last name"/></p>
//     <p>  <input type="email" ref={email}
//         placeholder="Enter email Address"/></p>
//     <p> <input type="password" ref={password}
//         placeholder="Enter password"/></p>

//             <p><button onClick={handleSubmit}>Submit</button></p>
//            </div> 
//         </div>
//     )

// }