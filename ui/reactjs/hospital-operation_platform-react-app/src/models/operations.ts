// src/models/operations.ts

// ============================================================
// REQUEST MODELS
// ============================================================

export interface HospitalInfo {
  hospital_name: string;
  hospital_id: string;
  city: string;
  state: string;
  total_capacity: number;
  current_patient_count: number;
}

export interface Admission {
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

export interface BedStatus {
  total_icu_beds: number;
  occupied_icu_beds: number;

  total_ward_beds: number;
  occupied_ward_beds: number;

  total_private_rooms: number;
  occupied_private_rooms: number;
}

export interface StaffingStatus {
  department: string;
  doctors_available: number;
  nurses_available: number;
  technicians_available: number;
  support_staff_available: number;
  current_shift: string;
}

export interface ResourceStatus {
  ventilators_available: number;
  oxygen_units_available: number;
  operation_theaters_available: number;
  ambulances_available: number;
  diagnostic_machines_available: number;
  pharmacy_stock_percentage: number;
}

export interface RevenueStatus {
  daily_revenue: number;
  monthly_revenue: number;
  operational_cost: number;
  outstanding_claims: number;
  pending_bills: number;
}

export interface HospitalOperationsRequest {
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


// ============================================================
// RESPONSE MODELS
// ============================================================

export interface ExecutiveSummary {
  overall_status: string;
  hospital_health_score: number;
  operational_efficiency_score: number;
  key_findings: string[];
}

export interface AdmissionsOptimization {
  total_admissions_processed: number;
  emergency_cases: number;
  elective_cases: number;
  critical_cases: number;
  recommendations: string[];
}

export interface BedOptimization {
  icu_occupancy_rate: number;
  ward_occupancy_rate: number;
  private_room_occupancy_rate: number;

  available_icu_beds: number;
  available_ward_beds: number;

  recommendations: string[];
}

export interface StaffingOptimization {
  doctor_utilization_rate: number;
  nurse_utilization_rate: number;
  technician_utilization_rate: number;

  staffing_gap_identified: boolean;

  recommendations: string[];
}

export interface ResourceOptimization {
  ventilator_utilization_rate: number;
  oxygen_utilization_rate: number;
  equipment_utilization_rate: number;

  pharmacy_stock_percentage: number;

  recommendations: string[];
}

export interface RevenueOptimization {
  daily_revenue: number;
  projected_monthly_revenue: number;
  operational_cost: number;
  profit_margin: number;
  outstanding_claims: number;

  recommendations: string[];
}

export interface OperationalKPIs {
  hospital_capacity_utilization: number;
  patient_to_bed_ratio: number;
  average_length_of_stay: number;
  patient_flow_efficiency: number;
  revenue_per_patient: number;
}

export interface AgentRecommendation {
  agent_name: string;
  recommendation: string;
  priority: string;
  confidence_score: number;
}

export interface HospitalOperationsResponse {
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


// ============================================================
// API ERROR MODEL
// ============================================================

export interface OperationsApiError {
  detail: string;
}


// ============================================================
// TYPE ALIASES
// ============================================================

export type OperationsStatus =
  | "SUCCESS"
  | "FAILED"
  | "PROCESSING";

export type OverallOperationsStatus =
  | "OPTIMIZED"
  | "WARNING"
  | "CRITICAL";

export type FinalDecision =
  | "APPROVED"
  | "REJECTED"
  | "REVIEW_REQUIRED";

export type AdmissionType =
  | "Emergency"
  | "Elective";

export type Severity =
  | "Critical"
  | "High"
  | "Medium"
  | "Low";

export type Gender =
  | "Male"
  | "Female"
  | "Other";

export type Shift =
  | "Morning"
  | "Afternoon"
  | "Evening"
  | "Night";

export type RecommendationPriority =
  | "Critical"
  | "High"
  | "Medium"
  | "Low";

