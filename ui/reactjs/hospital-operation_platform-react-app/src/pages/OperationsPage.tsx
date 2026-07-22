import { useState } from "react";

import OperationsForm from "../components/operations/OperationsForm";
import OperationsLoader from "../components/operations/OperationsLoader";
import OperationsResult from "../components/operations/OperationsResult";

import { operationsService } from "../services/operationsService";

import type {
  HospitalOperationsRequest,
  HospitalOperationsResponse,
} from "../models/operations";

import "../styles/operations.css";

const OperationsPage = () => {
  const [loading, setLoading] = useState(false);

  const [result, setResult] =
    useState<HospitalOperationsResponse | null>(null);

  const [error, setError] = useState<string | null>(null);

  const handleOptimize = async (
    request: HospitalOperationsRequest,
  ) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response =
        await operationsService.optimizeOperations(request);

      setResult(response);
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? error.message
          : "Hospital operations optimization failed.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="operations-page">
      <header className="operations-page-header">
        <div>
          <span className="operations-page-badge">
            AI Hospital Operations
          </span>

          <h1>Hospital Operations Optimization</h1>

          <p>
            Optimize admissions, bed management, staffing,
            resources, and revenue using autonomous AI agents.
          </p>
        </div>
      </header>

      <OperationsForm
        loading={loading}
        onOptimize={handleOptimize}
      />

      {loading && <OperationsLoader />}

      {error && (
        <div className="operations-error">
          <strong>Optimization Failed</strong>

          <p>{error}</p>
        </div>
      )}

      {result && !loading && (
        <OperationsResult result={result} />
      )}
    </main>
  );
};

export default OperationsPage;