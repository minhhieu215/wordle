import { createSlice } from "@reduxjs/toolkit";
import wordList from '../word.json'
let randomNum = Math.floor(Math.random()*wordList.words.length)
const initialState={
    board:
    [
        "","","","","",
        "","","","","",
        "","","","","",
        "","","","","",
        "","","","","",
        "","","","","",
      ],
      pos:0,
      row:0,
      correctWord:wordList.words[randomNum].toUpperCase(),
      winned :false
}

export const boardSlice =createSlice({
    name:"board",
    initialState,
    reducers:{
        setBoard:(state,action)=>{
            state.board= action.payload
        },
        incPos:(state)=>{
            state.pos++
        },
        decPos:(state)=>{
           state.pos--;
        },
        incRow:(state)=>{
            state.row++
        },
        setWined:(state)=>{
            state.winned =true
        }
        // setKey:(state,action)=>{
        //     state.key=action.payload
        // }
    }
})