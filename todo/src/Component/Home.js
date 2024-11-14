import React, { useState } from "react";

const ProgressBar = ({ percentage }) => {
  return (
    <div
      style={{ width: "100%", backgroundColor: "#e0e0e0", borderRadius: "4px" }}
    >
      <div
        style={{
          width: `${percentage}%`,
          height: "10px",
          backgroundColor: percentage === 100 ? "green" : "blue",
          borderRadius: "4px",
        }}
      ></div>
    </div>
  );
};

function Home() {
  const [cards, setCards] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    task: "",
    status: "not started", // Default value for status
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addCard = (e) => {
    e.preventDefault();
    setCards([...cards, formData]);
    setFormData({ title: "", task: "", status: "not started" }); // Reset status to default
  };

  const handleEdit = (card) => {
    setEditId(card.title);
    setFormData(card);
  };

  const handleSave = () => {
    setCards(
      cards.map((card) =>
        card.title === editId ? { ...card, ...formData } : card
      )
    );
    setEditId(null);
    setFormData({ title: "", task: "", status: "not started" });
  };

  const handleDelete = (title) => {
    setCards(cards.filter((card) => card.title !== title));
    if (editId === title) {
      setEditId(null);
      setFormData({ title: "", task: "", status: "not started" });
    }
  };

  const getProgressPercentage = (status) => {
    switch (status.toLowerCase()) {
      case "not started":
        return 0;
      case "in progress":
        return 50;
      case "completed":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <>
      <div className="container">
        <div className="col-6">
          <form onSubmit={addCard}>
            <div className="form-group">
              <label htmlFor="title">Task title</label>
              <input
                name="title"
                type="text"
                className="form-control"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="task">Task</label>
              <input
                name="task"
                type="text"
                className="form-control"
                placeholder="Task"
                value={formData.task}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                name="status"
                className="form-control"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="not started">Not Started</option>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>

        <table className="table table-bordered tabletodo">
          <thead>
            <tr>
              <th>Task name</th>
              <th>Task</th>
              <th>Status</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card) => (
              <tr key={card.title}>
                <td>
                  {editId === card.title ? (
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  ) : (
                    card.title
                  )}
                </td>
                <td>
                  {editId === card.title ? (
                    <input
                      type="text"
                      name="task"
                      className="form-control"
                      value={formData.task}
                      onChange={handleChange}
                    />
                  ) : (
                    card.task
                  )}
                </td>
                <td>
                  {editId === card.title ? (
                    <select
                      name="status"
                      className="form-control"
                      value={formData.status}
                      onChange={handleChange}
                      required
                    >
                      <option value="not started">Not Started</option>
                      <option value="in progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  ) : (
                    card.status
                  )}
                </td>
                <td>
                  <ProgressBar
                    percentage={getProgressPercentage(card.status)}
                  />
                  {editId === card.title ? (
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() => handleEdit(card)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDelete(card.title)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Home;
