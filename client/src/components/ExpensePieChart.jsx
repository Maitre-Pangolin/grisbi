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
      const totals = {};
      expenses.forEach((e) => {
        const category = categories[e.categoryId - 1].name;
        !totals[category]
          ? (totals[category] = e.amount)
          : (totals[category] += e.amount);
      });
      const labels = Object.keys(totals);

      const data = labels.map((label) => totals[label]);
      setLabels(labels);
      setData(data);
    }
  }, [expenses, categories]);

  const config = {
    labels: labels,
    datasets: [
      {
        label: "Total spent",
        data: data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "#ff540022",
          "#03666622",
          "#f15bb522",
          "#3a86ff22",
          "#06d6a022",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "#ff5400",
          "#036666",
          "#f15bb5",
          "#3a86ff",
          "#06d6a0",
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
