import Player from "../components/Player"
import GameBoard from "../components/GameBoard"
import { useState } from "react"
import Log from "../components/Log"
import { WINNING_COMBINATIONS } from "../WinningCombination"
import GameOver from "../components/GameOver"


const initialGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
]

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X'
    if(gameTurns.length > 0 && gameTurns[0].player === 'X' ){
      currentPlayer = 'O'
    }
    return currentPlayer
}

function App() {
  const [gameTurns,setGameTurns] = useState([])
  // const [activePlayer,setActivePlayer] = useState('X')
  const[player,setPlayer] = useState({
    'X':'Player 1',
    'O':'Player 2'
})

  const activePlayer = deriveActivePlayer(gameTurns)

  let gameBoard = [...initialGameBoard.map(array => [...array])];
    for (const turn of gameTurns) {
        const {square , player} = turn
        const {row,col} = square
        gameBoard[row][col] = player
    }

    let winner;
  
  for(const combination of WINNING_COMBINATIONS){
    const firstCombination = gameBoard[combination[0].row][combination[0].column]
    const secondCombination = gameBoard[combination[1].row][combination[1].column]
    const thirdCombination = gameBoard[combination[2].row][combination[2].column]

    if(firstCombination && firstCombination===secondCombination && firstCombination===thirdCombination){
    winner = player[firstCombination]
  }
  }
    
  const hasDraw = gameTurns.length === 9 && !winner
  

  function handleSelectedSquare(rowIndex,colIndex) {
    // setActivePlayer((curActivePlayer) => (curActivePlayer === 'X' ? 'O' : 'X'))
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns)
      const updatedTurns = [
        {square: {row:rowIndex , col:colIndex},player : currentPlayer },...prevTurns
      ]
      return updatedTurns
    })
  }

  
  function handleRestart() {
    setGameTurns([])
  }

  function handleUpdatePlayerName(symbol,newName){
    setPlayer(prevPlayer => {
        return {
          ...prevPlayer,[symbol]:newName
        }
      }
    )

  }

  
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === 'X'} onChangename={handleUpdatePlayerName}/>
          <Player name="Player 2" symbol="O" isActive={activePlayer === 'O'} onChangename={handleUpdatePlayerName}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} restart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectedSquare} 
        board={gameBoard} activePlayerSymbol={activePlayer}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
