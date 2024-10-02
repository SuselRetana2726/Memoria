import './App.css';
import { useEffect, useState } from 'react';
import Board from './components/Board/Board';
import swal from 'sweetalert'
const cardList = [
  `${process.env.PUBLIC_URL}/cards/T1.svg`,
  `${process.env.PUBLIC_URL}/cards/T2.svg`,
  `${process.env.PUBLIC_URL}/cards/T3.svg`,
  `${process.env.PUBLIC_URL}/cards/T4.svg`,
  `${process.env.PUBLIC_URL}/cards/T5.svg`,
  `${process.env.PUBLIC_URL}/cards/T6.svg`,
];

const App = () => {
  const [shuffledCards, setshuffledCards] = useState([]);
  const [selectedCards, setselectedCards] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20); 
  const [gameOver, setGameOver] = useState(false); 
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect( () => {
    const shuffledCardsList = shuffleArray([...cardList, ...cardList]);
    setshuffledCards(shuffledCardsList.map( (image, i) => ({ index: i, image: image, flipped: false}) ));
    setTimerRunning(true);
  }, []);

  useEffect( () => {
    const allFlipped = shuffledCards.every(obj => obj.flipped);
    
    if(allFlipped && timeLeft !== 20){
      setTimerRunning(false);
      swal({
        title: "¡YEIH!",
        text: "Has ganado felicitaciones",
        icon: "success",
        className: "swal-gano",
        buttons: {
          confirm: {
            text: "Nuevo Juego",
            className: "swal-button"
          }
        }
      }).then(() => {
        // Este código se ejecuta cuando el usuario hace clic en "OK"
        handleNotificationClose();
      });
    }
  }, [shuffledCards]);

  useEffect(() => {
    if (timeLeft === 0 && gameOver) {
      swal({
        title: "¡OH OH!",
        text: "Se acabó el tiempo",
        icon: "error",
        className: "swal-perdio",
        buttons: {
          confirm: {
            text: "Nuevo Juego",
            className: "swal-button"
          }
        }
      }).then(() => {
        // Este código se ejecuta cuando el usuario hace clic en "OK"
        handleNotificationClose();
      });
    }
  }, [timeLeft, gameOver]);

  const handleNotificationClose = () => {
    const shuffledCardsList = shuffleArray([...cardList, ...cardList]);
    setshuffledCards(shuffledCardsList.map( (image, i) => ({ index: i, image: image, flipped: false}) ));
    setTimeLeft(20);
    setGameOver(false);
    setTimerRunning(true);
    setselectedCards(null);
    setAnimating(false);
  };

  useEffect(() => {
    if (!timerRunning) return;

    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          setGameOver(true);
          setTimerRunning(false);
          clearInterval(timer);
          return 0; 
        }
        return prevTime - 1; 
      });
    }, 1000); 

    return () => clearInterval(timer); 
  }, [timerRunning]);

  const shuffleArray = a => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const handleMemoClick = card => {
    if (gameOver) return;

    const flippedCard = { ...card, flipped: true };
    let shuffledCardsCopy = [...shuffledCards];
    shuffledCardsCopy.splice(card.index, 1, flippedCard);
    setshuffledCards(shuffledCardsCopy);
    if(selectedCards === null) {
      setselectedCards(card);
    } else if(selectedCards.image === card.image) {
      setselectedCards(null);
    } else {
      setAnimating(true);
      setTimeout(() => {
        shuffledCardsCopy.splice(card.index, 1, card);
        shuffledCardsCopy.splice(selectedCards.index, 1, selectedCards);
        setshuffledCards(shuffledCardsCopy);
        setselectedCards(null);
        setAnimating(false);
      }, 1000);
    }
  }
  
  return (
    <div className="app-container">
      <div className="header-container">
        <div className="title-container mt-3">
          <img src={`${process.env.PUBLIC_URL}/otros/titulo.svg`} alt="Game Title" className="title-svg" />
        </div>
        <div className="timer-container">
          <h1 className="timer">Tiempo Restante: {timeLeft} segundos</h1>
        </div>
      </div>
      <Board cards={shuffledCards} animating={animating}  handleMemoClick={handleMemoClick} />
    </div>
  );
}

export default App;
