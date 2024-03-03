import { useState } from 'react';
import { quiz } from './Questions';
import './Quiz.css';
import { Box } from '@mui/material';
import sound from '../../../assets/apple.mp3';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Button from '@mui/material/Button';

const Quiz = () => {
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
    const [result, setResult] = useState({
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
    });
    const [showInstructions, setShowInstructions] = useState(true); // State to control the visibility of instructions

    const { questions } = quiz;
    const { question, choices, correctAnswer, picture } = questions[activeQuestion];

    const onClickNext = () => {
        setSelectedAnswerIndex(null);
        setResult((prev) =>
            selectedAnswer
                ? {
                    ...prev,
                    score: prev.score + 5,
                    correctAnswers: prev.correctAnswers + 1,
                }
                : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
        );
        if (activeQuestion !== questions.length - 1) {
            setActiveQuestion((prev) => prev + 1);
        } else {
            setActiveQuestion(0);
            setShowResult(true);
        }
    };

    const onAnswerSelected = (answer, index) => {
        setSelectedAnswerIndex(index);
        if (answer === correctAnswer) {
            setSelectedAnswer(true);
        } else {
            setSelectedAnswer(false);
        }
    };

    const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

    function play() {
        new Audio(sound).play();
    }

    const startGame = () => {
        setShowInstructions(false);
    };

    return (
        <div style={{ padding: '20px', background: "url('https://www.shutterstock.com/image-photo/identify-clarify-concept-market-customer-260nw-2060053274.jpg')", backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            {showInstructions && (
                <>
                    <Box className="instructions" sx={{ marginTop: '10px', display: 'flex', alignContent: 'center', flexDirection: 'column', flexWrap: 'wrap', padding: '15px', height: '100vh' }} >
                        <h1 style={{ fontFamily: 'cursive' }}>Identify Object Game</h1>
                        <h3>Instructions:</h3>
                        <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                            <ul style={{ fontSize: '19px' }}>
                                <li>Each answer equals 5 points.</li>
                                <li>Answering correctly on the first attempt gives you full score!</li>
                                <li>At each incorrect answer, the score for that question will reduce by 1 point.</li>
                                <li>Player must answer correctly to move to the next question.</li>
                                <li>You may play the game as many times as you like.</li>
                            </ul>
                        </Box>
                        <Button variant="contained" size="small" style={{ display: 'flex', marginInline: 'auto' }} onClick={startGame}>Start Game</Button>
                    </Box>
                </>
            )}
            {!showInstructions && (
                <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                    <div className="quiz-container">
                        {!showResult ? (
                            <div>
                                <div>
                                    <span className="active-question-no">{addLeadingZero(activeQuestion + 1)}</span>
                                    <span className="total-question">/{addLeadingZero(questions.length)}</span>
                                </div>
                                <h2>{question}</h2>
                                <img src={picture} alt="Question Image" className="question-image" style={{ height: '155px', width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }} />

                                <div>
                                    <VolumeUpIcon onClick={play} style={{ cursor: 'pointer', width: '50px', height: '50px' }}>Play Sound</VolumeUpIcon>
                                </div>

                                <ul>
                                    {choices.map((answer, index) => (
                                        <li
                                            onClick={() => onAnswerSelected(answer, index)}
                                            key={answer}
                                            className={selectedAnswerIndex === index ? 'selected-answer' : null}>
                                            {answer}
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex-right">
                                    <button onClick={onClickNext} disabled={selectedAnswerIndex === null}>
                                        {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="result">
                                <h3>Result</h3>
                                <p>
                                    Total Question: <span>{questions.length}</span>
                                </p>
                                <p>
                                    Total Score:<span> {result.score}</span>
                                </p>
                                <p>
                                    Correct Answers:<span> {result.correctAnswers}</span>
                                </p>
                                <p>
                                    Wrong Answers:<span> {result.wrongAnswers}</span>
                                </p>
                            </div>
                        )}
                    </div>
                </Box>
            )}
        </div>
    );
};

export default Quiz;
