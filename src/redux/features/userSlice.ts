import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

interface UserState {
  users: User[];
  filteredUsers: User[];
  filters: {
    name: string;
    username: string;
    email: string;
    phone: string;
  };
}

const initialState: UserState = {
  users: [],
  filteredUsers: [],
  filters: {
    name: "",
    username: "",
    email: "",
    phone: "",
  },
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data: User[] = await response.json();
  return data;
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setFilter(
      state,
      action: PayloadAction<{ field: keyof UserState["filters"]; value: string }>
    ) {
      state.filters[action.payload.field] = action.payload.value;

      state.filteredUsers = state.users.filter((user) => {
        return (
          user.name.toLowerCase().includes(state.filters.name.toLowerCase()) &&
          user.username
            .toLowerCase()
            .includes(state.filters.username.toLowerCase()) &&
          user.email.toLowerCase().includes(state.filters.email.toLowerCase()) &&
          user.phone.toLowerCase().includes(state.filters.phone.toLowerCase())
        );
      });
    },

    resetFilters(state) {
      state.filters = { name: "", username: "", email: "", phone: "" };
      state.filteredUsers = state.users;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.filteredUsers = action.payload;
    });
  },
});

export const { setFilter, resetFilters } = userSlice.actions;
export default userSlice.reducer;
