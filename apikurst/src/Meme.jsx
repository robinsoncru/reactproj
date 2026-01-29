import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Meme.css'

import jumpSound from './assets/do-80236.mp3'; 
import coin from './assets/coin.mp3'; 
import death from './assets/death.mp3'; 
import mamamia from './assets/mamamia.mp3'; 
import music from './assets/music.mp3'; 
import bebombImg from './assets/bebomb.png';

import list from './assets/characters.json'

let nb_loads = 0 ;


function Meme() {
  const [result, setResult] = useState("")
  const [name, setName] = useState("__")
  const [comment, setComment] = useState("__")
  const [nb, setNb] = useState(0)
  const [bright, setBright] = useState(0)
  const [image, setImage] = useState(viteLogo)
  const [allow,setAllow] = useState(true)
  
  


  function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
  }

  
  //  const [playSound] = useSound('./assets.mp3');




  const playSound = (sound, volume, loop) => {
  let audio = new Audio(sound);
  audio.volume = volume ;
  audio.loop = loop ;
  
  audio.play();
  };

 useEffect(() => {
    if(nb_loads < 1) playSound(music, 0.5, true,0);
    nb_loads += 1 ;
  }, []);

  let allowText = true ;

  

  function Bebomb(x, y) {
    const buttonStyle = {
    width: '40px', // Buttons with background images usually need dimensions
    height: '40px',
    backgroundImage: `url(${bebombImg})`,
    backgroundSize: 'cover',
    backgroundColor:"transparent",
    border: 'none',
    cursor: 'pointer',
    boxShadow: 'none',
    position: 'relative',
    top: x+'px',
    left: y+'px'

    };
    return <button id = "boutonBebomb" style={buttonStyle}>
      </button>;
  }

  
  
  return (
    <>
      <h1>Eliminate all the bombs before they reach the ground !</h1>
      
      
        <div id="firezone">
          <Bebomb></Bebomb>
          {
    //         const l = 100;
    // const nbBombMax = 10;
    // const nbBomb = Math.random()*nbBombMax;
    // console.log(nbBomb);
    
    // for (let i =0;i <nbBomb;i++) {
    //   const x = Math.floor(Math.random()*l);
    //   const y = Math.floor(Math.random()*l)
    }
          
        </div>
      
    </>
  )}

export default Meme
