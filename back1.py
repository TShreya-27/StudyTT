from flask import Flask, request, jsonify
from flask_ngrok import run_with_ngrok
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
from sklearn.ensemble import RandomForestRegressor
from datetime import datetime

app = Flask(__name__)
run_with_ngrok(app)  # Start ngrok when app is run

@app.route('/')
def index():
    return 'Flask server is running'

@app.route('/submit', methods=['POST'])
def submit():
    data = request.json
    response = {
        'message': 'Data received',
        'data': data
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run()

# Load and preprocess the data
data = pd.read_csv('Study Preferences.csv')
print(data.head())

name = input("Enter your name ").strip()
filtered_data = data[data['name'].str.strip().str.lower() == name.lower()]
if not filtered_data.empty:
    target_index = filtered_data.index.tolist()[0]
    study_days = data['study days'].iloc[target_index]
    subject_names = data['subject names'].iloc[target_index]
    study_hours_per_day = data['study hours'].iloc[target_index]
    break_interval = data['number of breaks'].iloc[target_index]
    break_duration = data['duration of break'].iloc[target_index]
    subject_names_list = [name.strip() for name in subject_names.split(',')]
    print(f"Study Days: {study_days}")
    print(f"Subject Names: {subject_names_list}")
    print(f"Study Hours Per Day: {study_hours_per_day}")
    print(f"Break Interval: {break_interval}")
    print(f"Break Duration: {break_duration}")
else:
    print("Name not found in the data.")

# Parse the Timestamp column to extract useful features
data['Timestamp'] = pd.to_datetime(data['Timestamp'])
data['day_of_week'] = data['Timestamp'].dt.dayofweek
data['hour_of_day'] = data['Timestamp'].dt.hour

# Encode categorical features using LabelEncoder and OneHotEncoder
le = LabelEncoder()
data['procrastinater_encoded'] = le.fit_transform(data['procrastinater'])
data = pd.get_dummies(data, columns=['education', 'subject names'])

# Define the feature columns and target variable
feature_columns = [
    'day_of_week', 'hour_of_day', 'study days', 'number of subjects',
    'study hours', 'number of breaks', 'duration of break',
    'education_High School', 'procrastinater_encoded'
]

X = data[feature_columns]
y = data['study time']  # Example target variable

# Split the data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a Random Forest regressor
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Predict on the test set
y_pred = model.predict(X_test)

# Evaluate the model
mse = mean_squared_error(y_test, y_pred)
print(f'Mean Squared Error: {mse}')

# Timetable generation function
def generate_timetable(study_days, study_hours_per_day, subject_names_list, break_interval, break_duration):
    timetable = {}
    total_subjects = len(subject_names_list)
    hours_per_subject = study_hours_per_day / total_subjects
    for day in range(1, study_days + 1):
        daily_schedule = []
        start_hour = 0.0
        for i in range(total_subjects):
            end_hour = start_hour + hours_per_subject
            daily_schedule.append({
                'subject': subject_names_list[i],
                'start_time': f'{int(start_hour):02d}:{int((start_hour % 1) * 60):02d}',
                'end_time': f'{int(end_hour):02d}:{int((end_hour % 1) * 60):02d}'
            })
            start_hour = end_hour
        break_time = 0.0
        while break_time + break_interval <= study_hours_per_day:
            break_start = break_time + break_interval
            break_end = break_start + (break_duration / 60.0)

            if break_start < study_hours_per_day:
                start_hour = int(break_start)
                start_minute = int((break_start - start_hour) * 60)
                end_hour = int(break_end)
                end_minute = int((break_end - end_hour) * 60)

                daily_schedule.append({
                    'subject': 'Break',
                    'start_time': f'{start_hour:02d}:{start_minute:02d}',
                    'end_time': f'{end_hour:02d}:{end_minute:02d}'
                })
            break_time = break_end
        daily_schedule.sort(key=lambda x: (int(x['start_time'].split(':')[0]), int(x['start_time'].split(':')[1])))
        timetable[f'Day {day}'] = daily_schedule
    return timetable

# Generate and print the timetable
timetable = generate_timetable(study_days, study_hours_per_day, subject_names_list, break_interval, break_duration)
for day, schedule in timetable.items():
    print(f"{day}:")
    for session in schedule:
        print(f"  {session['subject']} from {session['start_time']} to {session['end_time']}")
