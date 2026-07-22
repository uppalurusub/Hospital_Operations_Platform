# 🏥 Hospital Operations Platform

An AI-powered **Hospital Operations Platform** that leverages **AutoGen Multi-Agent AI**, **FastAPI**, and **React** to automate hospital operational decision-making.

The platform analyzes hospital operational data including admissions, bed occupancy, staffing, resources, and financial performance through a collaborative multi-agent architecture to generate intelligent recommendations for hospital administrators.

---

# 📑 Table of Contents

- Overview
- Features
- System Architecture
- Project Structure
- Technology Stack
- Backend Architecture
- Frontend Architecture
- Multi-Agent Workflow
- Installation
- Environment Variables
- Running the Backend
- Running the Frontend
- API Documentation
- Sample Request
- Sample Response
- MLflow Integration
- Logging
- Future Enhancements

---

# 📖 Overview

Hospital operations involve multiple interdependent departments such as admissions, bed management, staffing, finance, and resource allocation.

This platform provides an AI-driven operational assistant capable of:

- Predicting operational bottlenecks
- Optimizing bed utilization
- Monitoring staffing requirements
- Improving patient flow
- Tracking operational KPIs
- Generating actionable recommendations

The solution utilizes an **AutoGen Multi-Agent architecture**, where specialized AI agents collaborate to produce comprehensive operational insights.

---

# ✨ Features

## Backend

- FastAPI REST API
- AutoGen Multi-Agent Framework
- Operational Decision Engine
- Bed Management Analysis
- Admissions Analysis
- Staffing Optimization
- Resource Utilization Analysis
- Revenue Performance Analysis
- Central Operations Orchestrator
- Structured Request/Response Models
- Logging with Loguru
- MLflow Integration
- Environment-based Configuration

## Frontend

- React 19
- TypeScript
- Vite
- Responsive UI
- Operational Analysis Form
- Markdown-based AI Response Viewer
- Loading Indicators
- API Integration using Axios
- Modular Component Architecture

---

# 🏗 System Architecture

```
                React Frontend
                       │
                  Axios REST API
                       │
                  FastAPI Backend
                       │
          Operations Service Layer
                       │
        Operations Implementation
                       │
       AutoGen Operations Orchestrator
        ┌─────────┬─────────┬─────────┬──────────┬─────────┐
        │         │         │         │          │
 Admissions   Bed Mgmt  Staffing  Resources  Revenue
    Agent       Agent      Agent      Agent      Agent
```

---

# 📂 Project Structure

```
Hospital Operations Platform/
│
├── backend/
│   ├── hospital-operation_platform-python-app/
│   │
│   ├── agents/
│   │     admissions_agent.py
│   │     bed_management_agent.py
│   │     staffing_agent.py
│   │     resource_agent.py
│   │     revenue_agent.py
│   │     operations_orchestrator.py
│   │
│   ├── routers/
│   ├── services/
│   ├── implementation/
│   ├── models/
│   ├── config/
│   ├── utils/
│   ├── logs/
│   └── main.py
│
├── ui/
│   └── reactjs/
│       └── hospital-operation_platform-react-app/
│           ├── src/
│           │    ├── api/
│           │    ├── components/
│           │    ├── models/
│           │    ├── pages/
│           │    ├── services/
│           │    └── styles/
│           └── package.json
│
└── requirements.txt
```

---

# 💻 Technology Stack

## Backend

- Python
- FastAPI
- AutoGen 0.7.5
- OpenAI
- MLflow
- Loguru
- Uvicorn
- python-dotenv

## Frontend

- React 19
- TypeScript
- Vite
- Axios
- React Router DOM
- React Markdown

---

# 🤖 Backend Architecture

The backend follows a layered architecture.

```
Router
   ↓
Service
   ↓
Implementation
   ↓
Operations Orchestrator
   ↓
Specialized AI Agents
```

### AI Agents

### Admissions Agent

Responsible for:

- Admission trends
- Patient inflow
- Capacity planning

---

### Bed Management Agent

Responsible for:

- Bed occupancy
- Bed availability
- Patient allocation

---

### Staffing Agent

Responsible for:

- Workforce utilization
- Staffing shortages
- Shift optimization

---

### Resource Agent

Responsible for:

- Equipment utilization
- Operational resources
- Hospital infrastructure

---

### Revenue Agent

Responsible for:

- Revenue analysis
- Financial KPIs
- Cost optimization

---

### Operations Orchestrator

Coordinates all agents and produces a unified operational recommendation.

---

# 🎨 Frontend Architecture

```
App
 │
 └── OperationsPage
       │
       ├── OperationsForm
       ├── OperationsLoader
       └── OperationsResult
```

The frontend communicates with the FastAPI backend using Axios and renders AI-generated operational insights in a user-friendly interface.

---

# 🔄 Multi-Agent Workflow

```
Hospital Operational Data
            │
            ▼
 Operations Orchestrator
            │
 ┌──────────┼───────────┐
 ▼          ▼           ▼
Admissions  Bed      Staffing
            │
            ▼
Resources & Revenue
            │
            ▼
Combined Operational Analysis
            │
            ▼
Recommendations
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/your-repository/hospital-operations-platform.git
```

---

# 📦 Install Backend

```bash
cd backend/hospital-operation_platform-python-app

pip install -r ../../requirements.txt
```

---

# 📦 Install Frontend

```bash
cd ui/reactjs/hospital-operation_platform-react-app

npm install
```

---

# 🔑 Environment Variables

Create a `.env` file.

```env
OPENAI_API_KEY=your_api_key

OPENAI_MODEL=gpt-4.1

LOG_LEVEL=INFO
```

---

# ▶ Running Backend

```bash
cd backend/hospital-operation_platform-python-app

uvicorn main:app --reload
```

Backend URL

```
http://localhost:8000
```

Swagger

```
http://localhost:8000/docs
```

---

# ▶ Running Frontend

```bash
cd ui/reactjs/hospital-operation_platform-react-app

npm run dev
```

Frontend

```
http://localhost:5173
```

---

# 🌐 API Documentation

Example endpoint

```
POST /api/v1/operations/analyze
```

---

# 📥 Sample Request

```json
{
  "hospital_name": "City Hospital",
  "total_beds": 450,
  "occupied_beds": 390,
  "daily_admissions": 65,
  "available_staff": 180,
  "resource_utilization": 87,
  "monthly_revenue": 3500000
}
```

---

# 📤 Sample Response

```json
{
  "summary": "Hospital operating near maximum capacity.",
  "bed_management": "Increase discharge planning efficiency.",
  "staffing": "Deploy additional nurses to emergency department.",
  "resources": "Optimize ICU equipment allocation.",
  "revenue": "Reduce overtime costs to improve margins.",
  "overall_recommendation": "Expand surge capacity and rebalance staffing."
}
```

---

# 📈 MLflow Integration

The platform supports MLflow for:

- Experiment Tracking
- Model Versioning
- Performance Monitoring
- Operational Metrics
- AI Workflow Tracking

Launch MLflow

```bash
mlflow ui
```

Default URL

```
http://localhost:5000
```

---

# 📝 Logging

Application logs are stored under:

```
logs/
```

Example log files:

```
healthcare.log
error.log
```

---

# 🚀 Future Enhancements

- Predictive Bed Occupancy Forecasting
- Hospital Digital Twin
- Real-Time Dashboard
- HL7/FHIR Integration
- Electronic Health Record (EHR) Connectivity
- Staff Scheduling Optimization
- Resource Demand Forecasting
- Multi-Hospital Network Support
- Role-Based Access Control (RBAC)
- Cloud Deployment (Azure/AWS/GCP)

---

# 📜 License

This project is intended for educational, research, and enterprise healthcare AI use cases.

---

# 👨‍💻 Author

Hospital Operations Platform

AI-powered Autonomous Hospital Operations using AutoGen, FastAPI, and React.