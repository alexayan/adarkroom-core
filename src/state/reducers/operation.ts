import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { GameState } from '../index';
import { Operation, OptHistory } from '../../operations';
import Engine from '../../engine';


const record = createAsyncThunk<OptHistory, Operation, {
    state: GameState, extra: {
        engine: Engine
    }
}>(
    'operation/record',
    async (opt: Operation, { extra }) => {
        const now = Date.now();
        const cooldown = opt.cooldown ? opt.cooldown(extra.engine, opt) : 0;
        return {
            lastExecTime: now,
            id: opt.id,
            cooldown,
            cooldownAt: now + cooldown * 1000
        }
    }
);

const slice = createSlice({
    name: 'operation',
    initialState: {} as { [operationId: string]: OptHistory },
    reducers: {
        clearCooldown(state, action: PayloadAction<string>) {
            const id = action.payload;
            const history = state[id];
            if (history) {
                state[id].cooldownAt = 0;
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(
            record.fulfilled,
            (state, action: PayloadAction<OptHistory>) => {
                const history = action.payload;
                state[history.id] = history
            }
        );
    },
});

export const actions = {...slice.actions, record};

export default slice.reducer;
