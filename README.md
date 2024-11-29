
# Fluxus

## Description
**Fluxus** is an IoT solution designed to reduce traffic congestion at intersections by analyzing environmental data such as noise and air quality. Using **MQ-135 air quality sensors** and **FC-04 sound sensors**, the system provides insights into street activity levels. Unlike costly camera-based systems, this approach is more affordable and easier to implement, making it an accessible traffic management tool.

Data is collected via an ESP32, processed with **Express.js** and **TypeScript**, stored in a **MySQL database**, and visualized on a website using **Chart.js**.

## Features
- Affordable alternative to camera-based traffic monitoring systems.
- Real-time data collection and analysis.
- Backend with Express.js and TypeScript for efficient data handling.
- MySQL database integration for reliable storage.
- Visualized traffic insights using Chart.js.

## Setup and Usage

### Prerequisites
- Node.js installed
- MySQL database configured
- ESP32 microcontroller with MQ-135 and FC-04 sensors

### Steps
1. **Clone the Repository**:  
   ```bash
   git clone https://github.com/CsVazquezz/Project_IOT_S.git
   ```
2. **Navigate to the Project Folder**:  
   ```bash
   cd Your_Project_path
   ```
3. **Install Dependencies**:  
   ```bash
   npm install
   ```
4. **Set Environment Variables**:
   - Create `.env.development` for local configuration:
     ```
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=yourpassword
     DB_NAME=yourdatabase
     ```
   - Create `.env.production` for the deployed environment:
     ```
     DB_HOST=productionhost
     DB_USER=productionuser
     DB_PASSWORD=productionpassword
     DB_NAME=productiondatabase
     ```
5. **Run the Application**:
   - For local testing:
     ```bash
     npm run dev
     ```
   - For production:
     ```bash
     npm start
     ```
6. **Access the Website**: Open the frontend URL in your browser to monitor traffic insights.

## Technologies Used
- **Backend**: Express.js, TypeScript
- **Database**: MySQL
- **Frontend**: HTML, JavaScript, Chart.js
- **Hardware**: ESP32, MQ-135 sensors, FC-04 sensors

## Contributions
Contributions are welcome! Please open issues or submit pull requests to enhance the project.

## License
This project is licensed under the [MIT License](LICENSE).
