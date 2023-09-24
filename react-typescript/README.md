# Gomoku

Author/Dev: Andrew Weymes

UNE COSC 560 AWP Trimester 2 2023

## Preamble

This game was built as part of an assessment for the Advanced Web Development unit in the Master of Computer Science at the University of New England.

Gomoku is a game similar to connect 4, except you must connect 5. A player wins if they can get 5 consecutively coloured pebbles in a row (vertically, horizontally, or diagonally).

## How to Play

This is a test application, the login credentials are `username: admin` and `password: admin`.

The game is turn based, with an indicator in the controls banner showing whos turn it is. Pick a colour (black/white) and have fun playing.

- Click an empty cell on the board to drop a pebble
- You cannot select an occupied cell
- The game ends when either a player has chained 5 pebbles in a row, or the game ends in a draw

## How to Run

- Ensure your current working directory is React TypeScript
- Dependencies: Typescript, Yarn
- Run the following commands in the project directory:
  - `yarn install`
  - `yarn start`
- In a browser, navigate to [localhost:1234](http://localhost:1234)
