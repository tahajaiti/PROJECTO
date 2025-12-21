# Tasks App

A full-stack task management application built with Spring Boot and React. This application allows users to create projects and manage tasks within those projects.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Architecture Overview](#architecture-overview)
- [Prerequisites](#prerequisites)
- [Environment Configuration](#environment-configuration)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
  - [Using Docker Compose (Recommended)](#using-docker-compose-recommended)
  - [Running Backend Manually](#running-backend-manually)
  - [Running Frontend Manually](#running-frontend-manually)
- [API Documentation](#api-documentation)

---

## Overview

Tasks App is a project and task management system that enables users to:

- Login and authenticate securely using JWT tokens
- Create and manage multiple projects
- Create, update, and track tasks within projects
- Mark tasks as complete with due date tracking

The application follows a clean architecture pattern with a RESTful API backend and a modern React frontend.

---

## Tech Stack

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Java | 21 | Programming language |
| Spring Boot | 4.0.0 | Application framework |
| Spring Security | - | Authentication and authorization |
| Spring Data JPA | - | Database abstraction layer |
| PostgreSQL | 17 | Production database |
| H2 Database | - | Testing database |
| Hibernate | - | ORM framework |
| MapStruct | 1.6.3 | Object mapping |
| Lombok | - | Boilerplate reduction |
| JJWT | 0.13.0 | JWT token handling |
| SpringDoc OpenAPI | 2.8.14 | API documentation |
| Maven | - | Build tool and dependency management |

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | UI library |
| TypeScript | 5.9.3 | Type-safe JavaScript |
| Vite | 7.2.4 | Build tool and dev server |
| Tailwind CSS | 4.1.18 | Utility-first CSS framework |
| React Router DOM | 7.10.1 | Client-side routing |
| TanStack React Query | 5.90.12 | Server state management |
| Zustand | 5.0.9 | Client state management |
| Axios | 1.13.2 | HTTP client |
| React Hook Form | 7.68.0 | Form handling |
| Zod | 4.1.13 | Schema validation |
| date-fns | 4.1.0 | Date utilities |
| React Icons | 5.5.0 | Icon library |

### DevOps and Infrastructure

| Technology | Purpose |
|------------|---------|
| Docker | Containerization |
| Docker Compose | Multi-container orchestration |
| Nginx | Frontend static file serving and reverse proxy |

---

## Project Structure

```
TASKS-APP/
├── .env.example              # Environment variables template
├── .env                      # Local environment variables (git-ignored)
├── docker-compose.yml        # Docker orchestration configuration
├── backend/                  # Spring Boot application
│   ├── Dockerfile
│   ├── pom.xml               # Maven configuration
│   ├── mvnw                  # Maven wrapper (Unix)
│   ├── mvnw.cmd              # Maven wrapper (Windows)
│   └── src/
│       ├── main/
│       │   ├── java/com/kyojin/tasks/
│       │   │   ├── TasksApplication.java    # Application entry point
│       │   │   ├── controller/              # REST API controllers
│       │   │   │   ├── AuthController.java
│       │   │   │   ├── ProjectController.java
│       │   │   │   └── TaskController.java
│       │   │   ├── entity/                  # JPA entities
│       │   │   │   ├── BaseEntity.java
│       │   │   │   ├── User.java
│       │   │   │   ├── Project.java
│       │   │   │   └── Task.java
│       │   │   ├── repository/              # Data access layer
│       │   │   ├── service/                 # Business logic
│       │   │   │   ├── AuthService.java
│       │   │   │   ├── ProjectService.java
│       │   │   │   ├── TaskService.java
│       │   │   │   └── impl/                # Service implementations
│       │   │   ├── dto/                     # Data transfer objects
│       │   │   │   ├── request/             # Request DTOs
│       │   │   │   ├── response/            # Response DTOs
│       │   │   │   └── filter/              # Filter DTOs
│       │   │   ├── mapper/                  # MapStruct mappers
│       │   │   ├── security/                # Security configuration
│       │   │   │   ├── SecurityConfig.java
│       │   │   │   ├── JwtAuthenticationFilter.java
│       │   │   │   ├── JwtUtil.java
│       │   │   │   ├── UserPrincipal.java
│       │   │   │   └── parser/              # JWT parsers
│       │   │   └── core/                    # Core utilities
│       │   │       ├── GlobalExceptionHandler.java
│       │   │       ├── ErrorResponse.java
│       │   │       ├── exception/           # Custom exceptions
│       │   │       ├── annotation/          # Custom annotations
│       │   │       └── seeder/              # Data seeders
│       │   └── resources/
│       │       ├── application.yaml         # Base configuration
│       │       ├── application-dev.yml      # Development profile
│       │       └── application-test.yml     # Test profile
│       └── test/                            # Unit and integration tests
└── frontend/                 # React application
    ├── Dockerfile
    ├── package.json          # NPM configuration
    ├── vite.config.ts        # Vite configuration
    ├── nginx.conf            # Nginx configuration for production
    ├── tsconfig.json         # TypeScript configuration
    ├── index.html            # HTML entry point
    └── src/
        ├── main.tsx          # React entry point
        ├── App.tsx           # Root component
        ├── index.css         # Global styles
        ├── api/              # API layer
        │   ├── client.ts     # Axios configuration
        │   └── services/     # API service functions
        │       ├── auth.service.ts
        │       ├── project.service.ts
        │       └── task.service.ts
        ├── components/       # Reusable UI components
        │   ├── core/         # Core components
        │   ├── project/      # Project-related components
        │   └── task/         # Task-related components
        ├── pages/            # Page components
        │   ├── HomePage.tsx
        │   ├── LoginPage.tsx
        │   ├── ProjectPage.tsx
        │   └── NotFoundPage.tsx
        ├── layouts/          # Layout components
        │   ├── RootLayout.tsx
        │   ├── AppLayout.tsx
        │   └── AuthLayout.tsx
        ├── router/           # React Router configuration
        │   ├── index.tsx
        │   └── ProtectedRoute.tsx
        ├── hooks/            # Custom React hooks
        │   ├── useAuth.ts
        │   ├── useProject.ts
        │   ├── useTask.ts
        │   ├── useTaskParams.ts
        │   └── useDebounce.ts
        ├── stores/           # Zustand state stores
        │   ├── authStore.ts
        │   └── confirmStore.ts
        ├── types/            # TypeScript type definitions
        │   ├── api.types.ts
        │   ├── project.types.ts
        │   ├── task.types.ts
        │   └── user.types.ts
        ├── config/           # Application configuration
        └── util/             # Utility functions
```

---

## Architecture Overview

### Backend Architecture

The backend follows a layered architecture pattern:

1. **Controller Layer**: Handles HTTP requests and responses. Controllers are responsible for request validation, calling appropriate services, and returning DTOs.

2. **Service Layer**: Contains business logic. Services are defined as interfaces with implementations, allowing for easy testing and future modifications.

3. **Repository Layer**: Data access layer using Spring Data JPA. Repositories provide CRUD operations and custom queries for entities.

4. **Entity Layer**: JPA entities representing database tables. All entities extend `BaseEntity` which provides common fields like ID and timestamps.

5. **DTO Layer**: Data Transfer Objects for API communication, separated into request and response DTOs.

6. **Security Layer**: JWT-based authentication with Spring Security. The `JwtAuthenticationFilter` intercepts requests and validates tokens.

### Frontend Architecture

The frontend uses a modern React architecture:

1. **Pages**: Top-level route components representing full pages.

2. **Layouts**: Wrapper components providing consistent structure (headers, sidebars, etc.).

3. **Components**: Reusable UI components organized by domain (core, project, task).

4. **Hooks**: Custom hooks encapsulating business logic and data fetching with React Query.

5. **Stores**: Zustand stores for client-side state management (authentication, UI state).

6. **API Layer**: Axios-based API client with interceptors for authentication and error handling.

### Data Flow

```
User Action -> React Component -> Custom Hook -> React Query -> API Service -> Axios -> Backend API
                                                                                           |
                                                                              Controller -> Service -> Repository -> Database
```

### Entity Relationships

```
User (1) -----> (*) Project (1) -----> (*) Task
```

- A **User** can have multiple **Projects**
- A **Project** belongs to one **User** and can have multiple **Tasks**
- A **Task** belongs to one **Project**

---

## Prerequisites

Before running the application, ensure you have the following installed:

- **Docker** (version 20.10 or higher)
- **Docker Compose** (version 2.0 or higher)

For manual setup (without Docker):

- **Java 21** (Eclipse Temurin or OpenJDK recommended)
- **Maven 3.9+** (or use the included Maven wrapper)
- **Node.js 24+** and **npm**
- **PostgreSQL 17** (or compatible version)

---

## Environment Configuration

The application uses environment variables for configuration. A template file `.env.example` is provided at the project root.

### Setting Up Environment Variables

1. Copy the example file to create your local configuration:

   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file to customize your settings

### Important Notes on Environment Variables

- **JWT_SECRET_KEY**: For production, generate a secure 256-bit key. You can use:
  ```bash
  openssl rand -hex 32
  ```

- **POSTGRES_HOST**: When using Docker Compose, use the service name `postgres`. For local development, use `localhost`.

- **SPRING_JPA_HIBERNATE_DDL_AUTO**: 
  - Use `update` for development (auto-updates schema)
  - Use `validate` for production (validates schema without modifications)

---

## Database Setup

### Using Docker Compose (Recommended)

The database is automatically configured when using Docker Compose. The PostgreSQL container:

- Uses the official `postgres:17-alpine` image
- Persists data in a Docker volume (`postgres_data`)
- Exposes port 5432 (configurable via `POSTGRES_PORT`)
- Includes health checks for dependency management

### Manual Database Setup

If running without Docker:

1. Install PostgreSQL 17 on your system

2. Create the database:

   ```sql
   CREATE DATABASE tasks_db;
   ```

3. Update your `.env` file:

   ```bash
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   POSTGRES_DB=tasks_db
   POSTGRES_USER=your_user
   POSTGRES_PASSWORD=your_password
   ```

### Schema Management

The application uses Hibernate for schema management:

- On first run with `ddl-auto=update`, Hibernate creates all necessary tables
- Subsequent runs will update the schema to match entity definitions
- For production, consider using Flyway or Liquibase for version-controlled migrations

---

## Running the Application

### Using Docker Compose (Recommended)

This is the simplest way to run the entire application stack:

1. Ensure Docker and Docker Compose are installed and running

2. Clone the repository and navigate to the project root:

   ```bash
   cd TASKS-APP
   ```

3. Create your environment file:

   ```bash
   cp .env.example .env
   ```

4. Build and start all services:

   ```bash
   docker-compose up --build
   ```

   Or run in detached mode:

   ```bash
   docker-compose up --build -d
   ```

5. Access the application:
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:8080/api
   - **API Documentation**: http://localhost:8080/swagger-ui.html

6. To stop the application:

   ```bash
   docker-compose down
   ```

   To also remove the database volume:

   ```bash
   docker-compose down -v
   ```

### Running Backend Manually

1. Ensure PostgreSQL is running and configured

2. Navigate to the backend directory:

   ```bash
   cd backend
   ```

3. Set environment variables or create an `.env` file in the root directory

4. Build the application:

   ```bash
   ./mvnw clean package -DskipTests
   ```

   On Windows:
   
   ```bash
   mvnw.cmd clean package -DskipTests
   ```

5. Run the application:

   ```bash
   ./mvnw spring-boot:run
   ```

   Or run the JAR directly:

   ```bash
   java -jar target/tasks-0.0.1-SNAPSHOT.jar
   ```

6. The backend will be available at http://localhost:8080

### Running Frontend Manually

1. Ensure the backend is running

2. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. For development with hot-reloading:

   ```bash
   npm run dev
   ```

   The development server will start at http://localhost:5173
---

## API Documentation

The API is documented using OpenAPI (Swagger). When the backend is running, access the documentation at:

- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **OpenAPI JSON**: http://localhost:8080/v3/api-docs

### Main API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Authenticate and receive JWT token |
| GET | `/api/projects` | Get all projects for authenticated user |
| POST | `/api/projects` | Create a new project |
| GET | `/api/projects/{id}` | Get project by ID |
| PUT | `/api/projects/{id}` | Update a project |
| DELETE | `/api/projects/{id}` | Delete a project |
| GET | `/api/projects/{projectId}/tasks` | Get all tasks in a project |
| POST | `/api/projects/{projectId}/tasks` | Create a new task |
| GET | `/api/tasks/{id}` | Get task by ID |
| PUT | `/api/tasks/{id}` | Update a task |
| DELETE | `/api/tasks/{id}` | Delete a task |

---