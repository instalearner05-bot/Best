// Common Utilities

// DOM Helpers
function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}

// Show/Hide Elements
function show(element) {
    if (typeof element === "string") element = $(element);
    element.classList.remove("hidden");
}

function hide(element) {
    if (typeof element === "string") element = $(element);
    element.classList.add("hidden");
}

function toggle(element) {
    if (typeof element === "string") element = $(element);
    element.classList.toggle("hidden");
}

// Modal Functions
function openModal(modalId) {
    const modal = $(modalId);
    if (modal) modal.classList.add("active");
}

function closeModal(modalId) {
    const modal = $(modalId);
    if (modal) modal.classList.remove("active");
}

// Close modal on overlay click
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("modal")) {
        e.target.classList.remove("active");
    }
});

// Alert Functions
function showAlert(message, type = "info") {
    const alertBox = document.createElement("div");
    alertBox.className = `alert alert-${type}`;
    alertBox.innerHTML = `
        <strong>${type.charAt(0).toUpperCase() + type.slice(1)}:</strong> ${message}
    `;

    const container = $(".page-header") || document.body;
    container.insertBefore(alertBox, container.firstChild);

    setTimeout(() => alertBox.remove(), 5000);
}

// Tab Switching
function switchTab(tabName) {
    const tabContents = $$(".tab-content");
    const tabButtons = $$(".tab-button");

    tabContents.forEach(tab => tab.classList.remove("active"));
    tabButtons.forEach(btn => btn.classList.remove("active"));

    const activeTab = $(`[data-tab="${tabName}"]`);
    const activeButton = $(`[data-tab-button="${tabName}"]`);

    if (activeTab) activeTab.classList.add("active");
    if (activeButton) activeButton.classList.add("active");
}

// Format Date
function formatDate(date) {
    if (!(date instanceof Date)) {
        if (date.toDate) date = date.toDate();
        else date = new Date(date);
    }
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });
}

function formatDateTime(date) {
    if (!(date instanceof Date)) {
        if (date.toDate) date = date.toDate();
        else date = new Date(date);
    }
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

// Format File Size
function formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

// Validation Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function validateForm(formData, rules) {
    const errors = {};
    for (let field in rules) {
        const value = formData[field];
        const rule = rules[field];

        if (rule.required && !value) {
            errors[field] = `${rule.label || field} is required`;
        } else if (rule.type === "email" && value && !validateEmail(value)) {
            errors[field] = `${rule.label || field} must be a valid email`;
        } else if (rule.type === "password" && value && !validatePassword(value)) {
            errors[field] = `${rule.label || field} must be at least 6 characters`;
        } else if (rule.minLength && value && value.length < rule.minLength) {
            errors[field] = `${rule.label || field} must be at least ${rule.minLength} characters`;
        }
    }
    return errors;
}

// Local Storage
function setStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getStorage(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
}

function removeStorage(key) {
    localStorage.removeItem(key);
}

// CSV Export
function exportToCSV(data, filename = "export.csv") {
    const csv = convertArrayToCSV(data);
    downloadCSV(csv, filename);
}

function convertArrayToCSV(data) {
    if (!data || data.length === 0) return "";

    const keys = Object.keys(data[0]);
    const header = keys.join(",");
    const rows = data.map(obj =>
        keys.map(key => {
            let value = obj[key];
            if (value === null || value === undefined) value = "";
            if (typeof value === "string" && value.includes(",")) {
                value = `"${value}"`;
            }
            return value;
        }).join(",")
    );

    return [header, ...rows].join("\n");
}

function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Create Table from Array
function createTable(data, columns = null) {
    if (!data || data.length === 0) return "<p>No data available</p>";

    const keys = columns || Object.keys(data[0]);
    const table = document.createElement("table");

    const thead = table.createTHead();
    const headerRow = thead.insertRow();
    keys.forEach(key => {
        const th = document.createElement("th");
        th.textContent = key.charAt(0).toUpperCase() + key.slice(1);
        headerRow.appendChild(th);
    });

    const tbody = table.createTBody();
    data.forEach(item => {
        const row = tbody.insertRow();
        keys.forEach(key => {
            const cell = row.insertCell();
            cell.textContent = item[key] || "";
        });
    });

    return table;
}

// Date Range Filter
function filterByDateRange(data, startDate, endDate, dateField = "date") {
    const start = new Date(startDate);
    const end = new Date(endDate);

    return data.filter(item => {
        let itemDate = item[dateField];
        if (itemDate.toDate) itemDate = itemDate.toDate();
        else itemDate = new Date(itemDate);

        return itemDate >= start && itemDate <= end;
    });
}

// Search Filter
function filterBySearch(data, searchTerm, searchFields = []) {
    if (!searchTerm) return data;

    const term = searchTerm.toLowerCase();
    return data.filter(item => {
        return searchFields.some(field => {
            const value = item[field];
            if (value === null || value === undefined) return false;
            return value.toString().toLowerCase().includes(term);
        });
    });
}

// Pagination
function paginate(data, pageSize = 10) {
    const pages = [];
    for (let i = 0; i < data.length; i += pageSize) {
        pages.push(data.slice(i, i + pageSize));
    }
    return pages;
}

// Debounce Function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle Function
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

// Add Event Listeners for Tab Buttons
document.addEventListener("DOMContentLoaded", function () {
    const tabButtons = $$(".tab-button");
    tabButtons.forEach(button => {
        button.addEventListener("click", function () {
            const tabName = this.getAttribute("data-tab-button");
            if (tabName) switchTab(tabName);
        });
    });

    // Modal close buttons
    const closeButtons = $$(".modal-close");
    closeButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            const modal = this.closest(".modal");
            if (modal) modal.classList.remove("active");
        });
    });
});

// Loading Spinner
function showLoading(element) {
    if (typeof element === "string") element = $(element);
    element.innerHTML = '<div style="text-align: center; padding: 2rem;"><div style="border: 4px solid #f3f4f6; border-top: 4px solid var(--primary-color); border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto;"></div></div>';
}

function hideLoading(element) {
    if (typeof element === "string") element = $(element);
    element.innerHTML = "";
}

// Add CSS animation for loading spinner
const style = document.createElement("style");
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// API Helper
async function apiCall(method, endpoint, data = null) {
    const options = {
        method: method,
        headers: {
            "Content-Type": "application/json"
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(endpoint, options);
        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        return { success: false, error: error.message };
    }
}
