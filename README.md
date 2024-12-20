Vaccination Track is a web application designed to help users monitor and manage their vaccination records efficiently. It provides a user-friendly interface for tracking vaccination statuses, scheduling upcoming vaccinations, and accessing relevant information about various vaccines.

## Features

- **User Authentication**: Secure login and registration system to protect user data.
- **Dashboard**: Overview of user's vaccination status and upcoming appointments.
- **Vaccine Database**: Comprehensive information on different vaccines, including recommended schedules.
- **Appointment Scheduling**: Set and manage vaccination appointments with reminders.
- **Record Management**: Add, edit, or delete vaccination records as needed.

## Technologies Used

- **Frontend**: Vite, ReactJS, HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js (server.js)
- **Database**: MongoDB , Redis
- **APIs**: Integration with external APIs for vaccine information

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/avanshh99/vaccination_track.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd vaccination_track
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Run the development server**:
   ```bash
   npm run dev
   ```
5. **Access the application**:
   Open your browser and navigate to the URL displayed in the terminal (e.g., `http://localhost:5173`).

#Backend Setup

1. **Navigate to the project directory**:
   ```bash
   cd vaccination_track
   ```
2. **Set up the backend**:
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Install backend dependencies:
     ```bash
     npm install
     ```
   - Start the server:
     ```bash
     node server.js
     ```
   - Ensure MongoDB is running and update the database connection string in `server.js` if necessary.

## Usage

- **Register**: Create a new account to start tracking your vaccinations.
- **Login**: Access your dashboard using your credentials.
- **Add Records**: Input your past vaccinations into the system.
- **Schedule Appointments**: Set up reminders for upcoming vaccinations.
- **View Vaccine Information**: Learn about different vaccines and their schedules.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure that your code adheres to the project's coding standards and includes appropriate tests.
