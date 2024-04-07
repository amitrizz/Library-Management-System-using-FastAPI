import { createSlice } from "@reduxjs/toolkit"

// Define initial state without data
const initialState = {
    data: [],
    currentstate:true,
    userid:"none",
    teamid:1  //default 1
};

// Fetch data outside the initial state and update state once data is fetched



export const dashboardSlice = createSlice({
    name: "MaintainState",
    initialState,
    reducers: {
        ChangeData: (state, actions) => {
            state.data = actions.payload;
        },
        PreviousButtonState: (state, actions) => {
            state.currentstate = actions.payload;
        },
        SetUserIdForUpdate: (state, actions) => {
            state.userid = actions.payload;
        },
        SetTeamId: (state, actions) => {
            state.teamid = actions.payload;
        }
    }
})

export const { ChangeData,PreviousButtonState,SetUserIdForUpdate,SetTeamId } = dashboardSlice.actions
export default dashboardSlice.reducer