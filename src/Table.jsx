import React from 'react'
import { useContext, useEffect, useState } from "react";
import AddExpenseModal from "./ExpenseModal"
import ExpenseContext from "./Context/Expense/ExpenseContext";
import { data } from './ExpensesData'
import { Modal, Button, TextInput, Label } from 'flowbite-react'
export default function Table() {
  const currUser = localStorage.getItem('user')
  const { expenses, removeExpense } = useContext(ExpenseContext);
  function getTimeDifference(date) {
    const now = new Date();
    const diffInMillis = now - date;
    const diffInSeconds = Math.round(diffInMillis / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`;
    }
    const diffInMinutes = Math.round(diffInSeconds / 60);

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    }
    const diffInHours = Math.round(diffInMinutes / 60);

    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    }
    const diffInDays = Math.round(diffInHours / 24);
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
  }

  console.log("Agrima", expenses)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState({});
  const [add, setAdd] = useState(0);
  // console.log(JSON.stringify(myExpenses))
  return (

    <div><Button
      color="success"
      onClick={() => { setAdd(1); setSelectedExpense(null); setShowEditModal(true) }}
    >
      Add Expense
    </Button>
      <br />
      <AddExpenseModal showEditModal={showEditModal} setShowEditModal={setShowEditModal} expenseToEdit={selectedExpense} isAdd={add} />
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                Category
              </th>
              <th scope="col" class="px-6 py-3">
                Date
              </th>
              <th scope="col" class="px-6 py-3">
                Amount (INR)
              </th>
              <th scope="col" class="px-6 py-3">
                Updated At
              </th>
              <th scope="col" class="px-6 py-3">
                Created by
              </th>
              <th scope="col" class="px-6 py-3">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => {
              return (
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {expense.name}
                  </th>
                  <td class="px-6 py-4">
                    {expense.category}
                  </td>
                  <td class="px-6 py-4">
                    {expense.date}
                  </td>
                  <td class="px-6 py-4">
                    Rs. {expense.amount}
                  </td>
                  <td class="px-6 py-4">
                    {getTimeDifference(new Date(expense.updated_at))}
                  </td>
                  <td class="px-6 py-4">
                    {/*       TODO - Show me if current logged in user */}
                    {expense.created_by === currUser ? "Me" : expense.created_by}
                  </td>
                  <td class="px-6 py-4">
                    <a className="pr-2" href="#" onClick={() => { setAdd(0); setSelectedExpense(expense); setShowEditModal(true) }}>
                      <i class="fas fa-edit"></i>
                    </a>

                    <a href="#" onClick={() => { setSelectedExpense(expense); setShowDeleteModal(true) }}>
                      <i class="fas fa-trash" style={{ color: "red" }}></i>
                    </a>
                    <React.Fragment>

                      <Modal
                        show={showDeleteModal}
                        size="md"
                        popup={true}
                        onClose={() => setShowDeleteModal(false)}
                      >
                        <Modal.Header />
                        <Modal.Body>
                          <div className="text-center">
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                              Are you sure you want to delete this expense?
                            </h3>
                            <div className="flex justify-center gap-4">
                              <Button
                                color="failure"
                                onClick={() => { removeExpense(selectedExpense); setShowDeleteModal(false); }}
                              >
                                Yes, I'm sure
                              </Button>
                              <Button
                                color="gray"
                                onClick={() => setShowDeleteModal(false)}
                              >
                                No, cancel
                              </Button>
                            </div>
                          </div>
                        </Modal.Body>
                      </Modal></React.Fragment>
                  </td>
                </tr>

              )
            })}
          </tbody>
        </table>

      </div>
    </div>

  )
}
    //<div>
      //<Button title="Log out" handleAction={handleLogOut} />
    //</div>
