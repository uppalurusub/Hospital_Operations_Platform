from utils.logger import logger

from implementation.operations_impl import (
    OperationsImplementation
)

from models.request_model import (
    HospitalOperationsRequest
)

from models.response_model import (
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
            start_ts = time.time()

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
                # Log to MLflow
                mlflow.log_param(
                    "start_time",
                    start_time.strftime("%Y-%m-%d %H:%M:%S")
                )
                mlflow.log_param(
                    "input_text",
                    request
                )

                response = await self.impl.optimize_operations(
                    request
                )

                mlflow.log_param(
                    "response",
                    response
                )

                mlflow.set_tag(
                    "source",
                    "FastAPI"
                )

                mlflow.set_tag(
                    "endpoint",
                    "monitoring/analyze"
                )



                end_time = datetime.now()
                end_ts = time.time()

                execution_time = end_ts - start_ts

                mlflow.log_param(
                    "end_time",
                    end_time.strftime("%Y-%m-%d %H:%M:%S")
                )

                mlflow.log_metric(
                    "execution_time_seconds",
                    round(execution_time, 4)
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

