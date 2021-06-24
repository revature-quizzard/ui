import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { CardSet } from '../../Models/CardSet';

// Create an interface for the state object
interface State {
    cardSetList: Array<CardSet>;
}

//Declare the initial state values that extends the State interface
const initialState: State = {
    cardSetList: []
}

export const setListSlice = createSlice({

    name: 'setList',

    initialState,

    reducers: {
        setSetList: (state,  action: PayloadAction<CardSet[]>) => {
            state.cardSetList = action.payload
        },

        addSet: (state, action: PayloadAction<CardSet>) => {
            state.cardSetList.push(action.payload)
        }
    }
});

export const { setSetList, addSet } = setListSlice.actions;
export const setListState = (state: RootState) => state.setList;
export default setListSlice.reducer;

