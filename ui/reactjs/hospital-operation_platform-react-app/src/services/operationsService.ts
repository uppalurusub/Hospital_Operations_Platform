// src/services/operationsService.ts

import axios from "axios";

import {
  optimizeOperations,
} from "../api/operationsApi";

import type {
  HospitalOperationsRequest,
  HospitalOperationsResponse,
} from "../models/operations";

/**
 * Hospital Operations Service
 *
 * Handles business validation and communication
 * with the Hospital Operations API layer.
 */
class OperationsService {
  /**
   * Optimize hospital operations.
   *
   * POST /operations/optimize
   *
   * @param request Hospital operations request
   * @returns Hospital operations optimization response
   */
  async optimizeOperations(
    request: HospitalOperationsRequest,
  ): Promise<HospitalOperationsResponse> {
    this.validateRequest(request);

    try {
      return await optimizeOperations(request);
    } catch (error: unknown) {
      throw this.handleError(error);
    }
  }

  /**
   * Validate hospital operations request.
   */
  private validateRequest(
    request: HospitalOperationsRequest,
  ): void {
    if (!request) {
      throw new Error(
        "Hospital operations request is required.",
      );
    }

    if (!request.request_id?.trim()) {
      throw new Error("Request ID is required.");
    }

    if (!request.hospital_info) {
      throw new Error(
        "Hospital information is required.",
      );
    }

    if (
      !request.hospital_info.hospital_name?.trim()
    ) {
      throw new Error("Hospital name is required.");
    }

    if (!request.hospital_info.hospital_id?.trim()) {
      throw new Error("Hospital ID is required.");
    }

    if (request.hospital_info.total_capacity <= 0) {
      throw new Error(
        "Hospital total capacity must be greater than zero.",
      );
    }

    if (
      request.hospital_info.current_patient_count < 0
    ) {
      throw new Error(
        "Current patient count cannot be negative.",
      );
    }

    if (
      request.hospital_info.current_patient_count >
      request.hospital_info.total_capacity
    ) {
      throw new Error(
        "Current patient count cannot exceed hospital total capacity.",
      );
    }

    if (
      !request.admissions ||
      request.admissions.length === 0
    ) {
      throw new Error(
        "At least one admission is required.",
      );
    }

    request.admissions.forEach(
      (admission, index) => {
        if (!admission.patient_id?.trim()) {
          throw new Error(
            `Patient ID is required for admission ${
              index + 1
            }.`,
          );
        }

        if (!admission.patient_name?.trim()) {
          throw new Error(
            `Patient name is required for admission ${
              index + 1
            }.`,
          );
        }

        if (admission.age < 0) {
          throw new Error(
            `Patient age cannot be negative for admission ${
              index + 1
            }.`,
          );
        }

        if (!admission.department?.trim()) {
          throw new Error(
            `Department is required for admission ${
              index + 1
            }.`,
          );
        }

        if (
          admission.estimated_length_of_stay <= 0
        ) {
          throw new Error(
            `Estimated length of stay must be greater than zero for admission ${
              index + 1
            }.`,
          );
        }
      },
    );

    if (!request.bed_status) {
      throw new Error("Bed status is required.");
    }

    if (
      request.bed_status.occupied_icu_beds >
      request.bed_status.total_icu_beds
    ) {
      throw new Error(
        "Occupied ICU beds cannot exceed total ICU beds.",
      );
    }

    if (
      request.bed_status.occupied_ward_beds >
      request.bed_status.total_ward_beds
    ) {
      throw new Error(
        "Occupied ward beds cannot exceed total ward beds.",
      );
    }

    if (
      request.bed_status.occupied_private_rooms >
      request.bed_status.total_private_rooms
    ) {
      throw new Error(
        "Occupied private rooms cannot exceed total private rooms.",
      );
    }

    if (
      !request.staffing_status ||
      request.staffing_status.length === 0
    ) {
      throw new Error(
        "At least one staffing department is required.",
      );
    }

    request.staffing_status.forEach(
      (staffing, index) => {
        if (!staffing.department?.trim()) {
          throw new Error(
            `Department is required for staffing record ${
              index + 1
            }.`,
          );
        }

        if (
          staffing.doctors_available < 0 ||
          staffing.nurses_available < 0 ||
          staffing.technicians_available < 0 ||
          staffing.support_staff_available < 0
        ) {
          throw new Error(
            `Staff availability values cannot be negative for staffing record ${
              index + 1
            }.`,
          );
        }
      },
    );

    if (!request.resource_status) {
      throw new Error("Resource status is required.");
    }

    if (
      request.resource_status
        .pharmacy_stock_percentage < 0 ||
      request.resource_status
        .pharmacy_stock_percentage > 100
    ) {
      throw new Error(
        "Pharmacy stock percentage must be between 0 and 100.",
      );
    }

    if (!request.revenue_status) {
      throw new Error("Revenue status is required.");
    }

    if (
      request.revenue_status.daily_revenue < 0 ||
      request.revenue_status.monthly_revenue < 0 ||
      request.revenue_status.operational_cost < 0 ||
      request.revenue_status.outstanding_claims < 0 ||
      request.revenue_status.pending_bills < 0
    ) {
      throw new Error(
        "Revenue and financial values cannot be negative.",
      );
    }

    if (!request.optimization_goal?.trim()) {
      throw new Error(
        "Optimization goal is required.",
      );
    }
  }

  /**
   * Convert API and network errors into
   * user-friendly application errors.
   */
  private handleError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const detail = error.response?.data?.detail;

      if (status === 400) {
        return new Error(
          this.extractErrorMessage(
            detail,
            "Invalid hospital operations request.",
          ),
        );
      }

      if (status === 422) {
        return new Error(
          this.extractErrorMessage(
            detail,
            "Hospital operations request validation failed.",
          ),
        );
      }

      if (status === 500) {
        return new Error(
          this.extractErrorMessage(
            detail,
            "Hospital operations optimization failed on the server.",
          ),
        );
      }

      if (error.code === "ECONNABORTED") {
        return new Error(
          "Hospital operations optimization request timed out.",
        );
      }

      if (!error.response) {
        return new Error(
          "Unable to connect to the Hospital Operations API.",
        );
      }

      return new Error(
        this.extractErrorMessage(
          detail,
          `Hospital Operations API request failed with status ${status}.`,
        ),
      );
    }

    if (error instanceof Error) {
      return error;
    }

    return new Error(
      "An unexpected hospital operations optimization error occurred.",
    );
  }

  /**
   * Extract FastAPI validation or error details.
   */
  private extractErrorMessage(
    detail: unknown,
    fallbackMessage: string,
  ): string {
    if (typeof detail === "string") {
      return detail;
    }

    if (Array.isArray(detail)) {
      const messages = detail
        .map((item) => {
          if (
            typeof item === "object" &&
            item !== null &&
            "msg" in item
          ) {
            return String(item.msg);
          }

          return null;
        })
        .filter(
          (message): message is string =>
            message !== null,
        );

      if (messages.length > 0) {
        return messages.join(", ");
      }
    }

    return fallbackMessage;
  }
}

export const operationsService =
  new OperationsService();

export default operationsService;

