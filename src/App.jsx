import { useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css' 


function App() {
  const [score, setScore] = useState(0);
  const [pressedCards, setPressedCards] = useState([]);
  const [best, setBest] = useState(0);
  const ids = [0,1,2,3,4,5,6,7,8,9,10,11];
  const api = 'https://pokeapi.co/api/v2/pokemon/'
  if(score > best) setBest(score);
  return (
    <>
      <div className='scoreDiv'>Score: {score} Best: {best}</div>
      
      <Card ids={ids} pressedCards={pressedCards} api={api}/>
    </>
  )
  function Card({ids, pressedCards, api}){
    let nextPressed = pressedCards
    async function getData(link){
      const response = await fetch(link, {mode:'cors'});
      const data = await response.json();
      console.log(data.sprites.other)
    }
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
    let cardOrder = randomizer(ids.length);
    return(
      <div className='cardDiv'>
      {cardOrder.map(card => {
        return <div className='card' key={card}
        onClick={() =>{
          if(nextPressed.includes(card)){
            setScore(0);
            setPressedCards([])
          }else{
            setScore(score + 1); 
          nextPressed.push(card);
          setPressedCards(nextPressed);
          }
          console.log(pressedCards)
        }}
        style={{
          'backgroundImage': getData(api+'flareon')
        }}
        >card {card} Here</div>})}
      </div>
     
    )
    
  }
}

export default App
