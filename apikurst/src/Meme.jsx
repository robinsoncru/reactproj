import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Meme.css'

import jumpSound from './assets/do-80236.mp3'; 
import coin from './assets/coin.mp3'; 
import death from './assets/death.mp3'; 
import mamamia from './assets/mamamia.mp3'; 
import music from './assets/music.mp3'; 
// import im from './assets/pngwing.com.png?raw'
import list from './assets/characters.json'

let nb_loads = 0 ;


function Meme() {
  
  
  function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
  }

  function getButtons( width, height , coords){
  const nbBombs = 10 
  const maxX = width;
  const maxY = height;
  const bomb = Math.floor(Math.random() * nbBombs) 
  
  for(let i = 0 ; i < nbBombs ; i++ ){
    coords.push( {
      id : i,
      xy :[ (Math.floor(Math.random() * maxX)) , Math.floor(Math.random() * maxY) ],
      bomb : false
    } ) 
    
  }
  coords[bomb].bomb = true
  
  }
  
  //  const [playSound] = useSound('./assets.mp3');




  const playSound = (sound, volume, loop) => {
  let audio = new Audio(sound);
  audio.volume = volume ;
  audio.loop = loop ;
  
  audio.play();
  };

  let zoneref = useRef(null); 


 useEffect(() => {
    if(nb_loads < 1) playSound(music, 0.5, true,0);
     

    if(zoneref.current != null)   {getButtons(zoneref.current.offsetWidth , zoneref.current.offsetHeight, coords)};
    console.log(zoneref.current.offsetWidth)
    
    nb_loads += 1 ;
  }, []);


    let allowText = true ;
    const coords = [];
  

    getButtons(200,200,coords)
  
  
  return (
    <>
      <h1>Eliminate all the bombs before they reach the ground !</h1>
      
      
        <div id="firezone" ref={zoneref}>
              {/* <img src={im} width="100" alt="folder"/> */}

            { 
            coords.map(({ xy, bomb, id }) => (
                    <button key = {id} style={{position : 'relative' ,top : xy[1] + 'px', left : xy[0] + 'px', width: '1%'}} onClick={() => {
                      if(bomb){
                        console.log("boom")
                      }else{
                        console.log("oof")
                      }
                    }}  >
                         {/* <img src="./assets/pngwing.com.png" width="100" alt="folder"/> */}
                    </button>
                ))}
        </div>
        
      
      
    </>
  )}

export default Meme
