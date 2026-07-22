
from pydantic import BaseModel
from typing import List, Dict, Optional
from datetime import datetime


# =====================================================
# Individual Agent Recommendation
# =====================================================

class AgentRecommendation(BaseModel):
    agent_name: str
    recommendation: str
    priority: str  # Low, Medium, High, Critical
    confidence_score: float


# =====================================================
# Admissions Optimization
# =====================================================

class AdmissionsOptimization(BaseModel):
    total_admissions_processed: int
    emergency_cases: int
    elective_cases: int
    critical_cases: int
    recommendations: List[str]


# =====================================================
# Bed Optimization
# =====================================================

class BedOptimization(BaseModel):
    icu_occupancy_rate: float
    ward_occupancy_rate: float
    private_room_occupancy_rate: float
    available_icu_beds: int
    available_ward_beds: int
    recommendations: List[str]


# =====================================================
# Staffing Optimization
# =====================================================

class StaffingOptimization(BaseModel):
    doctor_utilization_rate: float
    nurse_utilization_rate: float
    technician_utilization_rate: float
    staffing_gap_identified: bool
    recommendations: List[str]


# =====================================================
# Resource Optimization
# =====================================================

class ResourceOptimization(BaseModel):
    ventilator_utilization_rate: float
    oxygen_utilization_rate: float
    equipment_utilization_rate: float
    pharmacy_stock_percentage: float
    recommendations: List[str]


# =====================================================
# Revenue Optimization
# =====================================================

class RevenueOptimization(BaseModel):
    daily_revenue: float
    projected_monthly_revenue: float
    operational_cost: float
    profit_margin: float
    outstanding_claims: float
    recommendations: List[str]


# =====================================================
# Risk Alert
# =====================================================

class RiskAlert(BaseModel):
    risk_type: str
    severity: str
    description: str
    mitigation_plan: str


# =====================================================
# Operational KPI Summary
# =====================================================

class OperationalKPIs(BaseModel):
    hospital_capacity_utilization: float
    patient_to_bed_ratio: float
    average_length_of_stay: float
    patient_flow_efficiency: float
    revenue_per_patient: float


# =====================================================
# Agent Output Summary
# =====================================================

class AgentOutput(BaseModel):
    agent_name: str
    status: str
    summary: str


# =====================================================
# Executive Summary
# =====================================================

class ExecutiveSummary(BaseModel):
    overall_status: str
    hospital_health_score: float
    operational_efficiency_score: float
    key_findings: List[str]


# =====================================================
# Main Response Model
# =====================================================

class HospitalOperationsResponse(BaseModel):

    request_id: str

    analysis_timestamp: datetime

    status: str

    executive_summary: ExecutiveSummary

    admissions_optimization: AdmissionsOptimization

    bed_optimization: BedOptimization

    staffing_optimization: StaffingOptimization

    resource_optimization: ResourceOptimization

    revenue_optimization: RevenueOptimization

    risk_alerts: List[RiskAlert]

    operational_kpis: OperationalKPIs

    agent_recommendations: List[AgentRecommendation]

    agent_outputs: List[AgentOutput]

    final_decision: str

    next_actions: List[str]

    execution_time_seconds: float

    generated_by: str = "AutoGen Hospital Operations Platform"

    model_version: str = "0.7.5"

    metadata: Optional[Dict] = {}

