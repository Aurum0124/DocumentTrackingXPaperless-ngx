# Document Tracking X PaperlessNGX

A modern document management and tracking system built with React, designed for government workflows and integrated with Paperless-ngx.

## 🚀 Features

- **Custom Tracking Codes:** Search and track documents using unique codes (TRK-YYYY-XXXX format).
- **Department-Based Management:** Multi-department interface with role-based access control.
- **Document Status Management:** Track the lifecycle of documents (Under Review, Approved, Rejected, etc.).
- **Document Forwarding:** Seamlessly forward documents between departments.
- **File Upload & Processing:** Upload new documents with automatic tracking code generation.
- **Real-Time Status Updates:** Live polling for document processing status.
- **Responsive Design:** Modern, mobile-friendly user interface.
- **Integration with Paperless-ngx:** Connects to Paperless-ngx for backend document management.
- **Custom Fields:** Store tracking codes and status information.
- **Filtering & Search:** Find documents by various criteria.
- **Role-Based Access:** Secure access for different department roles.
- **Optimized for Government Workflows:** Designed for public sector document management.

---

## 🗺️ Frontend Routing

The application uses **React Router** for client-side routing. The main routes are:

| Path                  | Component                | Description                                                                 |
|-----------------------|-------------------------|-----------------------------------------------------------------------------|
| `/login`              | `LoginForm`             | Login page for department staff.                                            |
| `/pgin-receiving`     | `DepartmentDashboard`   | Dashboard for the Receiving Office.                                         |
| `/pgin-hr`            | `DepartmentDashboard`   | Dashboard for the Human Resource Department.                                |
| `/pgin-oba`           | `DepartmentDashboard`   | Dashboard for the Office of Barangay Affairs.                               |
| `/pgin-govoffice`     | `DepartmentDashboard`   | Dashboard for the Governor's Office.                                        |
| `/*` (any other path) | `PublicTracker`         | Public document tracking interface (default for citizens and unknown paths). |

---

## Public Tracker
<img width="1916" height="915" alt="LOGIN" src="https://github.com/user-attachments/assets/88e82489-ca86-49e3-b6bd-4a66903da7c4" />

---

## Login
<img width="1918" height="906" alt="loggingin" src="https://github.com/user-attachments/assets/794ea59c-296c-4d6c-8339-0584a6bee992" />

---

## Department Dashboard
<img width="1920" height="914" alt="dashboard" src="https://github.com/user-attachments/assets/a58d95e2-d943-49a2-ab46-68d89455ff7c" />

---


## 📄 Document List View Features

The Document List view provides a powerful interface for managing and tracking documents within each department. Key features include:

- **Document Card View:**  
  Displays documents as cards with key details for quick visual scanning.  

  <img width="1561" height="633" alt="cardview" src="https://github.com/user-attachments/assets/62a96085-2ddb-4498-91b0-6bcc6f0cd883" />

- **One-Liner View:**  
  Switch to a compact, table-like row view for dense information display.  

  <img width="1581" height="206" alt="1 liner" src="https://github.com/user-attachments/assets/c0cea727-a70f-4c96-b847-a782320a50c1" />
  
- **One-Liner (Thumbnail) View:**  
  Switch to a compact, table-like row view for dense information display.  

  <img width="1582" height="599" alt="thumb1" src="https://github.com/user-attachments/assets/6daad75c-5657-4b36-ae13-0b608ac87102" />

- **Search by Tracking Code and Status Filtering:**  
  Instantly find documents using their unique tracking code (TRK-YYYY-XXXX format).  
  Filter documents by their current status (e.g., Under Review, Approved, Rejected).

  <img width="747" height="85" alt="searhnfilter" src="https://github.com/user-attachments/assets/573bec83-1b09-46d2-8587-b6797ec1b021" />

- **Department Forwarding:**  
  Forward document to another department.

  <img width="363" height="519" alt="forwarding" src="https://github.com/user-attachments/assets/86d2fdde-445d-46a5-87ee-f1c01db8d501" />
  
- **View Document:**  
  <img width="1920" height="912" alt="documenthistory" src="https://github.com/user-attachments/assets/3fcc0c21-afae-4fad-83d4-eccc5d8add68" />

---




