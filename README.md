# InterviewAI – AI Powered Interview Preparation Platform

> An AI-powered full-stack interview preparation platform that helps students and job seekers improve their interview skills through resume analysis, role-based mock interviews, AI evaluation, personalized feedback, and professional reports.

🌐 **Live Demo:** https://interview-ai-platform-ten.vercel.app/

---

## Overview

InterviewAI is a modern web application that simulates real interview experiences using Artificial Intelligence.

Users can upload resumes, receive ATS-based analysis, generate role-specific interview questions, answer interviews, receive AI-generated feedback, and track their performance over time.

The project demonstrates full-stack development, AI integration, secure authentication, cloud deployment, file processing, and scalable application architecture.

---

## Problem Statement

Many students and job seekers face challenges such as:

* Lack of real interview experience
* Difficulty identifying resume weaknesses
* Limited personalized feedback
* Inability to track interview performance
* Insufficient preparation for technical and HR interviews

InterviewAI addresses these challenges through AI-powered resume analysis, mock interviews, performance evaluation, and actionable recommendations.

---

## Features

### Authentication

* User Registration
* Secure Login
* JWT Authentication
* Protected Routes
* Password Hashing using bcryptjs

---

### AI Resume Analysis

Users can upload PDF resumes and receive AI-generated insights.

Features:

* PDF Resume Upload
* Resume Content Extraction
* ATS Compatibility Score
* Skill Identification
* Missing Keyword Detection
* Experience Analysis
* Improvement Suggestions
* PDF Report Generation

---

### AI Mock Interviews

Generate customized interview sessions based on selected job roles.

Features:

* Technical Questions
* HR Questions
* Role-Based Interview Generation
* Dynamic AI Questioning
* Realistic Interview Simulation

---

### AI Evaluation System

AI evaluates interview responses and generates detailed feedback.

Evaluation Metrics:

* Relevance
* Technical Accuracy
* Completeness
* Communication Skills
* Clarity of Response

Feedback Includes:

* Strengths
* Areas for Improvement
* Personalized Recommendations
* Performance Score

---

### Personalized Learning Recommendations

Based on interview performance:

* Skill Gap Analysis
* Recommended Topics
* Learning Roadmap
* Improvement Suggestions

---

### Dashboard

Track overall performance through interactive analytics.

Features:

* ATS Score Tracking
* Interview Score Tracking
* Resume History
* Interview History
* Download Previous Reports

---

### PDF Reports

Generate downloadable reports containing:

* ATS Analysis
* Interview Scores
* AI Feedback
* Strengths & Weaknesses
* Improvement Plan

---

## Project Workflow

### Resume Analysis Flow

```text
Upload Resume
     ↓
Extract Resume Content
     ↓
AI Resume Analysis
     ↓
ATS Score Generation
     ↓
Improvement Suggestions
     ↓
Generate PDF Report
     ↓
Store Data
```

### Interview Flow

```text
Select Job Role
     ↓
Generate AI Questions
     ↓
Start Interview
     ↓
Submit Answers
     ↓
AI Evaluation
     ↓
Performance Analysis
     ↓
Personalized Feedback
     ↓
Generate PDF Report
```

---

## Architecture

```text
                    User
                      │
              Next.js Frontend
                      │
               Express.js API
         ┌──────────┼──────────┐
         │          │          │
     Gemini AI   Groq AI   Supabase DB
         │                      │
 Resume Analysis      User & Report Data
```

---

## Technology Stack

### Frontend

* Next.js
* React.js
* TypeScript
* Tailwind CSS

### Backend

* Node.js
* Express.js

### AI Services

* Google Gemini API
* Groq API

### Database

* PostgreSQL
* Supabase

### Authentication

* JWT
* bcryptjs

### File Processing

* Multer
* PDF Parse
* PDFKit

### Deployment

* Frontend → Vercel
* Backend → Render
* Database → Supabase

---

## Folder Structure

```text
InterviewAI-Platform/

├── frontend/
│   ├── app/
│   ├── components/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
```

### Resume

```http
POST /api/resume/upload
GET  /api/resume/history
GET  /api/resume/report/:id
```

### Interview

```http
POST /api/interview/generate
POST /api/interview/evaluate
GET  /api/interview/history
GET  /api/interview/report/:id
```

---

## Environment Variables

### Backend

```env
PORT=

JWT_SECRET=

GEMINI_API_KEY=

GROQ_API_KEY=

SUPABASE_URL=

SUPABASE_KEY=

DATABASE_URL=
```

### Frontend

```env
NEXT_PUBLIC_API_URL=
```

---

## Security Features

* JWT Authentication
* Password Hashing
* Protected API Routes
* Input Validation
* Secure Environment Variables
* Secure Database Connections

---

## Challenges Solved

* Replaced hardcoded localhost URLs
* Configured production environment variables
* Fixed Vercel deployment issues
* Resolved backend deployment issues
* Optimized PDF generation
* Implemented secure authentication
* Improved database integration

---

## Future Enhancements

* AI Voice Interviews
* Real-Time Video Interviews
* Multi-Language Support
* AI Career Guidance
* Company-Specific Interview Preparation
* Advanced Analytics Dashboard

---

## Outcomes

The platform provides:

1. AI-powered mock interviews
2. Resume analysis and ATS scoring
3. AI-generated feedback
4. Personalized recommendations
5. Performance tracking
6. Downloadable PDF reports
7. Secure authentication
8. Responsive user experience

---



## Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/InterviewAI-Platform.git

cd InterviewAI-Platform
```

### Backend Setup

```bash
cd backend

npm install

npm run dev
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## Author

**Mansi Shukla**

Aspiring Software Developer

📧 [24mansishukla614@gmail.com](mailto:24mansishukla614@gmail.com).☘︎ ݁˖

---

## License

This project is developed for educational, portfolio, and demonstration purposes.
© 2026 InterviewAI. All Rights Reserved.
