import React from "react";
import Player from "../components/Player";
import OptionsContainer from "../components/OptionsContainer.jsx";
import "./GameBoard.css";

// const banner = ['player 1 turn', 'player 1 win!', 'player 2 turn', 'player 1 win!']

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
    // let winPoints = this.state.pointsToWin;
    // let die11 = 6;
    // let die22 = 6;
    this.setState({ die1: die11 });
    this.setState({ die2: die22 });
    this.updateScore(die11, die22);
    this.updateCurrentScore(die11, die22);
    this.badScores(die11, die22);
    // this.turnOrWin(winPoints);
  };

  turnOrWin = (winPoints) => {
    if (this.state.player1Turn) {
      if (this.state.player1CurrentScore >= winPoints) {
        this.setState({ banner: "Player 1 Wins!" });
      } else {
        this.setState({ banner: "Player 1 turn" });
      }
    } else {
      if (this.state.player2CurrentScore >= winPoints) {
        this.setState({ banner: "Player 2 Wins!" });
      } else {
        this.setState({ banner: "Player 2 turn" });
      }
    }
  };

  badScores = (die1, die2) => {
    if (die1 === 6 && die2 === 6) {
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
    if (this.state.player1Turn && die1 + die2 !== 6) {
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
    } else {
      this.setState({ player1Turn: true });
      this.setState({ player2Turn: false });
      this.setState({ banner: "Player 1 turn" });
    }
  };

  newGame = () => {
    this.setState({ die1: null });
    this.setState({ die2: null });
    this.setState({ playersTurn: 0 });
    this.setState({ banner: "Ready?" });
    this.setState({ player1Score: 0 });
    this.setState({ player2Score: 0 });
    this.setState({ player1CurrentScore: 0 });
    this.setState({ player2CurrentScore: 0 });
  };

  render = () => {
    // console.log(this.state.die1);
    // console.log(`player1 ${this.state.player1Score}`);
    // console.log(`player2 ${this.state.player2Score}`);
    // console.log(`winPoints ${this.state.pointsToWin}`);
    return (
      <div className="GameBoard">
        <Player
          name="player 1"
          score={this.state.player1Score}
          currentScore={this.state.player1CurrentScore}
        />
        <OptionsContainer
          winPointsUpdate={this.winPoints}
          // inputValue={this.state.pointsToWin}
          win={this.state.banner}
          randomize={this.randomDice}
          newGame={this.newGame}
          changeTurn={this.changeTurn}
          die1={this.state.die1}
          die2={this.state.die2}
        />
        <Player
          name="player 2"
          score={this.state.player2Score}
          currentScore={this.state.player2CurrentScore}
        />
      </div>
    );
  };
}

export default GameBoard;
