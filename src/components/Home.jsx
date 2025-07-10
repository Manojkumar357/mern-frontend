import { useState } from "react";


function Home({age}){
const [score,setScore]=useState(0);
const increment=()=>{
    setScore(score+1)
    alert("Welldone")

}

const decrement=()=>{
    setScore(score-1)
    alert("OOPS!!Better luck next time")

}
if(score<0){
    alert('Match over')
}
  
  

return (
    <>
    <p style={{fontSize:'100px'}}>
      {score}-{score}

    </p>
    <button style={{width:'150px',height:'50px',backgroundColor:'aqua',borderRadius:'50px',color:'red'}}
    onClick={increment}>RUN+</button>
     <button style={{width:'150px',height:'50px',backgroundColor:'aqua',borderRadius:'50px',color:'red'}}
    onClick={decrement}>WICKET-</button>
    </>
    
)
}

export default Home;


// function Home({age}){

//     const handleClick=()=>{
//         alert("Hello");
//     };
//     const handleSubmit=(name)=>{
//         alert(`hello ${name}`);
//     }

// return (
//     <>
//     <h2>Hello World</h2>

//     <button onClick={handleClick}>Click</button>
//     <button onClick={()=>handleSubmit("John")}>Submit</button>
//     </>
// )
// }