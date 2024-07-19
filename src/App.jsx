import { useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css' 


function App() {
  const [score, setScore] = useState(0);
  const [pressedCards, setPressedCards] = useState([]);
  const [best, setBest] = useState(0);
 
  const api = 'https://pokeapi.co/api/v2/pokemon/';
 
  function randomizer(n){
    let random = [];
    while(random.length < n){
      let value = Math.floor(Math.random() * n);
      if(!random.includes(value)){
        random.push(value)
      }
    }
    return random
  };
  let cardOrder = randomizer(12);
  let nextPressed = pressedCards
  
  if(score > best) setBest(score);
  return (
    <>
      <div className='titleDiv'>
        <h1 className='title'>Pokemon memory game</h1>
        <h2 className="score">Score: {score} <br></br> Best: {best}</h2>
        <p>don't click on the same one twice.</p>
        </div>
      <div className="cardDiv">
        {cardOrder.map((slot, index) =>{
          return <Card id={index} key={index} imageId={slot}/>
        })}
      </div>
      
    </>
  )
 function Card({id, imageId}){
  const [pokemon, setPokemon] = useState('loading');
  const [pokename, setPokename] = useState('loading');
  const link = api + (imageId + 26);
  
  async function getPokemon(link){
    const getPokeData = await fetch(link);
    const pokeData = await getPokeData.json();
    setPokename(pokeData.species.name);
    setPokemon(pokeData.sprites.other['official-artwork']['front_default'])
  }
  useEffect(() =>{
    getPokemon(link);
  },[pokemon]);
  
  return(
   <div className="card" key={id + 'card'}
   onClick={() =>{
    if(nextPressed.includes(imageId)){
      setScore(0);
      setPressedCards([])
    }else{
      setScore(score + 1);
    nextPressed.push(imageId);
    setPressedCards(nextPressed);
    }
     }}>
     <div className='image' key={id}
     style={{backgroundImage: `url(${pokemon})`}}
     ></div>
     <h1 key={id + 'name'}>{pokename[0].toUpperCase()+pokename.slice(1)}</h1>
   </div>
  )
 }
}

export default App
