# Task Management API

## Overview

This is a Task Management API that allows users to register, log in, and manage their tasks. Features include task creation, retrieval, updating, deletion, search, filtering, and pagination.

## Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd task-management-api
```

### 2. Install Dependencies
Make sure you have Yarn installed. If not, install Yarn from https://classic.yarnpkg.com/en/docs/install.
Then, install the project dependencies:
```bash
yarn install
```

### 3. Run Prisma studio (optional)
```bash
yarn db:view
```

### 4. Start the Application
```bash
yarn start
```
The server will run on port 8080. You can change the port by setting the PORT environment variable in the .env file.

## Running Tests
To run the tests, use the following command:
```bash
yarn test
```