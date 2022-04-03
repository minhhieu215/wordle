export interface boardState{
    board : string[];
    pos:number;
    row:number;
    correctWord:string;
    winned:boolean;
}

export interface rootState{
    board:boardState
}