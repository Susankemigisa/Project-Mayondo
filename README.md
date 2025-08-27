Mayondo Wood & Furniture Management System

A browser-based management system built with HTML, CSS, JavaScript, and LocalStorage.
It helps small/medium businesses manage daily operations including sales, inventory, staff attendance, and product approvals.

🚀 Features
# Sales Management

Record daily sales (with receipt printing).

Apply 5% transport fee when applicable.

Generates individual customer receipts.

Manager batch reports with total sales, transport fees, and payment breakdown.

# Inventory Management

Add products in a structured table.

Edit, delete, or send items for manager approval.

Inventory report with total stock, value, and supplier breakdown.

# Approvals

Admin can approve or reject products submitted from inventory.

Separate tables for pending, approved, and rejected products.

Capture rejection reason for transparency.


# Users & Roles

Multiple roles supported:

Attendant → sales,

Manager → sales, reports, inventory monitoring.

Admin/CEO → system settings, analytics, KPIs, reports, approvals.

# System Settings & Analytics

Configure app preferences and data.

Analytics & KPI dashboard for executives.

High-level business reports and strategy insights.

# Tech Stack

Frontend: HTML5, CSS3, Bootstrap 5

Logic: Vanilla JavaScript (no external frameworks)

Storage: LocalStorage (browser-based persistence)

# Project Structure
project-root/
 index.html          # Unified login & dashboard
 sales.html          # Sales entry + receipts
 inventory.html      # Inventory management
 approvals.html      # Approve/reject products
 settings.html       # System settings page
 users.html          # User management page
 analytics.html      # KPIs & insights
 executivesummary.html # High-level reports & strategy
 images/             # Logo and static assets
 README.md           # Documentation

 #Installation

Clone the repository:

git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git


Open index.html in your browser.
(No backend or server setup required — works fully offline!)

# Usage

Login with role-based credentials (Manager, Admin, Attendant, CEO).

Navigate via dashboard to respective modules.

Data is stored locally in your browser (localStorage).

Use the Print / Download buttons in Sales, Inventory, and Attendance to export reports.

 #Future Improvements

 Migrate LocalStorage to a database (e.g., Firebase, Supabase, or MySQL).

 Mobile-friendly responsive UI.

 Export reports in Excel/PDF format directly.

 Multi-user authentication with sessions.

 #Author
Suzan Kemigisa
Built for Mayondo Wood & Furniture digital transformation.
