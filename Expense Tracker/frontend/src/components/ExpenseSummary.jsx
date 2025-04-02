import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { getSummary } from '../slices/expenseSlice';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExpenseChart = ({ initialData = [] }) => {
 
  const dispatch = useDispatch();
  const summary = useSelector((state) => state.expenses.summary);
  const month = new Date().toISOString().slice(0, 7);

  useEffect(() => {
    dispatch(getSummary(month));
  }, [dispatch, month]);

  const chartData = {
    labels: summary.map((item) => item._id),
    datasets: [
      {
        label: 'Total Expenses',
        data: summary.map((item) => item.total),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Monthly Expense Summary</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default ExpenseChart;
