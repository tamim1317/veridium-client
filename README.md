# Veridium | Asset Management System

Veridium is a powerful, high-performance Asset Management System designed for HR Managers and Employees. It streamlines the process of tracking company property, managing employee affiliations, and monitoring inventory stock with a professional, user-friendly interface.

## Live Demo
[Insert your Netlify/Vercel Link Here]

## Tech Stack
- **Frontend:** React.js, Tailwind CSS, DaisyUI, TanStack Query
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** Firebase Auth
- **PDF Generation:** React-to-Print
- **Notifications:** React Hot Toast, SweetAlert2

## Key Features

### For HR Managers
- **Subscription Packages:** Choose between 5, 10, or 20 employee limits during registration.
- **Asset Inventory:** Add, update, and track "Returnable" and "Non-returnable" items.
- **Request Management:** Approve or reject asset requests with automated inventory adjustment.
- **Analytics:** Visual dashboard charts showing requested vs. available items.

### For Employees
- **Asset Requesting:** Search and request available company assets.
- **My Assets:** Track assigned assets, view status, and return items.
- **PDF Reports:** Generate and download official asset assignment reports.

## Logic Highlights (Zero Tolerance Requirements)
- **Inventory Control:** Assets are automatically deducted from stock upon HR approval and added back upon return.
- **Affiliation Guard:** Employees cannot access company features until an HR Manager approves their affiliation.
- **Package Enforcement:** HR Managers are blocked from adding more employees than their selected plan allows.

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone (https://github.com/tamim1317/veridium-client.git)