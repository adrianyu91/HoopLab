// profileAccordion.tsx
import { Accordion, ActionIcon, AccordionControlProps, Center, Table, Text, TextInput, NumberInput, Button, Group } from '@mantine/core';
import { IconDots } from '@tabler/icons-react';
import React, { useState } from 'react';
import { useAuth } from 'react-oidc-context';
import classes from './styles/profileAccoridion.module.css';


interface AccordionProps {
    plan: any; // Accept a single plan as a prop
    onEdit: (updatedWorkouts: any[]) => void;
}

function AccordionControl(props: AccordionControlProps) {
    return (
        <Center>
            <Accordion.Control {...props} />
            <ActionIcon size="lg" variant="subtle" color="gray">
                <IconDots size={16} />
            </ActionIcon>
        </Center>
    );
}

const ProfileAccordion: React.FC<AccordionProps> = ({ plan, onEdit }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editedWorkouts, setEditedWorkouts] = useState([...plan.workouts]);

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const handleWorkoutChange = (index: number, field: string, value: any) => {
        const updatedWorkouts = [...editedWorkouts];
        updatedWorkouts[index][field] = value;
        setEditedWorkouts(updatedWorkouts);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        onEdit(editedWorkouts);  // Pass the updated workouts back to parent
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setEditedWorkouts([...plan.workouts]);
        setIsEditing(false);
    };


    const rows = editedWorkouts.map((workout: any, index: number) => (
        <Table.Tr key={workout.workoutID}>
            <Table.Td>
                {isEditing ? (
                    <TextInput
                        value={workout.workoutName}
                        onChange={(event) => handleWorkoutChange(index, 'workoutName', event.currentTarget.value)}
                    />
                ) : (
                    workout.workoutName
                )}
            </Table.Td>
            <Table.Td>
                {isEditing ? (
                    <NumberInput
                        value={workout.sets}
                        onChange={(value) => handleWorkoutChange(index, 'sets', value)}
                        min={0}
                    />
                ) : (
                    workout.sets
                )}
            </Table.Td>
             {/* ... similarly for reps, description, videoURL, notes ... */}
            <Table.Td>
                {isEditing ? (
                    <NumberInput
                        value={workout.reps}
                        onChange={(value) => handleWorkoutChange(index, 'reps', value)}
                        min={0}
                    />
                ) : (
                    workout.reps
                )}
            </Table.Td>
            <Table.Td>
                {isEditing ? (
                    <TextInput
                        value={workout.description}
                        onChange={(event) => handleWorkoutChange(index, 'description', event.currentTarget.value)}
                    />
                ) : (
                    workout.description
                )}
            </Table.Td>
            <Table.Td>
                {isEditing ? (
                    <TextInput
                        value={workout.videoURL}
                        onChange={(event) => handleWorkoutChange(index, 'videoURL', event.currentTarget.value)}
                    />
                ) : (
                    workout.videoURL
                )}
            </Table.Td>
            <Table.Td>
                {isEditing ? (
                    <TextInput
                        value={workout.notes}
                        onChange={(event) => handleWorkoutChange(index, 'notes', event.currentTarget.value)}
                    />
                ) : (
                    workout.notes
                )}
            </Table.Td>

        </Table.Tr>
    ));

    return (
        <Accordion chevronPosition="left" maw={1500} mx="auto" classNames={classes}>

            {plan && // Conditionally render if 'plan' exists
                <Accordion.Item value={plan.planID.toString()}> {/* Ensure value is a string */}
                    <AccordionControl>{plan.planName}</AccordionControl>
                    <Accordion.Panel>
                        <Table highlightOnHover>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Workout Name</Table.Th>
                                    <Table.Th>Sets</Table.Th>
                                    <Table.Th>Reps</Table.Th>
                                    <Table.Th>Description</Table.Th>
                                    <Table.Th>Link</Table.Th>
                                    <Table.Th>Notes</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{rows}</Table.Tbody>
                        </Table>
                        <Group mt="md">
                            {isEditing ? (
                                <Group>
                                    <Button onClick={handleSaveClick}>Save</Button>
                                    <Button onClick={handleCancelClick} color="red" variant="outline">Cancel</Button>
                                </Group>
                            ) : (
                                <Button onClick={handleEditClick}>Edit</Button>
                            )}
                        </Group>

                        <Text c="dimmed" size="sm" mt="xs">
                            Last Updated: {formatDate(plan.updatedAt)}
                        </Text>
                    </Accordion.Panel>
                </Accordion.Item>}


        </Accordion>
    );
};

export default ProfileAccordion;