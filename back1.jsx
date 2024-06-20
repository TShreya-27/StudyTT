import React, { useState, useEffect } from 'eact';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [studyDays, setStudyDays] = useState(0);
  const [subjectNames, setSubjectNames] = useState([]);
  const [studyHoursPerDay, setStudyHoursPerDay] = useState(0);
  const [breakInterval, setBreakInterval] = useState(0);
  const [breakDuration, setBreakDuration] = useState(0);
  const [timetable, setTimetable] = useState({});

  useEffect(() => {
    axios.get('/submit', {
      params: {
        name: name
      }
    })
   .then(response => {
      const data = response.data;
      setStudyDays(data.studyDays);
      setSubjectNames(data.subjectNames.split(','));
      setStudyHoursPerDay(data.studyHoursPerDay);
      setBreakInterval(data.breakInterval);
      setBreakDuration(data.breakDuration);
    })
   .catch(error => {
      console.error(error);
    });
  }, [name]);

  const generateTimetable = () => {
    const timetable = {};
    const totalSubjects = subjectNames.length;
    const hoursPerSubject = studyHoursPerDay / totalSubjects;
    for (let day = 1; day <= studyDays; day++) {
      const dailySchedule = [];
      let startHour = 0.0;
      for (let i = 0; i < totalSubjects; i++) {
        const endHour = startHour + hoursPerSubject;
        dailySchedule.push({
          subject: subjectNames[i],
          startTime: `${Math.floor(startHour)}:${Math.floor((startHour % 1) * 60)}`,
          endTime: `${Math.floor(endHour)}:${Math.floor((endHour % 1) * 60)}`
        });
        startHour = endHour;
      }
      let breakTime = 0.0;
      while (breakTime + breakInterval <= studyHoursPerDay) {
        const breakStart = breakTime + breakInterval;
        const breakEnd = breakStart + (breakDuration / 60.0);

        if (breakStart < studyHoursPerDay) {
          const startHour = Math.floor(breakStart);
          const startMinute = Math.floor((breakStart - startHour) * 60);
          const endHour = Math.floor(breakEnd);
          const endMinute = Math.floor((breakEnd - endHour) * 60);

          dailySchedule.push({
            subject: 'Break',
            startTime: `${startHour}:${startMinute}`,
            endTime: `${endHour}:${endMinute}`
          });
        }
        breakTime = breakEnd;
      }
      dailySchedule.sort((a, b) => {
        const startTimeA = a.startTime.split(':');
        const startTimeB = b.startTime.split(':');
        return startTimeA[0] - startTimeB[0] || startTimeA[1] - startTimeB[1];
      });
      timetable[`Day ${day}`] = dailySchedule;
    }
    setTimetable(timetable);
  };

  return (
    <div>
      <h1>Personalized Timetable Generator</h1>
      <form>
        <label>
          Enter your name:
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </label>
        <button type="submit" onClick={generateTimetable}>
          Generate Timetable
        </button>
      </form>
      {Object.keys(timetable).map(day => (
        <div key={day}>
          <h2>{day}</h2>
          <ul>
            {timetable[day].map(session => (
              <li key={session.subject}>
                {session.subject} from {session.startTime} to {session.endTime}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;
