import React from "react";
import "./Player.css";

class Player extends React.Component {
  render = () => {
    return (
      <div className="Player">
        <div className="containerPlayer">
          <h1>{this.props.name}</h1>
          <h1>score: {this.props.score}</h1>
        </div>
        <h1>current score: {this.props.currentScore}</h1>
      </div>
    );
  };
}

export default Player;
