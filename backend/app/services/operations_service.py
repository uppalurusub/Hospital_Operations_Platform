from app.config.settings import (
    settings,
    usage_capture,
    INPUT_PRICE_PER_1M,
    OUTPUT_PRICE_PER_1M,
)

logger = settings.get_logger()

from app.implementation.operations_impl import (
    OperationsImplementation
)

from app.schemas.request_model import (
    HospitalOperationsRequest
)

from app.schemas.response_model import (
    HospitalOperationsResponse
)

import mlflow
from datetime import datetime
import time

mlflow.set_tracking_uri(
    "http://localhost:5000"
)

mlflow.set_experiment(
    "Hospital_Operations_Platform_Interface"
)


class OperationsService:

    def __init__(self):
        self.impl = OperationsImplementation()

    async def optimize_operations(
        self,
        request: HospitalOperationsRequest
    ) -> HospitalOperationsResponse:

        logger.info(
            f"Service Layer Started | "
            f"Request ID: {request.request_id}"
        )

        try:

            
            
            start_time = datetime.now()
            start_ts = time.perf_counter()

            # =====================================
            # Basic Validation
            # =====================================

            if not request.admissions:
                raise ValueError(
                    "Admissions data is required."
                )

            if request.hospital_info.total_capacity <= 0:
                raise ValueError(
                    "Hospital capacity must be greater than zero."
                )

            logger.info(
                f"Hospital: "
                f"{request.hospital_info.hospital_name}"
            )

            logger.info(
                f"Current Patients: "
                f"{request.hospital_info.current_patient_count}"
            )

            logger.info(
                f"Admissions Received: "
                f"{len(request.admissions)}"
            )

            # =====================================
            # Call Implementation Layer
            # =====================================

            with mlflow.start_run(
                run_name=
                f"Hospital_Operations_Platform_Operations_Optimize_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
            ):
                mlflow.log_param("start_time", start_time.isoformat())
                mlflow.set_tag("source", "FastAPI")
                mlflow.set_tag("endpoint", "optimize_operations")
                mlflow.set_tag("llm_provider", "OpenRouter")

                with usage_capture() as usage:

                    response = await self.impl.optimize_operations(
                        request
                    )


                execution_time = time.perf_counter() - start_ts
                usage_values = usage.as_dict()

                print("usage_values: ",usage_values)
                


                # Log configuration and actual usage separately.
                mlflow.log_param("llm_model", usage_values["model"])
                mlflow.log_param(
                    "input_price_per_1m_usd", INPUT_PRICE_PER_1M
                )
                mlflow.log_param(
                    "output_price_per_1m_usd", OUTPUT_PRICE_PER_1M
                )
                mlflow.log_param("input", request)
                mlflow.log_param("output", response)
                mlflow.log_param("execution_time", execution_time)

                metric_names = (
                    "input_tokens",
                    "output_tokens",
                    "total_tokens",
                    "input_cost_usd",
                    "output_cost_usd",
                    "total_cost_usd",
                    "llm_call_count",
                    "usage_reported_call_count",
                )
                for metric_name in metric_names:
                    mlflow.log_metric(
                        metric_name,
                        float(usage_values[metric_name])
                    )

                mlflow.log_metric(
                    "execution_time_seconds",
                    round(execution_time, 4)
                )

                mlflow.set_tag("llm_usage_source", usage_values["source"])
                mlflow.log_param("end_time", datetime.now().isoformat())

                logger.info(
                    "LLM usage captured: "
                    f"model={usage_values['model']}, "
                    f"input_tokens={usage_values['input_tokens']}, "
                    f"output_tokens={usage_values['output_tokens']}, "
                    f"total_tokens={usage_values['total_tokens']}, "
                    f"input_cost_usd={usage_values['input_cost_usd']:.15f}, "
                    f"output_cost_usd={usage_values['output_cost_usd']:.15f}, "
                    f"total_cost_usd={usage_values['total_cost_usd']:.15f}, "
                    f"llm_call_count={usage_values['llm_call_count']}, "
                    f"usage_reported_call_count="
                    f"{usage_values['usage_reported_call_count']}"
                )

                if usage_values["usage_reported_call_count"] == 0:
                    logger.warning(
                        "No token usage was reported by the AutoGen model "
                        "client. Check that MonitoringImplementation uses "
                        "settings.get_model_client() and that the provider "
                        "returns usage metadata."
                    )

            logger.success(
                f"Service Layer Completed | "
                f"Request ID: {request.request_id}"
            )

            return response

        except ValueError as ve:

            logger.error(
                f"Validation Error | "
                f"Request ID: {request.request_id} | "
                f"Error: {str(ve)}"
            )

            raise ve

        except Exception as ex:

            logger.exception(
                f"Service Failure | "
                f"Request ID: {request.request_id} | "
                f"Error: {str(ex)}"
            )

            raise ex

    async def health_check(self) -> dict:

        logger.info(
            "Hospital Operations Service Health Check"
        )

        return {
            "status": "UP",
            "service": "Hospital Operations Service"
        }

