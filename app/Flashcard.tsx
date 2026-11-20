"use client"
import{useReward, confetti, emoji} from "react-rewards"
import{useRef, useState, type SubmitEvent} from "react";

type OP = "+"|"-"|"*"|"/";
type Problem = {a:number, b:number,op: OP, answer:number, };
type status="ask"|"right"|"wrong";
const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;
const OPERATORS: OP[]=["+","-","*","/"];

function newProblem(): Problem{
    const op = OPERATORS[random(0,3)];
    let a = random(0, 20);
    let b = random(0, 20);
    if(op==="/"){
        b=random(1, 20);
        a = random(0,20)*b;
    }
    const answer =
        op === "+" ? a+b:
        op === "-" ? a-b:
        op === "*" ? a*b:
        a/b;
    return {a, b, op, answer};
}
export default function Flashcard(){
    const[problem, setProblem] = useState<Problem>(newProblem);
    const[status, setStatus] = useState<status>("ask");
    const[guess, setGuess] = useState("");
    const[score, setScore] = useState(0);
    const cardRef = useRef<HTMLDivElement>(null);
    const { reward } = useReward(cardRef, confetti, { count: 120, spread: 80 });
    const scoreRef = useRef<HTMLParagraphElement>(null);
    const { reward: emojiPopRight } = useReward(cardRef, emoji, {
        emojis: ["⭐", "🎉", "💯",],
        count: 80,
        size: 28,
        spread: 360,
        velocity: 3500,
        drag: 10,
        gravity: 400,
        lifetime: 5000,
    });
    const { reward: emojiPopWrong } = useReward(cardRef, emoji, {
        emojis: ["💩", "☠️", "🤬",],
        count: 65,
        size: 28,
        spread: 360,
        velocity: 3500,
        drag: 10,
        gravity: 400,
        lifetime: 5000,
    });
    function checkGuess(event: SubmitEvent) {
        event.preventDefault();
        if(guess.trim()===""){
            return;
        }else if(Number(guess) === problem.answer){
            setStatus("right");
            setScore(s=>s+1);
            emojiPopRight();
        }else{
            setStatus("wrong");
            emojiPopWrong();
        }
    }
    function next(){
        setProblem(newProblem());
        setStatus("ask");
        setGuess("");
    }
    const{a, b, op, answer} = problem;
    return (
        <>
            <p className="score">Score: {score}</p>
            <div ref ={cardRef} className={`Card ${status}`}>
                <p className="problem">
                    {a} {op} {b} = {status === "right" ? answer : "?"}
                </p>

                {status === "right" ? (
                    <>
                        <p className="message">Correct! 🎉</p>
                        <button className="primary" onClick={next} autoFocus>
                            Next card →
                        </button>
                    </>
                ) : (
                    <form onSubmit={checkGuess}>
                        <input
                            type="number"
                            inputMode="numeric"
                            aria-label="Your answer"
                            placeholder="Your answer"
                            value={guess}
                            onChange={(e) => {
                                setGuess(e.target.value);
                                setStatus("ask");
                            }}
                            autoFocus
                        />
                        <div className="buttons">
                            <button className="primary" type="submit">
                                Check
                            </button>
                            <button type="button" onClick={next}>
                                Skip
                            </button>
                        </div>
                        <p className="message" aria-live="polite">
                            {status === "wrong" ? "Not quite. Try again!" : " "}
                        </p>
                    </form>
                )}
            </div>
        </>
    );
}
