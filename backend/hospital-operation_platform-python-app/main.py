from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from loguru import logger

from routers.operations_router import router
from fastapi.middleware.cors import (
    CORSMiddleware,
)


# =====================================================
# Application Lifecycle Events
# =====================================================

@asynccontextmanager
async def lifespan(app: FastAPI):

    logger.info(
        "=" * 80
    )

    logger.info(
        "Starting Autonomous Hospital Operations Platform"
    )

    logger.info(
        "Initializing AutoGen Agents"
    )

    logger.info(
        "Application Startup Completed"
    )

    logger.info(
        "=" * 80
    )

    yield

    logger.info(
        "=" * 80
    )

    logger.info(
        "Shutting Down Autonomous Hospital Operations Platform"
    )

    logger.info(
        "Releasing Resources"
    )

    logger.info(
        "Application Shutdown Completed"
    )

    logger.info(
        "=" * 80
    )


# =====================================================
# FastAPI App
# =====================================================

app = FastAPI(
    title="Autonomous Hospital Operations Platform",
    description="""
    Multi-Agent Hospital Operations Optimization Platform

    Agents:
    - Admissions Agent
    - Bed Management Agent
    - Staffing Agent
    - Resource Agent
    - Revenue Agent

    Powered by:
    - AutoGen 0.7.5
    - FastAPI
    - Loguru
    """,
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =====================================================
# Include Routers
# =====================================================

app.include_router(
    router,
    prefix="/api/v1"
)


# =====================================================
# Root Endpoint
# =====================================================

@app.get("/")
async def root():

    logger.info(
        "Root Endpoint Invoked"
    )

    return {
        "application":
            "Autonomous Hospital Operations Platform",
        "version": "1.0.0",
        "status": "Running"
    }


# =====================================================
# Health Check
# =====================================================

@app.get("/health")
async def health_check():

    logger.info(
        "Application Health Check Invoked"
    )

    return {
        "status": "UP",
        "application":
            "Autonomous Hospital Operations Platform"
    }


# =====================================================
# Global Exception Handler
# =====================================================

@app.exception_handler(Exception)
async def global_exception_handler(
    request: Request,
    exc: Exception
):

    logger.exception(
        f"Unhandled Exception: {str(exc)}"
    )

    return JSONResponse(
        status_code=500,
        content={
            "status": "FAILED",
            "message": str(exc)
        }
    )


# =====================================================
# Startup Log
# =====================================================

logger.info(
    "FastAPI Application Initialized"
)

