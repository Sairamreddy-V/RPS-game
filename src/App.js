import {Component} from 'react'
import Popup from 'reactjs-popup'
import {IoMdClose} from 'react-icons/io'
import 'reactjs-popup/dist/index.css'
import './App.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

let checkList = []

class App extends Component {
  state = {
    userImage: '',
    opponentImage: '',
    userId: '',
    opponentId: '',
    result: '',
    score: 0,
  }

  onImgClick = event => {
    const value = event.target.alt
    const randomNum = Math.ceil(Math.random() * 2)
    const opoUrl = choicesList[randomNum].id
    if (opoUrl === 'ROCK') {
      checkList[0] =
        'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png'
      checkList[1] = 'ROCK'
    } else if (opoUrl === 'SCISSORS') {
      checkList[0] =
        'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png'
      checkList[1] = 'SCISSORS'
    } else {
      checkList[0] =
        'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png'
      checkList[1] = 'PAPER'
    }
    if (value === 'ROCK') {
      checkList[2] =
        'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png'
      checkList[3] = 'ROCK'
    } else if (value === 'SCISSORS') {
      checkList[2] =
        'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png'
      checkList[3] = 'SCISSORS'
    } else {
      checkList[2] =
        'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png'
      checkList[3] = 'PAPER'
    }
    this.setState(
      {
        opponentImage: checkList[0],
        opponentId: checkList[1],
        userImage: checkList[2],
        userId: checkList[3],
      },
      this.renderResult,
    )
  }

  renderResult = () => {
    const {userImage, opponentImage, userId, opponentId} = this.state
    const userLength = userId.length
    const opponentLength = opponentId.length
    console.log(userLength)
    console.log(opponentLength)
    const winCondition =
      (userLength === 4 && opponentLength === 8) ||
      (userLength === 8 && opponentLength === 5) ||
      (userLength === 5 && opponentImage === 4)
    if (userLength === opponentLength) {
      this.setState(prevState => ({
        result: 'IT IS DRAW',
        score: prevState.score,
      }))
    } else if (winCondition) {
      this.setState(prevState => ({
        result: 'YOU WON',
        score: prevState.score + 1,
      }))
    } else {
      this.setState(prevState => ({
        result: 'YOU LOOSE',
        score: prevState.score - 1,
      }))
    }
  }

  renderScoreHeader = () => {
    const {score} = this.state
    return (
      <div className="score-container">
        <h1>Rock Paper Scissors</h1>
        <span className="score-span-container">
          <p>Score</p>
          <p className="score">{score}</p>
        </span>
      </div>
    )
  }

  gameView = () => (
    <div className="game-view-container">
      <div className="first-two-image-container">
        <button
          onClick={this.onImgClick}
          className="image-button"
          data-testid="rockButton"
        >
          <img
            className="image"
            alt="ROCK"
            src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png"
          />
        </button>
        <button
          onClick={this.onImgClick}
          className="image-button"
          data-testid="scissorsButton"
        >
          <img
            className="image"
            alt="SCISSORS"
            src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png"
          />
        </button>
      </div>
      <button
        onClick={this.onImgClick}
        className="image-button"
        data-testid="paperButton"
      >
        <img
          className="image"
          alt="PAPER"
          src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png"
        />
      </button>
    </div>
  )

  onPlayAgain = () => {
    checkList = []
    this.setState({
      result: '',
      opponentId: '',
      userId: '',
      opponentImage: '',
      userImage: '',
    })
  }

  renderDrawView = () => (
    <div className="result-text-container">
      <p className="heading">IT IS DRAW</p>
      <button onClick={this.onPlayAgain} className="paly-again-button">
        PLAY AGAIN
      </button>
    </div>
  )

  renderWinView = () => (
    <div className="result-text-container">
      <p className="heading">YOU WON</p>
      <button onClick={this.onPlayAgain} className="paly-again-button">
        PLAY AGAIN
      </button>
    </div>
  )

  renderLoseView = () => (
    <div className="result-text-container">
      <p className="heading">YOU LOSE</p>
      <button onClick={this.onPlayAgain} className="paly-again-button">
        PLAY AGAIN
      </button>
    </div>
  )

  renderResultView = () => {
    const {result, opponentImage, userImage, userId, opponentId} = this.state
    return (
      <div className="game-view-container">
        <div className="first-two-image-container">
          <div>
            <h1 className="heading">YOU</h1>
            <img className="image" alt="your choice" src={userImage} />
          </div>
          <div>
            <h1 className="heading">OPPONENT</h1>
            <img className="image" alt="opponent choice" src={opponentImage} />
          </div>
        </div>
        {result === 'IT IS DRAW' && this.renderDrawView()}
        {result === 'YOU WON' && this.renderWinView()}
        {result === 'YOU LOOSE' && this.renderLoseView()}
      </div>
    )
  }

  render() {
    const {result} = this.state
    return (
      <div className="page-container">
        {this.renderScoreHeader()}
        {result === '' ? this.gameView() : this.renderResultView()}
        <Popup
          modal
          trigger={
            <button type="button" className="trigger-button">
              Rules
            </button>
          }
        >
          {close => (
            <div className="popup-container">
              <button
                type="button"
                className="trigger-button"
                id="close"
                onClick={() => close()}
              >
                <IoMdClose size="30" color="#616e7c" aria-label="close"/>
              </button>
              <div>
                <img
                  className="rules-image"
                  alt="rules"
                  src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png "
                />
              </div>
            </div>
          )}
        </Popup>
      </div>
    )
  }
}

export default App
