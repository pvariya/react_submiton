import React from 'react';
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseSummary from "../components/ExpenseSummary";

const Home = () => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold">Expense Tracker</h1>
            <ExpenseForm />
            <ExpenseList />
            <ExpenseSummary />
        </div>
    );
};

export default Home;
