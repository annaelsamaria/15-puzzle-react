import React, { useState } from 'react'
import './app.css'
import { chunk, shuffle } from "lodash"


const rows = 4
const columns = 4


const generateNewBoard = () => {
  const flatTiles = Array.from(Array(rows * columns), (_, i) => i === 0 ? null : i)
  const shuffled = shuffle(flatTiles)

  return chunk(shuffled, columns)
}

const initialBoard = generateNewBoard

const startArray = chunk(Array.from(Array(rows * columns), (_, i) => i === 0 ? null : i), columns)
console.log(startArray)

const winningBoard = startArray.push(startArray.shift())



const isGameFinished = (board) => {
  let solved = true;
  board.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      if (column !== winningBoard[rowIndex][columnIndex]) {
        solved = false
      }
    })
  })
  return solved
}


export const App = () => {

  const [board, setBoard] = useState(initialBoard)
  const [won, setWon] = useState(false)


  const handleTileClick = (rowIndex, columnIndex) => {

    const tileValue = board[rowIndex][columnIndex]

    //   * Can it move up? = is it not on the top row && is the tile in the row above it null?
    if (
      rowIndex >= 1 && board[rowIndex - 1][columnIndex] === null
    ) {
      const newBoard = [...board]
      newBoard[rowIndex - 1][columnIndex] = tileValue
      newBoard[rowIndex][columnIndex] = null
      setBoard(newBoard)
      setWon(isGameFinished(board))
    }
    //   * Can it move down? = is it not on the bottom row && if the tile in the row below it null?
    else if (
      rowIndex + 1 !== board.length && board[rowIndex + 1][columnIndex] === null
    ) {
      const newBoard = [...board]
      newBoard[rowIndex + 1][columnIndex] = tileValue
      newBoard[rowIndex][columnIndex] = null
      setBoard(newBoard)
      setWon(isGameFinished(board))
    }

    //   * Can it move right? = is it not on the final column && is the tile to the right of it null?
    else if (
      columnIndex !== board.length && board[rowIndex][columnIndex + 1] === null
    ) {
      const newBoard = [...board]
      newBoard[rowIndex][columnIndex + 1] = tileValue
      newBoard[rowIndex][columnIndex] = null
      setBoard(newBoard)
      setWon(isGameFinished(board))
    }
    //   * Can it move left? = is it not on the first column && is the tile to the left of it null?
    else if (
      columnIndex >= 1 && board[rowIndex][columnIndex - 1] === null
    ) {
      const newBoard = [...board]
      newBoard[rowIndex][columnIndex - 1] = tileValue
      newBoard[rowIndex][columnIndex] = null
      setBoard(newBoard)
      setWon(isGameFinished(board))
    }
  }


  return (
    <div>
      <div
        className="board" style={{ gridTemplateColumns: `repeat(${board[0].length}, 1fr)` }}>
        {board.map((row, rowIndex) =>
          row.map((tileValue, columnIndex) => {
            if (tileValue) {
              return (
                <button
                  className={tileValue ? "tile" : "empty"}
                  key={`${rowIndex}-${columnIndex}`}
                  onClick={() => handleTileClick(rowIndex, columnIndex)}>
                  <span>{tileValue}</span>
                </button>
              )
            } else {
              return <div className="empty" />
            }
          })
        )}
      </div>
      {won && (
        <h2>Pusslet är löst, hurra!</h2>
      )}
      <button className="slumpaButton" onClick={() => setBoard(generateNewBoard())}>Slumpa</button>
    </div>
  )
}