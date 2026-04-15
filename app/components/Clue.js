import styles from "../styles/styles.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { 
  setHighlightRowsAndCols,
} from "../store/crosswordSlice";



const Clue = ({
    activeClue,
    setActiveClue,
}) => {

    const crosswordData = useSelector((state)=> state.crossword?.currentCrosswordData)
    const dispatch = useDispatch();

    // used for select highlight cells by arrow keys
    const highlightCellsFun = (clue) => {
        let row = []
        let col = []
    
        setActiveClue(clue.clue)
        if(clue.direction === "across")
        {
            row.push(clue.row)

            for (let index = 0; index < clue.answer.length; index++) 
            {
                col.push(clue.col + index)
            }
        }
    
        if(clue.direction === "down")
         {
             col.push(clue.col)
             
             for (let index = 0; index < clue.answer.length; index++) 
             {
                 row.push(clue.row + index)
             }
         }
        
        dispatch(setHighlightRowsAndCols({
            gridRow: row,
            gridCol: col,
        }))
      }

    return (
        <>
            <div className={styles.clueContainerSty}>
                <div className={styles.AcrossContainer}>
                    <p>Across</p>
                    <div>
                    {crosswordData.map((item)=>{ 
                        return <div  key={item.id}>
                        {item.direction === "across" && (
                            <p 
                                onClick={()=>{ highlightCellsFun(item)}}
                                className={` ${activeClue === item.clue ? styles.highlightClueSty : ""}`}
                            >
                                {item.clue}
                            </p> 
                        )}
                        </div>  
                    })}
                    </div>
                </div>
                <br/>
                <div className={styles.downContainer}>
                    <p>Down</p>
                    <div>
                    {crosswordData.map((item)=>{ 
                        return <div  key={item.id}>
                            {item.direction === "down" && (
                            <p 
                                onClick={()=>{ highlightCellsFun(item)}}
                                className={` ${activeClue === item.clue ? styles.highlightClueSty : ""}`}
                            >
                                {item.clue}
                            </p> 
                            )}
                        </div>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}


export default Clue;