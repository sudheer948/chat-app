import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import usersReducer from "./usersSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
  },
});

export default appStore;
