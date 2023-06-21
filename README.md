# Project Documentation: Document Management System

This documentation provides instructions on how to run and use the Document Management System project. The Document Management System allows users to upload documents, define document properties, store them in Firebase Firestore, and utilize Redis caching for improved performance. The frontend is built using **Next.js**, **Typescript**, **React-Query** and **Tailwind CSS** is used for styling. Backend is built with **NodeJs**, **ExpressJs**, **Firestore** and **Redis**.

Demo Video Loom: https://www.loom.com/share/716ca812cd37440089308a778ddc0f25?sid=3a672351-17d4-4392-816a-2240afba6f26
Demo Video:

https://github.com/hritikb27/Search_Documents/assets/86529959/b58afbd0-5cda-482d-88c6-179f1354ebfb



## Table of Contents

1.  Prerequisites
2.  Installation
3.  Configuration
4.  Running the Application
5.  Usage
6.  Additional Notes

## 1. Prerequisites

Before running the Document Management System, ensure that you have the following prerequisites installed:

-   Node.js (v14 or higher)
-   npm (Node Package Manager)
-   Firebase account with Firestore enabled
-   Redis server (running locally)

## 2. Installation

To install and set up the Document Management System, follow these steps:

1.  Clone the project repository from GitHub.
2.  Open a terminal and navigate to the project directory.
3.  Navigate to frontend directory and run the command `npm install` to install the frontend dependencies.
4.  Navigate to backend directory and run the command `npm install` to install the backend dependencies.

## 3. Configuration

Before running the application, you need to configure the Firebase and Redis connections. Follow these steps to configure the necessary settings:

### Firebase Configuration

1.  Create a Firebase project and enable Firestore.
2.  Download the Firebase service account key file. (Read this for more info: [https://cloud.google.com/iam/docs/keys-create-delete](https://cloud.google.com/iam/docs/keys-create-delete))
3.  Rename the file to `serviceAccountKey.json` and move the file to the project's root directory.

### Redis Configuration

If you are using a Redis server running locally with default configuration, no additional configuration is needed. The application will automatically connect to the Redis server using default environment variables.

## 4. Running the Application

To start the Document Management System application, follow these steps:

1.  Open a terminal and navigate to the frontend directory.
2.  Run the command `npm run dev` to start the frontend development server.
3.  Open a terminal and navigate to the backend directory.
4. Run the command `node index.js` to start the frontend development server.

## 5. Usage

Once the application is running, follow these steps to use the Document Management System:

1.  Access the application through the provided frontend URL in your web browser.
2.  On the homepage, you will find an upload button which will open up a form to upload a document when clicked.
3.  Enter the document name and content in the respective fields.
4.  You can add additional properties to the document by clicking on the "+" button and providing the desired field name and value.
5.  Click the "Upload" button to upload the document to Firebase Firestore.
6.  Upon successful upload, the document will be stored in the database, and the Redis cache will be updated.
7.  To view the uploaded documents, you can search with the keywords included either in the document name or content.
8. The document name along with upto 600 characters of the content will be displayed with the queried text highlighted in the document.

## 6. Additional Notes

-   Make sure to secure your Firebase service account key (`serviceAccountKey.json`) and Redis server configurations appropriately.
-   If you encounter any issues or errors during the installation or usage of the application, refer to the project's issue tracker or seek assistance from the project maintainer.

Congratulations! You have successfully installed and set up the Document Management System. Enjoy managing and accessing your documents with ease!
