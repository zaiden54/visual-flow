import { createSlice } from '@reduxjs/toolkit';
import type { SubType } from '../../../types/subTypes';
import getSubChannelThunk from './subChannelsThunk';

const initialState = {} as SubType;

const subChannelsSlice = createSlice({
    name:'subs',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getSubChannelThunk.fulfilled,(state,action)=>action.payload)
    }
})

export default subChannelsSlice.reducer
