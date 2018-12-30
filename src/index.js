/*
 * Filename: index.js
 * Author: Allan Phu
 * Description: Main driver for tic-tac-toe program.
 * Date: Dec 29 2018
*/
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
 * Function Name: Square()
 * Function Prototype: Square(props)
 * Description: Function component that renders the symbol for the square 
 *              to the UI.
 * Parameters: props -- contains the symbol ( 'X', 'O', null ) to render
 * Return Value: A react element with classname "square" and onClick() method.
 * Local variables: 
 */
function Square(props) {
  return (
      <button
        className="square" 
        onClick = {props.onClick}
      >
        {props.value}
      </button>
  );
}

class Board extends React.Component {

  // Board's private state ( 9 squares )
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  // Method to set character for square
  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares});
  }

  renderSquare(i) {
    return ( 
      <Square 
        value = { this.state.squares[i] }
        onClick = { () => this.handleClick(i) }
      />
    );
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
