# Odoo-hackathon 

# Garbage Management Application

## Overview

This application is designed to tackle public litter by providing an efficient garbage management system. It allows residents to report litter hotspots, assigns tasks to garbage collectors, schedules regular garbage collections, and manages special pickup requests.

## Features

1. **User Authentication and Authorization**
   - Secure login system for different user roles: residents, garbage collectors, and administrators.
   - Role-based access control ensuring appropriate access to features.

2. **Reporting System**
   - Users can report litter hotspots by uploading photos and descriptions.
   - Geotagging feature to pinpoint exact locations on a map.

3. **Task Assignment and Management**
   - Admins can assign reported litter cases to nearby garbage collectors.
   - Track the progress of cleanup tasks in real-time.
   - Notification system to inform collectors of new assignments.

4. **Garbage Collection Scheduling**
   - Residents can view schedules for regular garbage collection.
   - Option for residents to request special pickups for bulky items or hazardous waste.

## Technologies Used

- **Node.js** JavaScript runtime for server-side programming.
- **Express.js**: Web framework for Node.js.
- **TypeScript**: Superset of JavaScript with static typing.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **Multer**: Middleware for handling `multipart/form-data`, primarily used for uploading files.

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/garbage-management-app.git
   cd garbage-management-app

2. Install dependencies:
   ```bash
   npm install
3. Start the MongoDB server:
 ```bash
mongod
4.  Compile TypeScript:
```bash
npm run build
5. Start the application:
```bash
npm start

   
