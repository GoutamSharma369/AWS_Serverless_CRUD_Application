# ☕ Serverless Coffee Shop Application

A full-stack serverless web application designed to manage a coffee shop menu[cite: 1, 2]. [cite_start]This project demonstrates a cloud-native architecture using **AWS Services** to handle frontend hosting, authentication, API management, and database operations[cite: 3].

![Project Architecture](path/to/your/image.png)
*(Replace the path above with your actual image path)* [cite: 4]

## 🚀 Project Overview

This application allows users to view, add, update, and delete coffee items from a menu[cite: 6]. [cite_start]It leverages a **Serverless** architecture to ensure scalability and cost-efficiency[cite: 7].

* **Frontend**: A React application (Vite) that provides a responsive user interface[cite: 8].
* **Backend**: AWS Lambda functions serving as microservices for CRUD operations[cite: 9].
* **Database**: Amazon DynamoDB for NoSQL data storage[cite: 10].
* **Auth**: AWS Cognito for secure user authentication[cite: 11].

## 🏗️ Architecture & Workflow

[cite_start]The application follows a standard serverless flow as illustrated in the architecture diagram[cite: 13]:

1.  [cite_start]**User Access**: Users visit the website URL served by **Amazon CloudFront** (CDN) for low latency[cite: 14].
2.  [cite_start]**Static Hosting**: CloudFront fetches the React build files (HTML, CSS, JS) from a private **Amazon S3 Bucket**[cite: 15].
3.  [cite_start]**Authentication**: Users log in using **AWS Cognito**[cite: 16]. [cite_start]Upon successful login, the frontend receives a JWT (JSON Web Token)[cite: 17].
4.  [cite_start]**API Requests**: The React app sends HTTP requests (GET, POST, PUT, DELETE) to **Amazon API Gateway**[cite: 18]. [cite_start]These requests include the JWT for authorization[cite: 19].
5.  [cite_start]**Business Logic**: API Gateway routes the request to the specific **AWS Lambda** function responsible for that action (e.g., `/create` triggers the create Lambda)[cite: 20].
6.  [cite_start]**Data Persistence**: The Lambda function performs the necessary operation on the **Amazon DynamoDB** table[cite: 21].

## 🛠️ Tech Stack

* [cite_start]**Frontend**: React.js, Vite, React Router, Axios [cite: 23]
* [cite_start]**Cloud Provider**: Amazon Web Services (AWS) [cite: 24]
* [cite_start]**Infrastructure**: [cite: 25]
    * [cite_start]**S3 & CloudFront**: Frontend hosting [cite: 26]
    * [cite_start]**Cognito**: User Identity & Access Management [cite: 27]
    * [cite_start]**API Gateway**: REST API endpoint management [cite: 28]
    * [cite_start]**Lambda**: Serverless compute (Node.js) [cite: 29]
    * [cite_start]**DynamoDB**: NoSQL Database [cite: 30]

## 📂 Project Structure

```text
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

## ⚙️ Setup & Deployment

> **Note:** Ensure you have the AWS CLI configured and Node.js installed on your machine before proceeding.

### 1. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd Frontend
npm install
npm run dev

### 2. Backend Deployment (Lambda)

The backend is split into individual microservices. We use a PowerShell script to bundle these functions into `.zip` files for upload to the AWS Console.

**Zipping Script (`deploy.ps1`):**

```powershell
# Run this from the root directory
Compress-Archive -Path ".\LambdaWithLayer\LambdaFunctionWithLayer\get\*" -DestinationPath ".\LambdaWithLayer\get.zip" -Force
Compress-Archive -Path ".\LambdaWithLayer\LambdaFunctionWithLayer\post\*" -DestinationPath ".\LambdaWithLayer\post.zip" -Force
Compress-Archive -Path ".\LambdaWithLayer\LambdaFunctionWithLayer\update\*" -DestinationPath ".\LambdaWithLayer\update.zip" -Force
Compress-Archive -Path ".\LambdaWithLayer\LambdaFunctionWithLayer\delete\*" -DestinationPath ".\LambdaWithLayer\delete.zip" -Force
Compress-Archive -Path ".\LambdaWithLayer\nodejs\*" -DestinationPath ".\LambdaWithLayer\nodejs_layer.zip" -Force

### 3. AWS Configuration

* **DynamoDB**: Create a table named `CoffeeShop` with `coffeeId` (String) as the Partition Key.
* **Lambda**: Create 4 functions. Upload the respective `.zip` files generated above.
* **IAM Roles**: Ensure Lambda execution roles have `AmazonDynamoDBFullAccess` (or specific CRUD permissions).
* **API Gateway**: Create a REST API. Create Resources (`/coffee`) and Methods (`GET`, `POST`, `PUT`, `DELETE`). Enable CORS.
* **Cognito**: Create a User Pool and App Client. Update the `authConfig` in the frontend code with your ClientId and Authority URL.

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| GET | `/coffee` | Fetch all coffee items | Yes |
| GET | `/coffee/{id}` | Fetch a single item details | Yes |
| POST | `/coffee` | Add a new coffee item | Yes |
| PUT | `/coffee` | Update an existing item | Yes |
| DELETE | `/coffee/{id}` | Remove an item | Yes |

## 🗺️ Future Roadmap

- [x] Implement Basic CRUD Operations
- [x] Integrate Cognito Authentication
- [ ] Add Image Upload to S3 for Coffee Items
- [ ] Implement Order Processing System
- [ ] Add Unit Tests for Lambda Functions

## 🤝 Contributing

Feel free to fork this repository and submit pull requests.
