import React, { useState } from "react";

function List() {
  const [records, setRecords] = useState([
    { id: 1, name: "John Doe", age: 28 },
    { id: 2, name: "Jane Smith", age: 32 },
  ]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ name: "", age: "" });

  const handleEditClick = (record) => {
    setEditId(record.id);
    setFormData({ name: record.name, age: record.age });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setRecords(
      records.map((record) =>
        record.id === editId ? { ...record, ...formData } : record
      )
    );
    setEditId(null);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>
                {editId === record.id ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  record.name
                )}
              </td>
              <td>
                {editId === record.id ? (
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                  />
                ) : (
                  record.age
                )}
              </td>
              <td>
                {editId === record.id ? (
                  <button onClick={handleSave}>Save</button>
                ) : (
                  <button onClick={() => handleEditClick(record)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default List;
