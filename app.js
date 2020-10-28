document.addEventListener('DOMContentLoaded', () => {
   const grid = document.querySelector('.grid')
   let squares = Array.from(document.querySelectorAll('.grid div'))
   const h3score = document.querySelector('#h3-score')
   const scoreDisplay = document.querySelector('#score')
   const startBtn = document.querySelector('#start-button')
   const width = 10
   let nextRandom = 0
   let timerId
   let score = 0
   const colors = [ 'orange', 'red', 'purple', 'green', 'blue' ]

   const lTetromino = [
      [1, width+1, width*2+1, 2], // B1, B2, B3, C1; these are indexs in one long array
      [width, width+1, width+2, width*2+2],
      [1, width+1, width*2+1, width*2],
      [width, width*2, width*2+1, width*2+2]
   ]

   const zTetromino = [
      [width+1, width+2, width*2, width*2+1],
      [0, width, width+1, width*2+1],
      [width+1, width+2, width*2, width*2+1],
      [0, width, width+1, width*2+1]
   ]

   const tTetromino = [
      [1, width, width+1, width+2],
      [1, width+1, width+2, width*2+1],
      [width, width+1, width+2, width*2+1],
      [1, width, width+1, width*2+1]
   ]

   const oTetromino = [
      [0, 1, width, width+1],
      [0, 1, width, width+1],
      [0, 1, width, width+1],
      [0, 1, width, width+1]
   ]

   const iTetromino = [
      [1, width+1, width*2+1, width*3+1],
      [width, width+1, width+2, width+3],
      [1, width+1, width*2+1, width*3+1],
      [width, width+1, width+2, width+3]
   ]

   const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

   // draw tetromino in (0,4)
   let currentPosition = 4
   let currentRotation = 0

   let random = Math.floor(Math.random()*theTetrominoes.length)
   let current = theTetrominoes[random][currentRotation]

   function draw() {
      current.forEach(index => {
         squares[currentPosition + index].classList.add('tetromino')
         squares[currentPosition + index].style.backgroundColor = colors[random]
      })
   }

   function undraw() {
      current.forEach(index => {
         squares[currentPosition + index].classList.remove('tetromino')
         squares[currentPosition + index].style.backgroundColor = ''
      })
   }

   function control(e) {
      if (e.keyCode === 37) {
         moveLeft()
      } else if (e.keyCode === 38) {
         rotate()
      } else if (e.keyCode === 39) {
         moveRight()
      } else if (e.keyCode === 40) {
         moveDown()
      } else if (e.keyCode == 32) {
         // spacebar
      }
   }

   document.addEventListener('keyup', control)

   function moveDown() {
      undraw()
      currentPosition += width
      draw()
      freeze()
   }

   function freeze() {
      if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
         current.forEach(index => squares[currentPosition + index].classList.add('taken'))
         // start a new tetromino falling
         random = nextRandom
         nextRandom = Math.floor(Math.random() * theTetrominoes.length)
         current = theTetrominoes[random][currentRotation]
         currentPosition = 4
         draw()
         displayShape()
         addScore()
         gameOver()
      }
   }

   function moveLeft() {
      undraw()
      const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

      if(!isAtLeftEdge) currentPosition -= 1
      
      if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
         currentPosition += 1
      }

      draw()
   }

   function moveRight() {
      undraw()
      const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)

      if (!isAtRightEdge) currentPosition += 1

      if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
         currentPosition -= 1
      }

      draw()
   }

   function rotate() {
      undraw()
      currentRotation++

      if (currentRotation === current.length) { // if the current rotation gets to 4, make it go back to 0
         currentRotation = 0
      }
      current = theTetrominoes[random][currentRotation]
      draw()
   }

   // show next-up tetromino in mini-grid display
   const displaySquares = document.querySelectorAll('.mini-grid div')
   const displayWidth = 4
   const displayIndex = 0

   // the Tetrominos without rotations
   const upNextTetrominoes = [
      [1, displayWidth+1, displayWidth*2+1, 2], // lTetromino
      [0, displayWidth, displayWidth+1, displayWidth*2+1], // zTetromino
      [1, displayWidth, displayWidth+1, displayWidth+2], // tTetromino
      [0, 1, displayWidth, displayWidth+1], // oTetromino
      [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iTetromino
   ]

   // display the shape in the mini-grid display
   function displayShape() {
      // remove any trace of a tetromino from the entire grid
      displaySquares.forEach(square => {
         square.classList.remove('tetromino')
         square.style.backgroundColor = ''
      })
      upNextTetrominoes[nextRandom].forEach( index => {
         displaySquares[displayIndex + index].classList.add('tetromino')
         displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
      })
   }

   startBtn.addEventListener('click', () => {
      if (timerId) {
         startBtn.innerHTML = 'Unpause'
         clearInterval(timerId)
         timerId = null
      } else {
         startBtn.innerHTML = 'Pause'
         draw()
         timerId = setInterval(moveDown, 1000)
         nextRandom = Math.floor(Math.random()*theTetrominoes.length)
         displayShape()
      }
   })

   function addScore() {
      let outerRows = 0;

      for (let i = 0; i < 199; i += width) {
         const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

         if (row.every(index => squares[index].classList.contains('taken'))) {

            row.forEach( index => {
               squares[index].classList.remove('taken')
               squares[index].classList.remove('tetromino')
               squares[index].style.backgroundColor = ''
            })
            
            outerRows++;

            score += 10;
            scoreDisplay.innerHTML = score;

            const squaresRemoved = squares.splice(i, width)

            squares = squaresRemoved.concat(squares)
            squares.forEach(cell => grid.appendChild(cell))
            }

            if ( outerRows == 4) {
               score += 360;
               scoreDisplay.innerHTML = score;
            }
         }
      }

      function gameOver() {
         if (current.some(index => squares[currentPosition + index].classList.contains("taken"))) {
            h3score.innerHTML = 'Final Score: '
            h3score.style.color = 'red'
            scoreDisplay.style.color = 'red'
            startBtn.innerHTML = 'New Game'
            clearInterval(timerId)
         }
      }
})
