document.addEventListener('DOMContentLoaded', () => {
   const grid = document.querySelector('.grid')
   let squares = Array.from(document.querySelectorAll('.grid div'))
   const ScoreDisplay = document.querySelector('#score')
   const StartBtn = document.querySelector('#start-button')
   const width = 10

   // The Tetrominoes
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


   // randomly select a tetromino and it's rotation
   let random = Math.floor(Math.random()*theTetrominoes.length)
   //console.log(random) // log the random number
   let current = theTetrominoes[random][currentRotation]

   //console.log(theTetrominoes[0][0]) // log the output of our first tet first rotation

   // draw the Tetromino
   function draw() {
      current.forEach(index => {
         squares[currentPosition + index].classList.add('tetromino')
      })
   }

   // undraw the Tetromino
   function undraw() {
      current.forEach(index => {
         squares[currentPosition + index].classList.remove('tetromino')
      })
   }

   draw()
})