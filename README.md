# Cấu trúc cơ bản dự án

```js
src/
├── assets/              # Ảnh, icon, font...
├── components/          # Các component tái sử dụng toàn app
│   └── common/          # Button, Modal, Input, etc.
├── layouts/             # Layout cho từng nhóm người dùng
│   ├── PublicLayout/
│   ├── UserLayout/
│   ├── ConsultantLayout/
│   ├── StaffLayout/
│   ├── ManagerLayout/
│   └── AdminLayout/
├── pages/               # Routing-level pages chia theo role
│   ├── public/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Services.jsx
│   │   ├── Contact.jsx
│   │   └── blog/
│   │       ├── index.jsx
│   │       └── [id].jsx
│   ├── user/
│   │   ├── Dashboard.jsx
│   │   ├── Profile.jsx
│   │   ├── CycleTracking.jsx
│   │   ├── Feedback.jsx
│   │   ├── consultation/
│   │   │   ├── Book.jsx
│   │   │   ├── Questions.jsx
│   │   │   └── History.jsx
│   │   └── test/
│   │       ├── History.jsx
│   │       └── Results.jsx
│   ├── consultant/
│   │   ├── Dashboard.jsx
│   │   ├── Schedule.jsx
│   │   ├── Questions.jsx
│   │   └── Profile.jsx
│   ├── staff/
│   │   ├── Dashboard.jsx
│   │   ├── TestManagement.jsx
│   │   └── ResultUpload.jsx
│   ├── manager/
│   │   ├── Dashboard.jsx
│   │   ├── Consultants.jsx
│   │   ├── Feedback.jsx
│   │   ├── Report.jsx
│   │   └── BlogManagement.jsx
│   └── admin/
│       ├── Dashboard.jsx
│       ├── UserRoles.jsx
│       └── SystemConfig.jsx
├── routes/              # Định tuyến sử dụng react-router-dom
│   └── AppRoutes.jsx
├── services/            # API service layer
│   └── api.js
├── hooks/               # Custom hooks
├── contexts/            # React context (Auth, Theme, etc.)
├── utils/               # Hàm tiện ích
├── constants/           # Biến cố định, enum, role, etc.
├── App.jsx              # App gốc
└── main.jsx             # Entry point (ReactDOM.createRoot)
```
