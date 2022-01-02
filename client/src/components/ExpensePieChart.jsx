import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { selectAllExpenses } from "../features/expenses/expenseSlice";
import { useSelector } from "react-redux";
import { selectAllCategories } from "../features/categories/categorySlice";

ChartJS.register(ArcElement, Tooltip, Legend);
//const labels = ["January", "February", "March", "April", "May", "June"];

export const ExpensePieChart = () => {
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const expenses = useSelector(selectAllExpenses);
  const categories = useSelector(selectAllCategories);

  useEffect(() => {
    if (expenses.length && categories.length) {
      console.log(expenses, categories);
      const totals = {};
      expenses.forEach((e) => {
        const category = categories[e.categoryId - 1].name;
        !totals[category]
          ? (totals[category] = e.amount)
          : (totals[category] += e.amount);
      });
      console.log(totals);
      const labels = Object.keys(totals);

      const data = labels.map((label) => totals[label]);
      setLabels(labels);
      setData(data);
      console.log(data);
    }
  }, [expenses, categories]);

  const config = {
    labels: labels,
    datasets: [
      {
        label: "Total spent",
        data: data,
        backgroundColor: [
          "#8e9aaf44",
          "#00f5d444",
          "#023e8a44",
          "#f9414444",
          "#f3722c44",
          "#f8961e44",
          "#f9b5de44",
          "#00bbf944",
          "#43aa8b44",
          "#f9c74f44",
          "#9b5de544",
        ],
        borderColor: [
          "#8e9aaf",
          "#00f5d4",
          "#023e8a",
          "#f94144",
          "#f3722c",
          "#f8961e",
          "#f9b5de",
          "#00bbf9",
          "#43aa8b",
          "#f9c74f",
          "#9b5de5",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: "350px", margin: "auto", paddingBottom: "40px" }}>
      <Doughnut data={config} />
    </div>
  );
};
