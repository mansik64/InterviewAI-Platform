# InterviewAI – AI Powered Interview Preparation Platform

> An AI-powered full-stack interview preparation platform that helps students and job seekers improve their interview performance through resume analysis, role-based mock interviews, AI evaluation, personalized feedback, and professional reports.

🌐 **Live Demo:** https://interview-ai-platform-ten.vercel.app/

---

# Overview

InterviewAI is a modern web application designed to simulate real interview experiences and provide intelligent feedback using Artificial Intelligence.

The platform enables users to upload resumes, receive ATS-based resume analysis, generate role-specific interview questions, submit answers via text or voice, receive AI-powered evaluations, and track their improvement through interactive dashboards.

The project demonstrates full-stack development, AI integration, cloud deployment, authentication, file processing, and scalable architecture.

---

# Problem Statement

Many students and job seekers struggle with:

* Lack of real interview experience
* Difficulty identifying resume weaknesses
* Limited personalized feedback
* Inability to track interview performance over time
* Insufficient preparation for technical and HR interviews

InterviewAI addresses these challenges by providing AI-driven resume analysis, mock interviews, performance evaluation, and actionable improvement recommendations.

---

# Key Features

## Authentication System

* User Registration
* Secure User Login
* JWT Authentication
* Protected Routes
* Password Hashing using bcryptjs
* Session Management

---

## AI Resume Analysis

Users can upload resumes in PDF format and receive detailed AI-generated insights.

### Features

* PDF Resume Upload
* Resume Text Extraction
* ATS Compatibility Score
* Skill Identification
* Missing Keyword Detection
* Experience Analysis
* Resume Strength Assessment
* AI Improvement Suggestions
* Professional PDF Report Generation

---

## AI Mock Interview Generator

Generate customized interview sessions based on selected job roles.

### Features

* Technical Interview Questions
* HR Interview Questions
* Role-Based Question Generation
* Dynamic AI Questioning
* Multiple Interview Categories
* Realistic Interview Simulation

---

## Speech-to-Text Interview Support

Users can answer interview questions using voice.

### Features

* Voice Recording
* Speech-to-Text Conversion
* Real-Time Transcription
* Hands-Free Interview Experience
* Improved Accessibility

---

## AI Evaluation System

AI analyzes submitted answers and generates detailed feedback.

### Evaluation Metrics

* Relevance
* Technical Accuracy
* Completeness
* Communication Skills
* Confidence Level
* Problem-Solving Approach
* Clarity of Response

### Feedback Includes

* Strengths
* Weak Areas
* Suggested Improvements
* Performance Score
* Personalized Recommendations

---

## Personalized Learning Recommendations

Based on interview performance, the platform recommends improvement areas.

### Features

* Skill Gap Analysis
* Recommended Topics
* Learning Roadmap
* Improvement Suggestions
* Interview Preparation Guidance

---

## Dashboard & Analytics

Track interview and resume performance through an interactive dashboard.

### Dashboard Features

* ATS Score Tracking
* Interview Score Tracking
* Resume History
* Interview History
* Performance Trends
* Improvement Analytics
* Download Previous Reports

---

## Professional PDF Reports

Generate downloadable reports for both resumes and interviews.

### Report Contents

* ATS Analysis
* Interview Scores
* AI Feedback
* Strengths & Weaknesses
* Learning Recommendations
* Improvement Plan

---

## Admin Dashboard

Administrative features for managing platform activity.

### Features

* User Management
* Interview Statistics
* Resume Analytics
* System Monitoring
* Platform Usage Reports

---

# Project Workflow

## Resume Analysis Flow

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

Store Data in Database
```

## Interview Flow

```text
Select Job Role

↓

Generate AI Questions

↓

Start Interview

↓

Submit Answers (Text/Voice)

↓

AI Evaluation

↓

Performance Analysis

↓

Personalized Feedback

↓

Learning Recommendations

↓

Generate PDF Report

↓

Store Interview History
```

---

# Project Architecture

```text
                    User

                      │

               Next.js Frontend

                      │

       ┌──────────────┼──────────────┐
       │              │              │

 Authentication   Resume AI    Interview AI

       │              │              │

   Supabase       Gemini AI     Groq/Gemini

       │              │              │

              Express.js Backend

                      │

               PostgreSQL Database
```

---

# Technology Stack

## Frontend

* Next.js 15
* React.js
* TypeScript
* Tailwind CSS
* Zustand

## Backend

* Node.js
* Express.js

## AI Services

* Google Gemini API
* Groq API

## Database

* PostgreSQL
* Supabase

## Authentication

* JWT Authentication
* bcryptjs

## File Processing

* Multer
* PDF Parse
* PDFKit

## Real-Time Communication

* WebSockets
* Socket.io

## Speech Processing

* Web Speech API
* Speech-to-Text Integration

## Deployment

* Frontend → Vercel
* Backend → Render
* Database → Supabase

---

# Folder Structure

```text
InterviewAI-Platform/

├── frontend/
│
├── app/
├── components/
├── store/
├── public/
│
├── backend/
│
├── config/
├── controllers/
├── middleware/
├── routes/
├── services/
├── uploads/
├── reports/
│
└── README.md
```

---

# API Endpoints

## Authentication

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
```

## Resume

```http
POST /api/resume/upload
GET  /api/resume/history
GET  /api/resume/report/:id
```

## Interview

```http
POST /api/interview/generate
POST /api/interview/evaluate
GET  /api/interview/history
GET  /api/interview/report/:id
```

---

# Environment Variables

## Backend

```env
PORT=
JWT_SECRET=

GEMINI_API_KEY=
GROQ_API_KEY=

SUPABASE_URL=
SUPABASE_KEY=

DATABASE_URL=
```

## Frontend

```env
NEXT_PUBLIC_API_URL=
```

---

# Security Features

* JWT Authentication
* Password Hashing
* Protected API Routes
* Secure Environment Variables
* Input Validation
* File Upload Validation
* Secure Database Connections
* Authentication Middleware

---

# Performance Optimizations

* Modular Architecture
* Reusable Components
* Efficient Database Queries
* State Management with Zustand
* Optimized API Calls
* Cloud Deployment
* Scalable Backend Design

---

# Challenges Solved During Development

* Replaced hardcoded localhost URLs
* Configured production environment variables
* Fixed Vercel deployment issues
* Resolved Render file path problems
* Optimized PDF generation
* Implemented secure authentication
* Managed cloud-based file handling
* Improved database performance

---

# Future Enhancements

* AI Voice Interviews
* Real-Time Video Interviews
* Camera-Based Interview Monitoring
* Advanced Speech Analysis
* Interview Difficulty Levels
* Multi-Language Support
* Email Report Delivery
* AI Career Guidance
* Company-Specific Interview Preparation
* Advanced Analytics Dashboard

---

# Outcomes

The platform provides:

1. Secure user authentication.
2. AI-powered mock interviews.
3. Resume analysis and ATS scoring.
4. Speech-to-text interview support.
5. AI-generated feedback reports.
6. Personalized learning recommendations.
7. Performance tracking dashboards.
8. Downloadable PDF reports.
9. Admin management capabilities.
10. Responsive web experience across devices.

---


---

# Installation Guide

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/InterviewAI-Platform.git

cd InterviewAI-Platform
```

## Backend Setup

```bash
cd backend

npm install

npm run dev
```

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# Deployment

## Frontend

Platform: Vercel

## Backend

Platform: Render

## Database

Platform: Supabase PostgreSQL

---

# Highlights

* AI-Powered Interview Preparation Platform
* ATS Resume Analysis Engine
* Role-Based Mock Interview Generator
* Speech-to-Text Support
* AI Evaluation & Feedback System
* Personalized Learning Recommendations
* Professional PDF Reports
* Interactive Performance Dashboard
* Secure Authentication
* Cloud-Native Deployment

---

# Author

**Mansi Shukla**.☘︎ ݁˖

Aspiring Software Developer
Email - 24mansishukla614@gmail.com

---

# License

This project is developed for educational, portfolio, and interview demonstration purposes.

© 2026 InterviewAI. All Rights Reserved.
