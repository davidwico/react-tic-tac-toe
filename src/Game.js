import React, { Component } from 'react';
import './Game.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: Array(9).fill(null),
      counter: 0,
      win: false,
      hidden: undefined
    }
    this.playAgain = this.playAgain.bind(this);
  }

  //Helper fountion for checkWin function
  areEqual(a,b,c) {
    if (a != null && b != null && c != null) {
      if(a === b && b === c) {
        return true
      } else {
        return false
      }
    }
  }

  //Check for win function
  checkWin() {
    let field = this.state.fields;
    if(field[0] != null) {
      if (
        this.areEqual(field[0], field[1], field[2]) ||
        this.areEqual(field[3], field[4], field[5]) ||
        this.areEqual(field[6], field[7], field[8]) ||
        this.areEqual(field[0], field[3], field[6]) ||
        this.areEqual(field[1], field[4], field[7]) ||
        this.areEqual(field[2], field[5], field[8]) ||
        this.areEqual(field[0], field[4], field[8]) ||
        this.areEqual(field[2], field[4], field[6])
        ) {
            this.setState({
              win: true
            });
          } 
    }

    //Hide 'next turn' information
    if(this.state.counter === 9) {
      this.setState({
        hidden: 'none'
      })
    }
  }

  putIt(index) {

    //Set X or O as marker depends of who's next turn
    const key = index.target.getAttribute("value");
    const arr = [...this.state.fields];
    if(this.state.counter % 2) {
      arr[key] = 'O';
    } else {
      arr[key] = 'X';
    }

    //Update state and check for win
    this.setState(prevState => ({
      fields: arr,
      counter: prevState.counter + 1
    }), ()=>this.checkWin());

  }

  //Play again function
  playAgain() {
    this.setState({
        fields: Array(9).fill(null),
        counter: 0,
        win: false,
        hidden: undefined
    })
  }


  render() {
    return(
      <div className='wrapper'>
        <h1><span>T</span>ic<span>T</span>ac<span>T</span>oe</h1>
          {this.state.counter === 9 && this.state.win === false ? <h2>REMIS</h2> : undefined}
          {this.state.win ? 
            <h2>{this.state.counter % 2 ? <span className="blue">X</span> : 
              <span className="red">O</span>}won the game!
            </h2> : 
            <h2 style={{display: this.state.hidden}}>
              It's {this.state.counter % 2 ? 
              <span className="red">O</span> : 
              <span className="blue">X</span>} turn
            </h2>
          } 
        <div className='wrapper-board mui-panel'>
          {this.state.fields.map((text,index) => {
            return (
              <div className='field' value={index} key={index} 
              onClick={(this.state.fields[index] || this.state.win) ? 
                undefined : 
                  (index) => this.putIt(index)}>
                    {(text === 'X') ? 
                    <span className="blue">{text}</span> : 
                    <span className="red">{text}</span>}
              </div>
            )
          })}
        </div>
        <button className='mui-btn mui-btn--raised'
          style={this.state.hidden !== undefined || this.state.win === true ? 
            {display: 'block'} : {display: 'none'}} 
          onClick={this.playAgain}>
          Play Again
        </button>
      </div>
    )
  }
}

export default Game;