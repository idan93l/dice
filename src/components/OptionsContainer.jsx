import React from "react";
import "./OptionsContainer.css";

class OptionsContainer extends React.Component {
  render = () => {
    return (
      <div className="OptionsContainer">
        <button onClick={this.props.newGame}>New Game</button>
        {/* <h1>{this.props.die1}</h1> */}
        <div className={this.props.die1}></div>
        <div className={this.props.die2}></div>
        {/* <h1>{this.props.die2}</h1> */}
        <h1>{this.props.win}</h1>
        <div className="container">
          <button onClick={this.props.randomize}>Roll Dice</button>
          <button onClick={this.props.changeTurn}>Hold</button>
          <input
            type="text"
            placeholder="Final Score"
            onChange={this.props.winPointsUpdate}
            // value={this.props.inputValue}
          />
        </div>
      </div>
    );
  };
}

export default OptionsContainer;
