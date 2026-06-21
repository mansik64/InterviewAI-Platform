# InterviewAI - AI Powered Interview Preparation Platform

> An end-to-end AI-powered interview preparation platform that helps users analyze resumes, generate role-based mock interviews, receive AI-driven feedback, and download professional PDF reports.

🌐 Live Demo: https://interview-ai-platform-ten.vercel.app/

---

## Overview

InterviewAI is a full-stack web application built to streamline interview preparation using Artificial Intelligence.

The platform allows users to:

- Upload resumes for AI analysis
- Get ATS scoring and improvement suggestions
- Generate role-based mock interviews
- Receive personalized AI feedback
- Download professional PDF reports
- Track previous interview and resume history

This project combines AI, cloud deployment, and modern web technologies to simulate a real-world interview preparation ecosystem.

---

## Key Features

### Authentication System

- User Registration
- User Login
- JWT Authentication
- Protected Routes

### AI Resume Analysis

- PDF Resume Upload
- Resume Text Extraction
- ATS Score Generation
- Skill Identification
- AI Improvement Suggestions
- Professional PDF Report Generation

### AI Mock Interview Generator

- Role-Based Interview Generation
- AI Evaluation of Answers
- Performance Analysis
- Personalized Feedback
- Confidence Improvement Suggestions
- Professional Interview Report Generation

### Dashboard & History

- Resume History
- Interview History
- Download Previous Reports

---

## Live Application

### Frontend (Vercel)

https://interview-ai-platform-ten.vercel.app/

### Backend (Render)

Deployed on Render Cloud Platform

### Database

Supabase PostgreSQL

---

## Project Architecture

```
                    User

                      |

               Next.js Frontend

                    (Vercel)

                      |

                      |

               Express.js Backend

                    (Render)

         --------------------------------

         |              |               |

      Gemini AI       Groq AI       Supabase

         |                              |

         |                              |

  AI Processing                 PostgreSQL DB

```

---

## Tech Stack

### Frontend

- Next.js 15
- React.js
- TypeScript
- Tailwind CSS
- Zustand

### Backend

- Node.js
- Express.js

### Database

- Supabase

### Artificial Intelligence

- Google Gemini API
- Groq API

### File Processing

- Multer
- PDF Parse
- PDFKit

### Authentication

- JWT (JSON Web Tokens)
- bcryptjs

### Deployment

- Frontend → Vercel
- Backend → Render
- Database → Supabase

---

## Folder Structure

```
InterviewAI-Platform/

├── frontend/

│   ├── app/

│   ├── components/

│   ├── store/

│   └── public/

│

├── backend/

│   ├── config/

│   ├── controllers/

│   ├── routes/

│   ├── services/

│   ├── uploads/

│   └── reports/

│

└── README.md

```

---

## Application Workflow

### Resume Analysis Flow

```
Upload Resume

↓

Extract PDF Text

↓

AI Resume Analysis

↓

ATS Score Generation

↓

Suggestions Generation

↓

Generate PDF Report

↓

Store Data in Supabase

```

### Interview Flow

```
Select Job Role

↓

Generate AI Questions

↓

Submit Answers

↓

AI Evaluation

↓

Generate Feedback

↓

Generate PDF Report

↓

Store History

```

---

## Installation Guide

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

## Deployment

### Frontend

Platform: Vercel

### Backend

Platform: Render

### Database

Platform: Supabase

---

## Challenges Solved During Deployment

- Replaced hardcoded localhost URLs
- Configured environment variables
- Fixed Vercel production builds
- Resolved Render file path issues
- Configured PDF generation routes
- Implemented cloud-compatible file handling

---

## Security Features

- JWT Authentication
- Password Hashing
- Protected API Routes
- Environment Variable Management
- Secure Database Connections

---

## Future Enhancements

- AI Voice Interview
- Speech Analysis
- Real-time Camera Monitoring
- Interview Difficulty Levels
- Admin Dashboard
- Multi-language Support
- Analytics Dashboard
- Email Report Delivery

---

## Performance Optimizations

- Modular Architecture
- Reusable Components
- Cloud Deployment
- Scalable Backend Structure
- Efficient Database Queries

---

## Author

### Mansi Shukla

Aspiring Software Developer

GitHub: https://github.com/mansik64

---

## License

This project is developed for educational, portfolio, and interview demonstration purposes.

© 2026 InterviewAI. All Rights Reserved.
