# 🏥 Autonomous Hospital Operations Platform

An AI-powered **Autonomous Hospital Operations Platform** built using **AutoGen 0.7.5**, **FastAPI**, **Loguru**, and **MLflow** to optimize hospital operations through collaborative AI agents.

The platform analyzes admissions, bed availability, staffing, resources, and financial metrics to generate intelligent operational recommendations that improve efficiency, utilization, patient flow, and revenue.

---

# Table of Contents

* Overview
* Features
* System Architecture
* Multi-Agent Workflow
* Project Structure
* Technology Stack
* Installation
* Environment Configuration
* Running the Application
* API Endpoints
* Sample Request
* Sample Response
* MLflow Integration
* Logging
* Optimization KPIs
* Future Enhancements
* License

---

# Overview

Modern hospitals continuously struggle with:

* High patient inflow
* ICU congestion
* Bed shortages
* Staff scheduling
* Resource allocation
* Revenue optimization

This platform leverages **Agentic AI** to coordinate specialized hospital operation agents that collaboratively analyze operational data and recommend optimization strategies.

The platform consists of specialized AI agents:

* Admissions Agent
* Bed Management Agent
* Staffing Agent
* Resource Optimization Agent
* Revenue Optimization Agent

These agents collaborate through an AutoGen orchestrator to provide a comprehensive operational assessment.

---

# Features

## Admissions Optimization

* Analyze incoming admissions
* Identify emergency patients
* Prioritize critical cases
* Improve admission workflow
* Predict operational bottlenecks

---

## Bed Management

* ICU occupancy analysis
* Ward occupancy optimization
* Private room utilization
* Bed allocation recommendations
* Capacity monitoring

---

## Staffing Optimization

* Doctor utilization
* Nurse workload analysis
* Technician allocation
* Shift optimization
* Staffing gap identification

---

## Resource Optimization

* Ventilator utilization
* Oxygen availability
* Operating theater utilization
* Diagnostic equipment analysis
* Pharmacy inventory monitoring

---

## Revenue Optimization

* Daily revenue analysis
* Monthly revenue projection
* Operational cost assessment
* Profit margin calculation
* Outstanding claims monitoring

---

## Executive Dashboard

The API generates:

* Hospital Health Score
* Operational Efficiency Score
* Capacity Utilization
* Revenue KPIs
* Risk Alerts
* Agent Recommendations

---

# System Architecture

```text
                    Hospital Data

                           │
                           ▼

                FastAPI REST API Layer

                           │

                    Router Layer

                           │

                  Service Layer

                           │

             Operations Implementation

                           │

              AutoGen Orchestrator Agent

      ┌──────────────┬──────────────┬─────────────┐
      │              │              │             │
      ▼              ▼              ▼             ▼

 Admissions     Bed Agent     Staffing      Resource
    Agent                       Agent         Agent

                      │

                      ▼

                Revenue Agent

                      │

                      ▼

        Consolidated Operational Report

                      │

                      ▼

               JSON API Response
```

---

# Multi-Agent Workflow

## Admissions Agent

Responsibilities

* Analyze admissions
* Classify emergency patients
* Detect critical cases
* Prioritize patient intake

---

## Bed Management Agent

Responsibilities

* ICU allocation
* Ward allocation
* Bed utilization
* Capacity optimization

---

## Staffing Agent

Responsibilities

* Staff availability
* Shift optimization
* Utilization analysis
* Staffing recommendations

---

## Resource Agent

Responsibilities

* Equipment monitoring
* Pharmacy stock analysis
* Oxygen availability
* Ventilator utilization

---

## Revenue Agent

Responsibilities

* Revenue forecasting
* Profitability
* Cost optimization
* Claims monitoring

---

# Project Structure

```text
Hospital Operations Platform
│
├── app
│   ├── agents
│   │   ├── admissions_agent.py
│   │   ├── bed_management_agent.py
│   │   ├── staffing_agent.py
│   │   ├── resource_agent.py
│   │   ├── revenue_agent.py
│   │   └── operations_orchestrator.py
│   │
│   ├── config
│   │   ├── llm_config.py
│   │   └── llm_models_config.py
│   │
│   ├── implementation
│   │   └── operations_impl.py
│   │
│   ├── models
│   │   ├── request_model.py
│   │   └── response_model.py
│   │
│   ├── routers
│   │   └── operations_router.py
│   │
│   ├── services
│   │   └── operations_service.py
│   │
│   ├── utils
│   │   ├── logger.py
│   │   ├── json_utils.py
│   │   └── prompt_templates.py
│   │
│   └── main.py
│
├── logs
├── requirements.txt
├── optimize_request.json
└── mlflow.db
```

---

# Technology Stack

| Component           | Technology               |
| ------------------- | ------------------------ |
| Language            | Python 3.11+             |
| API                 | FastAPI                  |
| Agent Framework     | AutoGen 0.7.5            |
| LLM                 | OpenAI Compatible Models |
| Logging             | Loguru                   |
| Experiment Tracking | MLflow                   |
| Validation          | Pydantic                 |
| ASGI Server         | Uvicorn                  |

---

# Installation

## Clone Repository

```bash
git clone <repository_url>

cd Hospital_Operations_Platform
```

---

## Create Virtual Environment

```bash
python -m venv .venv
```

Windows

```bash
.venv\Scripts\activate
```

Linux/Mac

```bash
source .venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

# Environment Configuration

Create a `.env` file.

```env
OPENAI_API_KEY=your_api_key

OPENAI_BASE_URL=https://your-openai-compatible-endpoint

MODEL_NAME=gpt-4o-mini

TEMPERATURE=0.2

MAX_TOKENS=4096
```

Adjust the values according to the LLM provider configured in `app/config/llm_config.py`.

---

# Running the Application

```bash
uvicorn app.main:app --reload
```

Application

```text
http://localhost:8000
```

Swagger UI

```text
http://localhost:8000/docs
```

ReDoc

```text
http://localhost:8000/redoc
```

---

# API Endpoints

## Root

```http
GET /
```

---

## Health

```http
GET /health
```

---

## Operations Health

```http
GET /api/v1/operations/health
```

---

## Ping

```http
GET /api/v1/operations/ping
```

---

## Optimize Hospital Operations

```http
POST /api/v1/operations/optimize
```

---

# Sample Request

```json
{
  "request_id": "REQ1001",
  "hospital_info": {
    "hospital_name": "CityCare Hospital",
    "hospital_id": "HSP001",
    "city": "Hyderabad",
    "state": "Telangana",
    "total_capacity": 500,
    "current_patient_count": 420
  },
  "admissions": [
    {
      "patient_id": "PAT1001",
      "patient_name": "John Doe",
      "age": 68,
      "gender": "Male",
      "department": "Cardiology",
      "admission_type": "Emergency",
      "severity": "Critical",
      "estimated_length_of_stay": 7,
      "requires_icu": true
    }
  ],
  "bed_status": {
    "total_icu_beds": 50,
    "occupied_icu_beds": 45,
    "total_ward_beds": 350,
    "occupied_ward_beds": 300,
    "total_private_rooms": 100,
    "occupied_private_rooms": 82
  },
  "staffing_status": [
    {
      "department": "Emergency",
      "doctors_available": 12,
      "nurses_available": 25,
      "technicians_available": 8,
      "support_staff_available": 15,
      "current_shift": "Morning"
    }
  ],
  "resource_status": {
    "ventilators_available": 12,
    "oxygen_units_available": 50,
    "operation_theaters_available": 4,
    "ambulances_available": 6,
    "diagnostic_machines_available": 10,
    "pharmacy_stock_percentage": 92.5
  },
  "revenue_status": {
    "daily_revenue": 250000,
    "monthly_revenue": 7200000,
    "operational_cost": 4800000,
    "outstanding_claims": 650000,
    "pending_bills": 320000
  },
  "optimization_goal": "Optimize Hospital Operations"
}
```

---

# Sample Response

```json
{
  "request_id": "REQ1001",
  "status": "SUCCESS",
  "analysis_timestamp": "2026-06-25T10:15:30Z",
  "executive_summary": {
    "overall_status": "OPTIMIZED",
    "hospital_health_score": 90.0,
    "operational_efficiency_score": 88.0,
    "key_findings": [
      "Hospital operations analyzed",
      "Optimization recommendations generated"
    ]
  },
  "admissions_optimization": {},
  "bed_optimization": {},
  "staffing_optimization": {},
  "resource_optimization": {},
  "revenue_optimization": {},
  "risk_alerts": [],
  "operational_kpis": {}
}
```

---

# MLflow Integration

The platform records execution details into MLflow, including:

* Request parameters
* Response payload
* Execution time
* Start and end timestamps
* Endpoint metadata
* Experiment tracking

Default experiment:

```text
Hospital_Operations_Platform_Interface
```

Start MLflow:

```bash
mlflow server \
--backend-store-uri sqlite:///mlflow.db \
--default-artifact-root ./mlruns \
--host 0.0.0.0 \
--port 5000
```

MLflow UI

```text
http://localhost:5000
```

---

# Logging

Loguru provides structured logging throughout the application.

Typical log events include:

* API requests
* Validation
* Agent execution
* Orchestrator workflow
* MLflow tracking
* Exceptions
* Performance metrics

Log files are stored in the `logs/` directory.

---

# Optimization KPIs

The platform computes operational metrics such as:

* Hospital Capacity Utilization
* ICU Occupancy Rate
* Ward Occupancy Rate
* Private Room Occupancy
* Patient-to-Bed Ratio
* Average Length of Stay
* Patient Flow Efficiency
* Revenue per Patient
* Operational Efficiency Score
* Hospital Health Score
* Profit Margin
* Resource Utilization
* Pharmacy Stock Percentage

---

# Future Enhancements

* Real-time bed tracking
* Predictive admission forecasting
* Emergency surge management
* Staff scheduling optimization using AI
* Digital Twin integration
* IoT-enabled resource monitoring
* HL7/FHIR interoperability
* Electronic Health Record (EHR) integration
* Power BI dashboards
* Role-based access control
* Notification and alert engine
* Multi-hospital operational analytics

---

# License

This project is intended for educational, research, and enterprise healthcare operational optimization purposes. Ensure compliance with applicable healthcare regulations and organizational data governance policies before deploying in production.
