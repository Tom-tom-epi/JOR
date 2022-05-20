import React from 'react';
import $ from 'jquery';
class Dices extends React.Component {
  constructor() {
    super();
    this.state = {
      resultDice: 0,
      selectedDice: 0
    };
  }
  rollDice = () => {
    let min = Math.ceil(1);
    let max = Math.floor(this.state.selectedDice);
    let result = Math.floor(Math.random() * (max - min +1)) + min;
    this.setState({ resultDice: result });

    if(this.state.selectedDice == 100) {
      if(result >= 95) {
        $(".result_dice").removeClass("crit");
        $(".result_dice").addClass("fail");
      }else if(result <= 5) {
        $(".result_dice").removeClass("fail");
        $(".result_dice").addClass("crit");
      }else {
        $(".result_dice").removeClass("fail");
        $(".result_dice").removeClass("crit");
      }
    }
  }
  // Change the selected dice
  handleChange = (e) => {
    
    this.setState({ selectedDice: e.target.value });
    $(".used").removeClass("used");
    $("#btn_"+ e.target.value).addClass("used");
  };
    render() {
      return (
        <div className='dices'>
          <div className="content_btn_dices">
            <button className="btn_dice" id="btn_4" value="4" onClick={this.handleChange}>4</button>
            <button className="btn_dice" id="btn_6" value="6" onClick={this.handleChange}>6</button>
            <button className="btn_dice" id="btn_8" value="8" onClick={this.handleChange}>8</button>
            <button className="btn_dice" id="btn_10" value="10" onClick={this.handleChange}>10</button>
            <button className="btn_dice" id="btn_20" value="20" onClick={this.handleChange}>20</button>
            <button className="btn_dice" id="btn_100" value="100" onClick={this.handleChange}>100</button>
          </div>
          <div className="content_result_dice"><p className="result_dice">{this.state.resultDice}</p></div>
          <button className="roll_dice_btn" onClick={this.rollDice}>Show</button>
        </div>
      );
    }
  }

export default Dices;