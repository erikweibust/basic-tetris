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

   const sTetromino = [
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

   const boxTetromino = [
      [0, 1, width, width+1],
      [0, 1, width, width+1],
      [0, 1, width, width+1],
      [0, 1, width, width+1]
   ]

   const lineTetromino = [
      [1, width+1, width*2+1, width*3+1],
      [width, width+1, width+2, width+3],
      [1, width+1, width*2+1, width*3+1],
      [width, width+1, width+2, width+3]
   ]
})