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
-   **Docker**: Required for running the PostgreSQL database.

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

    - Copy the `.env.example` file to `.env`:
        ```bash
        cp .env.example .env
        ```
    - Update the following variables in your `.env` file:
        - `JWT_SECRET`: Change this to a secure random string
        - `JWT_EXPIRES_IN`: Token expiration time in seconds (default: 3600)
        - `DATABASE_PASSWORD`: Your PostgreSQL password
        - Other variables can be left as default for local development

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

## Environment Variables

The application uses the following environment variables:

### JWT Configuration

-   `JWT_SECRET`: Secret key for JWT token generation (required)
-   `JWT_EXPIRES_IN`: Token expiration time in seconds (default: 3600)

### Database Configuration

-   `DATABASE_HOST`: PostgreSQL host (default: localhost)
-   `DATABASE_PORT`: PostgreSQL port (default: 5433)
-   `DATABASE_USER`: PostgreSQL username (default: postgres)
-   `DATABASE_PASSWORD`: PostgreSQL password (required)
-   `DATABASE_NAME`: PostgreSQL database name (default: job_trackr)

### API Configuration

-   `API_PORT`: Port for the backend API (default: 3000)
-   `CORS_ORIGIN`: Frontend URL for CORS configuration (default: http://localhost:5173)

## License

This project is licensed under the GNU Affero General Public License (AGPL). For commercial licensing options, please contact the project maintainers.

## Contact

For any inquiries, please contact the project maintainers at fseitun@gmail.com
