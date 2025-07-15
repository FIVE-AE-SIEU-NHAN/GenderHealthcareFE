# 🌸 Care4Gender - Advanced Healthcare Platform

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.7-38B2AC.svg)](https://tailwindcss.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-5.80.6-FF4154.svg)](https://tanstack.com/query)

> **A comprehensive healthcare consultation platform specializing in gender-specific medical services with advanced appointment management, real-time communication, and multi-role dashboard architecture.**

## 🎯 Project Overview

Care4Gender is a sophisticated healthcare platform designed to provide specialized medical consultations with a focus on gender-specific health services. The platform features a comprehensive multi-role architecture supporting patients, consultants, managers, and administrators with distinct functionalities and interfaces.

### 🌟 Key Features

- **🔐 Advanced Authentication System** - Google OAuth integration, JWT-based auth, password recovery
- **👥 Multi-Role Architecture** - Customer, Consultant, Manager, and Admin roles with role-based access control
- **📅 Smart Appointment Management** - Calendar integration, booking system, payment processing
- **💬 Real-time Communication** - Socket.io-powered chat system and notifications
- **📊 Comprehensive Dashboards** - Role-specific dashboards with analytics and management tools
- **🏥 Consultant Management** - Profile management, specialization tracking, experience validation
- **❓ Q&A System** - Expert consultation through question-answer functionality
- **📝 Content Management** - Blog system, service listings, and educational content
- **💳 Payment Integration** - Secure payment processing with PayOS integration
- **📱 Responsive Design** - Mobile-first approach with modern UI/UX

## 🛠️ Technology Stack

### **Frontend Framework**

- **React 19.1.0** - Latest React with concurrent features
- **TypeScript 5.8.3** - Type-safe development
- **Vite 6.3.5** - Lightning-fast build tool

### **Styling & UI**

- **TailwindCSS 4.1.7** - Utility-first CSS framework
- **ShadCN UI** - Headless UI components for accessibility
- **Lucide React** - Beautiful icon library
- **Sal.js** - Smooth animations

### **State Management & Data Fetching**

- **TanStack Query 5.80.6** - Server state management
- **React Context** - Client state management
- **Axios** - HTTP client with interceptors

### **Form Management**

- **React Hook Form 7.57.0** - Performant forms
- **Zod 3.25.56** - Schema validation
- **@hookform/resolvers** - Form validation integration

### **Real-time Features**

- **Socket.io Client 4.8.1** - Real-time communication
- **React Context** - Socket state management

### **Additional Libraries**

- **React Router DOM 7.6.0** - Client-side routing
- **date-fns 4.1.0** - Date manipulation
- **JWT Decode 4.0.0** - Token handling
- **QR Code React** - QR code generation
- **Recharts 2.15.3** - Data visualization

## 🏗️ Architecture Overview

### **Project Structure**

```
src/
├── apis/                    # API service layer
│   ├── admin/              # Admin-specific APIs
│   ├── consultant/         # Consultant-specific APIs
│   ├── customer/           # Customer-specific APIs
│   ├── manager/            # Manager-specific APIs
│   └── authApi.ts          # Authentication APIs
├── Application/            # Core application logic
│   ├── constants/          # Application constants
│   └── router/             # Routing configuration
├── components/             # Reusable UI components
│   ├── layouts/            # Layout components
│   ├── ui/                 # Base UI components (Radix-based)
│   └── [feature-specific]  # Feature components
├── contexts/               # React Context providers
├── hooks/                  # Custom React hooks
├── pages/                  # Page components
│   ├── Admin/              # Admin dashboard pages
│   ├── Auth/               # Authentication pages
│   ├── Common/             # Shared pages
│   ├── Consultant/         # Consultant dashboard pages
│   ├── Content/            # Public content pages
│   ├── Customer/           # Customer dashboard pages
│   └── Manager/            # Manager dashboard pages
├── types/                  # TypeScript type definitions
└── utils/                  # Utility functions
```

### **Multi-Role System**

#### **🔑 Admin Dashboard**

- **User Management** - CRUD operations for all user types
- **Content Management** - Blog creation and management
- **System Analytics** - Platform usage statistics
- **Role Assignment** - User role management

#### **👔 Manager Dashboard**

- **Consultant Management** - Consultant profile oversight
- **Appointment Oversight** - Appointment monitoring and management
- **Question Management** - Q&A system oversight
- **Analytics Dashboard** - Performance metrics

#### **🩺 Consultant Dashboard**

- **Profile Management** - Professional profile and credentials
- **Appointment Calendar** - Schedule management
- **Question Answering** - Expert consultation responses
- **Patient Communication** - Direct messaging system

#### **👤 Customer Dashboard**

- **Profile Management** - Personal information and preferences
- **Appointment History** - Past and upcoming appointments
- **Question Management** - Ask questions and view responses
- **Payment History** - Transaction records

## 🚀 Getting Started

### **Prerequisites**

- **Node.js** (v18+ recommended)
- **npm** or **yarn** package manager
- **Git** for version control

### **Installation**

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd care4genderfe
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file with the following variables:

   ```env
   VITE_GG_CLIENT_ID=your_google_oauth_client_id
   VITE_API_BASE_URL=your_backend_api_url
   VITE_SOCKET_URL=your_socket_server_url
   VITE_PAYMENT_API_URL=your_payment_api_url
   ```

4. **Start Development Server**

   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

### **Available Scripts**

- `npm run dev` - Start development server
- `npm run hdev` - Start development server with host flag
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build
- `npm run server` - Start custom server
- `npm run genlog` - Generate changelog

## 🔧 Development Guidelines

### **Code Organization**

- **API Layer** - All API calls centralized in `src/apis/`
- **Custom Hooks** - Reusable logic in `src/hooks/` using TanStack Query
- **Type Safety** - Comprehensive TypeScript interfaces in `src/types/`
- **Constants** - Application constants organized by feature

### **State Management**

- **Server State** - TanStack Query for API data caching and synchronization
- **Client State** - React Context for user authentication and socket connections
- **Form State** - React Hook Form with Zod validation

### **Styling Conventions**

- **Utility-First** - TailwindCSS for rapid development
- **Component Variants** - Class Variance Authority for component styling
- **Responsive Design** - Mobile-first approach
- **Design System** - Consistent spacing, colors, and typography

### **Performance Optimization**

- **Code Splitting** - Route-based code splitting
- **Image Optimization** - Optimized asset loading
- **Caching Strategy** - TanStack Query for intelligent caching
- **Bundle Analysis** - Regular bundle size monitoring

## 🔐 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Role-Based Access Control** - Granular permission system
- **Input Validation** - Zod schema validation
- **XSS Protection** - Input sanitization
- **HTTPS Enforcement** - Secure communication
- **Environment Variables** - Sensitive data protection

## 📱 Responsive Design

The platform is designed with a mobile-first approach, ensuring optimal user experience across all devices:

- **Mobile** (320px - 768px) - Touch-optimized interface
- **Tablet** (768px - 1024px) - Adaptive layout
- **Desktop** (1024px+) - Full-featured dashboard experience

## 🤝 API Integration

### **Backend Communication**

- **RESTful APIs** - Standard HTTP methods
- **Error Handling** - Comprehensive error management
- **Request Interceptors** - Authentication token handling
- **Response Caching** - TanStack Query integration

### **Real-time Features**

- **Socket.io Integration** - Live notifications and chat
- **Connection Management** - Automatic reconnection
- **Event Handling** - Structured event system

## 📊 Analytics & Monitoring

- **User Analytics** - Dashboard usage tracking
- **Performance Monitoring** - Application performance metrics
- **Error Tracking** - Client-side error monitoring
- **Appointment Analytics** - Booking and consultation metrics

## 🚀 Deployment

### **Production Build**

```bash
npm run build
```

### **Environment Setup**

- Configure production environment variables
- Set up SSL certificates
- Configure reverse proxy (nginx recommended)
- Set up monitoring and logging

## 📈 Future Roadmap

- **Mobile Application** - React Native implementation
- **AI Integration** - Smart consultation recommendations
- **Telemedicine** - Video consultation features
- **Advanced Analytics** - Machine learning insights
- **Multi-language Support** - Internationalization
- **Third-party Integrations** - EHR system integration

## 🤝 Contributing

We welcome contributions to the Care4Gender platform. Please ensure:

1. **Code Quality** - Follow TypeScript and React best practices
2. **Testing** - Include appropriate tests for new features
3. **Documentation** - Update documentation for significant changes
4. **Performance** - Consider performance implications of changes

## 📄 License

This project is proprietary software. All rights reserved.

## 👥 Team

- **Frontend Architecture** - Advanced React/TypeScript implementation
- **UI/UX Design** - Modern healthcare-focused design system
- **Backend Integration** - Seamless API integration
- **DevOps** - Optimized build and deployment pipeline

---

**Built with ❤️ for advancing healthcare accessibility and gender-specific medical services.**
