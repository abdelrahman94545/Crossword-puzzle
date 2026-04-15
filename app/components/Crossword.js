import React , { useRef } from "react";
import styles from "../styles/styles.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { 
  setHighlightRowsAndCols, 
  settoggleDirection, 
  setUpdateDirection, 
  setChangeGridData,
} from "../store/crosswordSlice";


const Crossword = ({
    checkAnswer,
    answerCheckData,
    setActiveClue,
}) => {

    const gridData = useSelector((state)=> state.crossword?.currentGridData)
    const highlightRowCells = useSelector((state)=> state.crossword?.highlightRow)
    const highlightColCells = useSelector((state)=> state.crossword?.highlightCol)
    const crosswordData = useSelector((state)=> state.crossword?.currentCrosswordData)
    const nextGridDirection = useSelector((state)=> state.crossword?.nextGridDirection)
    const currentGridDirection = useSelector((state)=> state.crossword?.currentGridDirection)
    const inputRefs = useRef([]);
    const dispatch = useDispatch();

    // used for select highlight cells by click
    const highlightClickedCellsFun = (selectedRow,selectedcol) => {
        let row = []
        let col = []
        
        crosswordData.forEach(clueData => {
          if(clueData.direction === nextGridDirection && clueData.rowCoordinates.includes(selectedRow) && clueData.colCoordinates.includes(selectedcol))
          {    
            setActiveClue(clueData.clue)
            
            if(clueData.direction === "across")
            {    
                row.push(clueData.row)
    
                for (let index = 0; index < clueData.answer.length; index++) 
                {
                    col.push(clueData.col + index)
                }
            }
    
            if(clueData.direction === "down")
            {
               col.push(clueData.col)
            
                for (let index = 0; index < clueData.answer.length; index++) 
                {
                  row.push(clueData.row + index)
                }
            }
    
            dispatch(setHighlightRowsAndCols({
              gridRow: row,
              gridCol: col,
            }))
            dispatch(settoggleDirection())
          }
        });
      }

      // used for select highlight cells by click and enter user data
      const handleKeyDown = (e, row, col) => {
        let newRow = row;
        let newCol = col;
        let rowCoordinates = []
        let colCoordinates = []
      
        switch (e.key) {
          case "ArrowUp":
            newRow = row - 1;
            break;
          case "ArrowDown":
            newRow = row + 1;
            break;
          case "ArrowLeft":
            newCol = col - 1;
            break;
          case "ArrowRight":
            newCol = col + 1;
            break;
          case "Backspace":
            newCol = currentGridDirection === "across" ? col - 1 : newCol; // move left
            newRow = currentGridDirection === "down" ? row - 1 : newRow; // move up
            break;
          default:
            return;
        }
      
        e.preventDefault();

        if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight")
        {
            // Skip blocked cells (#) and out of bounds
            while (
            gridData[newRow] &&
            gridData[newRow][newCol] === "#"
            ) {
            if (e.key === "ArrowUp") newRow--;
            if (e.key === "ArrowDown") newRow++;
            if (e.key === "ArrowLeft") newCol--;
            if (e.key === "ArrowRight") newCol++;
            }
        
            const nextInput =
            inputRefs.current[newRow]?.[newCol];
        
            if (nextInput) 
            {
                nextInput.focus();
            }
        }


        // Handle Backspace
        if (e.key === "Backspace") 
        {
            const currentValue = gridData[row][col];
      
           if (currentValue) 
            {
                dispatch(
                    setChangeGridData({
                        row,
                        col,
                        val: "", //clear
                    })
                );
                return;
            }
            
            if(currentGridDirection === "across")
            {      
              // Skip blocked cells (#)
              while (
                newCol >= 0 &&
                gridData[row][newCol] === "#"
              ) {
                newCol--;
              }
            }
      
            if(currentGridDirection === "down")
                {        
                    // skip #
                    while (newRow >= 0 && gridData[newRow][col] === "#") {
                    newRow--;
                    }
                }
        
                const prevInput =
                inputRefs.current[newRow]?.[newCol];
        
                if (prevInput) {
                prevInput.focus();
                }
            }
      
      
        // used to make highlight with click arrow keys
      
          if((e.key === "ArrowLeft" || e.key === "ArrowRight"))
          {
            dispatch(setUpdateDirection("across"))
          }
           
          if((e.key === "ArrowDown" || e.key === "ArrowUp"))
          {
            dispatch(setUpdateDirection("down"))
          }

          if(e.key === "Backspace")
          {
            dispatch(setUpdateDirection(currentGridDirection))
          }

        crosswordData.forEach(clueData => {
            if(
              (((e.key === "ArrowLeft" || e.key === "ArrowRight") && clueData.direction === "across") || ((e.key === "ArrowDown" || e.key === "ArrowUp") && clueData.direction === "down") || (e.key === "Backspace" && clueData.direction === currentGridDirection))
              && clueData.rowCoordinates.includes(newRow) 
              && clueData.colCoordinates.includes(newCol)
            )
            {                   
              setActiveClue(clueData.clue)
              
              if(clueData.direction === "across")
              {
                rowCoordinates.push(clueData.row)
      
                for (let index = 0; index < clueData.answer.length; index++) 
                {
                  colCoordinates.push(clueData.col + index)
                }
              }
      
              if(clueData.direction === "down")
              {
                 colCoordinates.push(clueData.col)
              
                for (let index = 0; index < clueData.answer.length; index++) 
                {
                    rowCoordinates.push(clueData.row + index)
                }
              }
      
               dispatch(setHighlightRowsAndCols({
                gridRow: rowCoordinates,
                gridCol: colCoordinates,
              }))
            }
          });
      };

    return (
        <div className={styles.puzzelContainer}>
          <div className={styles.gridContainer}>
            {gridData.map((row,rowIndex)=>{
              return  row.map((cell,cellIndex)=>{
                  return <input 
                            key={cellIndex}
                            value={cell === "#" ? "" : cell} 
                            maxLength="1"
                            disabled={cell === "#"}
                            type="text" 
                            className={`
                                ${styles.activeCell}
                                ${checkAnswer ? answerCheckData[rowIndex][cellIndex] === false ? styles.wrongAnswerCheckSty : "" : ""}
                                ${cell === "#" ? styles.blockecdCellSty : ""}
                                ${highlightRowCells.includes(rowIndex) && highlightColCells.includes(cellIndex) ? styles.highlightCellSty : ""}
                            `}
                            onClick={()=>{
                                if(cell !== "#")
                                {
                                    highlightClickedCellsFun(rowIndex,cellIndex)
                                }
                            }} 
                            ref={(el) => {
                                if (!inputRefs.current[rowIndex]) 
                                {
                                    inputRefs.current[rowIndex] = [];
                                }
                                inputRefs.current[rowIndex][cellIndex] = el;
                            }}
                            onKeyDown={(e) =>
                                handleKeyDown(e, rowIndex, cellIndex)
                            }
                            onChange={(e) => {
                                if (e.target.value) 
                                {
                                    // used by Backspace
                                    handleKeyDown({ key: currentGridDirection === "across" ? "ArrowRight" : "ArrowDown", preventDefault: () => {} }, rowIndex, cellIndex);
                                    dispatch(setChangeGridData({
                                        row: rowIndex,
                                        col: cellIndex,
                                        val: e.target.value,
                                    }))
                                }
                            }}
                        />
                })
            })}
          </div>
        </div>
    )
}


export default Crossword;