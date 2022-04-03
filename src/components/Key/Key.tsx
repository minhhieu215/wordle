import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { rootState } from '../../interface'
import { boardSlice } from '../../redux/boardSlice'
import './key.css'
interface IProps {
    letter:string;
}

const Key:React.FC<IProps> = (props) => {
    const { letter } = props
    const board = useSelector((state:rootState)=> state.board.board)
    const position = useSelector((state:rootState)=>state.board.pos)
    const dispatch =useDispatch()
    const row = useSelector((state:rootState)=> state.board.row)
  const winned = useSelector((state:rootState)=>state.board.winned)

    let currentRow = Math.floor(position/5)
    const chooseLetter=()=>{
      if(winned) return
      if(position>=30) return
      if(currentRow > row) return
        const newBoard =[...board]
        newBoard[position] = letter;
        dispatch(boardSlice.actions.setBoard(newBoard))
        dispatch(boardSlice.actions.incPos())
    }
  return (
    <div className="letter" onClick ={chooseLetter}>{letter.toUpperCase()}</div>
  )
}

export default Key