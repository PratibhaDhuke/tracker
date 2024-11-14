import React, { useState } from "react";
import {
  format,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  getDay,
  addMonths,
  subMonths,
} from "date-fns";
import NotesList from "./NotesList"; // Import the new NotesList component

const Home = () => {
  const [habits, setHabits] = useState([
    { name: "Exercise", goal: 5, completed: {} },
    { name: "Read", goal: 5, completed: {} },
    { name: "Meditate", goal: 5, completed: {} },
  ]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [notes, setNotes] = useState({});
  const [showNotes, setShowNotes] = useState(false); // Control visibility of NotesList

  const getMonthRange = (date) => {
    const startOfTheMonthDate = startOfMonth(date);
    const endOfTheMonthDate = endOfMonth(date);
    return { startOfTheMonthDate, endOfTheMonthDate };
  };

  const { startOfTheMonthDate, endOfTheMonthDate } = getMonthRange(currentDate);
  const calendarDays = eachDayOfInterval({
    start: startOfTheMonthDate,
    end: endOfTheMonthDate,
  });

  const getWeekdayInitial = (day) => {
    const weekdayIndex = getDay(day);
    const weekdayNames = ["S", "M", "T", "W", "T", "F", "S"];
    return weekdayNames[weekdayIndex];
  };

  const handleCellClick = (habitName, day) => {
    const updatedHabits = habits.map((habit) => {
      if (habit.name === habitName) {
        const newCompleted = { ...habit.completed };
        newCompleted[format(day, "yyyy-MM-dd")] =
          !newCompleted[format(day, "yyyy-MM-dd")];
        return { ...habit, completed: newCompleted };
      }
      return habit;
    });
    setHabits(updatedHabits);
  };

  const handleSaveNote = (selectedDate, newNote) => {
    setNotes({
      ...notes,
      [format(selectedDate, "yyyy-MM-dd")]: newNote,
    });
  };

  const goToPreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  // Toggle the visibility of the Notes List
  const toggleNotesVisibility = () => {
    setShowNotes((prevState) => !prevState);
  };

  return (
    <div className="Home">
      <h1>Habit Tracker</h1>

      <div className="calendar-nav">
        <span
          onClick={goToPreviousMonth}
          style={{ cursor: "pointer", fontSize: "24px", padding: "0 10px" }}
        >
          ←
        </span>
        <span>{format(currentDate, "MMMM yyyy")}</span>
        <span
          onClick={goToNextMonth}
          style={{ cursor: "pointer", fontSize: "24px", padding: "0 10px" }}
        >
          →
        </span>
      </div>

      <table className="calendar-table">
        <thead>
          <tr>
            <th>Habit</th>
            {calendarDays.map((day) => (
              <th key={format(day, "yyyy-MM-dd")}>{getWeekdayInitial(day)}</th>
            ))}
            <th>Goal</th>
            <th>Achieved</th>
          </tr>
          <tr>
            <th></th>
            {calendarDays.map((day) => (
              <th
                key={format(day, "yyyy-MM-dd")}
                onClick={() => handleCellClick(day)}
              >
                {format(day, "dd")}
              </th>
            ))}
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {habits.map((habit) => (
            <tr key={habit.name}>
              <td>{habit.name}</td>
              {calendarDays.map((day) => (
                <td
                  key={`${habit.name}-${format(day, "yyyy-MM-dd")}`}
                  className="checkbox-cell"
                  onClick={() => handleCellClick(habit.name, day)}
                  style={{
                    backgroundColor: habit.completed[format(day, "yyyy-MM-dd")]
                      ? "#0bdb96" // Green if completed
                      : "#fff", // White if not completed
                    cursor: "pointer", // Make it look clickable
                    textAlign: "center", // Align text (checkmark)
                    position: "relative",
                    fontSize: "18px", // Adjust size for checkmark
                  }}
                >
                  {/* Display checkmark if the habit is completed */}
                  {habit.completed[format(day, "yyyy-MM-dd")] && (
                    <span
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)", // Center the checkmark
                        fontSize: "20px",
                        color: "#fff", // White checkmark
                      }}
                    >
                      ✔
                    </span>
                  )}
                </td>
              ))}
              <td>{habit.goal}</td>
              <td style={getAchievedCellStyle(habit)}>
                {calculateAchieved(habit)}
              </td>{" "}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Button to toggle the visibility of the Notes Display */}
      <button
        onClick={toggleNotesVisibility}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#008CBA",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {showNotes ? "Hide Notes" : "Show Notes"}
      </button>

      {/* Show Notes if showNotes is true */}
      {showNotes && <NotesList notes={notes} />}
    </div>
  );
};

export default Home;
