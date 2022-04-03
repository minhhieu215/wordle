import React, { useEffect, useState } from 'react'
import './square.css'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { rootState } from '../../interface'
import { current } from 'immer'
interface IProps{
    val:string;
    squareIndex:number;
}
const Square:React.FC<IProps> = (props) => {
    const { val , squareIndex} = props
    const correctWord = useSelector((state:rootState)=> state.board.correctWord)
    const position = useSelector((state:rootState)=>state.board.pos)
    const reduxRow = useSelector((state:rootState)=>state.board.row)
    const [correct , setCorrect] = useState<boolean>(false)
    const [almost , setAlmost] = useState<boolean>(false)
    const [wrong , setWrong] = useState<boolean>(false)
    const wordLastIndex =4 ; 
    const currentPos = position===5 ? wordLastIndex : position > 5 && position % 5===0 ? wordLastIndex: (position%5)-1
    const variants= {
      filled:()=>({
        scale:[1.2,1],
        transition:{
          duration: 0.2
        }
      }),
      unfilled:()=>({
        scale:[1.2,1],
        transition:{
          duration: 0.2
        }
      })
    }
    useEffect(()=>{
      console.log(correctWord)
      if ( correctWord[currentPos]===val.toUpperCase()){
        setCorrect(true)
      }else if(!correct &&val.toUpperCase() != "" && correctWord.includes(val.toUpperCase())){
        setAlmost(true)
      }else if(!correct && val.toUpperCase() !==""&& !correctWord.includes(val.toUpperCase())){
        setWrong(true);
      }
      return ()=>{
        setCorrect(false)
        setAlmost(false)
        setWrong(false)
      }
    },[val])
    const status :any  =  Math.floor(squareIndex/5)<reduxRow && (correct?"correct": almost ?"almost":wrong?"wrong":"")
  return (
    <motion.div animate={val ? "filled": "unfilled"} variants={variants}>
    <div id={status} className="square">{val.toUpperCase()}</div>
    </motion.div>
  )
}

export default Square