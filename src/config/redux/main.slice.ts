import { createSlice } from "@reduxjs/toolkit";
import { IEAC } from "../../components/table/ListOfEacs";

const mainSlice = createSlice({
  name: "main",
  initialState: {
    eacs: null as null | { userEACs: IEAC[]; allEACs: IEAC[] },
    balance: 0
  },
  reducers: {
    setEacs(state, action) {
      state.eacs = action.payload;
    },
    upadateEac(
      state,
      action: { payload: { type: "userEACs" | "allEACs"; item: IEAC } }
    ) {
      const { type, item } = action.payload;
      if (state.eacs && state.eacs[type]) {
        const idx = state.eacs[type].findIndex((i) => i.id === item.id);
        if (idx !== -1) {
          state.eacs[type][idx] = item;
        }
      }
    },
    updateBalance:(state,action)=>{
      state.balance=action.payload
    }
  },
});

export const { setEacs, upadateEac, updateBalance } = mainSlice.actions;
export default mainSlice.reducer;
