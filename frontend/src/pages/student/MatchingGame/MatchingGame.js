import React from "react";
import Data from "./Data";
import Card from "./Card";
import './MatchingGame.css';
import Button from '@mui/material/Button';


function MatchingGame() {
    const [cardsArray, setCardsArray] = React.useState([]);
    const [moves, setMoves] = React.useState(0);
    const [firstCard, setFirstCard] = React.useState(null);
    const [secondCard, setSecondCard] = React.useState(null);
    const [stopFlip, setStopFlip] = React.useState(false);
    const [won, setWon] = React.useState(0);
    const [showInstructions, setShowInstructions] = React.useState(true); // State to control the visibility of instructions

    // Function to start a new game
    function NewGame() {
        setTimeout(() => {
            const randomOrderArray = Data.sort(() => 0.5 - Math.random());
            setCardsArray(randomOrderArray);
            setMoves(0);
            setFirstCard(null);
            setSecondCard(null);
            setWon(0);
        }, 1200);
    }

    // Function to handle selected cards
    function handleSelectedCards(item) {
        if (firstCard !== null && firstCard.id !== item.id) {
            setSecondCard(item);
        } else {
            setFirstCard(item);
        }
    }

    // Effect to check if two cards are selected and if they match
    React.useEffect(() => {
        if (firstCard && secondCard) {
            setStopFlip(true);
            if (firstCard.name === secondCard.name) {
                setCardsArray((prevArray) => {
                    return prevArray.map((unit) => {
                        if (unit.name === firstCard.name) {
                            return { ...unit, matched: true };
                        } else {
                            return unit;
                        }
                    });
                });
                setWon((preVal) => preVal + 1);
                removeSelection();
            } else {
                setTimeout(() => {
                    removeSelection();
                }, 1000);
            }
        }
    }, [firstCard, secondCard]);

    // Function to remove selected cards
    function removeSelection() {
        setFirstCard(null);
        setSecondCard(null);
        setStopFlip(false);
        setMoves((prevValue) => prevValue + 1);
    }

    // Effect to start the game for the first time
    React.useEffect(() => {
        NewGame();
    }, []);

    // Function to start the game
    const startGame = () => {
        setShowInstructions(false);
    };

    return (
        <div className="container">
            {showInstructions && (
                <>
                    <div className="instructions" style={{ padding: '15px' }}>
                        <h1 style={{ fontFamily: 'cursive' }}>Matching Game</h1>
                        <h3>Instructions:</h3>
                        <ul style={{ fontSize: '19px' }}>
                            <li>Match pairs of cards by selecting them.</li>
                            <li>Each move counts as one attempt.</li>
                            <li>Try to match all pairs in the fewest moves possible.</li>
                            <li>You win when all pairs are matched.</li>
                        </ul>
                    </div>
                    <Button variant="contained" size="small" style={{ display: 'flex', marginInline: 'auto' }} onClick={startGame}>Start Game</Button>

                </>
            )}
            {!showInstructions && (
                <>
                    <div className="header">
                        <h1>Matching Game for Memory Increase</h1>
                    </div>
                    <div className="board">
                        {
                            cardsArray.map((item) => (
                                <Card
                                    item={item}
                                    key={item.id}
                                    handleSelectedCards={handleSelectedCards}
                                    toggled={
                                        item === firstCard ||
                                        item === secondCard ||
                                        item.matched === true
                                    }
                                    stopflip={stopFlip}
                                />
                            ))
                        }
                    </div>
                    {won !== 6 ? (
                        <div className="comments">Moves : {moves}</div>
                    ) : (
                        <div className="comments">
                            ( You Won in {moves} moves )
                        </div>
                    )}
                    <button className="button" onClick={NewGame}>
                        New Game
                    </button>
                </>
            )}
        </div>
    );
}

export default MatchingGame; 
