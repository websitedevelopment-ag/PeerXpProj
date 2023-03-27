// /src/Context/Cart/CartReducer.jsx

//Import the Action types
import {
  REMOVE_ITEM,
  ADD_EXPENSE,
  EDIT,
} from "./ExpenseTypes.jsx";

const Storage = (expenses) => {
  localStorage.setItem(
    "expenses",
    JSON.stringify(expenses.length > 0 ? expenses : [])
  );
};
const ExpenseReducer = (state, action) => {
  console.log("Inside Reducer")
  // The switch statement is checking the type of action that is being passed in
  // Storage(state.expenses)
  console.log("Deleting id = ", action.payload.id)
  switch (action.type) {
    case ADD_EXPENSE:
      state.expenses.push({
        ...action.payload
      });
      Storage(state.expenses)
      return {
        ...state,
      };

    // If the action type is REMOVE_ITEM, we want to remove the item from the cartItems array
    case REMOVE_ITEM:
      Storage([
          ...state.expenses.filter((item) => item.id !== action.payload.id),
        ])
      return {
        expenses: [
          ...state.expenses.filter((item) => item.id !== action.payload.id),
        ],
      };

    case EDIT:
      Storage([
          ...state.expenses.map((item) => item.id === action.payload.id ? action.payload : item),
        ])
      return {
        expenses: [
          ...state.expenses.map((item) => item.id === action.payload.id ? action.payload : item),
        ],
      };
    default:
      return state;
  }
};

export default ExpenseReducer;
