import React from "react";
import { format } from "date-fns";

const NotesList = ({ notes }) => {
  // Convert notes object to an array of key-value pairs and sort by date
  const sortedNotes = Object.keys(notes)
    .sort((a, b) => new Date(a) - new Date(b))
    .map((key) => ({ date: key, note: notes[key] }));

  return (
    <div className="notes-list" style={{ marginTop: "20px" }}>
      <h2>All Notes</h2>
      <ul>
        {sortedNotes.length === 0 ? (
          <li>No notes added yet.</li>
        ) : (
          sortedNotes.map(({ date, note }) => (
            <li key={date}>
              <strong>{format(new Date(date), "dd MMM yyyy")}</strong>: {note}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default NotesList;
