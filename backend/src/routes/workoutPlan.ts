import express, { Request, Response } from "express";
import { docClient } from "../config/dynamoDB"; // Import the DynamoDB client
import { PutCommand, UpdateCommand, GetCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.post('/create', async (req: Request<{}, {}, { userId: string, planName: string }>, res: Response) => {
    try {
      const userID = req.body.userId;
      const planName = req.body.planName;
      const planID = uuidv4();
  
      const params = {
        TableName: process.env.DYNAMODB_TABLE_PLANS!,
        Item: {
          userID,
          planID,
          planName,
          workouts: [], 
          updatedAt: new Date().toISOString(),
        },
      };
  
      await docClient.send(new PutCommand(params));
  
      res.status(201).json({ planID }); 
    } catch (error) {
      console.error('Error creating workout plan:', error);
      res.status(500).json({ message: 'Error creating workout plan' });
    }
  });
  
  
  router.post('/addWorkouts', async (req: Request<{}, {}, { userId: string, planId: string, workouts: { workoutId: string, workoutName: string, sets: number, reps: number }[] }>
  , res: Response) => {
    try {
      const userID = req.body.userId;
      const planID = req.body.planId;
      const workouts = req.body.workouts;
  
      if(!workouts || !Array.isArray(workouts) || workouts.some(workout => !workout.workoutId || !workout.sets || !workout.reps || !workout.workoutName)) {
        res.status(400).json({message: "Invalid workout data"});  
        return;
      }
  
      const getParams = {
        TableName: process.env.DYNAMODB_TABLE_PLANS!,
        Key: { userID, planID },
      };
  
      const existingPlan = await docClient.send(new GetCommand(getParams));
  
      if (!existingPlan.Item) {
        res.status(404).json({ message: 'Workout plan not found' });
        return;
      }
          
      const updatedWorkouts = [...existingPlan.Item.workouts, ...workouts];
  
      const updateParams = {
          TableName: process.env.DYNAMODB_TABLE_PLANS!,
          Key: { userID, planID },
          UpdateExpression: "SET workouts = :workouts, updatedAt = :updatedAt",
          ExpressionAttributeValues: {
              ":workouts": updatedWorkouts,
              ":updatedAt": new Date().toISOString()
          }
  
      };
  
  
      await docClient.send(new UpdateCommand(updateParams));
  
      res.status(200).json({ message: 'Workouts added to plan' });
    } catch (error) {
      console.error('Error adding workouts to plan:', error);
      res.status(500).json({ message: 'Error adding workouts to plan' });
    }
  });
  
  
  //Get User's Plans
  router.get('/user/:userId', async (req: Request, res: Response) => {
    const userId = req.params.userId;
  
    try{
        const params = {
            TableName: process.env.DYNAMODB_TABLE_PLANS!,
            KeyConditionExpression: 'userID = :uid',
            ExpressionAttributeValues: {
                  ':uid': userId,
            },
          };
        
        const result = await docClient.send(new QueryCommand(params)); //Use QueryCommand
        res.json(result.Items);
  
    }catch(error){
        console.error("Error fetching user plans", error);
        res.status(500).json({error: "Could not fetch plans"});
    }
  });

  export default router;