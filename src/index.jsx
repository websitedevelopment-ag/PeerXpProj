import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter as Router,
} from "react-router-dom";
import ExpenseState from "./Context/Expense/ExpenseState";
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <ExpenseState>
    <App />
      </ExpenseState>
  </Router>
)