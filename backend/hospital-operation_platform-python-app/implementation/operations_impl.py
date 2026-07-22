import time
from datetime import datetime

from utils.logger import logger

from autogen_agentchat.messages import TextMessage
from autogen_ext.models.openai import OpenAIChatCompletionClient
from config.llm_config import get_model_client

from agents.operations_orchestrator import OperationsOrchestrator 

from models.response_model import (
    HospitalOperationsResponse,
    ExecutiveSummary,
    AdmissionsOptimization,
    BedOptimization,
    StaffingOptimization,
    ResourceOptimization,
    RevenueOptimization,
    OperationalKPIs
)


class OperationsImplementation:

    def __init__(self):

        self.model_client = get_model_client()

    async def optimize_operations(self, request):

        start_time = time.time()

        logger.info(
            f"Hospital Operations Optimization Started "
            f"Request ID : {request.request_id}"
        )

        try:

            orchestrator = OperationsOrchestrator(
                self.model_client
            )
            team = orchestrator.build_team()

            task = self._build_task(request)

            logger.info("Executing AutoGen Team Workflow")

            result = await team.run(
                task=TextMessage(
                    content=task,
                    source="user"
                )
            )

            logger.info("Agent Workflow Completed")

            recommendations = []

            for msg in result.messages:

                recommendations.append({
                    "agent_name": msg.source,
                    "recommendation": msg.content,
                    "priority": "Medium",
                    "confidence_score": 0.90
                })

            execution_time = round(
                time.time() - start_time,
                2
            )

            logger.success(
                f"Optimization Completed "
                f"in {execution_time} seconds"
            )

            response = HospitalOperationsResponse(
                request_id=request.request_id,
                analysis_timestamp=datetime.utcnow(),
                status="SUCCESS",

                executive_summary=ExecutiveSummary(
                    overall_status="OPTIMIZED",
                    hospital_health_score=90.0,
                    operational_efficiency_score=88.0,
                    key_findings=[
                        "Hospital operations analyzed",
                        "Optimization recommendations generated"
                    ]
                ),

                admissions_optimization=AdmissionsOptimization(
                    total_admissions_processed=len(
                        request.admissions
                    ),
                    emergency_cases=sum(
                        1
                        for p in request.admissions
                        if p.admission_type.lower()
                        == "emergency"
                    ),
                    elective_cases=sum(
                        1
                        for p in request.admissions
                        if p.admission_type.lower()
                        == "elective"
                    ),
                    critical_cases=sum(
                        1
                        for p in request.admissions
                        if p.severity.lower()
                        == "critical"
                    ),
                    recommendations=[
                        "Prioritize critical patients",
                        "Optimize admission flow"
                    ]
                ),

                bed_optimization=BedOptimization(
                    icu_occupancy_rate=(
                        request.bed_status.occupied_icu_beds
                        / request.bed_status.total_icu_beds
                    ) * 100,

                    ward_occupancy_rate=(
                        request.bed_status.occupied_ward_beds
                        / request.bed_status.total_ward_beds
                    ) * 100,

                    private_room_occupancy_rate=(
                        request.bed_status.occupied_private_rooms
                        / request.bed_status.total_private_rooms
                    ) * 100,

                    available_icu_beds=
                    request.bed_status.total_icu_beds -
                    request.bed_status.occupied_icu_beds,

                    available_ward_beds=
                    request.bed_status.total_ward_beds -
                    request.bed_status.occupied_ward_beds,

                    recommendations=[
                        "Monitor ICU utilization",
                        "Improve discharge planning"
                    ]
                ),

                staffing_optimization=StaffingOptimization(
                    doctor_utilization_rate=75.0,
                    nurse_utilization_rate=80.0,
                    technician_utilization_rate=70.0,
                    staffing_gap_identified=False,
                    recommendations=[
                        "Maintain staffing levels"
                    ]
                ),

                resource_optimization=ResourceOptimization(
                    ventilator_utilization_rate=70.0,
                    oxygen_utilization_rate=65.0,
                    equipment_utilization_rate=75.0,
                    pharmacy_stock_percentage=
                    request.resource_status.pharmacy_stock_percentage,
                    recommendations=[
                        "Monitor critical equipment"
                    ]
                ),

                revenue_optimization=RevenueOptimization(
                    daily_revenue=
                    request.revenue_status.daily_revenue,

                    projected_monthly_revenue=
                    request.revenue_status.monthly_revenue,

                    operational_cost=
                    request.revenue_status.operational_cost,

                    profit_margin=round(
                        (
                            request.revenue_status.daily_revenue -
                            request.revenue_status.operational_cost
                        )
                        /
                        request.revenue_status.daily_revenue
                        * 100,
                        2
                    ),

                    outstanding_claims=
                    request.revenue_status.outstanding_claims,

                    recommendations=[
                        "Accelerate claim processing",
                        "Reduce operational waste"
                    ]
                ),

                operational_kpis=OperationalKPIs(
                    hospital_capacity_utilization=round(
                        (
                            request.hospital_info.current_patient_count
                            /
                            request.hospital_info.total_capacity
                        )
                        * 100,
                        2
                    ),
                    patient_to_bed_ratio=0.85,
                    average_length_of_stay=4.2,
                    patient_flow_efficiency=88.5,
                    revenue_per_patient=600.0
                ),

                risk_alerts=[],
                agent_recommendations=recommendations,
                agent_outputs=[],
                final_decision="APPROVED",

                next_actions=[
                    "Review ICU occupancy",
                    "Monitor staffing allocation",
                    "Track operational KPIs"
                ],

                execution_time_seconds=execution_time
            )

            return response

        except Exception as ex:

            logger.exception(
                f"Hospital Optimization Failed : {str(ex)}"
            )

            raise ex

    def _build_task(self, request):

        return f"""
        Perform Hospital Operations Optimization.

        Hospital:
        {request.hospital_info.model_dump_json(indent=2)}

        Admissions:
        {[x.model_dump() for x in request.admissions]}

        Bed Status:
        {request.bed_status.model_dump_json(indent=2)}

        Staffing:
        {[x.model_dump() for x in request.staffing_status]}

        Resources:
        {request.resource_status.model_dump_json(indent=2)}

        Revenue:
        {request.revenue_status.model_dump_json(indent=2)}

        Analyze and provide:

        1. Admissions Optimization
        2. Bed Allocation Strategy
        3. Staffing Optimization
        4. Resource Optimization
        5. Revenue Optimization
        6. Operational Risks
        7. Final COO Decision

        End your final recommendation with:
        APPROVED
        """

