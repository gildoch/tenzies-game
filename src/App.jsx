import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import logo from "./logo.svg";
import "./App.css";
import Die from "./Die/Die";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("You won!");
    }
  }, [dice]);

  function generateNewDice() {
    return {
      value: Math.floor(Math.random() * (7 - 1) + 1),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    let randomNumArray = [];
    for (let i = 0; i < 10; i++) {
      randomNumArray.push(generateNewDice());
    }
    return randomNumArray;
  }

  function rolldice() {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld ? die : generateNewDice();
      })
    );
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  function resetGame() {
    setTenzies((oldTenzies) => !tenzies);
    setDice(allNewDice());
  }

  const diceElements = dice.map((die) => {
    return (
      <Die
        value={die.value}
        isHeld={die.isHeld}
        holdDice={() => holdDice(die.id)}
      />
    );
  });

  return (
    <main className="container">
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="wrapper">{diceElements}</div>
      <button className="roll-dice" onClick={tenzies ? resetGame : rolldice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
      {tenzies && <Confetti />}
    </main>
  );
}

export default App;
