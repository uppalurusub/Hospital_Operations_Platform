from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime


# =====================================================
# Patient Admission Information
# =====================================================

class PatientAdmission(BaseModel):
    patient_id: str = Field(..., description="Patient Identifier")
    patient_name: str
    age: int
    gender: str
    department: str
    admission_type: str  # Emergency, Elective, Transfer
    severity: str  # Low, Medium, High, Critical
    estimated_length_of_stay: int
    requires_icu: bool = False


# =====================================================
# Bed Availability Information
# =====================================================

class BedAvailability(BaseModel):
    total_icu_beds: int
    occupied_icu_beds: int
    total_ward_beds: int
    occupied_ward_beds: int
    total_private_rooms: int
    occupied_private_rooms: int


# =====================================================
# Staffing Information
# =====================================================

class StaffAvailability(BaseModel):
    department: str
    doctors_available: int
    nurses_available: int
    technicians_available: int
    support_staff_available: int
    current_shift: str  # Morning, Evening, Night


# =====================================================
# Resource Information
# =====================================================

class ResourceAvailability(BaseModel):
    ventilators_available: int
    oxygen_units_available: int
    operation_theaters_available: int
    ambulances_available: int
    diagnostic_machines_available: int
    pharmacy_stock_percentage: float


# =====================================================
# Revenue Information
# =====================================================

class RevenueMetrics(BaseModel):
    daily_revenue: float
    monthly_revenue: float
    operational_cost: float
    outstanding_claims: float
    pending_bills: float


# =====================================================
# Hospital Overview
# =====================================================

class HospitalOverview(BaseModel):
    hospital_name: str
    hospital_id: str
    city: str
    state: str
    total_capacity: int
    current_patient_count: int


# =====================================================
# Main Request Model
# =====================================================

class HospitalOperationsRequest(BaseModel):

    request_id: str
    analysis_timestamp: datetime = Field(
        default_factory=datetime.utcnow
    )

    hospital_info: HospitalOverview

    admissions: List[PatientAdmission]

    bed_status: BedAvailability

    staffing_status: List[StaffAvailability]

    resource_status: ResourceAvailability

    revenue_status: RevenueMetrics

    optimization_goal: str = Field(
        default="Optimize Hospital Operations"
    )

    additional_notes: Optional[str] = None

