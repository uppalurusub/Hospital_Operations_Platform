from time import perf_counter

from fastapi import APIRouter, HTTPException, status
from utils.logger import logger

from models.request_model import (
    HospitalOperationsRequest
)

from models.response_model import (
    HospitalOperationsResponse
)

from services.operations_service import (
    OperationsService
)

router = APIRouter(
    prefix="/operations",
    tags=["Hospital Operations Platform"]
)

service = OperationsService()


@router.post(
    "/optimize",
    response_model=HospitalOperationsResponse,
    summary="Optimize Hospital Operations"
)
async def optimize_operations(
    request: HospitalOperationsRequest
):
    """
    Autonomous Hospital Operations Optimization

    Agents:
    - Admissions Agent
    - Bed Management Agent
    - Staffing Agent
    - Resource Agent
    - Revenue Agent
    """

    start_time = perf_counter()

    logger.info(
        f"API Request Received | "
        f"Request ID: {request.request_id}"
    )

    try:

        response = await service.optimize_operations(
            request
        )

        execution_time = round(
            perf_counter() - start_time,
            2
        )

        logger.success(
            f"API Request Completed | "
            f"Request ID: {request.request_id} | "
            f"Execution Time: {execution_time}s"
        )

        return response

    except ValueError as ex:

        logger.error(
            f"Validation Error | "
            f"Request ID: {request.request_id} | "
            f"Error: {str(ex)}"
        )

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(ex)
        )

    except Exception as ex:

        logger.exception(
            f"Internal Server Error | "
            f"Request ID: {request.request_id}"
        )

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(ex)
        )


@router.get(
    "/health",
    status_code=status.HTTP_200_OK,
    summary="Health Check"
)
async def health_check():
    """
    Health Check Endpoint
    """

    logger.info(
        "Hospital Operations Health Check Requested"
    )

    return await service.health_check()


@router.get(
    "/ping",
    status_code=status.HTTP_200_OK,
    summary="Ping Endpoint"
)
async def ping():

    logger.info("Ping Request Received")

    return {
        "status": "success",
        "message": "Hospital Operations API Running"
    }

