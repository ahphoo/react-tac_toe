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

function calculateWinner(squares) {
  const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
  ];
  
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}  

class Board extends React.Component {

  /* Board's private state ( 9 squares ). Lifted state to Game component.
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }
  */

  renderSquare(i) {
    return ( 
      <Square 
        value = { this.props.squares[i] }
        onClick = { () => this.props.onClick(i) }
      />
    );
  }

  render() {
    return (
      <div>
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

  // Game's private state
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  // Updates step number and next player after jumping to a move
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }
  
  // Method to set character for square
  handleClick(i) {  
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    // If there is a winner or a move has been played on that Square
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    // Set the symbol for the Square
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    // Concatenate a new game board onto history
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  // Render method for the Game component
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick = {() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    }
    else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares = { current.squares }
            onClick = { (i) => this.handleClick(i)}
          />

        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ moves }</ol>
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
