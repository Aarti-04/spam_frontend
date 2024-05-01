// import { createSlice, nanoid } from "@reduxjs/toolkit";
// import { act } from "react-dom/test-utils";

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface userState {
//   users: any;
// }
// const initialState: userState = { users: [] };

// const Slice = createSlice({
//   name: "AddUserSlice",
//   initialState,
//   reducers: {
//     addUser: (state: any, action: any) => {
//       console.log(action);

//       const data = { id: nanoid(), name: action.payload };
//       state.users.push(data);
//     },
//     removeUser: (state: any, action: any) => {
//       const dataToRemove = action.payload;
//       const userExist = state.users.some(
//         (user: any) => user.id === dataToRemove.id
//       );
//       if (userExist) {
//         const updatedUser = state.users.filter(
//           (user: any) => user.id != dataToRemove.id
//         );
//         state.users = updatedUser;
//       }
//       console.log(state.users);
//     },
//   },
// });
// export const { addUser, removeUser } = Slice.actions;
// export default Slice.reducer;
// interface UserState {
//   isAuthenticated: boolean;
// }
// const initialState: UserState = { isAuthenticated: false };
// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     loginUser(state) {
//       state.isAuthenticated = true;
//     },
//     logoutUser(state) {
//       state.isAuthenticated = false;
//     },
//   },
// });
// export const { loginUser, logoutUser } = userSlice.actions;
// export default userSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isAuthenticated: boolean;
  // Add other user properties as needed
}

const initialState: UserState = {
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state) {
      state.isAuthenticated = true;
    },
    logoutUser(state) {
      state.isAuthenticated = false;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
