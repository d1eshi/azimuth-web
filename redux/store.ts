import { combineReducers, applyMiddleware, compose } from 'redux'

import { configureStore } from '@reduxjs/toolkit'
import mapReducer from './map/mapSlice'
import UIReducer from './UISlice'

// using createStore
export const store = configureStore({
  reducer: {
    mapReducer,
    UIReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
