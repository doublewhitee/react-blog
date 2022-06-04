import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RoutersObj {
  path: string
  name?: string
  title?: string
  children?: RoutersObj[]
}

// Define a type for the slice state
interface UserState {
  isLogin: boolean
  routesList: RoutersObj[]
}

// Define the initial state using that type
const initialState: UserState = {
  isLogin: false,
  routesList: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRoute: (state, action: PayloadAction<RoutersObj[]>) => {
      state.routesList = [...action.payload]
    }
    // increment: state => {
    //   state.value += 1
    // },
    // decrement: state => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // }
  }
})

export const { setRoute } = userSlice.actions

export default userSlice.reducer
