"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const workouts_1 = __importDefault(require("./routes/workouts"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Initialize DynamoDB Client
const dynamoClient = new client_dynamodb_1.DynamoDBClient({
    region: process.env.AWS_REGION, // e.g., "us-east-1"
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
const docClient = lib_dynamodb_1.DynamoDBDocumentClient.from(dynamoClient);
// 🏀 Test Route: Check if the server is running
app.get("/", (req, res) => {
    res.send("Test Server is running! 🏀");
});
// 🏀 Sample API Endpoint
app.get("/dynamodb-data", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const command = new lib_dynamodb_1.ScanCommand({ TableName: process.env.DYNAMODB_TABLE });
        const response = yield docClient.send(command);
        res.json(response.Items); // Return the fetched items
    }
    catch (error) {
        console.error("❌ Error fetching data from DynamoDB:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
}));
app.use('/api', workouts_1.default);
// Start the server
app.listen(PORT, () => {
    console.log(`✅ Test Server is running on http://localhost:${PORT}`);
});
