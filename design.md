# Medimind - Design Specification

## 1. System Architecture

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Layer                             │
├──────────────────────┬──────────────────────────────────────┤
│  Patient Frontend    │    Admin Panel                       │
│  (React + Vite)      │    (React + Vite)                    │
│  Port: 5173          │    Port: 5174                        │
└──────────────────────┴──────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   API Gateway Layer                          │
│                   (Express.js)                               │
│                   Port: 4000                                 │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│   MongoDB    │   │  Cloudinary  │   │   Razorpay   │
│   Database   │   │    Media     │   │   Payment    │
└──────────────┘   └──────────────┘   └──────────────┘
```

### 1.2 Technology Stack

#### Frontend (Patient Portal)
- **Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.8
- **State Management**: Redux Toolkit 2.7.0
- **Routing**: React Router DOM 6.26.2
- **Styling**: Tailwind CSS 3.4.13
- **Animations**: Framer Motion 12.7.4, GSAP 3.12.7
- **Charts**: Chart.js 4.4.9, Recharts 2.15.3
- **Forms**: React Hook Form 7.55.0
- **Validation**: Zod 3.24.3
- **HTTP Client**: Axios 1.7.7
- **Internationalization**: i18next 25.0.1
- **Notifications**: React Toastify 10.0.5, Notistack 3.0.2
- **Icons**: Lucide React 0.488.0, React Icons 5.5.0
- **PDF Generation**: html2pdf.js 0.10.3
- **Date Handling**: date-fns 4.1.0

#### Frontend (Admin Panel)
- **Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.8
- **State Management**: Redux Toolkit 2.7.0
- **Routing**: React Router DOM 6.27.0
- **Styling**: Tailwind CSS 3.4.13
- **Animations**: Framer Motion 12.7.4, GSAP 3.12.7
- **Forms**: React Hook Form 7.55.0
- **Validation**: Zod 3.24.3
- **HTTP Client**: Axios 1.7.7
- **Notifications**: React Toastify 10.0.6, Notistack 3.0.2
- **Icons**: Lucide React 0.488.0, React Icons 5.5.0
- **Date Handling**: date-fns 4.1.0

#### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 4.21.1
- **Database**: MongoDB with Mongoose 8.7.1
- **Authentication**: JWT (jsonwebtoken 9.0.2), bcrypt 5.1.1
- **File Upload**: Multer 1.4.5-lts.1
- **Cloud Storage**: Cloudinary 2.5.1
- **Payment**: Razorpay 2.9.5
- **AI Integration**: Google Generative AI 0.24.1
- **Security**: Helmet 8.1.0, CORS 2.8.5
- **Logging**: Winston 3.17.0, Morgan 1.10.0
- **Validation**: Validator 13.12.0
- **HTTP Client**: Axios 1.8.4
- **OAuth**: Google Auth Library 9.15.1

## 2. Application Architecture

### 2.1 Frontend Architecture Pattern

**Component-Based Architecture with Redux**

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── Footer.jsx
│   └── ...
├── pages/              # Page-level components
│   ├── Admin/
│   │   ├── Dashboard.jsx
│   │   ├── AllAppointments.jsx
│   │   ├── AddDoctor.jsx
│   │   └── DoctorsList.jsx
│   ├── Doctor/
│   │   ├── DoctorDashboard.jsx
│   │   ├── DoctorAppointments.jsx
│   │   └── DoctorProfile.jsx
│   └── Login.jsx
├── context/            # React Context providers
│   ├── AdminContext.jsx
│   └── DoctorContext.jsx
├── assets/             # Static assets
├── App.jsx             # Root component
└── main.jsx            # Entry point
```

### 2.2 Backend Architecture Pattern

**MVC (Model-View-Controller) Pattern**

```
backend/
├── config/             # Configuration files
│   ├── mongodb.js
│   └── cloudinary.js
├── models/             # Data models (Mongoose schemas)
│   ├── userModel.js
│   ├── doctorModel.js
│   ├── appointmentModel.js
│   └── ...
├── controllers/        # Business logic
│   ├── adminController.js
│   ├── doctorController.js
│   └── userController.js
├── routes/             # API route definitions
│   ├── adminRoutes.js
│   ├── doctorRoutes.js
│   └── userRoute.js
├── middlewares/        # Custom middleware
│   ├── authMiddleware.js
│   └── uploadMiddleware.js
├── services/           # External service integrations
└── server.js           # Application entry point
```

## 3. Database Design

### 3.1 MongoDB Collections Schema

#### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique, indexed),
  password: String (hashed),
  phone: String,
  dateOfBirth: Date,
  gender: String (enum: ['Male', 'Female', 'Other']),
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  profileImage: String (Cloudinary URL),
  bloodGroup: String,
  medicalHistory: [{
    condition: String,
    diagnosedDate: Date,
    notes: String
  }],
  allergies: [String],
  emergencyContact: {
    name: String,
    phone: String,
    relationship: String
  },
  googleId: String,
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### Doctors Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique, indexed),
  password: String (hashed),
  phone: String,
  specialization: String,
  degree: String,
  experience: Number,
  about: String,
  fees: Number,
  address: {
    line1: String,
    line2: String
  },
  profileImage: String (Cloudinary URL),
  available: Boolean,
  slots_booked: Object,
  hospitalId: ObjectId (ref: 'Hospital'),
  rating: Number,
  reviewCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

#### Appointments Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User', indexed),
  docId: ObjectId (ref: 'Doctor', indexed),
  slotDate: Date (indexed),
  slotTime: String,
  userData: {
    name: String,
    email: String,
    phone: String,
    address: Object
  },
  docData: {
    name: String,
    specialization: String,
    fees: Number,
    profileImage: String
  },
  amount: Number,
  date: Date,
  cancelled: Boolean,
  payment: Boolean,
  isCompleted: Boolean,
  razorpayOrderId: String,
  razorpayPaymentId: String,
  createdAt: Date,
  updatedAt: Date
}
```

#### Prescriptions Collection
```javascript
{
  _id: ObjectId,
  appointmentId: ObjectId (ref: 'Appointment'),
  patientId: ObjectId (ref: 'User', indexed),
  doctorId: ObjectId (ref: 'Doctor', indexed),
  diagnosis: String,
  medications: [{
    name: String,
    dosage: String,
    frequency: String,
    duration: String,
    instructions: String
  }],
  labTests: [String],
  notes: String,
  followUpDate: Date,
  issuedDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

#### Hospitals Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  facilities: [String],
  bloodBankAvailable: Boolean,
  rating: Number,
  reviewCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

#### Donation Requests Collection
```javascript
{
  _id: ObjectId,
  hospitalId: ObjectId (ref: 'Hospital', indexed),
  bloodType: String (enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  quantity: Number,
  urgency: String (enum: ['Low', 'Medium', 'High', 'Critical']),
  status: String (enum: ['Open', 'Matched', 'Scheduled', 'Completed', 'Cancelled']),
  requiredBy: Date,
  matchedDonors: [{
    donorId: ObjectId (ref: 'User'),
    matchedDate: Date,
    status: String
  }],
  scheduledDonations: [{
    donorId: ObjectId (ref: 'User'),
    scheduledDate: Date,
    status: String
  }],
  createdAt: Date,
  updatedAt: Date
}
```

#### Medical Records Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User', indexed),
  recordType: String (enum: ['Lab Report', 'Imaging', 'Prescription', 'Other']),
  title: String,
  description: String,
  fileUrl: String (Cloudinary URL),
  recordDate: Date,
  uploadedBy: String,
  createdAt: Date,
  updatedAt: Date
}
```

#### Medications Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User', indexed),
  name: String,
  dosage: String,
  frequency: String,
  startDate: Date,
  endDate: Date,
  reminderTime: [String],
  isActive: Boolean,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

#### Diet Plans Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User', indexed),
  planName: String,
  startDate: Date,
  endDate: Date,
  meals: [{
    mealType: String (enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack']),
    items: [String],
    calories: Number,
    time: String
  }],
  dailyCalorieTarget: Number,
  restrictions: [String],
  notes: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### Journal Entries Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User', indexed),
  date: Date (indexed),
  mood: String (enum: ['Excellent', 'Good', 'Okay', 'Bad', 'Terrible']),
  symptoms: [String],
  activities: [String],
  notes: String,
  vitalSigns: {
    weight: Number,
    bloodPressure: String,
    heartRate: Number,
    temperature: Number,
    bloodSugar: Number
  },
  createdAt: Date,
  updatedAt: Date
}
```

#### Doctor Reviews Collection
```javascript
{
  _id: ObjectId,
  doctorId: ObjectId (ref: 'Doctor', indexed),
  userId: ObjectId (ref: 'User', indexed),
  appointmentId: ObjectId (ref: 'Appointment'),
  rating: Number (1-5),
  review: String,
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### Hospital Reviews Collection
```javascript
{
  _id: ObjectId,
  hospitalId: ObjectId (ref: 'Hospital', indexed),
  userId: ObjectId (ref: 'User', indexed),
  rating: Number (1-5),
  review: String,
  aspects: {
    cleanliness: Number,
    staff: Number,
    facilities: Number,
    waitTime: Number
  },
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 3.2 Database Indexing Strategy

- **Users**: email (unique), bloodGroup
- **Doctors**: email (unique), specialization, available
- **Appointments**: userId, docId, slotDate, status compound index
- **Prescriptions**: patientId, doctorId, issuedDate
- **Donation Requests**: hospitalId, bloodType, status
- **Medical Records**: userId, recordDate
- **Journal Entries**: userId, date

## 4. API Design

### 4.1 RESTful API Conventions

**Base URL**: `http://localhost:4000/api`

**Authentication**: JWT Bearer Token in Authorization header
```
Authorization: Bearer <token>
```

**Response Format**:
```javascript
// Success Response
{
  success: true,
  data: { ... },
  message: "Operation successful"
}

// Error Response
{
  success: false,
  error: "Error message",
  statusCode: 400
}
```

### 4.2 API Endpoints Structure

#### Admin Endpoints (`/api/admin`)
- `POST /login` - Admin authentication
- `POST /add-doctor` - Add new doctor
- `POST /add-hospital` - Add new hospital
- `GET /doctors` - List all doctors
- `GET /hospitals` - List all hospitals
- `PUT /doctor/:id` - Update doctor
- `DELETE /doctor/:id` - Remove doctor
- `GET /appointments` - View all appointments
- `GET /dashboard` - Admin dashboard statistics
- `GET /analytics` - Platform analytics

#### Doctor Endpoints (`/api/doctor`)
- `POST /login` - Doctor authentication
- `GET /profile` - Get doctor profile
- `PUT /profile` - Update doctor profile
- `GET /appointments` - Doctor's appointments
- `PUT /appointment/:id` - Update appointment status
- `POST /prescription` - Create prescription
- `PUT /prescription/:id` - Update prescription
- `GET /prescriptions` - List prescriptions
- `GET /dashboard` - Doctor dashboard stats

#### User Endpoints (`/api`)
- `POST /register` - User registration
- `POST /login` - User authentication
- `POST /google-auth` - Google OAuth login
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile
- `GET /doctors` - Search doctors
- `GET /doctor/:id` - Get doctor details
- `POST /appointment` - Book appointment
- `GET /appointments` - User's appointments
- `PUT /appointment/:id/cancel` - Cancel appointment
- `GET /prescriptions` - User's prescriptions
- `GET /prescription/:id` - Get prescription details

#### Medical Records (`/api/medical-records`)
- `POST /` - Upload medical record
- `GET /` - Get user's medical records
- `GET /:id` - Get specific record
- `PUT /:id` - Update record
- `DELETE /:id` - Delete record

#### Medications (`/api/medications`)
- `POST /` - Add medication
- `GET /` - Get user's medications
- `PUT /:id` - Update medication
- `DELETE /:id` - Remove medication

#### Diet Plans (`/api/diet`)
- `POST /plans` - Create diet plan
- `GET /plans` - Get user's diet plans
- `PUT /plans/:id` - Update diet plan
- `DELETE /plans/:id` - Delete diet plan

#### Donations (`/api/donations`)
- `POST /requests` - Create donation request
- `GET /requests` - Get donation requests
- `GET /requests/:id` - Get request details
- `POST /match-donors` - Match donors
- `POST /schedule` - Schedule donation
- `GET /scheduled` - Get scheduled donations
- `PUT /scheduled/:id` - Update donation status

#### Journal (`/api/journal`)
- `POST /entries` - Create journal entry
- `GET /entries` - Get user's entries
- `GET /entries/:id` - Get specific entry
- `PUT /entries/:id` - Update entry
- `DELETE /entries/:id` - Delete entry

#### Analysis (`/api/analysis`)
- `POST /health-trends` - Analyze health trends
- `GET /health-score` - Calculate health score
- `POST /ai-insights` - Get AI-powered insights

#### Reviews (`/api/doctor-reviews`, `/api/hospital-reviews`)
- `POST /` - Submit review
- `GET /:entityId` - Get reviews for doctor/hospital
- `PUT /:id` - Update review
- `DELETE /:id` - Delete review

### 4.3 Authentication Flow

```
1. User Registration/Login
   ├─> POST /api/register or /api/login
   ├─> Server validates credentials
   ├─> Password hashed with bcrypt
   ├─> JWT token generated
   └─> Token returned to client

2. Authenticated Requests
   ├─> Client includes token in Authorization header
   ├─> Middleware validates token
   ├─> User data extracted from token
   └─> Request processed

3. Google OAuth Flow
   ├─> POST /api/google-auth with Google token
   ├─> Server verifies with Google Auth Library
   ├─> User created/retrieved from database
   ├─> JWT token generated
   └─> Token returned to client
```

## 5. State Management Design

### 5.1 Redux Store Structure

```javascript
store/
├── slices/
│   ├── authSlice.js        // User authentication state
│   ├── doctorSlice.js      // Doctor data
│   ├── appointmentSlice.js // Appointments
│   ├── prescriptionSlice.js// Prescriptions
│   ├── medicalSlice.js     // Medical records
│   └── uiSlice.js          // UI state (modals, loading)
└── store.js                // Redux store configuration
```

### 5.2 Context API Usage

**AdminContext**: Admin authentication and permissions
```javascript
{
  atoken: String,
  setAtoken: Function,
  backendUrl: String
}
```

**DoctorContext**: Doctor authentication and data
```javascript
{
  dToken: String,
  setDToken: Function,
  backendUrl: String,
  doctorData: Object,
  setDoctorData: Function
}
```

## 6. Security Design

### 6.1 Authentication & Authorization

**JWT Token Structure**:
```javascript
{
  id: userId,
  role: 'user' | 'doctor' | 'admin',
  iat: timestamp,
  exp: timestamp (24 hours)
}
```

**Middleware Chain**:
```
Request → CORS → Helmet → Auth Middleware → Route Handler
```

**Password Security**:
- Bcrypt hashing with salt rounds: 10
- Minimum password length: 8 characters
- Password validation on registration

### 6.2 Data Protection

**Sensitive Data Handling**:
- Passwords never stored in plain text
- JWT secrets in environment variables
- API keys secured in .env files
- Database credentials encrypted

**CORS Configuration**:
```javascript
allowedOrigins: [
  'http://localhost:5173',  // Frontend
  'http://localhost:5174',  // Admin Panel
  'https://medimind-azure.vercel.app',
  'https://medimind-admin.vercel.app'
]
```

**Helmet Security Headers**:
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- Strict-Transport-Security

### 6.3 Input Validation

**Validation Strategy**:
- Frontend: Zod schemas with React Hook Form
- Backend: Validator library + Mongoose schemas
- Sanitization of user inputs
- SQL injection prevention (NoSQL)
- XSS protection

## 7. File Upload Design

### 7.1 Multer Configuration

**Upload Limits**:
- Max file size: 5MB
- Allowed formats: JPG, PNG, PDF
- Temporary storage: Memory storage
- Final storage: Cloudinary

### 7.2 Cloudinary Integration

**Configuration**:
```javascript
{
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
}
```

**Upload Flow**:
```
Client → Multer (Memory) → Cloudinary → URL → Database
```

## 8. Payment Integration Design

### 8.1 Razorpay Integration

**Payment Flow**:
```
1. User books appointment
   ├─> Frontend creates order request
   ├─> Backend creates Razorpay order
   └─> Order ID returned to frontend

2. Payment processing
   ├─> Razorpay checkout modal opens
   ├─> User completes payment
   ├─> Payment ID received
   └─> Frontend sends payment confirmation

3. Verification
   ├─> Backend verifies payment with Razorpay
   ├─> Appointment marked as paid
   └─> Confirmation sent to user
```

**Razorpay Configuration**:
```javascript
{
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
}
```

### 8.2 Refund Handling

**Cancellation Flow**:
```
1. User cancels appointment
   ├─> Check cancellation policy
   ├─> Calculate refund amount
   ├─> Initiate Razorpay refund
   ├─> Update appointment status
   └─> Notify user
```

## 9. AI Integration Design

### 9.1 Google Generative AI

**Use Cases**:
- Health symptom analysis
- Personalized health recommendations
- Medical information assistance
- Predictive health insights

**Integration Pattern**:
```javascript
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Generate health insights
const result = await model.generateContent(prompt);
```

**Safety & Disclaimers**:
- AI responses include medical disclaimers
- Not a replacement for professional medical advice
- User consent required for AI features

## 10. UI/UX Design Patterns

### 10.1 Design System

**Color Palette**:
- Primary: Healthcare blue (#0066CC)
- Secondary: Teal (#00A896)
- Success: Green (#28A745)
- Warning: Orange (#FFA500)
- Error: Red (#DC3545)
- Background: Light gray (#F8F9FD)

**Typography**:
- Font Family: System fonts (sans-serif)
- Headings: Bold, larger sizes
- Body: Regular weight, readable size
- Code: Monospace font

**Spacing System** (Tailwind):
- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)

### 10.2 Component Library

**Reusable Components**:
- Buttons (primary, secondary, outline, ghost)
- Input fields (text, email, password, date)
- Cards (info cards, stat cards)
- Modals (confirmation, forms)
- Tables (data tables with sorting)
- Charts (line, bar, pie)
- Notifications (toast, snackbar)
- Loading states (spinners, skeletons)
- Navigation (navbar, sidebar, breadcrumbs)

### 10.3 Responsive Design

**Breakpoints**:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

**Mobile-First Approach**:
- Base styles for mobile
- Progressive enhancement for larger screens
- Touch-friendly UI elements
- Optimized images and assets

### 10.4 Animation Strategy

**Framer Motion**:
- Page transitions
- Modal animations
- List item animations
- Hover effects

**GSAP**:
- Complex animations
- Timeline-based sequences
- Scroll-triggered animations

## 11. Internationalization (i18n)

### 11.1 i18next Configuration

**Supported Languages**:
- English (default)
- Additional languages configurable

**Translation Structure**:
```
public/locales/
├── en/
│   ├── common.json
│   ├── auth.json
│   ├── appointments.json
│   └── ...
└── [language]/
    └── ...
```

**Usage Pattern**:
```javascript
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();
<h1>{t('common.welcome')}</h1>
```

## 12. Error Handling Design

### 12.1 Frontend Error Handling

**Error Boundaries**:
```javascript
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    // Log error
    // Show fallback UI
  }
}
```

**API Error Handling**:
```javascript
try {
  const response = await axios.get('/api/endpoint');
  // Handle success
} catch (error) {
  if (error.response) {
    // Server responded with error
    toast.error(error.response.data.message);
  } else if (error.request) {
    // No response received
    toast.error('Network error');
  } else {
    // Request setup error
    toast.error('An error occurred');
  }
}
```

### 12.2 Backend Error Handling

**Error Middleware**:
```javascript
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});
```

**Custom Error Classes**:
- ValidationError (400)
- AuthenticationError (401)
- AuthorizationError (403)
- NotFoundError (404)
- ServerError (500)

### 12.3 Logging Strategy

**Winston Logger Configuration**:
```javascript
{
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
}
```

**Log Levels**:
- error: Critical errors
- warn: Warning messages
- info: Informational messages
- debug: Debug information

## 13. Performance Optimization

### 13.1 Frontend Optimization

**Code Splitting**:
- Route-based code splitting with React.lazy()
- Component lazy loading
- Dynamic imports for heavy libraries

**Asset Optimization**:
- Image lazy loading
- Cloudinary image optimization
- SVG icons for scalability
- Minification and compression

**Caching Strategy**:
- Browser caching for static assets
- Service worker for offline support (future)
- Redux persist for state persistence

### 13.2 Backend Optimization

**Database Optimization**:
- Proper indexing strategy
- Query optimization
- Connection pooling
- Aggregation pipelines for complex queries

**API Optimization**:
- Response compression (gzip)
- Pagination for large datasets
- Field selection (projection)
- Rate limiting to prevent abuse

**Caching** (Future Enhancement):
- Redis for session storage
- Cache frequently accessed data
- Cache invalidation strategy

## 14. Testing Strategy

### 14.1 Testing Pyramid

**Unit Tests**:
- Individual functions and components
- Business logic validation
- Utility functions

**Integration Tests**:
- API endpoint testing
- Database operations
- Third-party integrations

**End-to-End Tests**:
- User workflows
- Critical paths
- Cross-browser testing

### 14.2 Testing Tools (Recommended)

**Frontend**:
- Jest for unit tests
- React Testing Library
- Cypress for E2E tests

**Backend**:
- Jest for unit tests
- Supertest for API testing
- MongoDB Memory Server for testing

## 15. Deployment Architecture

### 15.1 Deployment Strategy

**Frontend Deployment** (Vercel):
```
GitHub → Vercel CI/CD → Production
├─> Automatic builds on push
├─> Preview deployments for PRs
└─> Environment variables configured
```

**Backend Deployment** (Cloud Platform):
```
GitHub → CI/CD Pipeline → Production Server
├─> Automated testing
├─> Build process
├─> Environment configuration
└─> Health checks
```

### 15.2 Environment Configuration

**Development**:
```
MONGODB_URI=mongodb://localhost:27017/medimind
PORT=4000
NODE_ENV=development
```

**Production**:
```
MONGODB_URI=mongodb+srv://cluster.mongodb.net/medimind
PORT=4000
NODE_ENV=production
JWT_SECRET=<secure-secret>
CLOUDINARY_NAME=<name>
RAZORPAY_KEY_ID=<key>
```

### 15.3 Monitoring & Maintenance

**Health Checks**:
- API endpoint monitoring
- Database connection status
- External service availability
- Response time tracking

**Logging & Analytics**:
- Error tracking (Sentry recommended)
- Performance monitoring
- User analytics
- API usage metrics

## 16. Blood Donation System Design

### 16.1 Donation Request Workflow

```
1. Hospital creates request
   ├─> Specify blood type and quantity
   ├─> Set urgency level
   └─> Request saved to database

2. Donor matching
   ├─> Query users by blood type
   ├─> Filter by location proximity
   ├─> Check donor eligibility
   └─> Generate match list

3. Notification
   ├─> Send notifications to matched donors
   ├─> Donors respond with availability
   └─> Update match status

4. Scheduling
   ├─> Hospital schedules donation
   ├─> Donor confirms appointment
   ├─> Calendar integration
   └─> Reminder notifications

5. Completion
   ├─> Mark donation as completed
   ├─> Update donor history
   ├─> Close request
   └─> Thank you notification
```

### 16.2 Donor Eligibility Criteria

**Automatic Checks**:
- Age: 18-65 years
- Weight: > 50kg
- Last donation: > 3 months ago
- Health status: No recent illnesses

**Manual Verification**:
- Medical screening at hospital
- Blood tests
- Final approval by medical staff

## 17. Prescription System Design

### 17.1 Prescription Creation Flow

```
1. Doctor completes appointment
   ├─> Access prescription form
   ├─> Enter diagnosis
   └─> Add medications

2. Medication details
   ├─> Drug name (searchable database)
   ├─> Dosage and frequency
   ├─> Duration
   └─> Special instructions

3. Additional information
   ├─> Lab tests recommended
   ├─> Follow-up date
   └─> General notes

4. Digital signature
   ├─> Doctor verification
   ├─> Timestamp
   └─> Save to database

5. Patient notification
   ├─> Email notification
   ├─> In-app notification
   └─> SMS (optional)
```

### 17.2 Prescription PDF Generation

**html2pdf.js Configuration**:
```javascript
{
  margin: 10,
  filename: 'prescription_[date].pdf',
  image: { type: 'jpeg', quality: 0.98 },
  html2canvas: { scale: 2 },
  jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
}
```

**PDF Content**:
- Hospital/Clinic header
- Doctor information
- Patient information
- Date and prescription ID
- Diagnosis
- Medications table
- Instructions
- Doctor's signature
- Disclaimer

## 18. Analytics Dashboard Design

### 18.1 Admin Dashboard Metrics

**Key Performance Indicators**:
- Total users (patients)
- Total doctors
- Total appointments (today, week, month)
- Revenue (today, week, month)
- Pending appointments
- Completed appointments
- Cancellation rate
- Average rating

**Visualizations**:
- Line chart: Appointments over time
- Bar chart: Revenue by month
- Pie chart: Appointments by specialty
- Table: Recent appointments

### 18.2 Doctor Dashboard Metrics

**Doctor KPIs**:
- Today's appointments
- Pending appointments
- Completed consultations
- Total earnings
- Average rating
- Patient reviews
- Prescription count

**Visualizations**:
- Calendar view: Upcoming appointments
- Line chart: Consultation trends
- Bar chart: Earnings over time

### 18.3 Patient Health Analytics

**Health Metrics**:
- Weight trends
- Blood pressure trends
- Blood sugar levels
- Medication adherence
- Appointment history
- Health score

**Visualizations**:
- Line charts: Vital signs over time
- Progress bars: Health goals
- Calendar: Medication schedule
- Timeline: Medical history

## 19. Notification System Design

### 19.1 Notification Types

**In-App Notifications**:
- Appointment confirmations
- Appointment reminders (24h, 1h before)
- Prescription ready
- Payment confirmations
- Review requests
- Blood donation matches

**Email Notifications**:
- Welcome email
- Appointment booking confirmation
- Appointment reminders
- Prescription notifications
- Payment receipts
- Password reset

**Toast Notifications** (React Toastify):
- Success messages
- Error messages
- Warning messages
- Info messages

### 19.2 Notification Implementation

**Frontend** (React Toastify):
```javascript
import { toast } from 'react-toastify';

toast.success('Appointment booked successfully!');
toast.error('Failed to book appointment');
toast.info('Reminder: Appointment in 1 hour');
```

**Backend** (Email Service):
```javascript
// Email service integration
const sendEmail = async (to, subject, html) => {
  // Email provider API call
};
```

## 20. Search and Filter Design

### 20.1 Doctor Search

**Search Criteria**:
- Name
- Specialization
- Location
- Availability
- Rating
- Experience
- Fees range

**Filter Options**:
- Specialty dropdown
- Location autocomplete
- Date picker for availability
- Rating filter (4+ stars, 3+ stars)
- Price range slider
- Gender preference

**Search Algorithm**:
```javascript
// MongoDB query with multiple filters
{
  $and: [
    { name: { $regex: searchTerm, $options: 'i' } },
    { specialization: selectedSpecialty },
    { available: true },
    { rating: { $gte: minRating } },
    { fees: { $gte: minFees, $lte: maxFees } }
  ]
}
```

### 20.2 Appointment Filtering

**Filter Options**:
- Status (all, pending, confirmed, completed, cancelled)
- Date range
- Doctor name
- Specialty

**Sorting Options**:
- Date (newest/oldest)
- Status
- Doctor name

## 21. Accessibility Design

### 21.1 WCAG Compliance

**Level AA Compliance**:
- Color contrast ratios (4.5:1 for text)
- Keyboard navigation support
- Screen reader compatibility
- Focus indicators
- Alt text for images
- ARIA labels and roles

### 21.2 Accessibility Features

**Keyboard Navigation**:
- Tab order optimization
- Skip to main content link
- Keyboard shortcuts for common actions
- Focus trap in modals

**Screen Reader Support**:
- Semantic HTML elements
- ARIA labels for interactive elements
- Live regions for dynamic content
- Descriptive link text

**Visual Accessibility**:
- Sufficient color contrast
- Resizable text
- No reliance on color alone
- Clear visual hierarchy

## 22. Mobile Responsiveness

### 22.1 Mobile-First Design

**Responsive Breakpoints**:
```css
/* Mobile: default styles */
/* Tablet */
@media (min-width: 640px) { ... }
/* Desktop */
@media (min-width: 1024px) { ... }
/* Large Desktop */
@media (min-width: 1280px) { ... }
```

### 22.2 Mobile Optimizations

**Touch Targets**:
- Minimum size: 44x44px
- Adequate spacing between elements
- Swipe gestures for navigation

**Mobile Navigation**:
- Hamburger menu
- Bottom navigation bar
- Collapsible sections
- Sticky headers

**Performance**:
- Lazy loading images
- Reduced animations on mobile
- Optimized bundle size
- Progressive Web App features (future)

## 23. Data Visualization Design

### 23.1 Chart Library Selection

**Chart.js**:
- Line charts (health trends)
- Bar charts (statistics)
- Pie charts (distribution)
- Doughnut charts (percentages)

**Recharts**:
- Responsive charts
- Customizable components
- Animation support
- Tooltip interactions

### 23.2 Chart Configurations

**Health Trends Chart**:
```javascript
{
  type: 'line',
  data: {
    labels: dates,
    datasets: [{
      label: 'Weight',
      data: weightData,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Weight Trend' }
    }
  }
}
```

## 24. Form Design Patterns

### 24.1 React Hook Form Integration

**Form Structure**:
```javascript
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema)
});

const onSubmit = async (data) => {
  // API call
};
```

### 24.2 Validation Schemas (Zod)

**Example Schema**:
```javascript
const appointmentSchema = z.object({
  doctorId: z.string().min(1, 'Doctor is required'),
  date: z.date().min(new Date(), 'Date must be in future'),
  time: z.string().min(1, 'Time is required'),
  notes: z.string().optional()
});
```

### 24.3 Form UX Patterns

**Progressive Disclosure**:
- Multi-step forms for complex processes
- Show relevant fields based on selections
- Save progress functionality

**Inline Validation**:
- Real-time validation feedback
- Clear error messages
- Success indicators

**Form Accessibility**:
- Label associations
- Error announcements
- Required field indicators
- Help text for complex fields

## 25. Route Protection Design

### 25.1 Protected Routes

**Authentication Guards**:
```javascript
const ProtectedRoute = ({ children, requiredRole }) => {
  const { token, role } = useAuth();
  
  if (!token) {
    return <Navigate to="/login" />;
  }
  
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }
  
  return children;
};
```

### 25.2 Role-Based Access

**User Roles**:
- Patient: Access to booking, prescriptions, health records
- Doctor: Access to appointments, prescriptions, profile
- Admin: Access to all management features

**Route Configuration**:
```javascript
<Route path="/admin/*" element={
  <ProtectedRoute requiredRole="admin">
    <AdminLayout />
  </ProtectedRoute>
} />

<Route path="/doctor/*" element={
  <ProtectedRoute requiredRole="doctor">
    <DoctorLayout />
  </ProtectedRoute>
} />
```

## 26. Real-Time Features Design

### 26.1 Future Real-Time Capabilities

**WebSocket Integration** (Planned):
- Real-time appointment updates
- Live chat support
- Instant notifications
- Doctor availability updates

**Implementation Approach**:
- Socket.io for WebSocket communication
- Event-driven architecture
- Connection management
- Reconnection handling

## 27. Scalability Considerations

### 27.1 Horizontal Scaling

**Load Balancing**:
- Multiple backend instances
- Session management with Redis
- Stateless API design
- Database read replicas

### 27.2 Microservices Migration Path

**Service Decomposition** (Future):
- User Service
- Appointment Service
- Prescription Service
- Payment Service
- Notification Service
- Analytics Service

**API Gateway**:
- Request routing
- Authentication
- Rate limiting
- API versioning

## 28. Backup and Recovery Design

### 28.1 Backup Strategy

**Database Backups**:
- Automated daily backups
- Point-in-time recovery
- Backup retention: 30 days
- Offsite backup storage

**File Backups**:
- Cloudinary automatic backups
- Media asset versioning
- Disaster recovery plan

### 28.2 Recovery Procedures

**Data Recovery**:
- Restore from latest backup
- Incremental recovery
- Data integrity verification
- Rollback procedures

## 29. Documentation Standards

### 29.1 Code Documentation

**JSDoc Comments**:
```javascript
/**
 * Books an appointment for a patient
 * @param {string} userId - Patient ID
 * @param {string} doctorId - Doctor ID
 * @param {Date} date - Appointment date
 * @returns {Promise<Object>} Appointment object
 */
async function bookAppointment(userId, doctorId, date) {
  // Implementation
}
```

### 29.2 API Documentation

**Endpoint Documentation Format**:
```
### POST /api/appointment

**Description**: Book a new appointment

**Authentication**: Required (JWT)

**Request Body**:
{
  "doctorId": "string",
  "date": "ISO date string",
  "time": "string",
  "notes": "string (optional)"
}

**Response**:
{
  "success": true,
  "data": { appointment object },
  "message": "Appointment booked successfully"
}

**Error Responses**:
- 400: Invalid input
- 401: Unauthorized
- 404: Doctor not found
- 500: Server error
```

## 30. Future Enhancements

### 30.1 Planned Features

**Phase 2**:
- Video consultation integration (WebRTC)
- Mobile applications (React Native)
- Advanced AI diagnostics
- Lab test booking
- Pharmacy integration
- Insurance claim processing

**Phase 3**:
- Wearable device integration
- Telemedicine platform
- Multi-hospital network
- Emergency services
- Health insurance marketplace
- Clinical decision support system

### 30.2 Technology Upgrades

**Performance**:
- Redis caching layer
- CDN for global distribution
- GraphQL API (alternative to REST)
- Server-side rendering (Next.js)

**Infrastructure**:
- Kubernetes orchestration
- Microservices architecture
- Event-driven architecture
- Message queue (RabbitMQ/Kafka)

**Security**:
- Two-factor authentication
- Biometric authentication
- End-to-end encryption
- HIPAA compliance certification
- Regular security audits

---

## Conclusion

This design document provides a comprehensive blueprint for the Medimind healthcare platform. The architecture emphasizes scalability, security, and user experience while maintaining flexibility for future enhancements. The modular design allows for incremental development and easy maintenance.
