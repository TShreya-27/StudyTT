import React, { useState } from 'eact';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [daysPerWeek, setDaysPerWeek] = useState(0);
  const [subjects, setSubjects] = useState([]);
  const [studyHoursPerDay, setStudyHoursPerDay] = useState(0);
  const [breakInterval, setBreakInterval] = useState(0);
  const [breakDuration, setBreakDuration] = useState(0);

  const addSubject = () => {
    setSubjects([...subjects, { subject: '', credits: 0 }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call API or perform calculation to generate timetable
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'black' }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src="logo.png" alt="Bootstrap" width="150" height="60" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ color: 'white' }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="index.html"
                  style={{ color: 'white' }}
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="tt.html"
                  style={{ color: 'white' }}
                >
                  Generate Time-Table
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mb-3">
        <h1 className="text-center fw-bold">Personalized Timetable Generator</h1>
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
                      subjects.map((s, i) => (i === index? { subject: event.target.value, credits: s.credits } : s))
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
                      subjects.map((s, i) => (i === index? { subject: s.subject, credits: event.target.value } : s))
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
              id="
