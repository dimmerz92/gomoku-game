# Gomoku React App with Express Integration

Author/Dev: Andrew Weymes

UNE COSC 560 AWP Trimester 2 2023

## Preamble

This game was built as part of an assessment for the Advanced Web Development unit in the Master of Computer Science at the University of New England.

Gomoku is a game similar to connect 4, except you must connect 5. A player wins if they can get 5 consecutively coloured pebbles in a row (vertically, horizontally, or diagonally).

It has been integrated with an Express backend and MongoDB database to handle all game logic and storage.

## How to Play

This is a test application, the login credentials are `username: demo` and `password: demo`.

The game is turn based, with an indicator in the controls banner showing whos turn it is. Pick a colour (black/white) and have fun playing.

- Click an empty cell on the board to drop a pebble
- You cannot select an occupied cell
- The game ends when either a player has chained 5 pebbles in a row, or the game ends in a draw

## How to Run

- Firstly, you will need to have two console/terminal windows open in the project root directory
- In the first console window, start the Express server with the following commands:
  - `cd Express\ TypeScript`
  - `yarn install`
  - `yarn run dev`
- In the second console window, start the React App with the following commands:
  - `cd React\ TypeScript`
  - `yarn install`
  - `yarn start`

If starting the React app did not automatically open a browser window, open a browser and navigate to [localhost:1234](http://localhost:3000)