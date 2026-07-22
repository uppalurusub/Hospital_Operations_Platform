# Hospital Operations Optimization UI

A modern **React.js with TypeScript** frontend application for AI-driven hospital operations optimization.

The application collects hospital operational information including admissions, bed availability, staffing, healthcare resources, and financial data. It sends the operational context to a backend optimization API and displays AI-generated operational insights, KPIs, optimization recommendations, risk alerts, and the final COO decision.

---

## Table of Contents

* [Overview](#overview)
* [Key Features](#key-features)
* [Technology Stack](#technology-stack)
* [Application Architecture](#application-architecture)
* [Project Structure](#project-structure)
* [Architecture Flow](#architecture-flow)
* [Component Architecture](#component-architecture)
* [API Architecture](#api-architecture)
* [Data Models](#data-models)
* [Hospital Operations Workflow](#hospital-operations-workflow)
* [AI Optimization Agents](#ai-optimization-agents)
* [Operational KPIs](#operational-kpis)
* [Validation Strategy](#validation-strategy)
* [Error Handling](#error-handling)
* [Routing](#routing)
* [Environment Configuration](#environment-configuration)
* [Installation](#installation)
* [Running the Application](#running-the-application)
* [API Integration](#api-integration)
* [Request Model](#request-model)
* [Response Model](#response-model)
* [Result Dashboard](#result-dashboard)
* [Styling Architecture](#styling-architecture)
* [TypeScript Design](#typescript-design)
* [Accessibility](#accessibility)
* [Production Considerations](#production-considerations)
* [Future Enhancements](#future-enhancements)

---

# Overview

The **Hospital Operations Optimization UI** provides an interactive web interface for analyzing and optimizing hospital operations.

The application allows hospital administrators and operations teams to provide operational information related to:

* Hospital capacity
* Current patient census
* Patient admissions
* Admission severity
* ICU requirements
* ICU bed utilization
* Ward bed utilization
* Private room utilization
* Doctor availability
* Nurse availability
* Technician availability
* Support staff availability
* Medical equipment availability
* Pharmacy stock levels
* Daily revenue
* Monthly revenue
* Operational costs
* Outstanding insurance claims
* Pending patient bills

The operational information is submitted to the Hospital Operations API.

The backend optimization platform can use autonomous AI agents to evaluate different operational areas and return consolidated recommendations.

The React application transforms the API response into a structured hospital operations dashboard.

---

# Key Features

## Hospital Information Management

Capture hospital-level information including:

* Hospital name
* Hospital ID
* City
* State
* Total hospital capacity
* Current patient count

---

## Dynamic Patient Admissions

Users can dynamically add and remove patient admission records.

Each admission contains:

* Patient ID
* Patient name
* Age
* Gender
* Department
* Admission type
* Severity
* Estimated length of stay
* ICU requirement

The UI supports multiple patient admissions within a single optimization request.

---

## Dynamic Staffing Management

Hospital staffing information can be entered by department.

Each staffing record contains:

* Department
* Doctors available
* Nurses available
* Technicians available
* Support staff available
* Current shift

Users can dynamically add or remove departmental staffing records.

---

## Bed Capacity Analysis

The application captures:

* Total ICU beds
* Occupied ICU beds
* Total ward beds
* Occupied ward beds
* Total private rooms
* Occupied private rooms

The optimization response displays calculated occupancy rates and available bed capacity.

---

## Hospital Resource Analysis

Operational healthcare resources include:

* Ventilators
* Oxygen units
* Operation theaters
* Ambulances
* Diagnostic machines
* Pharmacy stock percentage

The optimization platform evaluates resource utilization and provides recommendations.

---

## Revenue Optimization

The financial section captures:

* Daily revenue
* Monthly revenue
* Operational cost
* Outstanding claims
* Pending bills

The result dashboard displays:

* Daily revenue
* Projected monthly revenue
* Operational cost
* Profit margin
* Outstanding claims
* Revenue recommendations

Currency values are displayed using the Indian Rupee format.

---

## AI Agent Processing Loader

While optimization is running, the application displays the AI agents involved in the analysis.

The loader represents the following autonomous agents:

1. Admissions Agent
2. Bed Management Agent
3. Staffing Agent
4. Resource Agent
5. Revenue Agent

Each agent displays its operational responsibility and processing status.

---

## Structured Optimization Dashboard

The API response is transformed into a structured dashboard containing:

* Executive summary
* Operational KPIs
* Admissions optimization
* Bed optimization
* Staffing optimization
* Resource optimization
* Revenue optimization
* Operational risk alerts
* AI agent recommendations
* Final COO decision
* Next actions
* Execution details

---

## Markdown Recommendation Rendering

The application uses `react-markdown` to display AI-generated recommendations.

Markdown rendering improves the readability of:

* Key findings
* Optimization recommendations
* Risk alerts
* AI agent recommendations
* Next actions

---

# Technology Stack

| Technology       | Purpose                                           |
| ---------------- | ------------------------------------------------- |
| React            | Frontend UI framework                             |
| TypeScript       | Static type safety                                |
| Vite             | Frontend build and development tooling            |
| React Router DOM | Client-side routing                               |
| Axios            | HTTP API communication                            |
| React Markdown   | Markdown response rendering                       |
| CSS              | Responsive application styling                    |
| Intl API         | Number, currency, percentage, and date formatting |

---

# Application Architecture

The application follows a layered frontend architecture.

```text
┌───────────────────────────────────────┐
│               Browser                 │
└───────────────────┬───────────────────┘
                    │
                    ▼
┌───────────────────────────────────────┐
│              React Router             │
│                 App.tsx               │
└───────────────────┬───────────────────┘
                    │
                    ▼
┌───────────────────────────────────────┐
│              Page Layer               │
│          OperationsPage.tsx           │
└───────────────────┬───────────────────┘
                    │
          ┌─────────┼─────────┐
          │         │         │
          ▼         ▼         ▼
┌──────────────┐ ┌──────────┐ ┌────────────────┐
│ Operations   │ │Operations│ │ Operations     │
│ Form         │ │ Loader   │ │ Result         │
└──────┬───────┘ └──────────┘ └────────────────┘
       │
       ▼
┌───────────────────────────────────────┐
│             Service Layer             │
│         operationsService.ts          │
└───────────────────┬───────────────────┘
                    │
                    ▼
┌───────────────────────────────────────┐
│               API Layer               │
│          operationsApi.ts             │
└───────────────────┬───────────────────┘
                    │
                    ▼
┌───────────────────────────────────────┐
│          Axios HTTP Client            │
│             apiClient.ts              │
└───────────────────┬───────────────────┘
                    │
                    ▼
┌───────────────────────────────────────┐
│      Hospital Operations Backend      │
│       POST /operations/optimize       │
└───────────────────────────────────────┘
```

---

# Project Structure

```text
src/
│
├── api/
│   ├── apiClient.ts
│   └── operationsApi.ts
│
├── assets/
│   ├── hero.png
│   ├── react.svg
│   └── vite.svg
│
├── components/
│   └── operations/
│       ├── OperationsForm.tsx
│       ├── OperationsLoader.tsx
│       └── OperationsResult.tsx
│
├── models/
│   └── operations.ts
│
├── pages/
│   └── OperationsPage.tsx
│
├── services/
│   └── operationsService.ts
│
├── styles/
│   └── operations.css
│
├── App.css
├── App.tsx
├── index.css
└── main.tsx
```

---

# Architecture Flow

The application follows the processing flow below.

```text
User
 │
 │ Enters hospital operational information
 ▼
OperationsForm
 │
 │ HospitalOperationsRequest
 ▼
OperationsPage
 │
 │ handleOptimize()
 ▼
OperationsService
 │
 │ Business validation
 ▼
Operations API
 │
 │ POST /operations/optimize
 ▼
Axios API Client
 │
 │ HTTP Request
 ▼
Hospital Operations Backend
 │
 │ AI Agent Optimization
 ▼
HospitalOperationsResponse
 │
 ▼
OperationsPage
 │
 ├── Loading → OperationsLoader
 │
 ├── Error   → Error Message
 │
 └── Success → OperationsResult
```

---

# Component Architecture

## OperationsPage

File:

```text
src/pages/OperationsPage.tsx
```

`OperationsPage` acts as the container and orchestration component for the hospital operations module.

It manages the following application states:

```typescript
const [loading, setLoading] = useState(false);

const [result, setResult] =
  useState<HospitalOperationsResponse | null>(null);

const [error, setError] =
  useState<string | null>(null);
```

The page coordinates:

```text
OperationsForm
      │
      ▼
operationsService
      │
      ▼
OperationsLoader
      │
      ▼
OperationsResult
```

The main optimization handler is responsible for:

1. Activating the loading state
2. Clearing previous errors
3. Clearing previous results
4. Calling the service layer
5. Storing the API response
6. Handling errors
7. Disabling the loading state

---

## OperationsForm

File:

```text
src/components/operations/OperationsForm.tsx
```

`OperationsForm` manages the hospital operations input state.

The form uses:

```typescript
useState<HospitalOperationsRequest>
```

The initial request contains the complete hospital operations data structure.

The component provides specialized update functions for nested state.

Examples include:

```typescript
updateHospitalInfo()
```

```typescript
updateBedStatus()
```

```typescript
updateResourceStatus()
```

```typescript
updateRevenueStatus()
```

```typescript
updateAdmission()
```

```typescript
updateStaffing()
```

This approach prevents direct mutation of React state.

Nested objects and arrays are updated using immutable state patterns.

Example architecture:

```text
HospitalOperationsRequest
│
├── hospital_info
│
├── admissions[]
│
├── bed_status
│
├── staffing_status[]
│
├── resource_status
│
└── revenue_status
```

### Dynamic Admissions

New admissions are created using:

```typescript
createAdmission()
```

Admissions can be dynamically added using:

```typescript
addAdmission()
```

Admissions can be removed using:

```typescript
removeAdmission()
```

### Dynamic Staffing Departments

Staffing records are created using:

```typescript
createStaffingStatus()
```

New departments can be added using:

```typescript
addStaffingDepartment()
```

Departments can be removed using:

```typescript
removeStaffingDepartment()
```

### Request Identification

A unique operations request ID is generated using:

```typescript
const createRequestId = (): string =>
  `OPS-${Date.now()}`;
```

Example:

```text
OPS-1783761289456
```

### Analysis Timestamp

The request automatically includes the current ISO timestamp.

```typescript
analysis_timestamp: new Date().toISOString()
```

---

## OperationsLoader

File:

```text
src/components/operations/OperationsLoader.tsx
```

The loader provides operational feedback while the backend AI optimization process is running.

The component displays five optimization agents.

### Admissions Agent

Analyzes:

* Patient admissions
* Patient severity
* ICU requirements

### Bed Management Agent

Evaluates:

* ICU utilization
* Ward utilization
* Private room utilization

### Staffing Agent

Reviews:

* Doctors
* Nurses
* Technicians
* Support staff

### Resource Agent

Analyzes:

* Hospital equipment
* Critical resources
* Resource availability

### Revenue Agent

Evaluates:

* Revenue
* Operational costs
* Insurance claims
* Pending bills

The loader uses accessibility attributes:

```tsx
role="status"
aria-live="polite"
aria-busy="true"
```

These attributes improve screen reader support during long-running optimization requests.

---

## OperationsResult

File:

```text
src/components/operations/OperationsResult.tsx
```

`OperationsResult` transforms the backend response into a structured operational dashboard.

The component receives:

```typescript
interface OperationsResultProps {
  result: HospitalOperationsResponse;
}
```

The response is destructured into individual optimization domains.

```typescript
const {
  request_id,
  analysis_timestamp,
  status,
  executive_summary,
  admissions_optimization,
  bed_optimization,
  staffing_optimization,
  resource_optimization,
  revenue_optimization,
  risk_alerts,
  operational_kpis,
  agent_recommendations,
  final_decision,
  next_actions,
  execution_time_seconds,
  generated_by,
  model_version,
} = result;
```

---

# API Architecture

The API architecture contains three layers.

```text
Component
    │
    ▼
Service Layer
    │
    ▼
API Function
    │
    ▼
Axios Client
```

This separation improves:

* Maintainability
* Testability
* Error handling
* API reuse
* Business validation
* Separation of concerns

---

## Axios API Client

File:

```text
src/api/apiClient.ts
```

The shared Axios client is configured using:

```typescript
const apiClient = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ??
    "http://127.0.0.1:8000/api/v1",

  timeout: 300000,

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
```

The API timeout is configured for:

```text
300000 milliseconds
```

Equivalent to:

```text
5 minutes
```

The extended timeout supports long-running AI agent optimization workflows.

---

## Request Interceptor

The Axios request interceptor logs outgoing API requests.

Example:

```text
[API REQUEST] POST /operations/optimize
```

---

## Response Interceptor

Successful responses are logged using:

```text
[API RESPONSE] 200 /operations/optimize
```

API failures are logged using:

```text
[API RESPONSE ERROR]
```

The response body or error message is included in the browser console.

---

## Operations API

File:

```text
src/api/operationsApi.ts
```

The API endpoint is defined as:

```typescript
const OPERATIONS_OPTIMIZE_ENDPOINT =
  "/operations/optimize";
```

The API function is:

```typescript
optimizeOperations()
```

The function accepts:

```typescript
HospitalOperationsRequest
```

and returns:

```typescript
Promise<HospitalOperationsResponse>
```

API call:

```text
POST /operations/optimize
```

Full default API URL:

```text
http://127.0.0.1:8000/api/v1/operations/optimize
```

---

# Data Models

File:

```text
src/models/operations.ts
```

The application uses TypeScript interfaces to define the frontend API contract.

The models are divided into:

```text
Request Models
Response Models
API Error Model
Domain Type Aliases
```

---

# Request Models

## HospitalInfo

```typescript
interface HospitalInfo {
  hospital_name: string;
  hospital_id: string;
  city: string;
  state: string;
  total_capacity: number;
  current_patient_count: number;
}
```

---

## Admission

```typescript
interface Admission {
  patient_id: string;
  patient_name: string;
  age: number;
  gender: string;
  department: string;
  admission_type: string;
  severity: string;
  estimated_length_of_stay: number;
  requires_icu: boolean;
}
```

---

## BedStatus

```typescript
interface BedStatus {
  total_icu_beds: number;
  occupied_icu_beds: number;
  total_ward_beds: number;
  occupied_ward_beds: number;
  total_private_rooms: number;
  occupied_private_rooms: number;
}
```

---

## StaffingStatus

```typescript
interface StaffingStatus {
  department: string;
  doctors_available: number;
  nurses_available: number;
  technicians_available: number;
  support_staff_available: number;
  current_shift: string;
}
```

---

## ResourceStatus

```typescript
interface ResourceStatus {
  ventilators_available: number;
  oxygen_units_available: number;
  operation_theaters_available: number;
  ambulances_available: number;
  diagnostic_machines_available: number;
  pharmacy_stock_percentage: number;
}
```

---

## RevenueStatus

```typescript
interface RevenueStatus {
  daily_revenue: number;
  monthly_revenue: number;
  operational_cost: number;
  outstanding_claims: number;
  pending_bills: number;
}
```

---

## HospitalOperationsRequest

The complete optimization request combines all hospital operational domains.

```typescript
interface HospitalOperationsRequest {
  request_id: string;
  analysis_timestamp: string;
  hospital_info: HospitalInfo;
  admissions: Admission[];
  bed_status: BedStatus;
  staffing_status: StaffingStatus[];
  resource_status: ResourceStatus;
  revenue_status: RevenueStatus;
  optimization_goal: string;
  additional_notes: string;
}
```

---

# Response Models

## ExecutiveSummary

Contains the overall hospital operations assessment.

```typescript
interface ExecutiveSummary {
  overall_status: string;
  hospital_health_score: number;
  operational_efficiency_score: number;
  key_findings: string[];
}
```

---

## AdmissionsOptimization

```typescript
interface AdmissionsOptimization {
  total_admissions_processed: number;
  emergency_cases: number;
  elective_cases: number;
  critical_cases: number;
  recommendations: string[];
}
```

---

## BedOptimization

```typescript
interface BedOptimization {
  icu_occupancy_rate: number;
  ward_occupancy_rate: number;
  private_room_occupancy_rate: number;
  available_icu_beds: number;
  available_ward_beds: number;
  recommendations: string[];
}
```

---

## StaffingOptimization

```typescript
interface StaffingOptimization {
  doctor_utilization_rate: number;
  nurse_utilization_rate: number;
  technician_utilization_rate: number;
  staffing_gap_identified: boolean;
  recommendations: string[];
}
```

---

## ResourceOptimization

```typescript
interface ResourceOptimization {
  ventilator_utilization_rate: number;
  oxygen_utilization_rate: number;
  equipment_utilization_rate: number;
  pharmacy_stock_percentage: number;
  recommendations: string[];
}
```

---

## RevenueOptimization

```typescript
interface RevenueOptimization {
  daily_revenue: number;
  projected_monthly_revenue: number;
  operational_cost: number;
  profit_margin: number;
  outstanding_claims: number;
  recommendations: string[];
}
```

---

## OperationalKPIs

```typescript
interface OperationalKPIs {
  hospital_capacity_utilization: number;
  patient_to_bed_ratio: number;
  average_length_of_stay: number;
  patient_flow_efficiency: number;
  revenue_per_patient: number;
}
```

---

## AgentRecommendation

Each autonomous AI agent can provide an operational recommendation.

```typescript
interface AgentRecommendation {
  agent_name: string;
  recommendation: string;
  priority: string;
  confidence_score: number;
}
```

---

## HospitalOperationsResponse

The complete API response is represented by:

```typescript
interface HospitalOperationsResponse {
  request_id: string;
  analysis_timestamp: string;
  status: string;

  executive_summary: ExecutiveSummary;

  admissions_optimization: AdmissionsOptimization;

  bed_optimization: BedOptimization;

  staffing_optimization: StaffingOptimization;

  resource_optimization: ResourceOptimization;

  revenue_optimization: RevenueOptimization;

  risk_alerts: unknown[];

  operational_kpis: OperationalKPIs;

  agent_recommendations: AgentRecommendation[];

  agent_outputs: unknown[];

  final_decision: string;

  next_actions: string[];

  execution_time_seconds: number;

  generated_by: string;

  model_version: string;

  metadata: Record<string, unknown>;
}
```

---

# Hospital Operations Workflow

The application follows the workflow below.

```text
1. User opens /operations
            │
            ▼
2. OperationsForm initializes request
            │
            ▼
3. User enters hospital information
            │
            ▼
4. User enters admission information
            │
            ▼
5. User enters bed utilization
            │
            ▼
6. User enters staffing availability
            │
            ▼
7. User enters hospital resources
            │
            ▼
8. User enters financial information
            │
            ▼
9. Frontend validation executes
            │
            ▼
10. OperationsService validates request
            │
            ▼
11. POST /operations/optimize
            │
            ▼
12. AI agents analyze operations
            │
            ▼
13. HospitalOperationsResponse returned
            │
            ▼
14. OperationsResult renders dashboard
```

---

# AI Optimization Agents

The frontend architecture represents a multi-agent hospital optimization workflow.

```text
                 Hospital Operations Request
                              │
                              ▼
                  AI Operations Platform
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
 Admissions Agent      Bed Management Agent    Staffing Agent
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
                 ┌────────────┴────────────┐
                 │                         │
                 ▼                         ▼
          Resource Agent             Revenue Agent
                 │                         │
                 └────────────┬────────────┘
                              │
                              ▼
                  Operational KPI Analysis
                              │
                              ▼
                    Risk Identification
                              │
                              ▼
                    Agent Recommendations
                              │
                              ▼
                     Final COO Decision
```

---

# Operational KPIs

The dashboard displays five primary hospital operational KPIs.

## Hospital Capacity Utilization

Represents overall hospital capacity consumption.

```text
Current Patient Count
──────────────────────── × 100
Total Hospital Capacity
```

---

## Patient-to-Bed Ratio

Represents patient demand compared with available hospital bed capacity.

---

## Average Length of Stay

Represents the average estimated or calculated hospital stay.

Displayed as:

```text
X days
```

---

## Patient Flow Efficiency

Represents the efficiency of patient movement through hospital operational processes.

Displayed as a percentage.

---

## Revenue per Patient

Represents hospital revenue relative to the patient population.

Currency values use Indian currency formatting.

Example:

```text
₹12,500.00
```

---

# Validation Strategy

Validation occurs at multiple application layers.

```text
OperationsForm
      │
      ▼
UI Validation
      │
      ▼
OperationsService
      │
      ▼
Business Validation
      │
      ▼
Backend API
      │
      ▼
API Validation
```

---

## Form Validation

The form validates required hospital information before submission.

Examples include:

* Hospital name is required
* Hospital ID is required
* Total capacity must be greater than zero

---

## Service Validation

File:

```text
src/services/operationsService.ts
```

The service layer performs detailed business validation.

### Hospital Validation

The service validates:

* Request existence
* Request ID
* Hospital information
* Hospital name
* Hospital ID
* Total hospital capacity
* Current patient count

The current patient count cannot exceed the hospital capacity.

---

### Admission Validation

At least one admission is required.

Each admission validates:

* Patient ID
* Patient name
* Patient age
* Department
* Estimated length of stay

The estimated length of stay must be greater than zero.

---

### Bed Validation

The service ensures:

```text
Occupied ICU Beds <= Total ICU Beds
```

```text
Occupied Ward Beds <= Total Ward Beds
```

```text
Occupied Private Rooms <= Total Private Rooms
```

---

### Staffing Validation

At least one staffing department is required.

Staff availability values cannot be negative.

The validation covers:

* Doctors
* Nurses
* Technicians
* Support staff

---

### Resource Validation

Pharmacy stock percentage must remain within:

```text
0% to 100%
```

---

### Revenue Validation

The following financial values cannot be negative:

* Daily revenue
* Monthly revenue
* Operational cost
* Outstanding claims
* Pending bills

---

### Optimization Goal Validation

An optimization goal is required before the request is submitted.

---

# Error Handling

The service layer centralizes API error processing.

The method:

```typescript
handleError()
```

converts Axios and backend errors into user-friendly application errors.

---

## HTTP 400

Represents an invalid hospital operations request.

Default message:

```text
Invalid hospital operations request.
```

---

## HTTP 422

Represents backend request validation failure.

Default message:

```text
Hospital operations request validation failed.
```

FastAPI validation messages are extracted from the `detail` response.

---

## HTTP 500

Represents backend optimization failure.

Default message:

```text
Hospital operations optimization failed on the server.
```

---

## Request Timeout

Axios timeout errors are detected using:

```typescript
error.code === "ECONNABORTED"
```

The application displays:

```text
Hospital operations optimization request timed out.
```

---

## Network Failure

If the backend cannot be reached:

```text
Unable to connect to the Hospital Operations API.
```

---

## Unexpected Error

Unknown errors use the fallback message:

```text
An unexpected hospital operations optimization error occurred.
```

---

# Routing

Routing is configured in:

```text
src/App.tsx
```

The application uses `BrowserRouter`.

Available route:

```text
/operations
```

The root route redirects to:

```text
/operations
```

Unknown routes also redirect to:

```text
/operations
```

Routing architecture:

```text
/
│
└── Redirect
        │
        ▼
/operations
        │
        ▼
OperationsPage
```

---

# Environment Configuration

Create a `.env` file in the project root.

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1
```

The application reads the environment variable using:

```typescript
import.meta.env.VITE_API_BASE_URL
```

If the environment variable is unavailable, the application uses:

```text
http://127.0.0.1:8000/api/v1
```

---

# Installation

## Prerequisites

Install the following software:

* Node.js
* npm
* Hospital Operations backend API

Recommended Node.js version:

```text
Node.js 18+
```

---

## Install Dependencies

From the React project root directory, run:

```bash
npm install
```

The source code uses the following primary frontend libraries:

```text
react
react-dom
react-router-dom
axios
react-markdown
```

Ensure the project dependencies include the required packages.

Example:

```bash
npm install axios react-router-dom react-markdown
```

---

# Running the Application

Start the Vite development server.

```bash
npm run dev
```

The terminal displays the local application URL.

Typically:

```text
http://localhost:5173
```

Open:

```text
http://localhost:5173/operations
```

---

# API Integration

The application communicates with the Hospital Operations backend API.

## Endpoint

```text
POST /operations/optimize
```

Default full endpoint:

```text
http://127.0.0.1:8000/api/v1/operations/optimize
```

---

# Request Model

Example hospital operations request:

```json
{
  "request_id": "OPS-1783761289456",
  "analysis_timestamp": "2026-07-11T08:00:00.000Z",
  "hospital_info": {
    "hospital_name": "City Care Hospital",
    "hospital_id": "HOSP-001",
    "city": "Hyderabad",
    "state": "Telangana",
    "total_capacity": 500,
    "current_patient_count": 420
  },
  "admissions": [
    {
      "patient_id": "PAT-001",
      "patient_name": "Patient One",
      "age": 65,
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
    "occupied_private_rooms": 75
  },
  "staffing_status": [
    {
      "department": "Cardiology",
      "doctors_available": 10,
      "nurses_available": 25,
      "technicians_available": 5,
      "support_staff_available": 10,
      "current_shift": "Morning"
    }
  ],
  "resource_status": {
    "ventilators_available": 20,
    "oxygen_units_available": 100,
    "operation_theaters_available": 8,
    "ambulances_available": 12,
    "diagnostic_machines_available": 25,
    "pharmacy_stock_percentage": 85
  },
  "revenue_status": {
    "daily_revenue": 1500000,
    "monthly_revenue": 45000000,
    "operational_cost": 32000000,
    "outstanding_claims": 5000000,
    "pending_bills": 2500000
  },
  "optimization_goal": "Improve operational efficiency and patient flow",
  "additional_notes": "Focus on ICU utilization and staffing optimization"
}
```

---

# Response Model

The backend returns a `HospitalOperationsResponse`.

Example structure:

```json
{
  "request_id": "OPS-1783761289456",
  "analysis_timestamp": "2026-07-11T08:00:00.000Z",
  "status": "SUCCESS",
  "executive_summary": {
    "overall_status": "OPTIMIZED",
    "hospital_health_score": 88,
    "operational_efficiency_score": 84,
    "key_findings": [
      "ICU utilization is approaching operational capacity.",
      "Additional nursing coverage is recommended."
    ]
  },
  "admissions_optimization": {
    "total_admissions_processed": 1,
    "emergency_cases": 1,
    "elective_cases": 0,
    "critical_cases": 1,
    "recommendations": [
      "Prioritize the critical emergency admission."
    ]
  },
  "bed_optimization": {
    "icu_occupancy_rate": 90,
    "ward_occupancy_rate": 85.71,
    "private_room_occupancy_rate": 75,
    "available_icu_beds": 5,
    "available_ward_beds": 50,
    "recommendations": [
      "Prepare ICU escalation capacity."
    ]
  },
  "staffing_optimization": {
    "doctor_utilization_rate": 82,
    "nurse_utilization_rate": 91,
    "technician_utilization_rate": 70,
    "staffing_gap_identified": true,
    "recommendations": [
      "Increase nursing coverage during peak hours."
    ]
  },
  "resource_optimization": {
    "ventilator_utilization_rate": 80,
    "oxygen_utilization_rate": 72,
    "equipment_utilization_rate": 76,
    "pharmacy_stock_percentage": 85,
    "recommendations": [
      "Maintain critical equipment reserves."
    ]
  },
  "revenue_optimization": {
    "daily_revenue": 1500000,
    "projected_monthly_revenue": 45000000,
    "operational_cost": 32000000,
    "profit_margin": 28.89,
    "outstanding_claims": 5000000,
    "recommendations": [
      "Accelerate outstanding claim reconciliation."
    ]
  },
  "risk_alerts": [],
  "operational_kpis": {
    "hospital_capacity_utilization": 84,
    "patient_to_bed_ratio": 0.84,
    "average_length_of_stay": 7,
    "patient_flow_efficiency": 82,
    "revenue_per_patient": 107142.86
  },
  "agent_recommendations": [],
  "agent_outputs": [],
  "final_decision": "APPROVED",
  "next_actions": [
    "Review ICU capacity.",
    "Increase nursing coverage.",
    "Monitor outstanding claims."
  ],
  "execution_time_seconds": 12.45,
  "generated_by": "Hospital Operations AI Platform",
  "model_version": "1.0.0",
  "metadata": {}
}
```

---

# Result Dashboard

The result dashboard contains multiple operational sections.

## Executive Summary

Displays:

* Overall operational status
* Hospital health score
* Operational efficiency score
* Key findings

---

## Operational KPIs

Displays:

* Hospital capacity utilization
* Patient-to-bed ratio
* Average length of stay
* Patient flow efficiency
* Revenue per patient

---

## Admissions Optimization

Displays:

* Total admissions processed
* Emergency cases
* Elective cases
* Critical cases
* Admissions recommendations

---

## Bed Optimization

Displays:

* ICU occupancy rate
* Ward occupancy rate
* Private room occupancy rate
* Available ICU beds
* Available ward beds
* Bed management recommendations

---

## Staffing Optimization

Displays:

* Doctor utilization
* Nurse utilization
* Technician utilization
* Staffing gap status
* Staffing recommendations

---

## Resource Optimization

Displays:

* Ventilator utilization
* Oxygen utilization
* Equipment utilization
* Pharmacy stock
* Resource recommendations

---

## Revenue Optimization

Displays:

* Daily revenue
* Projected monthly revenue
* Operational cost
* Profit margin
* Outstanding claims
* Revenue recommendations

---

## Operational Risk Alerts

If no risks are returned, the dashboard displays:

```text
No operational risk alerts identified.
```

If risks are returned, they are converted into Markdown list items and rendered using `ReactMarkdown`.

---

## AI Agent Recommendations

Each AI agent recommendation displays:

* Agent name
* Recommendation priority
* Confidence score
* Markdown recommendation

Agent confidence values are converted into percentage format.

Example:

```text
Confidence: 92.00%
```

---

## Final COO Decision

The consolidated AI optimization decision is displayed in a dedicated final decision section.

Possible domain types defined by the application include:

```text
APPROVED
REJECTED
REVIEW_REQUIRED
```

---

## Next Actions

Recommended next actions are rendered as a Markdown list.

Example:

```text
- Review ICU capacity.
- Increase nursing coverage.
- Monitor outstanding claims.
```

---

## Execution Details

The dashboard displays:

* Execution time
* Generated by
* Model version
* Request ID

Execution time is formatted to two decimal places.

Example:

```text
12.45 seconds
```

---

# Formatting Utilities

`OperationsResult` contains reusable formatting utilities.

## Number Formatting

```typescript
new Intl.NumberFormat("en-IN")
```

---

## Currency Formatting

```typescript
new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
})
```

Example:

```text
₹45,000,000.00
```

---

## Percentage Formatting

```typescript
`${value.toFixed(2)}%`
```

Example:

```text
84.00%
```

---

## Date and Time Formatting

The application uses:

```typescript
new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeStyle: "medium",
})
```

Invalid date values are safely returned without transformation.

---

# Styling Architecture

Hospital operations styling is centralized in:

```text
src/styles/operations.css
```

The stylesheet provides styles for:

* Page layout
* Page headers
* Operational badges
* Forms
* Input controls
* JSON editor styling
* Buttons
* Validation messages
* API errors
* Loading indicators
* AI agent processing cards
* Result sections
* Metric grids
* Metric cards
* Status badges
* Recommendation blocks
* Markdown content
* Final decision sections
* Execution details

The visual architecture follows a card-based hospital operations dashboard design.

---

## Responsive Design

The application includes responsive behavior for devices below:

```css
@media (max-width: 768px)
```

Mobile optimizations include:

* Reduced page padding
* Smaller page headings
* Vertical result headers
* Full-width action buttons
* Single-column result grids

---

# TypeScript Design

The project uses TypeScript interfaces as the frontend API contract.

Benefits include:

* Compile-time type checking
* Safer API integration
* Strongly typed React props
* Strongly typed service methods
* Strongly typed nested state updates
* Improved IDE autocomplete
* Easier backend contract maintenance

Generic functions are used for type-safe array updates.

Example:

```typescript
const updateAdmission = <
  K extends keyof Admission
>(
  index: number,
  field: K,
  value: Admission[K],
) => {
  // Update admission
};
```

This ensures that the value type corresponds to the selected admission property.

The staffing updater follows the same architecture.

```typescript
const updateStaffing = <
  K extends keyof StaffingStatus
>(
  index: number,
  field: K,
  value: StaffingStatus[K],
) => {
  // Update staffing information
};
```

---

# Accessibility

The application includes basic accessibility support.

The optimization loader uses:

```tsx
role="status"
```

```tsx
aria-live="polite"
```

```tsx
aria-busy="true"
```

The visual spinner is excluded from screen readers using:

```tsx
aria-hidden="true"
```

These attributes allow assistive technologies to communicate optimization progress.

---

# Separation of Concerns

The project separates responsibilities across architectural layers.

| Layer           | Responsibility                            |
| --------------- | ----------------------------------------- |
| Models          | TypeScript request and response contracts |
| API Client      | Shared Axios configuration                |
| API Layer       | Backend endpoint communication            |
| Service Layer   | Business validation and error handling    |
| Page Layer      | State and workflow orchestration          |
| Component Layer | Form, loader, and result rendering        |
| Styles          | Hospital operations UI presentation       |

The architecture follows the principle:

```text
UI Components
      │
      ▼
Page Orchestration
      │
      ▼
Business Service
      │
      ▼
API Adapter
      │
      ▼
HTTP Client
```

This architecture makes the project easier to maintain and extend.

---

# Production Considerations

Before deploying the application to production, consider implementing the following improvements.

## Authentication

Add authentication using:

* OAuth 2.0
* OpenID Connect
* JWT access tokens

For healthcare enterprise applications, identity integration may include organizational identity providers.

---

## Authorization

Implement role-based access control.

Example roles:

```text
Hospital Administrator
Chief Operating Officer
Operations Manager
Clinical Manager
Finance Manager
Department Head
Read-Only Analyst
```

---

## Healthcare Data Privacy

Patient-related operational data should be protected using appropriate organizational, regulatory, and security controls.

Consider:

* Data minimization
* Encryption in transit
* Encryption at rest
* Audit logging
* Access control
* Session management
* Secure secrets management
* Data retention policies

Avoid logging patient-identifiable information in production browser logs.

---

## API Logging

The current Axios client uses:

```typescript
console.info()
```

and:

```typescript
console.error()
```

For production environments, consider a centralized observability solution and disable unnecessary browser console logging.

---

## Error Boundaries

Add React Error Boundaries to prevent unexpected component errors from crashing the complete application.

---

## Runtime Validation

TypeScript provides compile-time validation but does not validate runtime API responses.

Consider using:

```text
Zod
```

or another runtime schema validation library.

Runtime validation can verify that the backend response matches:

```typescript
HospitalOperationsResponse
```

---

## Automated Testing

Recommended testing layers include:

```text
Unit Testing
Component Testing
Service Testing
API Mock Testing
Integration Testing
End-to-End Testing
```

Potential tools include:

```text
Vitest
React Testing Library
Mock Service Worker
Playwright
```

---

## State Management

The current local `useState` architecture is appropriate for the existing module.

For larger healthcare command-center applications, consider centralized server and application state management.

Possible architectural options include:

```text
TanStack Query
Redux Toolkit
Zustand
```

---

# Future Enhancements

Potential future enhancements include:

* Real-time hospital operations dashboard
* WebSocket-based optimization progress
* Server-Sent Events for AI agent status
* Department-level operational dashboards
* ICU command center
* Bed allocation visualization
* Patient flow visualization
* Staffing heatmaps
* Shift optimization
* Predictive admission forecasting
* Length-of-stay prediction
* Bed demand forecasting
* Emergency department congestion prediction
* Resource shortage alerts
* Pharmacy inventory prediction
* Revenue leakage detection
* Insurance claims optimization
* Agent reasoning timeline
* Human-in-the-loop COO approval
* Recommendation approval workflow
* Operational recommendation audit trail
* PDF optimization reports
* Excel report export
* Historical optimization comparison
* KPI trend charts
* Role-based access control
* Enterprise authentication
* Healthcare audit logging
* Multi-hospital support

---

# Recommended Enterprise Architecture

For a larger Healthcare Command Center platform, the frontend can evolve into the following architecture:

```text
                    React Healthcare Command Center
                                  │
          ┌───────────────────────┼───────────────────────┐
          │                       │                       │
          ▼                       ▼                       ▼
 Operations Module       Digital Twin Module      Governance Module
          │                       │                       │
          └───────────────────────┼───────────────────────┘
                                  │
                                  ▼
                         Frontend Service Layer
                                  │
                                  ▼
                            API Gateway
                                  │
       ┌──────────────────────────┼──────────────────────────┐
       │                          │                          │
       ▼                          ▼                          ▼
 Operations API            Digital Twin API          Governance API
       │                          │                          │
       ▼                          ▼                          ▼
 Multi-Agent System       Simulation Engine        AI Governance Engine
       │                          │                          │
       └──────────────────────────┼──────────────────────────┘
                                  │
                                  ▼
                         Healthcare Data Platform
```

---

# Conclusion

The **Hospital Operations Optimization UI** provides a strongly typed, modular, and maintainable React architecture for AI-driven hospital operations management.

The project demonstrates:

* React functional components
* TypeScript API contracts
* Immutable nested state management
* Dynamic admissions management
* Dynamic staffing management
* Axios API integration
* Service-layer business validation
* Centralized API error handling
* React Router navigation
* AI agent processing visualization
* Markdown recommendation rendering
* Operational KPI dashboards
* Revenue optimization visualization
* Responsive healthcare UI design

The layered architecture clearly separates:

```text
Presentation
Business Validation
API Communication
Data Contracts
Styling
```

This structure provides a solid frontend foundation for an enterprise **AI Healthcare Command Center** and can be extended with additional operational, simulation, governance, predictive analytics, and multi-agent AI modules.
