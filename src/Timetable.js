import React, { useState } from "react";
import "./App.css";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";
export default function Timetable() {
  const [daysPerWeek, setDaysPerWeek] = useState(0);
  const [subjects, setSubjects] = useState([{ subject: "", credits: 0 }]);
  const [studyHoursPerDay, setStudyHoursPerDay] = useState(0);
  const [breakInterval, setBreakInterval] = useState(0);
  const [breakDuration, setBreakDuration] = useState(0);

  const addSubject = () => {
    setSubjects([...subjects, { subject: "", credits: 0 }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call API or perform calculation to generate timetable
  };

  return (
    <div>
      <Navbar />
      <div className="container mb-3">
        <h1 className="text-center fw-bold">
          Personalized Timetable Generator
        </h1>
        <form id="timetableForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="daysPerWeek">Number of days per week:</label>
            <input
              type="number"
              id="daysPerWeek"
              value={daysPerWeek}
              onChange={(event) => setDaysPerWeek(event.target.value)}
              min="1"
              max="7"
              required
            />
          </div>
          <div className="form-group" id="subjectsContainer">
            <label>Subjects and their credit hours:</label>
            {subjects.map((subject, index) => (
              <div key={index} className="subject-row">
                <input
                  type="text"
                  name="subject[]"
                  value={subject.subject}
                  onChange={(event) =>
                    setSubjects(
                      subjects.map((s, i) =>
                        i === index
                          ? { subject: event.target.value, credits: s.credits }
                          : s
                      )
                    )
                  }
                  placeholder="Subject"
                  required
                />
                <input
                  type="number"
                  name="credits[]"
                  value={subject.credits}
                  onChange={(event) =>
                    setSubjects(
                      subjects.map((s, i) =>
                        i === index
                          ? { subject: s.subject, credits: event.target.value }
                          : s
                      )
                    )
                  }
                  placeholder="Credit Hours"
                  min="1"
                  required
                />
              </div>
            ))}
          </div>
          <div className="d-grid gap-2">
            <button type="button" className="add-subject" onClick={addSubject}>
              Add Another Subject
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="studyHoursPerDay">Study hours per day:</label>
            <input
              type="number"
              id="studyHoursPerDay"
              value={studyHoursPerDay}
              onChange={(event) => setStudyHoursPerDay(event.target.value)}
              min="1"
              max="24"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="breakInterval">Break intervals (in hours):</label>
            <input
              type="number"
              id="breakInterval"
              value={breakInterval}
              onChange={(event) => setBreakInterval(event.target.value)}
              min="1"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="breakDuration">Break duration (in minutes):</label>
            <input
              type="number"
              id="breakDuration"
              value={breakDuration}
              onChange={(event) => setBreakDuration(event.target.value)}
              min="1"
              required
            />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Generate Timetable
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
