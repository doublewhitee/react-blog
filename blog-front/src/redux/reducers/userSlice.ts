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
  isDarkMode: boolean
  routesList: RoutersObj[]
}

// Define the initial state using that type
const initialState: UserState = {
  isLogin: false,
  isDarkMode: false,
  routesList: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRoute: (state, action: PayloadAction<RoutersObj[]>) => {
      state.routesList = [...action.payload]
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload
    },
    setLoginStatus: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload
    }
  }
})

export const { setRoute, setIsDarkMode, setLoginStatus } = userSlice.actions

export default userSlice.reducer
