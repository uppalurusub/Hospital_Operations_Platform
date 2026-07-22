// src/api/operationsApi.ts

import apiClient from "./apiClient";

import type {
  HospitalOperationsRequest,
  HospitalOperationsResponse,
} from "../models/operations";

const OPERATIONS_OPTIMIZE_ENDPOINT =
  "/operations/optimize";

/**
 * Optimize Hospital Operations
 *
 * POST /operations/optimize
 *
 * @param request Hospital operations optimization request
 * @returns Hospital operations optimization response
 */
export const optimizeOperations = async (
  request: HospitalOperationsRequest,
): Promise<HospitalOperationsResponse> => {
  const response =
    await apiClient.post<HospitalOperationsResponse>(
      OPERATIONS_OPTIMIZE_ENDPOINT,
      request,
    );

  return response.data;
};

