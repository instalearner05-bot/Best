# AIpreneurs Global Challenge 2025 - Management Panel (Frontend)

## Project Overview

A professional, fully-responsive multi-page website for AIpreneurs Global Challenge 2025 Management Panel. This frontend application provides an integrated platform for students, volunteers, and administrators to manage the entrepreneurship challenge.

## Features

### 1. **Home Page**
- Hero section with event banner
- About the event section
- "What We Do" features (6 key pillars)
- Event details overview
- Call-to-action buttons
- Professional footer with links

### 2. **Authentication System**
- **Student Login/Registration Page**
  - Email and password authentication
  - Account creation with school information
  - Firebase integration
  - Automatic redirect to student dashboard

- **Volunteer Login Page**
  - Secure login interface
  - Firebase authentication
  - Redirect to volunteer dashboard

- **Admin Login Page**
  - Admin-only access
  - Firebase authentication
  - Redirect to admin dashboard

### 3. **Student Dashboard**
- Welcome message with user profile
- Statistics cards (Total Tasks, Submitted, Approved, Pending)
- Recent announcements display
- Upcoming tasks section
- Task submission functionality
- View all tasks
- Track submission status
- Browse announcements
- Update profile information

### 4. **Volunteer Dashboard**
- Volunteer-specific statistics
- Assigned tasks section
- Submission review panel
- Participant status tracking
- Announcement access
- Profile management
- Review and feedback submission

### 5. **Admin Dashboard**
- **Overview Statistics**
  - Total Registrations
  - Verified Participants
  - Completed Tasks
  - Pending Submissions

- **Participants Management**
  - View all participants
  - Search and filter by status/school
  - Add, edit, delete participants
  - Export to CSV
  - Status badges (Approved, Pending, Revision Needed)

- **Task Management**
  - Upload new tasks
  - View task submissions count
  - Manage task deadlines
  - Organize by stages

- **Submissions Review**
  - View all submissions
  - Filter by status
  - Download participant files
  - Update submission status

- **Announcements Management**
  - Create new announcements
  - Publish to all dashboards
  - View all announcements

- **Team Management**
  - Add team members
  - Manage volunteers
  - Assign roles
  - Set permissions

- **Activity Logs**
  - System activity tracking
  - User actions logging
  - Read-only view for security

### 6. **About Event Page**
- Mission statement
- Vision overview
- Program structure (4 stages)
- Core team information
- Advisory board
- Partner organizations
- FAQ section

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Firebase Services**:
  - Firebase Authentication
  - Firestore Database
  - Firebase Storage
- **Styling**: Custom CSS with professional design
- **Responsive Design**: Mobile-first approach

## Project Structure

```
aipreneurs-management-panel/
├── index.html (Home Page)
├── css/
│   └── style.css (Main stylesheet)
├── js/
│   ├── firebase-config.js (Firebase initialization)
│   └── utils.js (Utility functions)
├── pages/
│   ├── student-login.html
│   ├── student-dashboard.html
│   ├── volunteer-login.html
│   ├── volunteer-dashboard.html
│   ├── admin-login.html
│   ├── admin-dashboard.html
│   └── about-event.html
└── assets/
    └── (for future images, logos, etc.)
```

## Setup Instructions

### 1. Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Firebase account
- Internet connection

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project: "AIpreneurs 2025"
3. Enable services:
   - Authentication (Email/Password)
   - Firestore Database
   - Storage

4. Create a Web App in Firebase
5. Copy the Firebase configuration

### 3. Update Firebase Config

Edit `js/firebase-config.js` and replace the configuration:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### 4. Run Locally

Option 1: Using a simple HTTP server
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if installed)
npx http-server
```

Then open: `http://localhost:8000`

Option 2: Deploy to Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init
firebase deploy
```

## Firebase Database Structure

### Collections:

#### `users`
```
{
    uid: string,
    email: string,
    userType: "student" | "volunteer" | "admin",
    fullName: string,
    school: string,
    phone: string,
    status: "pending" | "approved" | "rejected",
    createdAt: timestamp,
    updatedAt: timestamp
}
```

#### `tasks`
```
{
    id: string,
    title: string,
    description: string,
    dueDate: date,
    stage: string,
    status: "active" | "completed",
    createdAt: timestamp
}
```

#### `submissions`
```
{
    id: string,
    taskId: string,
    userId: string,
    fileUrl: string,
    description: string,
    status: "pending" | "approved" | "rejected",
    feedbackStatus: "awaiting" | "reviewed",
    feedback: string,
    submittedAt: timestamp,
    updatedAt: timestamp
}
```

#### `announcements`
```
{
    id: string,
    title: string,
    content: string,
    createdBy: string,
    status: "published" | "draft",
    createdAt: timestamp,
    updatedAt: timestamp
}
```

## Key Features Implemented

### Authentication
- Secure email/password authentication
- Role-based access control
- Automatic redirection based on user type
- Logout functionality

### Firebase Integration
- Real-time database updates
- File uploads to Storage
- Secure authentication
- Firestore queries and filters

### User Management
- Profile update functionality
- User data persistence
- Role assignment
- Status tracking

### Task Management
- Create and upload tasks
- Set deadlines
- Track submissions
- Organize by stages

### Submission Handling
- File upload capability
- Submission tracking
- Status updates
- Feedback provision

### Announcements
- Create and publish announcements
- Display across dashboards
- Timestamp tracking
- Real-time updates

### Export Features
- CSV export of participants
- Data download capabilities

## Security Features

- Firebase Authentication for user verification
- Role-based access control (Student, Volunteer, Admin)
- Secure file uploads to Cloud Storage
- Read-only activity logs
- Input validation
- CORS protection (via Firebase)

## Responsive Design

- Mobile-first approach
- Hamburger menu for mobile navigation
- Responsive grid layouts
- Touch-friendly buttons
- Optimized for screens 320px - 1920px

## Design Features

- Professional color scheme (Blue, Orange, Green)
- Clean, modern UI
- Consistent typography
- Card-based layouts
- Smooth animations
- Status badges
- Professional footer

## Color Scheme

- Primary: `#1e3a8a` (Dark Blue)
- Secondary: `#f59e0b` (Amber)
- Accent: `#10b981` (Green)
- Text: `#1e293b` (Dark Gray)
- Background: `#f8fafc` (Light Gray)

## Available Functions

### Firebase Functions
- `loginUser(email, password)` - User login
- `registerUser(email, password, userType)` - User registration
- `logoutUser()` - User logout
- `getUserData(uid)` - Fetch user data
- `updateUserData(uid, data)` - Update user data
- `createTask(title, description, dueDate, stage)` - Create task
- `getTasks()` - Fetch all tasks
- `submitTask(taskId, userId, fileUrl, description)` - Submit task
- `getSubmissions(filter)` - Fetch submissions
- `updateSubmissionStatus(submissionId, status, feedback)` - Review submission
- `createAnnouncement(title, content, createdBy)` - Create announcement
- `getAnnouncements()` - Fetch announcements
- `getAllParticipants(filter)` - Fetch participants
- `updateParticipantStatus(userId, status, stage)` - Update participant
- `deleteParticipant(userId)` - Delete participant
- `uploadFile(file, path)` - Upload file to storage
- `getDashboardStats()` - Get dashboard statistics

### Utility Functions
- `$(selector)` - Query selector
- `$$(selector)` - Query selector all
- `show(element)` / `hide(element)` - Toggle visibility
- `openModal(modalId)` / `closeModal(modalId)` - Modal controls
- `showAlert(message, type)` - Show alerts
- `switchTab(tabName)` - Tab switching
- `formatDate(date)` / `formatDateTime(date)` - Date formatting
- `formatFileSize(bytes)` - File size formatting
- `validateEmail(email)` / `validatePassword(password)` - Validation
- `exportToCSV(data, filename)` - Export to CSV
- `filterBySearch(data, searchTerm, fields)` - Search filtering
- `paginate(data, pageSize)` - Pagination

## Browser Compatibility

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

- Lazy loading of images
- Minimized CSS and JavaScript
- Optimized Firebase queries
- Efficient event listeners
- Debounced search and filter functions

## Future Enhancements

1. Advanced analytics dashboard
2. Real-time notifications
3. Video conference integration
4. Automated email notifications
5. PDF export functionality
6. Advanced reporting features
7. Mobile native app
8. AI-powered submission evaluation

## Troubleshooting

### Firebase Configuration Issues
- Verify Firebase config in `js/firebase-config.js`
- Check Firebase project settings
- Ensure services are enabled in Firebase Console

### Login Issues
- Clear browser cache and cookies
- Verify user exists in Firebase Authentication
- Check user role assignment in Firestore

### File Upload Issues
- Check Firebase Storage rules
- Verify file size limits
- Ensure proper CORS configuration

### Performance Issues
- Clear browser cache
- Check internet connection
- Verify Firebase quotas
- Optimize image sizes

## Support & Documentation

For more information:
- Firebase Documentation: https://firebase.google.com/docs
- JavaScript MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript
- Web Standards: https://www.w3.org/

## License

AIpreneurs Global Challenge 2025 - All Rights Reserved

## Contact

- Email: info@aipreneurs2025.com
- Phone: +1 (555) 123-4567
- Website: www.aipreneurs2025.com

---

**Last Updated**: January 2025
**Version**: 1.0.0
**Status**: Production Ready
