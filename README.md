
# Learning Management System (LMS) Backend

This project is a Learning Management System (LMS) backend developed using NestJS, MongoDB, and TypeScript. It is designed to manage user authentication, profiles, NEET prediction, psychometric assessments, and resources like blogs and FAQs. The application follows best practices in security, performance optimization, and real-time updates, making it a robust solution for educational consultancy platforms.

## Modules

### 1. Authentication (auth)
- **Description**: Manages user authentication using JWT.
- **Controllers**: AuthController
- **Services**: AuthService
- **Entities**: User

#### AuthController
- **Endpoints**:
  - `POST /auth/signup`: Register a new user.
  - `POST /auth/login`: Authenticate a user and issue a JWT.
  - `POST /auth/forgot-password`: Initiate password recovery.
  - `POST /auth/reset-password`: Reset the user's password.

#### AuthService
- **Methods**:
  - `signup()`: Registers a new user.
  - `login()`: Authenticates the user and returns a JWT.
  - `validateUser()`: Validates user credentials.
  - `forgotPassword()`: Initiates password recovery.
  - `resetPassword()`: Resets the user's password.

### 2. Users (users)
- **Description**: Manages user data.
- **Controllers**: UsersController
- **Services**: UsersService
- **Entities**: User

#### UsersController
- **Endpoints**:
  - `GET /users/profile`: Get the profile of the logged-in user.
  - `PUT /users/profile`: Update the profile of the logged-in user.

#### UsersService
- **Methods**:
  - `getUserProfile()`: Retrieves the user's profile.
  - `updateUserProfile()`: Updates the user's profile.

### 3. NEET Predictor Tool (neet-predictor)
- **Description**: Provides functionality for the NEET predictor tool.
- **Controllers**: NeetPredictorController
- **Services**: NeetPredictorService

#### NeetPredictorController
- **Endpoints**:
  - `POST /neet-predictor/predict`: Predict NEET rank and admission possibilities.

#### NeetPredictorService
- **Methods**:
  - `predict()`: Processes NEET scores and other inputs to predict ranks and admission possibilities.

### 4. Psychometric Assessment (psychometric-assessment)
- **Description**: Manages psychometric assessments.
- **Controllers**: PsychometricAssessmentController
- **Services**: PsychometricAssessmentService

#### PsychometricAssessmentController
- **Endpoints**:
  - `POST /psychometric-assessment/take`: Submit answers for the psychometric assessment.
  - `GET /psychometric-assessment/results`: Retrieve assessment results.

#### PsychometricAssessmentService
- **Methods**:
  - `takeAssessment()`: Handles the submission of assessment answers.
  - `getResults()`: Retrieves the assessment results.

### 5. Resources (resources)
- **Description**: Manages blog posts, FAQs, and guides.
- **Controllers**: BlogController, FaqController
- **Services**: BlogService, FaqService

#### BlogController
- **Endpoints**:
  - `GET /blog`: Retrieve blog posts.
  - `GET /blog/:id`: Retrieve a specific blog post.

#### FaqController
- **Endpoints**:
  - `GET /faq`: Retrieve FAQs.

#### BlogService
- **Methods**:
  - `getAllPosts()`: Retrieves all blog posts.
  - `getPostById()`: Retrieves a specific blog post by ID.

#### FaqService
- **Methods**:
  - `getAllFaqs()`: Retrieves all FAQs.
