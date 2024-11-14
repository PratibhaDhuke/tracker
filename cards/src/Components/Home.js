import { useState, useEffect } from "react";

function Home() {
  const [flippedCardIndex, setFlippedCardIndex] = useState([]);
  const [cards, setCards] = useState([]);
  const [flipCount, setFlipCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [matchCount, setMatchCount] = useState(0);
  const [timer, setTimer] = useState(0); // State for timer

  const handleFlip = (index) => {
    // Prevent flipping if game is over or if the card is already flipped
    if (
      gameOver ||
      flippedCardIndex.includes(index) ||
      cards[index].status === "visible"
    ) {
      return;
    }

    setFlipCount((prevCount) => prevCount + 1);

    if (flippedCardIndex.length < 2) {
      setFlippedCardIndex((prev) => {
        const newIndex = [...prev, index];
        const updatedCards = cards.map((card, idx) => {
          if (newIndex.includes(idx)) {
            return { ...card, status: "flip" };
          }
          return card;
        });

        setCards(updatedCards);

        if (newIndex.length === 2) {
          const firstCard = updatedCards[newIndex[0]];
          const secondCard = updatedCards[newIndex[1]];

          if (firstCard.back === secondCard.back) {
            const newMatchCount = matchCount + 1;
            setMatchCount(newMatchCount);

            // Check for game over condition
            if (newMatchCount === cards.length / 2) {
              setGameOver(true); // Set game over if all pairs matched
            }

            const matchedCards = updatedCards.map((card, idx) => {
              if (newIndex.includes(idx)) {
                return { ...card, status: "visible" };
              }
              return card;
            });
            setCards(matchedCards);

            setTimeout(() => {
              const hiddenCards = matchedCards.map((card, idx) => {
                if (newIndex.includes(idx)) {
                  return { ...card, status: "hidden" };
                }
                return card;
              });
              setCards(hiddenCards);
            }, 2000);
          } else {
            setTimeout(() => {
              const resetCards = updatedCards.map((card, idx) => {
                if (newIndex.includes(idx)) {
                  return { ...card, status: "notflipped" };
                }
                return card;
              });
              setCards(resetCards);
            }, 1000);
          }
        }
        return newIndex;
      });
    } else {
      setFlippedCardIndex([index]);
    }
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const shuffledCards = [
      { id: 1, back: "/Images/card1.png", status: "notflipped" },
      { id: 2, back: "/Images/card2.png", status: "notflipped" },
      { id: 3, back: "/Images/card3.png", status: "notflipped" },
    ];

    const duplicateCards = [];
    shuffledCards.forEach((value) => duplicateCards.push(value, value));
    const cards = shuffleArray(duplicateCards);
    setCards(cards);
  }, []);

  // Timer functionality
  useEffect(() => {
    let interval = null;

    if (!gameOver && timer >= 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else if (gameOver) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [gameOver, timer]);

  const resetGame = () => {
    setFlippedCardIndex([]);
    setCards([]);
    setFlipCount(0);
    setGameOver(false);
    setMatchCount(0);
    setTimer(0);

    const shuffledCards = [
      { id: 1, back: "/Images/card1.png", status: "notflipped" },
      { id: 2, back: "/Images/card2.png", status: "notflipped" },
      { id: 3, back: "/Images/card3.png", status: "notflipped" },
    ];

    const duplicateCards = [];
    shuffledCards.forEach((value) => duplicateCards.push(value, value));
    const cards = shuffleArray(duplicateCards);
    setCards(cards);
  };

  return (
    <div className="game-container">
      <h2>Flip Count: {flipCount}</h2>
      <h2>Match Count: {matchCount}</h2>
      <h2>Time: {timer} seconds</h2>
      {gameOver && <h2 className="game-over-message">Game Over..!!!</h2>}
      <div className="cardsblock">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`flipcard ${
              flippedCardIndex.includes(index) ? "flipped" : ""
            } ${card.status === "hidden" ? "pointernone" : ""}`}
            onClick={() => handleFlip(index)}
          >
            <div
              className={`cardinner ${
                card.status === "flip" || card.status === "visible"
                  ? "displaynone"
                  : ""
              } ${card.status === "hidden" ? "hidden" : ""}`}
            >
              <div className="cardfront">
                <img
                  src="/Images/back.png"
                  className="cardimg"
                  alt="Card Front"
                />
              </div>
              <div className="cardback">
                <img src={card.back} className="cardimg" alt="Card Back" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
