# Firebase Configuration & Deployment Guide

## Firebase Setup Instructions

### Step 1: Create Firebase Project

1. Visit [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: "AIpreneurs 2025"
4. Accept terms and click "Create project"
5. Wait for project initialization (1-2 minutes)

### Step 2: Enable Authentication

1. In Firebase Console, go to **Build** > **Authentication**
2. Click **Get started**
3. Select **Email/Password** provider
4. Enable it and save

### Step 3: Create Firestore Database

1. In Firebase Console, go to **Build** > **Firestore Database**
2. Click **Create database**
3. Select region: Choose closest to your location
4. Start in **Test mode** (for development)
5. Click **Create**

### Step 4: Setup Cloud Storage

1. In Firebase Console, go to **Build** > **Storage**
2. Click **Get started**
3. Accept default security rules
4. Finish setup

### Step 5: Create Web App

1. In Firebase Console, click on **Project settings** (gear icon)
2. Go to **Your apps** section
3. Click **Web** icon to create web app
4. Register app with nickname: "AIpreneurs Panel"
5. Copy the Firebase configuration code

### Step 6: Update Configuration

Replace the firebaseConfig in `js/firebase-config.js`:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "1:YOUR_APP_ID:web:YOUR_WEB_APP_ID"
};
```

## Firestore Security Rules

Set up proper security rules for development/production:

### Development Rules (Test Mode - Not Recommended for Production)
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### Production Rules (Recommended)
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId || 
                            get(/databases/$(database)/documents/users/$(request.auth.uid)).data.userType == 'admin';
      allow create: if request.auth.uid != null;
    }

    // Tasks collection - Students can read, admins can write
    match /tasks/{document=**} {
      allow read: if request.auth.uid != null;
      allow write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.userType == 'admin';
    }

    // Submissions collection
    match /submissions/{document=**} {
      allow read: if request.auth != null;
      allow create: if request.auth.uid != null;
      allow write: if request.auth.uid == resource.data.userId || 
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.userType in ['admin', 'volunteer'];
    }

    // Announcements collection - Read for all, write for admin
    match /announcements/{document=**} {
      allow read: if request.auth.uid != null;
      allow write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.userType == 'admin';
    }
  }
}
```

## Storage Security Rules

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow users to upload their own files
    match /submissions/{userId}/{document=**} {
      allow read, write: if request.auth.uid == userId || 
                            get(/databases/$(database)/documents/users/$(request.auth.uid)).data.userType == 'admin';
    }

    // Allow admins to upload tasks
    match /tasks/{document=**} {
      allow read: if request.auth.uid != null;
      allow write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.userType == 'admin';
    }
  }
}
```

## Initial Admin Setup

After Firebase is configured:

1. In Firebase Authentication, create an admin account manually
2. In Firestore, create a user document for the admin:

```
Collection: users
Document ID: {user-uid}

{
    uid: "{user-uid}",
    email: "admin@aipreneurs2025.com",
    userType: "admin",
    fullName: "Admin User",
    createdAt: {current-timestamp},
    status: "approved",
    phone: "+1-555-000-0000"
}
```

## Local Development

### Using Python HTTP Server

```bash
# Navigate to project directory
cd "c:\internship 2025\aipreneurs-management-panel"

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Access: `http://localhost:8000`

### Using Node.js HTTP Server

```bash
# Install http-server globally
npm install -g http-server

# Navigate to project and run
http-server
```

### Using Live Server (VS Code)

1. Install "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Firebase Hosting Deployment

### Prerequisites
```bash
npm install -g firebase-tools
```

### Deploy Steps

1. **Login to Firebase**
```bash
firebase login
```

2. **Initialize Firebase in project**
```bash
firebase init hosting
```

3. **Configure deployment**
- When asked for public directory: `.` (current directory)
- Single page app: `No`

4. **Deploy**
```bash
firebase deploy
```

Your site will be available at: `https://your-project-id.web.app`

## Environment Configuration

Create a `.env` file (for future configuration):

```
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
APP_MODE=production
MAX_FILE_SIZE=10485760
```

## Test Credentials (For Testing)

Create test accounts in Firebase Authentication:

**Student Test Account**
- Email: student@test.aipreneurs.com
- Password: Test@123456

**Volunteer Test Account**
- Email: volunteer@test.aipreneurs.com
- Password: Test@123456

**Admin Test Account**
- Email: admin@test.aipreneurs.com
- Password: Test@123456

Then create corresponding user documents in Firestore with appropriate roles.

## Monitoring & Analytics

### Firebase Console Monitoring

1. Go to **Build** > **Authentication**
   - Monitor user signups
   - Check login activities

2. Go to **Firestore Database**
   - Monitor database usage
   - Check read/write operations

3. Go to **Storage**
   - Monitor file uploads
   - Check storage usage

### Google Analytics (Optional)

1. In Firebase Console, go to **Analytics**
2. Enable Google Analytics
3. Connect to your project

## Troubleshooting Deployment

### Issue: "Cannot GET /"
**Solution**: Ensure `index.html` is in the root directory

### Issue: Firebase Config Not Loading
**Solution**: Check browser console for errors, verify API key

### Issue: CORS Errors
**Solution**: Ensure Firebase CORS is properly configured

### Issue: File Upload Failing
**Solution**: Check Storage rules and file size limits

## Performance Optimization

### Caching Strategy
- Static assets: Cache for 1 year
- HTML files: No cache
- Firebase scripts: CDN cached

### Database Optimization
- Index frequently queried fields
- Limit read/write operations
- Use pagination for large datasets

### Storage Optimization
- Compress images before upload
- Limit file size: 50MB per file
- Use CDN for media delivery

## Backup & Recovery

### Enable Firestore Backups

1. Go to **Firestore Database** > **Backups**
2. Enable automated backups
3. Set retention period: 7-30 days

### Manual Backup
```bash
# Using Firebase CLI
firebase firestore:export backup-folder/
```

## Security Best Practices

1. **Never commit Firebase config to public repos**
2. **Use environment variables for sensitive data**
3. **Enable Two-Factor Authentication on Firebase account**
4. **Regularly review Security Rules**
5. **Monitor Authentication activity**
6. **Set up rate limiting for API**
7. **Use HTTPS only**
8. **Validate all user inputs**

## Production Checklist

- [ ] Firebase security rules configured
- [ ] Environment variables set
- [ ] Error handling implemented
- [ ] Performance optimized
- [ ] SSL/HTTPS enabled
- [ ] Backups enabled
- [ ] Analytics configured
- [ ] Support contact updated
- [ ] Privacy policy created
- [ ] Terms of service created
- [ ] Testing completed
- [ ] Documentation updated

## Support Resources

- Firebase Documentation: https://firebase.google.com/docs
- Firebase CLI Reference: https://firebase.google.com/docs/cli
- Security Rules: https://firebase.google.com/docs/rules
- Quotas & Limits: https://firebase.google.com/docs/quotas

---

**Version**: 1.0.0
**Last Updated**: January 2025
