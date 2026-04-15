## Game explanation

User select clue from the clus section to highlight puzzle cells or using mouse to click on cell to select cells , there is option to switch puzzle cell highlight across or down by clicks or using keys arrows and user can clear cells using backspace button.  
There is a control buttons like check answer button to check user answer if there is cells has wrong value it will takes red border , solve crowsword button used to show all answers and there is clear button to reset the game.



## Setup instructions

First, run the development server:

```bash
npm install
npm run dev
```

## Environment needs

Node 20 or more

## Structure

We have three main components:
- ControlPanel: contain timer and buttons
- Clue: contain clue section
- Crossword: contain the puzzle

The structure is connect the components with the redux toolkit to update the initialState with user changes like enter letter , delete letters , change cells highlights and run buttons. 


## Explane componenst functions

### in page

- generateCellsCoordinatesFun : used for add cells coordinates in redux

### in ControlPanel 
-checkAnswersFun : used for check cells answers if is it right or wrong , in wrong case there is red border will appear around the cell
  

### in Clue

- highlightCellsFun : used for select highlight cells by arrow keys

### in Crossword

- highlightClickedCellsFun : used for select highlight cells by click
- handleKeyDown : used for select highlight cells by click and enter user data



## Docker configuration

### Build the Docker Image

```bash
docker build -t nextjs-app .
```

### Run the Container

```bash
docker build -t nextjs-app .
```

### App will be available at:

http://localhost:3000