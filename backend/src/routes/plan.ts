import express ,{ Request, Response } from "express";

import dotenv from "dotenv";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, UpdateCommand, GetCommand, ScanCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
const router = express.Router();

dotenv.config();

const dynamoClient = new DynamoDBClient({
  region: process.env.AWS_REGION, // e.g., "us-east-1"
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});
const docClient = DynamoDBDocumentClient.from(dynamoClient); 

//Update workoutplan workout atttribute (by overwriting current workout so it doesnt add on)
router.put("/user/:userID/plan/:planID", async (req: Request<{planID: string, userID:string}, {}, { userId: string, planId: string, workouts: { workoutId: string, workoutName: string, sets: number, reps: number }[] }>
  , res: Response) => {
    
    try{
      const planID = req.params.planID;
      const userID = req.params.userID;
      const workouts = req.body.workouts; 
      

      const getParams = {
        TableName: process.env.DYNAMODB_TABLE_PLANS!,
        Key: { userID, planID },
      };
              
      const updatedWorkouts = workouts;

      const updateParams = {
        TableName: process.env.DYNAMODB_TABLE_PLANS!,
        Key: { userID, planID },
        UpdateExpression: "SET workouts = :workouts, updatedAt = :updatedAt",
        ExpressionAttributeValues: {
            ":workouts": updatedWorkouts,
            ":updatedAt": new Date().toISOString()
        }
      }

      await docClient.send(new UpdateCommand(updateParams));
      res.status(200).json({ message: 'Workout plan updated' });

      } catch (error) {
        console.error('Error updating workout plan:', error);
        res.status(500).json({ message: 'Error adding workouts to plan' });
      }
  });

  export default router;