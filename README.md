☕ Serverless Coffee Shop Application

A full-stack serverless web application designed to manage a coffee shop menu. This project demonstrates a cloud-native architecture using AWS Services to handle frontend hosting, authentication, API management, and database operations.

(Replace the path above with your actual image path if different)

🚀 Project Overview

This application allows users to view, add, update, and delete coffee items from a menu. It leverages a Serverless architecture to ensure scalability and cost-efficiency.

Frontend: A React application (Vite) that provides a responsive user interface.

Backend: AWS Lambda functions serving as microservices for CRUD operations.

Database: Amazon DynamoDB for NoSQL data storage.

Auth: AWS Cognito for secure user authentication.

🏗️ Architecture & Workflow

The application follows a standard serverless flow as illustrated in the architecture diagram:

User Access: Users visit the website URL served by Amazon CloudFront (CDN) for low latency.

Static Hosting: CloudFront fetches the React build files (HTML, CSS, JS) from a private Amazon S3 Bucket.

Authentication: Users log in using AWS Cognito. Upon successful login, the frontend receives a JWT (JSON Web Token).

API Requests: The React app sends HTTP requests (GET, POST, PUT, DELETE) to Amazon API Gateway. These requests include the JWT for authorization.

Business Logic: API Gateway routes the request to the specific AWS Lambda function responsible for that action (e.g., /create triggers the create Lambda).

Data Persistence: The Lambda function performs the necessary operation on the Amazon DynamoDB table.

🛠️ Tech Stack

Frontend: React.js, Vite, React Router, Axios

Cloud Provider: Amazon Web Services (AWS)

Infrastructure:

S3 & CloudFront: Frontend hosting

Cognito: User Identity & Access Management

API Gateway: REST API endpoint management

Lambda: Serverless compute (Node.js)

DynamoDB: NoSQL Database

📂 Project Structure

AWS-SERVERLESS/
├── Frontend/                 # React Application
│   ├── src/
│   ├── public/
│   └── package.json
├── LambdaWithLayer/          # Backend Code
│   ├── LambdaFunctionWithLayer/
│   │   ├── get/              # Get Item Logic
│   │   ├── post/             # Create Item Logic
│   │   ├── update/           # Update Item Logic
│   │   └── delete/           # Delete Item Logic
│   └── nodejs/               # Shared dependencies layer (node_modules)
└── README.md


⚙️ Setup & Deployment

1. Frontend Setup

Navigate to the frontend directory and install dependencies:

cd Frontend
npm install
npm run dev


2. Backend Deployment (Lambda)

The backend is split into individual microservices. We use a PowerShell script to bundle these functions into .zip files for upload to the AWS Console.

Zipping Script (deploy.ps1):

# Run this from the root directory
Compress-Archive -Path ".\LambdaWithLayer\LambdaFunctionWithLayer\get\*" -DestinationPath ".\LambdaWithLayer\get.zip" -Force
Compress-Archive -Path ".\LambdaWithLayer\LambdaFunctionWithLayer\post\*" -DestinationPath ".\LambdaWithLayer\post.zip" -Force
Compress-Archive -Path ".\LambdaWithLayer\LambdaFunctionWithLayer\update\*" -DestinationPath ".\LambdaWithLayer\update.zip" -Force
Compress-Archive -Path ".\LambdaWithLayer\LambdaFunctionWithLayer\delete\*" -DestinationPath ".\LambdaWithLayer\delete.zip" -Force
Compress-Archive -Path ".\LambdaWithLayer\nodejs\*" -DestinationPath ".\LambdaWithLayer\nodejs_layer.zip" -Force


3. AWS Configuration

DynamoDB: Create a table named CoffeeShop with coffeeId (String) as the Partition Key.

Lambda: Create 4 functions. Upload the respective .zip files generated above.

IAM Roles: Ensure Lambda execution roles have AmazonDynamoDBFullAccess (or specific CRUD permissions).

API Gateway: Create a REST API. Create Resources (/coffee) and Methods (GET, POST, PUT, DELETE). Enable CORS.

Cognito: Create a User Pool and App Client. Update the authConfig in the frontend code with your ClientId and Authority URL.

🔌 API Endpoints

Method

Endpoint

Description

Auth Required

GET

/coffee

Fetch all coffee items

Yes

GET

/coffee/{id}

Fetch a single item details

Yes

POST

/coffee

Add a new coffee item

Yes

PUT

/coffee

Update an existing item

Yes

DELETE

/coffee/{id}

Remove an item

Yes

🤝 Contributing

Feel free to fork this repository and submit pull requests.

📜 License

This project is open-source and available under the MIT License.
