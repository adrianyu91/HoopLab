import React, { useEffect, useState } from 'react';
import Dropdown from './dropdown';

const Workout: React.FC = () => {
  const [workouts, setWorkouts] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('http://localhost:5000/workouts');
        const data = await response.json();
        setWorkouts(data);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div>
      <h2>Workouts</h2>
      <Dropdown
        options={['Beginner', 'Intermediate', 'Advanced']}
        label="Select Level"
        onSelect={(level) => setSelectedLevel(level)}
      />
      
      <Dropdown
        options={['Dribbling', 'Shooting', 'Finishing', 'Passing']}
        label="Select Category"
        onSelect={(category) => setSelectedCategory(category)}
      />
      <ul>
        {workouts.map((workout: any) => (
          <li key={workout.workoutID}>{workout.workoutName} - {workout.reps} reps</li>
        ))}
      </ul>
    </div>
  );
};

export default Workout;