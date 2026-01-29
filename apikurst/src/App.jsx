import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import list from './assets/characters.json'

const charList = list;



let pokelink = "https://pokeapi.co/api/v2/pokemon?limit=1350&offset=0";
let mariolink = "https://super-mario-bros-character-api.onrender.com/api/"
let zeldalink = "https://zelda.fanapis.com/api/characters"
const data = await  fetch("https://pokeapi.co/api/v2/pokemon?limit=1350&offset=0").then(res => res.json()) ;





async function getPoke(namePoke){
  const res = await  fetch("https://pokeapi.co/api/v2/pokemon/" + namePoke) ;
  if (!res.ok) {
    throw new Error('Pokemon not found'); 
  }
  return await  res.json() ;
}

async function getMario(namePoke){
  const res = await  fetch(mariolink + namePoke) ;
  if (!res.ok) {
    throw new Error('Pokemon not found'); 
  }
  return await  res.json() ;
}

async function getZelda(namePoke){
  const res = await  fetch(zeldalink) ;
  if (!res.ok) {
    throw new Error('Pokemon not found'); 
  }
  return await  res.json() ;
}

function App() {
  const [result, setResult] = useState("")
  const [name, setName] = useState("__")
  const [comment, setComment] = useState("__")
  const [nb, setNb] = useState(0)
  const [bright, setBright] = useState(0)
  const [image, setImage] = useState(viteLogo)
  const [ans,setAns] = useState("")
  function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}


  async function increaseBright(bright ,bool,t){
    if(t == 100){
      return;
    }
    if(bool){
        bright += 1 ;
        setBright(bright/100)
      }else{
        bright -= 1 ;
        setBright(bright/100)
      }
      delay(10).then(() => {
        t+=1;
        increaseBright(bright,bool,t+1);
        console.log("incr")  
      });
      
  }
  async function upBrightness(bool) {
    let bright = 1 ;
    if(bool) bright = 0  ;
    increaseBright(bright,bool,0)
    bright /= 100 ;
  }

  function test(){

  }
  
  const  handle = async () => {
    let n = Math.floor ( Math.random() * charList.length ) ;
    upBrightness(false)
    setNb(n) ;
    let poke = "" 

    await getMario(charList[n])
    .then(res => {

      setImage(res.image)
      setName(res.name)
    })
    .catch(err => {
      setName("invalid : " +  err);
    });

  }

  function testAns(ans){
    if(ans == name){
      setResult("Yay")
      upBrightness(true)
    }else{
      console.log(ans)
      console.log(name)

      setResult("sus")
    }
  }

  return (
    <>
      <h1>Who is that Character ?</h1>
      <h2>{result}</h2>
      <div>
        <p>It is {name} and id {nb} </p>
        <p> {comment}  </p>

        <button onClick={() => {
          handle();
          setComment("Loading...")
          
          } }>Generate Character</button>
      </div>
      <div style={
        {display: 'flex',          // 1. Enable Flexbox
        flexDirection: 'column',
        }
      }>
        <label>
          Answer:
        <textarea name="postContent" rows={1} cols={40} 
          onKeyDown={(evt) => {
            const keyCode = evt.keyCode;
            if (keyCode === 13) {
              setAns(evt.target.value);
              testAns(evt.target.value)
              evt.target.value = null;
              
            };
          }}
        />
        </label>
        <div style={{justifyContent : 'center'}}>
          <img className='pokeIm' src = {image} height={300} width={200} style={{filter : 'brightness(' + bright.toString() + ')'}} onLoad={() => setComment("Guess")}/>
        </div>
      </div>
      
    </>
  )}

export default App
