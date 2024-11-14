// Home.js
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import PDFGenerator from "./Pdfgenerator";

function Home() {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({ title: "", amount: "" });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatDate = (date) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  const addOrUpdateExpense = (e) => {
    e.preventDefault();
    const currentDate = formatDate(new Date());
    if (editId !== null) {
      const updatedExpenses = expenses.map((expense, index) =>
        index === editId ? { ...formData, date: expense.date } : expense
      );
      setExpenses(updatedExpenses);
      setEditId(null);
    } else {
      setExpenses([...expenses, { ...formData, date: currentDate }]);
    }
    setFormData({ title: "", amount: "" });
  };

  const deleteExpense = (index) => {
    const newExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(newExpenses);
  };

  const startEditing = (expense, index) => {
    setEditId(index);
    setFormData({
      title: expense.title,
      amount: expense.amount,
    });
  };

  const totalExpenses = expenses.reduce((total, expense) => {
    return total + parseFloat(expense.amount) || 0;
  }, 0);

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  const income = 50000;
  const balance = income - totalExpenses;

  return (
    <div className="container">
      <h3 className="title">Expense Tracker</h3>
      <div className="card">
        <div className="balance-section">
          <div className="balance">
            <h4>Current Balance</h4>
            <div className="amount">${balance.toFixed(2)}</div>
          </div>
          <div className="expense">
            <h4>Total Expenses</h4>
            <div className="amount red">${totalExpenses.toFixed(2)}</div>
          </div>
          <div className="income">
            <h4>Income</h4>
            <div className="amount green">${income}</div>
          </div>
        </div>
        <div className="button-container">
          {isFormVisible ? (
            <input
              type="button"
              className="btn cancel-btn"
              value="CANCEL"
              onClick={toggleForm}
            />
          ) : (
            <button className="btn add-btn" onClick={toggleForm}>
              Add Expense
            </button>
          )}
          <PDFGenerator
            expenses={expenses}
            totalExpenses={totalExpenses}
            remaining={balance}
          />
        </div>
        {isFormVisible && (
          <form className="expense-form" onSubmit={addOrUpdateExpense}>
            <input
              name="title"
              type="text"
              placeholder="Expense Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <input
              name="amount"
              type="number"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
            <button type="submit" className="btn submit-btn">
              {editId !== null ? "Update Transaction" : "Add Transaction"}
            </button>
          </form>
        )}
        {expenses.length > 0 && (
          <h4 className="transactions-title">Transactions</h4>
        )}
        <div className="transactions">
          {expenses.map((expense, index) => (
            <div key={index} className="transaction">
              <span className="transaction-title">{expense.title}</span>
              <span className="transaction-amount">
                ${parseFloat(expense.amount).toFixed(2)}
              </span>
              <span className="transaction-date">{expense.date}</span>
              <div className="transaction-icons">
                <FontAwesomeIcon
                  icon={faEdit}
                  className="edit-icon"
                  onClick={() => startEditing(expense, index)}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  className="delete-icon"
                  onClick={() => deleteExpense(index)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
