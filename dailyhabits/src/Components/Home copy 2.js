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

const Home = () => {
  // Define initial state for habits, current month, and notes
  const [habits, setHabits] = useState([
    { name: "Exercise", goal: 5, completed: {} },
    { name: "Read", goal: 5, completed: {} },
    { name: "Meditate", goal: 5, completed: {} },
  ]);
  const [currentDate, setCurrentDate] = useState(new Date()); // Track the currently displayed month
  const [notes, setNotes] = useState({}); // Store notes for each date
  const [showPopup, setShowPopup] = useState(false); // Control popup visibility
  const [selectedDate, setSelectedDate] = useState(null); // Store the currently selected date
  const [newNote, setNewNote] = useState(""); // Store the new note text

  // Function to get the start and end of the month
  const getMonthRange = (date) => {
    const startOfTheMonthDate = startOfMonth(date);
    const endOfTheMonthDate = endOfMonth(date);
    return { startOfTheMonthDate, endOfTheMonthDate };
  };

  // Get the days for the current month
  const { startOfTheMonthDate, endOfTheMonthDate } = getMonthRange(currentDate);
  const calendarDays = eachDayOfInterval({
    start: startOfTheMonthDate,
    end: endOfTheMonthDate,
  });

  // Function to get the first letter of the weekday
  const getWeekdayInitial = (day) => {
    const weekdayIndex = getDay(day); // Get day of the week (0 = Sunday, 1 = Monday, etc.)
    const weekdayNames = ["S", "M", "T", "W", "T", "F", "S"]; // Abbreviated weekday names
    return weekdayNames[weekdayIndex];
  };

  // Handle cell click for each habit (for marking completion)
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

  // Function to handle clicking on a date to show the note popup
  const handleDateClick = (day) => {
    setSelectedDate(day); // Store the selected date
    setNewNote(notes[format(day, "yyyy-MM-dd")] || ""); // Set the current note if any
    setShowPopup(true); // Show the popup
  };

  // Function to get a dynamic style for the Achieved column
  const getAchievedCellStyle = (habit) => {
    const achieved = calculateAchieved(habit);
    return achieved >= habit.goal
      ? { backgroundColor: "#0bdb96" } // Light green color if goal is achieved
      : { backgroundColor: "#fffc47" }; // Yellow if goal is not achieved
  };

  // Calculate achieved progress (total days completed in the current month)
  const calculateAchieved = (habit) => {
    const completedDays = Object.keys(habit.completed).filter(
      (date) =>
        habit.completed[date] &&
        calendarDays.some((day) => format(day, "yyyy-MM-dd") === date)
    ).length; // Filter to only count completed days within the current month
    return completedDays; // Simply return the number of completed days in the current month
  };

  // Function to save the note
  const handleSaveNote = () => {
    if (selectedDate) {
      setNotes({
        ...notes,
        [format(selectedDate, "yyyy-MM-dd")]: newNote, // Save the note with the date as key
      });
      setShowPopup(false); // Close the popup after saving
    }
  };

  // Navigate to the previous month
  const goToPreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  // Navigate to the next month
  const goToNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  return (
    <div className="Home">
      <h1>Habit Tracker</h1>

      {/* Navigation arrows */}
      <div className="calendar-nav">
        <span
          onClick={goToPreviousMonth}
          style={{
            cursor: "pointer",
            fontSize: "24px",
            padding: "0 10px",
          }}
        >
          ←
        </span>
        <span>{format(currentDate, "MMMM yyyy")}</span>
        <span
          onClick={goToNextMonth}
          style={{
            cursor: "pointer",
            fontSize: "24px",
            padding: "0 10px",
          }}
        >
          →
        </span>
      </div>

      {/* Table for the Calendar */}
      <table className="calendar-table">
        <thead>
          {/* Weekday initials row */}
          <tr>
            <th>Habit</th>
            {calendarDays.map((day) => (
              <th key={format(day, "yyyy-MM-dd")}>{getWeekdayInitial(day)}</th>
            ))}
            <th>Goal</th>
            <th>Achieved</th> {/* Add Achieved column header */}
          </tr>
          {/* Date row */}
          <tr>
            <th></th> {/* Empty cell for habit row */}
            {calendarDays.map((day) => (
              <th
                key={format(day, "yyyy-MM-dd")}
                onClick={() => handleDateClick(day)}
              >
                {format(day, "dd")}
              </th>
            ))}
            <th></th> {/* Empty cell for habit row */}
            <th></th> {/* Empty cell for Achieved column */}
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
              <td>{habit.goal}</td> {/* Display goal */}
              <td style={getAchievedCellStyle(habit)}>
                {calculateAchieved(habit)}
              </td>{" "}
              {/* Display achieved progress with dynamic style */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup for adding/editing notes */}
      {showPopup && (
        <div
          className="popup"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
            width: "300px",
          }}
        >
          <h3>Add Note for {format(selectedDate, "dd MMM yyyy")}</h3>
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            style={{
              width: "100%",
              height: "100px",
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              resize: "none",
            }}
          />
          <div style={{ textAlign: "right" }}>
            <button
              onClick={handleSaveNote}
              style={{
                padding: "6px 12px",
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Save Note
            </button>
          </div>
          <button
            onClick={() => setShowPopup(false)}
            style={{
              marginTop: "10px",
              padding: "6px 12px",
              backgroundColor: "#f44336",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
