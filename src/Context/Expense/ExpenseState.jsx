
import { useReducer } from "react";
import ExpenseContext from "./ExpenseContext";
import ExpenseReducer from "./ExpenseReducer";

const ExpenseState = ({ children }) => {

  //Local Storage
  const storage = localStorage.getItem("expenses")
    ? JSON.parse(localStorage.getItem("expenses"))
    : [];

  const initialState = {
    expenses: storage,
  };

  //Set up the reducer
  const [state, dispatch] = useReducer(ExpenseReducer, initialState);
  
  const addExpense = (payload) => {
    dispatch({ type: "ADD_EXPENSE", payload });
  };

  const editExpense = (payload) => {
    console.log("Editing")
    dispatch({ type: "EDIT", payload });
  };

  const removeExpense = (payload) => {
    dispatch({ type: "REMOVE_ITEM", payload });
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses: state.expenses,
        addExpense,
        removeExpense,
        editExpense
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseState;
