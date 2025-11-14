# Quick Start Guide - AIpreneurs Global Challenge 2025

## Get Started in 5 Minutes

### 1. Download & Extract
- Extract the `aipreneurs-management-panel` folder to your desired location

### 2. Firebase Setup (One-time)

Follow the detailed guide in `FIREBASE_SETUP.md`:
1. Create Firebase project
2. Enable Authentication, Firestore, Storage
3. Copy Firebase config
4. Update `js/firebase-config.js`

### 3. Run Locally

**Option A: Python (Easiest)**
```bash
cd aipreneurs-management-panel
python -m http.server 8000
```
Then open: `http://localhost:8000`

**Option B: Node.js**
```bash
npm install -g http-server
cd aipreneurs-management-panel
http-server
```

**Option C: VS Code Live Server**
- Install extension
- Right-click `index.html` > Open with Live Server

### 4. Test the Platform

**Homepage**: `http://localhost:8000/`

**Test Logins**:
- Student: `student@test.aipreneurs.com` / `Test@123456`
- Volunteer: `volunteer@test.aipreneurs.com` / `Test@123456`
- Admin: `admin@test.aipreneurs.com` / `Test@123456`

(After creating test accounts in Firebase)

### 5. Deploy (Optional)

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## File Structure Overview

```
aipreneurs-management-panel/
│
├── index.html ........................ Home page
├── css/style.css .................... Main stylesheet (1500+ lines)
├── js/firebase-config.js ............ Firebase integration
├── js/utils.js ..................... Utility functions
│
└── pages/
    ├── student-login.html ........... Student login & registration
    ├── student-dashboard.html ....... Student dashboard
    ├── volunteer-login.html ......... Volunteer login
    ├── volunteer-dashboard.html ..... Volunteer dashboard
    ├── admin-login.html ............. Admin login
    ├── admin-dashboard.html ......... Admin dashboard
    └── about-event.html ............. Event information
```

## Key Features at a Glance

| Feature | Status | Description |
|---------|--------|-------------|
| Responsive Design | ✓ | Mobile, tablet, desktop optimized |
| Firebase Auth | ✓ | Email/password authentication |
| Student Dashboard | ✓ | Task submission, progress tracking |
| Volunteer Panel | ✓ | Submission review, feedback |
| Admin Dashboard | ✓ | Full management controls |
| Announcements | ✓ | System-wide updates |
| File Upload | ✓ | Task submissions with files |
| Export Features | ✓ | CSV export of data |
| Professional Design | ✓ | Modern UI/UX, no emojis |

## Common Tasks

### Create a Student Account
1. Go to student login page
2. Click "Create Student Account"
3. Fill in details
4. Submit

### Upload a Task (Admin)
1. Login as Admin
2. Go to "Tasks" section
3. Click "Upload New Task"
4. Fill form and submit

### Review Submissions (Volunteer)
1. Login as Volunteer
2. Go to "Review Submissions"
3. Click "Review" button
4. Provide feedback and decision

### View Analytics (Admin)
1. Login as Admin
2. Dashboard shows real-time statistics
3. View detailed reports in each section

## Customization

### Change Colors
Edit `:root` in `css/style.css`:
```css
:root {
    --primary-color: #1e3a8a;      /* Main blue */
    --secondary-color: #f59e0b;    /* Amber */
    --accent-color: #10b981;       /* Green */
    /* ... more colors ... */
}
```

### Update Branding
1. Change logo in HTML files (`.logo-icon`)
2. Update event name throughout
3. Modify footer information

### Add Pages
1. Create new HTML file in `pages/`
2. Follow template structure
3. Link from navigation

## Troubleshooting

### Page Shows "Not Found"
- Check file paths in HTML
- Ensure server is running
- Verify file locations

### Firebase Not Working
- Check Firebase config in browser console
- Verify Firebase project settings
- Ensure APIs are enabled

### Login Not Working
- Check Firebase Authentication rules
- Verify user exists in Firebase
- Check browser console for errors

### File Upload Failing
- Check Firebase Storage rules
- Verify file size < 50MB
- Check storage permissions

## Performance Tips

1. **Optimize Images**: Compress before use
2. **Use CDN**: Deploy to Firebase Hosting
3. **Cache Strategy**: Browser caches static files
4. **Minimize Requests**: Combine CSS/JS files
5. **Monitor Analytics**: Track user behavior

## Security Reminders

- Keep Firebase config secure
- Don't commit secrets to version control
- Use environment variables for production
- Enable Firebase security rules
- Regular security audits
- Keep dependencies updated

## Next Steps

1. ✓ Setup Firebase (see FIREBASE_SETUP.md)
2. ✓ Run locally and test
3. ✓ Customize branding and colors
4. ✓ Deploy to Firebase Hosting
5. ✓ Promote to users
6. ✓ Monitor analytics

## Support

**Issues?** Check these resources:
- README.md - Full documentation
- FIREBASE_SETUP.md - Firebase configuration
- Browser Console - Error messages
- Firebase Console - Debug logs

## Contact

- Email: info@aipreneurs2025.com
- Phone: +1 (555) 123-4567
- Website: www.aipreneurs2025.com

---

**Version**: 1.0.0  
**Last Updated**: January 2025  
**Status**: Production Ready

### Quick Links

- [Full Documentation](README.md)
- [Firebase Setup Guide](FIREBASE_SETUP.md)
- [Home Page](index.html)
- [Student Login](pages/student-login.html)
- [Admin Login](pages/admin-login.html)
