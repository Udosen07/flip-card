import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isMatched: false,
    isSelected: false,
    count: 0
}

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        updateCount:(state) => {
            state.count += 1;
        },
        resetCount:(state) => {
            state.count = 0
        }
    }
})

export const {updateCount, resetCount} = gameSlice.actions;
export default gameSlice.reducer;