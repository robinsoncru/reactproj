import { useState, useRef, useEffect } from 'react'
import './Meme.css'

import music from './assets/music.mp3'; 
import bebombImg from './assets/bebomb.png'
import crossImg from './assets/cross.png'


const nbBomb = 20;

let nb_loads = 0 ;


function Meme() {
  

  
  const coords = [];
  const lgBomb = 200;
  let nbBombFound = 0;


  function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
  }

  function getButtons( maxX, maxY){
  const nbBombs = nbBomb ;
  const bomb = Math.floor(Math.random() * nbBombs) ;
  
  for(let i = 0 ; i < nbBombs ; i++ ){
    coords.push( {
      id : i,
      xy :[ (Math.floor(Math.random() * maxX)) , Math.floor(Math.random() * maxY) ],
      bomb : false,
    } ) 
    
  }
  coords[bomb].bomb = true
  
  }
  



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


    getButtons(lgBomb, lgBomb,coords);


  
  
  return (
    <>
      <h1>Eliminate all the bombs before they reach the ground !</h1>
      
      
        <div id="firezone" ref={zoneref} style={{
          height:lgBomb+100,
          width:lgBomb+100
        }}>

            { 
            coords.map(({ xy, bomb, id}) => (

                    <button key = {id} style={{
                      position : 'relative' ,
                      top : xy[1] + 'px',
                       left : xy[0] + 'px',
                      width: '1%',
                      backgroundImage: `url(${bebombImg})`,
                      backgroundSize: 'cover',
                      backgroundColor:"transparent",
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: 'none',
                      }} onClick={(event) => {
                      if(bomb){
                        console.log("boom");
                        alert("Boom !!!!!"+String.fromCodePoint(0x1F621));
                        window.location.reload(); 
                      }else{
                        console.log("oof");
                        let parentStyle = event.target.style;
                        parentStyle.backgroundImage=`url(${crossImg})`;
                
                        nbBombFound++;
                        if (nbBombFound == nbBomb-1) {
                          alert("Yeah !!!!");
                          window.location.reload(); 
                        }
                      }
                    }}  >
                      
                    </button>
                ))}
        </div>
    </>
  )}

export default Meme
