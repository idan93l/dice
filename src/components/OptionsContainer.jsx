import React from "react";
import "./OptionsContainer.css";

class OptionsContainer extends React.Component {
  render = () => {
    return (
      <div className="flex OptionsContainer">
        <button onClick={this.props.newGame}>New Game</button>
        <div className="flex dieContainer">
        <div className={`die ${ this.props.die1 }`}></div>
        <div className={`die ${ this.props.die2 }`}></div>
        </div>
        <div className="spice">
        <h1>{this.props.win}</h1>
        </div>
        <div className="flex container">
          <button onClick={this.props.randomize}>Roll Dice</button>
          <button onClick={this.props.changeTurn}>Hold</button>
          <input
            type="text"
            placeholder="Final Score"
            onChange={this.props.winPointsUpdate}
          />
        </div>
      </div>
    );
  };
}

export default OptionsContainer;
