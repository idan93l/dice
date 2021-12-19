import React from "react";
import Player from "../components/Player";
import OptionsContainer from "../components/OptionsContainer.jsx";
import "./GameBoard.css";

const dices = {
  1: 'die1',
  2: 'die2',
  3: 'die3',
  4: 'die4',
  5: 'die5',
  6: 'die6',
}

class GameBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      pointsToWin: 0,
      banner: "Ready?",
      die1: null,
      die2: null,
      player1Turn: true,
      player2Turn: false,
      player1Score: 0,
      player2Score: 0,
      player1CurrentScore: 0,
      player2CurrentScore: 0,
      turnStyle1: 'glow',
      winnerStyle1: '',
      turnStyle2: '',
      winnerStyle2: '',
      disableButton: false
    };
  }

  winPoints = (e) => {
    this.setState({ pointsToWin: e.target.value });
  };

  updateScore = (die1Score, die2Score) => {
    if (this.state.player1Turn && !this.state.player2Turn) {
      this.setState({ player1Score: die1Score + die2Score });
    } else {
      this.setState({ player2Score: die1Score + die2Score });
    }
  };

  randomDice = () => {
    let die11 = Math.ceil(Math.random() * 6);
    let die22 = Math.ceil(Math.random() * 6);
    this.setState({ die1: die11 });
    this.setState({ die2: die22 });
    this.updateScore(die11, die22);
    this.updateCurrentScore(die11, die22);
    this.badScores(die11, die22);
  };

  turnOrWin = (winPoints) => {
    if (this.state.player1Turn) {
      if (this.state.player1CurrentScore >= winPoints) {
        this.setState({ banner: "Player 1 Wins!" });
        this.setState({ winnerStyle1: 'jump' });
        this.setState({ disableButton: true })
      } else {
        this.setState({ banner: "Player 1 turn" });
        this.setState({ winnerStyle1: '' });
        this.setState({ disableButton: false })
      }
    } else {
      if (this.state.player2CurrentScore >= winPoints) {
        this.setState({ banner: "Player 2 Wins!" });
        this.setState({ winnerStyle2: 'jump' });
        this.setState({ disableButton: true })
      } else {
        this.setState({ banner: "Player 2 turn" });
        this.setState({ winnerStyle2: '' });
        this.setState({ disableButton: false })
      }
    }
  };

  badScores = (die1, die2) => {
    if (die1 === die2) {
      if (this.state.player1Turn) {
        this.setState({ player1Score: 0 });
        this.setState({ player1CurrentScore: 0 });
      } else {
        this.setState({ player2Score: 0 });
        this.setState({ player2CurrentScore: 0 });
      }
    }
  };

  updateCurrentScore = (die1, die2) => {
    if (this.state.player1Turn) {
      this.setState(
        (prevstate) => ({
          player1CurrentScore: prevstate.player1CurrentScore + die1 + die2,
        }),
        () => this.turnOrWin(this.state.pointsToWin)
      );
    }
    if (this.state.player2Turn)
      this.setState(
        (prevstate) => ({
          player2CurrentScore: prevstate.player2CurrentScore + die1 + die2,
        }),
        () => this.turnOrWin(this.state.pointsToWin)
      );
  };

  changeTurn = () => {
    if (this.state.player1Turn) {
      this.setState({ player1Turn: false });
      this.setState({ player2Turn: true });
      this.setState({ banner: "Player 2 turn" });
      this.setState({ turnStyle1: "" })
      this.setState({ turnStyle2: "glow" })
    } else {
      this.setState({ player1Turn: true });
      this.setState({ player2Turn: false });
      this.setState({ banner: "Player 1 turn" });
      this.setState({ turnStyle1: "glow" })
      this.setState({ turnStyle2: "" })
    }
  };

  newGame = () => {
    this.setState({ die1: null });
    this.setState({ die2: null });
    this.setState({ player1Turn: true })
    this.setState({ player2Turn: false })
    this.setState({ banner: "Ready?" });
    this.setState({ player1Score: 0 });
    this.setState({ player2Score: 0 });
    this.setState({ player1CurrentScore: 0 });
    this.setState({ player2CurrentScore: 0 });
    this.setState({ turnStyle1: "glow" })
    this.setState({ turnStyle2: "" })
    this.setState({ winnerStyle1: '' })
    this.setState({ winnerStyle2: '' })
    this.setState({ disableButton: false })
  };

  render = () => {
    return (
      <div className="flex GameBoard">
        <Player
          name="player 1"
          score={this.state.player1Score}
          currentScore={this.state.player1CurrentScore}
          turnStyle={this.state.turnStyle1}
          winnerStyle={this.state.winnerStyle1}
        />
        <OptionsContainer
          winPointsUpdate={this.winPoints}
          win={this.state.banner}
          randomize={this.randomDice}
          newGame={this.newGame}
          changeTurn={this.changeTurn}
          die1={dices[this.state.die1]}
          die2={dices[this.state.die2]}
          disable={this.state.disableButton}
        />
        <Player
          name="player 2"
          score={this.state.player2Score}
          currentScore={this.state.player2CurrentScore}
          turnStyle={this.state.turnStyle2}
          winnerStyle={this.state.winnerStyle2}
        />
      </div>
    );
  };
}

export default GameBoard;