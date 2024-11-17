# Job Trackr

## Description

Job Trackr is a comprehensive web application designed to assist users in managing and tracking their job application processes. It offers features for adding, editing, and viewing job applications and interviews, ensuring users can efficiently organize their job search activities.

## Features

-   **User Authentication**: Secure registration and login functionality.
-   **Job Application Management**: Track details such as company, position, salary, and more.
-   **Interview Scheduling**: Organize and track interviews associated with job applications.
-   **Responsive Design**: Ensures a seamless user experience across devices.

## Installation

### Prerequisites

-   **Node.js**: Ensure you have Node.js installed.
-   **Yarn**: This project uses Yarn as the package manager.

### Steps

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/yourusername/job-trackr.git
    cd job-trackr
    ```

2. **Install Dependencies**:

    ```bash
    yarn install
    ```

3. **Environment Variables**:

    - Create a `.env` file in the `app/api` directory with the necessary environment variables for database connection and JWT secret.

4. **Start the Development Server**:
    ```bash
    yarn dev
    ```

## Usage

-   **Frontend**: Access the application at `http://localhost:5173`.
-   **Backend API**: Available at `http://localhost:3000/api`.

## Project Structure

-   **Frontend**: Located in `app/fe`, built with React and Vite.
-   **Backend**: Located in `app/api`, built with NestJS.
-   **Database**: Utilizes PostgreSQL, configured via Docker.

## Scripts

-   `yarn dev`: Starts both the frontend and backend in development mode.
-   `yarn build`: Builds both the frontend and backend for production.
-   `yarn test`: Runs tests for both the frontend and backend.
-   `yarn lint`: Lints the codebase for both the frontend and backend.
-   `yarn type-check`: Checks TypeScript types for both the frontend and backend.

## License

This project is licensed under the GNU Affero General Public License (AGPL). For commercial licensing options, please contact the project maintainers.

## Contact

For any inquiries, please contact the project maintainers at fseitun@gmail.com
