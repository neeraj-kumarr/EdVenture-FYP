import React, { useState, useEffect } from "react";
import "./Spellathon.css";
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import sound from '../../../assets/apple.mp3';
import Button from '@mui/material/Button';

const sampleWords = [
    {
        word: "APPLE",
        description: "Fruit"
    },
    {
        word: "DOG",
        description: "Animal"
    },
    {
        word: "PENCIL",
        description: "Stationary"
    },
    {
        word: "CUP",
        description: "Crockery Items"
    },

];

const getRandomWord = () => {
    const randomPlace = Math.floor(Math.random() * sampleWords.length);
    return sampleWords[randomPlace];
};

function play() {
    new Audio(sound).play()
}

const GFGWordGame = () => {
    const [wordData, setWordData] = useState(getRandomWord());
    const [msg, setMsg] = useState("");
    const [chosenLetters, setChosenLetters] = useState([]);
    const [hints, setHints] = useState(3);
    const [displayWord, setDisplayWord] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [wrongGuesses, setWrongGuesses] = useState(0);
    const [showInstructions, setShowInstructions] = useState(true); // State to control the visibility of instructions

    useEffect(() => {
        if (wrongGuesses >= 3) {
            // Code to show the popup or message for game over 
            window.alert("Game Over! You made too many wrong guesses.");
            restartGameFunction();
        }
    }, [wrongGuesses]);

    const letterSelectFunction = (letter) => {
        if (!chosenLetters.includes(letter)) {
            setChosenLetters([...chosenLetters, letter]);
            if (!wordData.word.includes(letter)) {
                setWrongGuesses(wrongGuesses + 1);
            }
        }
    };

    const hintFunction = () => {
        if (hints > 0) {
            const hiddenLetterIndex = wordData.word
                .split("")
                .findIndex((letter) => !chosenLetters.includes(letter));
            setChosenLetters([...chosenLetters, wordData.word[hiddenLetterIndex]]);
            setHints(hints - 1);
        }
    };

    const removeCharacterFunction = () => {
        setChosenLetters(chosenLetters.slice(0, -1));
    };

    const displayLettersFunction = () => {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        return Array.from(letters).map((letter, index) => (
            <button
                key={index}
                onClick={() => letterSelectFunction(letter)}
                disabled={chosenLetters.includes(letter)}
                className={`letter-button ${chosenLetters.includes(letter) ? "selected" : ""
                    }`}
            >
                {letter}
            </button>
        ));
    };

    const checkWordGuessedFunction = () => {
        return wordData.word.split("").every((letter) => chosenLetters.includes(letter));
    };

    const guessFunction = () => {
        if (checkWordGuessedFunction()) {
            setMsg("Congo Kid! You have guessed the word correctly!");
        } else {
            setMsg("You made a Wrong Guess Kid!. Try again!");
            setDisplayWord(true);
        }
    };

    const restartGameFunction = () => {
        setWordData(getRandomWord());
        setMsg("");
        setChosenLetters([]);
        setHints(3);
        setDisplayWord(false);
        setGameOver(false);
        setWrongGuesses(0);
    };

    const startGame = () => {
        setShowInstructions(false);
    };

    return (
        <div className="container" style={{ padding: '20px', background: "url('https://hougumlaw.com/wp-content/uploads/2016/05/light-website-backgrounds-light-color-background-images-light-color-background-images-for-website-1024x640.jpg')", backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            {showInstructions && (
                <>
                    <h1 style={{ fontFamily: 'cursive' }}>Spellathon</h1>
                    <div className="instructions" style={{ padding: '10px' }}>
                        <h2>Instructions:</h2>
                        <ul style={{ fontSize: '25px' }}>
                            <li>Try to guess the word by selecting letters.</li>
                            <li>You have 3 hints available.</li>
                            <li>Each wrong guess will count against you.</li>
                            <li>Game over if you make 3 wrong guesses.</li>
                        </ul>
                    </div>
                    <Button variant="contained" size="small" style={{ display: 'flex', marginInline: 'auto' }} onClick={startGame}>Start Game</Button>
                </>
            )}
            {!showInstructions && (
                <>
                    <div className="word-container">
                        {Array.from(wordData.word).map((letter, index) => (
                            <div
                                key={index}
                                className={`letter ${chosenLetters.includes(letter) ? "visible" : ""
                                    }`}
                            >
                                {chosenLetters.includes(letter) ? letter : ""}
                            </div>
                        ))}
                    </div>
                    <VolumeDownIcon onClick={play} style={{ cursor: 'pointer', width: '50px', height: '50px' }}></VolumeDownIcon>
                    <h6 className="word-description" style={{ color: '#2d1097' }}>(Hint: {wordData.description}) </h6>
                    {msg && (
                        <div className="message">
                            <p>{msg}</p>
                            {displayWord && <p>Correct word was: {wordData.word}</p>}
                        </div>
                    )}
                    <div className="button-section">
                        <div className="guess-section">
                            <button
                                onClick={restartGameFunction}
                                className="restart-button"
                            >
                                Restart
                            </button>
                            <button
                                onClick={removeCharacterFunction}
                                disabled={!chosenLetters.length}
                                className="remove-button"
                            >
                                Remove Letter
                            </button>
                        </div>
                        <div className="letter-selection">
                            {displayLettersFunction()}
                        </div>
                        <div className="hints">
                            Hints Remaining: {hints}{" "}
                            <button
                                onClick={hintFunction}
                                disabled={hints === 0}
                                className="hint-button"
                            >
                                Get Hint
                            </button>
                        </div>
                        {!msg && (
                            <button
                                onClick={guessFunction}
                                disabled={!chosenLetters.length}
                                className="guess-button"
                            >
                                Guess
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default GFGWordGame;
