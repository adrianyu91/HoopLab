import express, { Request, Response } from "express";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../config/dynamoDB"; // Import the DynamoDB client

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const command = new ScanCommand({ 
    TableName: process.env.DYNAMODB_TABLE!
   });
  try {
    
    const response = await docClient.send(command);
    res.json(response.Items); // Return the fetched items
  } catch (error) {
    console.error("Error fetching data from DynamoDB:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

export default router;