import { useAuth } from "react-oidc-context";
import React, { useState, useEffect } from 'react';
import { Text, Button, Modal, } from '@mantine/core';
import ProfileAccordion from '../components/profileAccordion';


function Profile() {
    const { isAuthenticated, user } = useAuth();
    const [userPlans, setUserPlans] = useState<any[]>([]);
    const [opened, setOpened] = useState(false); // For editing modal
    const [editingPlan, setEditingPlan] = useState<any>(userPlans[0]) // current plan being edited
    const [editedPlanName, setEditedPlanName] = useState(""); // state for edited plan values
    const [editedWorkouts, setEditedWorkouts] = useState<any[]>([]);

    const fetchUserPlans = async () => {
        if (isAuthenticated && user) {
            try {
                const response = await fetch(`http://localhost:5000/api/workoutPlan/user/${user.profile.sub}`);
                if (response.ok) {
                    const plans = await response.json();
                    console.log(plans)
                    setUserPlans(plans);
                } else {
                    
                }
            } 
            catch (error) {
                    console.error("Error fetching user plans", error);
            }
        }
    };

    useEffect(() => {
        fetchUserPlans();
    }, [isAuthenticated, user]);

    const handleEditClick = (plan:any) => {
        setEditingPlan(plan);
        setEditedPlanName(plan.planName);
        setEditedWorkouts([...plan.workouts]);
        setOpened(true);
    };

    const handlePlanUpdate = async (planID: number, updatedWorkouts: any[]) => {
        if (user)
            try {
                const workoutsToUpdate = updatedWorkouts.map(workout => ({
                    workoutId: workout.workoutID,
                    workoutName: workout.workoutName,
                    sets: workout.sets,
                    reps: workout.reps,
                    description: workout.description,
                    videoURL: workout.videoURL,
                    category: workout.category,
                    notes: workout.notes
                  }));

                const response = await fetch(`http://localhost:5000/plan/user/${user.profile.sub}/plan/${planID}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({workouts: workoutsToUpdate}), // Send the entire plan data
                });

                if (!response.ok) {
                    // ... error handling (display error message, etc.)
                }


                // Successful update: Re-fetch data to keep the UI in sync.

                    fetchUserPlans();
            } catch (error) {
                // ... error handling
            }

    };

    const handlePlanNameChange = (event:any) => {
        setEditedPlanName(event.currentTarget.value)
    }

    return (
        <div>
            {editingPlan!= null &&
                <Modal
                    opened={opened}
                    onClose={() => setOpened(false)}
                    title= {"Editing " + editingPlan.planName}
                >
                    <Text>Greetings</Text>

                </Modal>
            
            }
            
            {userPlans.map((plan) => (
            <div key={plan.planID}>

                <ProfileAccordion plan={plan} onEdit={(updatedWorkouts) => handlePlanUpdate(plan.planID, updatedWorkouts)} />


            </div>
        

            ))}
    </div>
    );
}


export default Profile;