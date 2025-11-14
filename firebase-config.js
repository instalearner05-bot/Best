// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDemoKey123456789",
    authDomain: "aipreneurs-2025.firebaseapp.com",
    projectId: "aipreneurs-2025",
    storageBucket: "aipreneurs-2025.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef1234567890"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Authentication Functions
async function registerUser(email, password, userType) {
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Store user data in Firestore
        await db.collection("users").doc(user.uid).set({
            uid: user.uid,
            email: email,
            userType: userType,
            createdAt: new Date(),
            status: "pending",
            school: "",
            fullName: "",
            phone: ""
        });

        return { success: true, user: user };
    } catch (error) {
        console.error("Registration error:", error);
        return { success: false, error: error.message };
    }
}

async function loginUser(email, password) {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        return { success: true, user: userCredential.user };
    } catch (error) {
        console.error("Login error:", error);
        return { success: false, error: error.message };
    }
}

async function logoutUser() {
    try {
        await auth.signOut();
        return { success: true };
    } catch (error) {
        console.error("Logout error:", error);
        return { success: false, error: error.message };
    }
}

function getCurrentUser() {
    return auth.currentUser;
}

// User Data Functions
async function getUserData(uid) {
    try {
        const doc = await db.collection("users").doc(uid).get();
        if (doc.exists) {
            return { success: true, data: doc.data() };
        }
        return { success: false, error: "User not found" };
    } catch (error) {
        console.error("Error fetching user:", error);
        return { success: false, error: error.message };
    }
}

async function updateUserData(uid, data) {
    try {
        await db.collection("users").doc(uid).update(data);
        return { success: true };
    } catch (error) {
        console.error("Error updating user:", error);
        return { success: false, error: error.message };
    }
}

// Announcement Functions
async function createAnnouncement(title, content, createdBy) {
    try {
        const docRef = await db.collection("announcements").add({
            title: title,
            content: content,
            createdBy: createdBy,
            createdAt: new Date(),
            updatedAt: new Date(),
            status: "published"
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error creating announcement:", error);
        return { success: false, error: error.message };
    }
}

async function getAnnouncements() {
    try {
        const snapshot = await db.collection("announcements")
            .orderBy("createdAt", "desc")
            .get();
        const announcements = [];
        snapshot.forEach(doc => {
            announcements.push({ id: doc.id, ...doc.data() });
        });
        return { success: true, data: announcements };
    } catch (error) {
        console.error("Error fetching announcements:", error);
        return { success: false, error: error.message };
    }
}

// Task Functions
async function createTask(title, description, dueDate, stage) {
    try {
        const docRef = await db.collection("tasks").add({
            title: title,
            description: description,
            dueDate: new Date(dueDate),
            stage: stage,
            createdAt: new Date(),
            status: "active"
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error creating task:", error);
        return { success: false, error: error.message };
    }
}

async function getTasks() {
    try {
        const snapshot = await db.collection("tasks")
            .orderBy("dueDate", "asc")
            .get();
        const tasks = [];
        snapshot.forEach(doc => {
            tasks.push({ id: doc.id, ...doc.data() });
        });
        return { success: true, data: tasks };
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return { success: false, error: error.message };
    }
}

// Submission Functions
async function submitTask(taskId, userId, fileUrl, description) {
    try {
        const docRef = await db.collection("submissions").add({
            taskId: taskId,
            userId: userId,
            fileUrl: fileUrl,
            description: description,
            submittedAt: new Date(),
            status: "pending",
            feedbackStatus: "awaiting"
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error submitting task:", error);
        return { success: false, error: error.message };
    }
}

async function getSubmissions(filter = {}) {
    try {
        let query = db.collection("submissions");

        if (filter.taskId) {
            query = query.where("taskId", "==", filter.taskId);
        }

        if (filter.status) {
            query = query.where("status", "==", filter.status);
        }

        const snapshot = await query.orderBy("submittedAt", "desc").get();
        const submissions = [];
        snapshot.forEach(doc => {
            submissions.push({ id: doc.id, ...doc.data() });
        });
        return { success: true, data: submissions };
    } catch (error) {
        console.error("Error fetching submissions:", error);
        return { success: false, error: error.message };
    }
}

async function updateSubmissionStatus(submissionId, status, feedback = "") {
    try {
        const updateData = {
            status: status,
            feedbackStatus: "reviewed",
            updatedAt: new Date()
        };

        if (feedback) {
            updateData.feedback = feedback;
        }

        await db.collection("submissions").doc(submissionId).update(updateData);
        return { success: true };
    } catch (error) {
        console.error("Error updating submission:", error);
        return { success: false, error: error.message };
    }
}

// Participants Management
async function getAllParticipants(filter = {}) {
    try {
        let query = db.collection("users").where("userType", "==", "student");

        if (filter.status) {
            query = query.where("status", "==", filter.status);
        }

        const snapshot = await query.get();
        const participants = [];
        snapshot.forEach(doc => {
            participants.push({ id: doc.id, ...doc.data() });
        });
        return { success: true, data: participants };
    } catch (error) {
        console.error("Error fetching participants:", error);
        return { success: false, error: error.message };
    }
}

async function updateParticipantStatus(userId, status, stage = "") {
    try {
        const updateData = { status: status };
        if (stage) updateData.stage = stage;

        await db.collection("users").doc(userId).update(updateData);
        return { success: true };
    } catch (error) {
        console.error("Error updating participant:", error);
        return { success: false, error: error.message };
    }
}

async function deleteParticipant(userId) {
    try {
        await db.collection("users").doc(userId).delete();
        return { success: true };
    } catch (error) {
        console.error("Error deleting participant:", error);
        return { success: false, error: error.message };
    }
}

// File Upload
async function uploadFile(file, path) {
    try {
        const storageRef = storage.ref(`${path}/${Date.now()}_${file.name}`);
        const snapshot = await storageRef.put(file);
        const downloadURL = await snapshot.ref.getDownloadURL();
        return { success: true, url: downloadURL };
    } catch (error) {
        console.error("Error uploading file:", error);
        return { success: false, error: error.message };
    }
}

// Dashboard Statistics
async function getDashboardStats() {
    try {
        // Total registrations
        const usersSnapshot = await db.collection("users").where("userType", "==", "student").get();
        const totalRegistrations = usersSnapshot.size;

        // Verified participants
        const verifiedSnapshot = await db.collection("users")
            .where("userType", "==", "student")
            .where("status", "==", "approved")
            .get();
        const verifiedParticipants = verifiedSnapshot.size;

        // Pending submissions
        const pendingSnapshot = await db.collection("submissions")
            .where("status", "==", "pending")
            .get();
        const pendingSubmissions = pendingSnapshot.size;

        // Completed tasks
        const completedSnapshot = await db.collection("submissions")
            .where("status", "==", "approved")
            .get();
        const completedTasks = completedSnapshot.size;

        return {
            success: true,
            data: {
                totalRegistrations,
                verifiedParticipants,
                pendingSubmissions,
                completedTasks
            }
        };
    } catch (error) {
        console.error("Error fetching stats:", error);
        return { success: false, error: error.message };
    }
}

// Redirect based on user type
async function redirectUser(user) {
    try {
        const userDoc = await db.collection("users").doc(user.uid).get();
        if (userDoc.exists) {
            const userType = userDoc.data().userType;
            switch (userType) {
                case "student":
                    window.location.href = "/pages/student-dashboard.html";
                    break;
                case "volunteer":
                    window.location.href = "/pages/volunteer-dashboard.html";
                    break;
                case "admin":
                    window.location.href = "/pages/admin-dashboard.html";
                    break;
                default:
                    window.location.href = "/index.html";
            }
        }
    } catch (error) {
        console.error("Redirect error:", error);
        window.location.href = "/index.html";
    }
}

// Authentication state observer
auth.onAuthStateChanged(async (user) => {
    if (user) {
        console.log("User logged in:", user.email);
        // User-specific initialization can go here
    } else {
        console.log("User logged out");
    }
});
