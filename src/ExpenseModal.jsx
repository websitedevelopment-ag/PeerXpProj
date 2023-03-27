import { Modal, Button, TextInput, Label, Textarea, Select } from 'flowbite-react'
import React from 'react';
import ExpenseContext from "./Context/Expense/ExpenseContext";

import { useContext, useEffect, useState } from "react";
export default function AddExpenseModal({ showEditModal, setShowEditModal, expenseToEdit, isAdd }) {
  const { expenses, editExpense, addExpense } = useContext(ExpenseContext);
  const currUser = localStorage.getItem('user')
  const [name, setName] = useState(expenseToEdit && expenseToEdit.name ? expenseToEdit.name : '');
  const [category, setCategory] = useState(expenseToEdit && expenseToEdit.category ? expenseToEdit.category : '');
  const [amount, setAmount] = useState(expenseToEdit && expenseToEdit.amount ? expenseToEdit.amount : '');
  const [date, setDate] = useState(expenseToEdit && expenseToEdit.date ? expenseToEdit.date : '');
  useEffect(() => {
    setName(expenseToEdit && expenseToEdit.name ? expenseToEdit.name : '');
    setCategory(expenseToEdit && expenseToEdit.category ? expenseToEdit.category : '');
    // console.log(expenseToEdit.amount)
    setAmount(expenseToEdit && expenseToEdit.amount ? expenseToEdit.amount : '');
    setDate(expenseToEdit && expenseToEdit.date ? expenseToEdit.date : '');
  }, [expenseToEdit]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleDateChange = (date) => {
    setDate(event.target.value);
  };

  const handleSubmit = (event) => {
    console.log("Clicked")
    console.log({
      name,
      category,
      amount,
      date,
    });
    if (expenseToEdit) {
      editExpense({ id: expenseToEdit.id, name: name, category: category, amount: amount, date: date, updated_at: new Date().toISOString(), created_by: expenseToEdit.created_by });
    }
    else {
      const id = expenses.reduce((max, expense) => {
        return expense.id > max ? expense.id : max;
      }, 0) + 1;
      addExpense({ id: id, name: name, category: category, amount: amount, date: date, updated_at: new Date().toISOString(), created_by: currUser })
    }
    setShowEditModal(false);
  };
  return (
    <React.Fragment>
      <Modal
        show={showEditModal}
        size="md"
        popup={true}
        onClose={() => { setShowEditModal(false) }}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              {isAdd == 1 ? "New " : "Edit "}Expense
            </h3>
            <div>
              <label htmlFor="name">Name:</label>
              <TextInput
                id="name"
                name="name"
                placeholder="Enter name"
                defaultValue={name}
                onBlur={handleNameChange}
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="pt-2">Category:</label>
              <TextInput
                id="category"
                name="category"
                placeholder="Enter category"
                defaultValue={category}
                onBlur={handleCategoryChange}
                required
              />
            </div>

            <div>
              <label htmlFor="amount" className="pt-2">Amount:</label>
              <TextInput
                id="amount"
                name="amount"
                placeholder="Enter amount"
                defaultValue={amount}
                onBlur={handleAmountChange}
                required
              />
            </div>

            <div>
              <label htmlFor="date" className="pt-2">Date(YYYY-MM-DD):</label>
              <TextInput
                id="date"
                name="date"
                placeholder="Enter Date"
                defaultValue={date}
                onBlur={handleDateChange}
                required
              />

            </div>
            <div className="flex justify-center gap-4 pt-3 mt-3">
              <Button
                color="gray"
                onClick={() => { setShowEditModal(false) }}
              >
                Cancel
              </Button>
              <Button
                color="success"
                onClick={() => handleSubmit()}
              >
                Save Expense
              </Button>
            </div>

          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  )
}