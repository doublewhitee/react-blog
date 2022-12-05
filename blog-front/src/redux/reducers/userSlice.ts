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
    },
    setLoginStatus: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload
    }
  }
})

export const { setRoute, setLoginStatus } = userSlice.actions

export default userSlice.reducer
