import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/firebase.config"; // Adjust this import to your Firebase configuration file

// Define the state structure for the auth slice
interface AuthSlice {
  isLoggedIn: boolean;
  modalOpen: boolean;
  username: string;
}

interface LoginProps {
  username: string;
  password: string;
}

// Initialize the state based on local storage data
const initialState: AuthSlice = {
  isLoggedIn:
    localStorage.getItem("username") !== null &&
    localStorage.getItem("username") !== undefined &&
    localStorage.getItem("username") !== "",
  modalOpen: false,
  username: localStorage.getItem("username") ?? "",
};

// Asynchronous thunk action for handling login
export const doLogin = createAsyncThunk(
  "auth/doLogin",
  async (loginProps: LoginProps, { rejectWithValue }) => {
    const { username, password } = loginProps;

    // Check if the email (username) is provided
    if (!username || username.trim() === "") {
      return rejectWithValue("Email is required.");
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;
      localStorage.setItem("username", user.email || ""); // Store the user's email in localStorage
      return { username: user.email || "" };
    } catch (error: any) {
      console.error("Login failed", error); // Log the entire error
      return rejectWithValue(error.message); // Return the error message for handling
    }
  }
);

// Create the auth slice
export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    updateModal: (state, action: PayloadAction<boolean>) => {
      state.modalOpen = action.payload;
    },
    doLogout: (state) => {
      localStorage.removeItem("username");
      state.username = "";
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(doLogin.fulfilled, (state, action) => {
      state.username = action.payload.username;
      state.isLoggedIn = true;
      state.modalOpen = false;
    });
    builder.addCase(doLogin.rejected, (state, action) => {
      console.error("Authentication error:", action.payload); // Log the error to the console
      alert(`Authentication failed: ${action.payload}`); // Optionally show an alert to the user
    });
  },
});

// Export the actions and the reducer
export const { updateModal, doLogout } = authSlice.actions;
export default authSlice.reducer;
