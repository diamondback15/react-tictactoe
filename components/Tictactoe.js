import { Button, Card, CardBody, CardImg, Col } from 'reactstrap'
import LabLayout from '~/components/layouts/LabLayout'
import { useState} from 'react'

const TicTacToe = () => {
  const boardSize = 3
  const [board, setBoard] = useState([])
  const [currentPlayer, setCurrentPlayer] = useState('x')
  const [playerName, setPlayerName] = useState({ 'x': 'Player X', 'o': 'Player O' })
  const [game, setGame] = useState({ gameOver: false, isTie: false, winner: false })

  const BoardGame = () => {
    let table = []

    for (let y = 0; y <= boardSize-1; y++) {
      for (let x = 0; x <= boardSize-1; x++) {
        let val = ''

        if (board != '') {
          if (board[x][y] == null)
            val = ''
          else if (board[x][y] == 'x')
            val = <i className="fa fa-times x-sign"></i>
          else if (board[x][y] == 'o')
            val = <i className="fas fa-dot-circle o-sign"></i>
        }

        table.push(
          <div className="gameboard-square" key={x + '-' + y} onClick={() => handleSubmit(x,y)}>
            {val}
          </div>
        )
      }
    }
    return table
  }

  const startGame = () => {
    setGame({gameOver: false, winner: false})
    let scoreBoard = []

    for (var x = 0; x <= boardSize-1; x++) {
      scoreBoard[x] = []
      for (var y = 0; y <= boardSize-1; y++) {
        scoreBoard[x][y] = null;
      }
    }

    if (scoreBoard != board) {
      setBoard(scoreBoard)
    }
  }

  const handleSubmit = (x,y) => {
    let newBoard = board

    if(game.gameOver)
      return

    if(newBoard[x][y] != null)
      return

    let newPlayer = currentPlayer == 'x' ? 'o' : 'x'
    newBoard[x][y] = currentPlayer
    setBoard(newBoard)
    setCurrentPlayer(newPlayer)

    if (gameStatus() == 'tie')
      setGame({gameOver: true, isTie: true})
    
    if (gameStatus() == true)
      setGame({gameOver: true, winner: playerName[currentPlayer]})
  }

  const gameStatus = () => {
    const winScores = ['x'.repeat(boardSize), 'o'.repeat(boardSize)] // Expected scores of X and O players

    // Validate Horizontal // 0,0 1,0 2,0 - 0,1 1,1 2,1 - 0,2 1,2 2,2
    for (let y = 0; y <= boardSize-1; y++) {
      let countRow = '';
      for (let x = 0; x <= boardSize-1; x++)
        countRow = countRow.concat(board[x][y])

      if (winScores.includes(countRow))
        return true
    }

    // Validate Vertical // 0,0 0,1 0,2 - 1,0 1,1 1,2 - 2,0 2,1 2,2
    for (let x = 0; x <= boardSize-1; x++) {
      let countCol = '';
      for (let y = 0; y <= boardSize-1; y++)
        countCol = countCol.concat(board[x][y])

      if (winScores.includes(countCol))
        return true
    }

    // Validate Diagonal // 0,0 1,1 2,2
    let countDiag = '';
    for (let xy = 0; xy <= boardSize-1; xy++) {
      countDiag = countDiag.concat(board[xy][xy])

      if (winScores.includes(countDiag))
        return true
    }

    // Validate Anti-Diagonal // 0,2 1,1 2,0
    let countAntiDiag = '';
    for (let x = 0; x <= boardSize-1; x++) {
      countAntiDiag = countAntiDiag.concat(board[x][boardSize-1-x])

      if (winScores.includes(countAntiDiag))
        return true
    }

    // Validate Tie
    let totalPlay = 0
    for (let x = 0; x <= boardSize-1; x++)
      for (let y = 0; y <= boardSize-1; y++)
          if (board[x][y] != null)
            totalPlay++

    if (totalPlay == (boardSize * boardSize))
      return 'tie'

  }
  return (
    <LabLayout>
      <Card className="mb-4">
        <div className="button-wrap">
          <Button color="primary" onClick={() => startGame() }>{board.length ? 'Restart' : 'Start'}</Button>
        </div>
        <br />
        { board.length &&
        <div className="gameboard">
          <BoardGame />
        </div>
        }
        <div className="game-status">{ game.gameOver && (game.isTie ? 'Game tie' : 'Game over, ' + game.winner + ' is the winner!')}</div>
      </Card>
      <style jsx global>{`
        .button-wrap {
          text-align: center
        }

        .gameboard {
          font-family: arial;
          font-size: 40px;
          font-weight: 600;
          text-align: center;
          display: grid;
          max-width: 500px;
          margin: 0 auto;
          align-items: center;
          column-gap: 2px;
          row-gap: 2px;
          grid-template-columns: ${'80px '.repeat(boardSize)};
          grid-template-rows: ${'80px '.repeat(boardSize)};
          box-shadow: 6px 6px 0px rgba(0,0,0,0.3);
          border-radius: 5px;
          overflow: hidden;
          background: #d6d6d6;
        }

        .gameboard-square {
          background: white;
          vertical-align: middle;
          display: inline-block;
          height: 80px;
          align-items: center;
          display: flex;
          justify-content: center;
        }

        .gameboard-square:hover {
          background: #eee;
        }

        .game-status {
          color: white;
          text-align: center;
          font-size: 1.5rem;
          margin-top: 1rem;
        }

        .o-sign {
          color: #ff1541;
          font-size: 50px;
          text-shadow: 2px 1px #a70624
        }

        .x-sign {
          font-size: 60px;
          color: #0877e7;
          text-shadow: 2px 1px #04407d;
        }

      `}</style>
    </LabLayout>
  )
}

export default TicTacToe;
