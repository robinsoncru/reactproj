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

const data = await  fetch("https://pokeapi.co/api/v2/pokemon?limit=1350&offset=0").then(res => res.json()) ;





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
  const [allow,setAllow] = useState(true)
  
  const [ans,setAns] = useState("")
  const [score, setScore] = useState(0)
  const [firstTry, setFirstTry] = useState(false)
  
  
  function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
  }

  
  //  const [playSound] = useSound('./assets.mp3');


  async function increaseBright(bright ,bool,t){
    if(t == 100){
      setBright(1*bool)
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
    
  }

  
  const  handle = async () => {
    let n = Math.floor ( Math.random() * charList.length ) ;
    upBrightness(false)
    setNb(n) ;
    setFirstTry(true);

    await getMario(charList[n])
    .then(res => {

      setImage(res.image)
      setName(res.name)
    })
    .catch(err => {
      setName("invalid : " +  err);
    });

  }

    function testAns(valeurSaisie) {
        // .toLowerCase() permet d'ignorer les majuscules (Mario = mario)
        // .trim() enlève les espaces inutiles avant ou après
        
        const cleanAns = valeurSaisie.trim().toLowerCase().replace(/\s/g, "");
        const cleanName = name.trim().toLowerCase().replace(/\s/g, "");
        
        if (cleanAns === cleanName) {
            playSound(coin, 1, false)
            setResult("Yay ! C'est gagné !");
            upBrightness(true);
            setAllow(false); 
            
            if (firstTry) {
              setScore(score+1);
              setFirstTry(false);
            }

        } else {
            playSound(mamamia, 1 , false)

            setResult("Oups... Essaie encore !");
        }
    }


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
  
  return (
    <>
      <p id="scoreDisplay">
        Your score is {score}
      </p>
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
            <input
                type="text"
                name="postContent"
                className="mario-input" // On lui donne une classe pour le CSS
                onKeyDown={(evt) => {
                    if ( (evt.key === 'Enter' )  && (allow === true)) { // 'key' est plus moderne que 'keyCode'
                        testAns(evt.target.value);
                        evt.target.value = ""; // On vide le champ
                    }
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