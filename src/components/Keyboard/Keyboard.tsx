import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { rootState } from '../../interface'
import { boardSlice } from '../../redux/boardSlice'
import wordList from '../../word.json'
import Key from '../Key/Key'
import './keyboard.css'
const Keyboard:React.FC = () => {
  const rows:string[] = [
    "q w e r t y u i o p",
    "a s d f g h j k l",
    "z x c v b n m"
  ]
  const board = useSelector((state:rootState)=> state.board.board)
  const row = useSelector((state:rootState)=>state.board.row)
  const position = useSelector((state:rootState)=>state.board.pos)
  const correctWord = useSelector((state:rootState)=>state.board.correctWord)
  let board5Words:string = `${board[position-5]}${board[position-4]}${board[position-3]}${board[position-2]}${board[position-1]}`
  const dispatch =useDispatch()
  let allWords:string[]=wordList.words
  const clickBack=()=>{
    if(position<=0) return;
    if(Math.floor((position-1)/5)<row) return;
    const newBoard = [...board]
    newBoard[position-1]=""
    dispatch(boardSlice.actions.setBoard(newBoard))
    dispatch(boardSlice.actions.decPos())
  }
  const enterClick=()=>{
    console.log(correctWord)
    console.log(board5Words)
  
    if(allWords.includes(board5Words.toLowerCase())){
      if(correctWord== board5Words.toUpperCase()){
        alert("Mày hay đấy !")
        dispatch(boardSlice.actions.incRow())
        dispatch(boardSlice.actions.setWined())
        return
      }
      if(position!=0 &&position % 5==0){
        dispatch(boardSlice.actions.incRow())
      }
      if(position ==30 && allWords.includes(board5Words)){
        alert("The word is :" + correctWord)
      }
    }else if(!allWords.includes(board5Words)){
      window.alert("Nhập từ ngu vãi lồn")
    }
  
  }
 
  return (
    <div className="keyboard-container">
      {rows.map((row,index)=>{
        return (
          <div className="row">
            {index==2&& <span className="letter-row" onClick={enterClick}>Enter</span>}
       {row.split(" ").map((letter,index)=>{
         return (
          <div className="letter-row">
            <Key letter={letter}/>
            {letter==="m"&& <span onClick={clickBack}>Back</span>}
          </div>
         )
       })}
          </div>
        )
      })}
    </div>
  )
}

export default Keyboard