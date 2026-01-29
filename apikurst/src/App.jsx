import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import jumpSound from './assets/do-80236.mp3'; 
import coin from './assets/coin.mp3'; 
import death from './assets/death.mp3'; 
import mamamia from './assets/mamamia.mp3'; 
import music from './assets/music.mp3'; 

import list from './assets/characters.json'

const charList = list;



let mariolink = "https://super-mario-bros-character-api.onrender.com/api/"



async function getMario(namePoke){
  const res = await  fetch(mariolink + namePoke) ;
  if (!res.ok) {
    throw new Error('Pokemon not found'); 
  }
  return await  res.json() ;
}


let nb_loads = 0 ;


function App() {
  const [result, setResult] = useState("")
  const [name, setName] = useState("__")
  const [comment, setComment] = useState("__")
  const [nb, setNb] = useState(0)
  const [bright, setBright] = useState(0)
  const [image, setImage] = useState(viteLogo)
  const [ans,setAns] = useState("")
  
  const start = 0;
  
  function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
  }

  
  //  const [playSound] = useSound('./assets.mp3');


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
        // console.log("increaseBright incr");
      });
      
  }

  async function upBrightness(bool) {
    let bright = 1 ;
    if(bool) bright = 0  ;
    increaseBright(bright,bool,0)
    bright /= 100 ;
  }

  
  const  handle = async () => {
    let n = Math.floor ( Math.random() * charList.length ) ;
    upBrightness(false)
    setNb(n) ;
    getMario(charList[n])
    .then(res => {
      setName(res.name);
      setImage(res.image)
      
    })
    .catch(err => {
      setName("invalid : " +  err);
    });
    
  
  }

  function print(txt) {
    console.log(txt);
  }


  function testAns(ans){
    print("test ans");
    const cleanAns = ans.trim().toLowerCase().replace(/\s/g, "");
    const cleanName = name.trim().toLowerCase().replace(/\s/g, "");

    // console.log("User Input Length:", cleanAns.length);
    // console.log("API Name Length:", cleanName.length);


    // print(cleanAns);
    // print(cleanName);
    
    

    // print("type 1"+typeof(ans));
    // print("type 2"+typeof(name));

    if(cleanAns == cleanName){
      setResult("Yay")
      upBrightness(true)
    }else{

      setResult("sus")
    }
  }

  return (
    <>
      <h1>Who is that Character ?</h1>
      
      <h2>{result}</h2>
      
      <div>
        <p>It is {name} and id {nb} </p>
        <button onClick={handle}>Generate pokemon</button>
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
          <img className='pokeIm' src = {image} height={300} width={200} style={{filter : 'brightness(' + bright.toString() + ')'}}/>
        </div>
      </div>
      
    </>
  )}

export default App
