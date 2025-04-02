import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteExpense } from '../slices/expenseSlice';
import ExpenseForm from './ExpenseForm';

const ExpenseList = () => {
    const dispatch = useDispatch();
    const expenses = useSelector((state) => state.expenses.items);
    const [selectedExpense, setSelectedExpense] = React.useState(null);
    const [isFormOpen, setIsFormOpen] = React.useState(false);

    const handleDelete = (id) => {
        dispatch(deleteExpense(id));
    };

    const handleEdit = (expense) => {
        setSelectedExpense(expense);
        setIsFormOpen(true);
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-4">Your Expenses</h2>
            <ul className="space-y-4">
                {expenses.map((expense) => (
                    <li
                        key={expense._id}
                        className="flex justify-between items-center p-4 bg-white shadow-md rounded-md"
                    >
                        <div>
                            <span className="block text-xl font-medium">{expense.category}</span>
                            <span className="text-sm text-gray-500">
                                ${expense.amount} on {new Date(expense.date).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={() => handleEdit(expense)}
                                className="text-blue-600 hover:text-blue-800"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(expense._id)}
                                className="text-red-600 hover:text-red-800"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {isFormOpen && (
                <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <ExpenseForm
                        expense={selectedExpense}
                        onClose={() => {
                            setIsFormOpen(false);
                            setSelectedExpense(null);
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default ExpenseList;
