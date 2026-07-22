// src/components/operations/OperationsResult.tsx

import ReactMarkdown from "react-markdown";

import type {
  HospitalOperationsResponse,
} from "../../models/operations";

interface OperationsResultProps {
  result: HospitalOperationsResponse;
}

interface MetricCardProps {
  label: string;
  value: string | number;
  suffix?: string;
}

interface RecommendationSectionProps {
  title: string;
  recommendations: string[];
}

const formatNumber = (value: number): string =>
  new Intl.NumberFormat("en-IN").format(value);

const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);

const formatPercentage = (value: number): string =>
  `${value.toFixed(2)}%`;

const formatDateTime = (value: string): string => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(date);
};

const MetricCard = ({
  label,
  value,
  suffix,
}: MetricCardProps) => {
  return (
    <div className="operations-metric-card">
      <span className="operations-metric-label">
        {label}:
      </span>{" "}

      <strong className="operations-metric-value">
        {value}
        {suffix}
      </strong>
    </div>
  );
};

const MarkdownList = ({
  items,
}: {
  items: string[];
}) => {
  if (!items || items.length === 0) {
    return (
      <p className="operations-empty-message">
        No information available.
      </p>
    );
  }

  const markdown = items
    .map((item) => `- ${item}`)
    .join("\n");

  return (
    <div className="operations-markdown">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
};

const RecommendationSection = ({
  title,
  recommendations,
}: RecommendationSectionProps) => {
  return (
    <div className="operations-recommendation-block">
      <h4>{title}</h4>

      <MarkdownList items={recommendations} />
    </div>
  );
};


const formatDisplayLabel = (key: string): string =>
  key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());

const formatDisplayValue = (value: unknown): string => {
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (typeof value === "number") {
    return value.toLocaleString();
  }

  return String(value ?? "N/A");
};

const parsePythonLikeValue = (rawValue: string): unknown => {
  const normalized = rawValue
    .replace(/\bTrue\b/g, "true")
    .replace(/\bFalse\b/g, "false")
    .replace(/\bNone\b/g, "null")
    .replace(/'/g, '"');

  try {
    return JSON.parse(normalized);
  } catch {
    return null;
  }
};

const extractRecommendationSections = (recommendation: string) => {
  const cleaned = recommendation
    .replace(/```(?:json|python|text)?/gi, "")
    .replace(/```/g, "")
    .replace(/\r/g, "")
    .replace(/^\s*user\s*$/gim, "")
    .trim();

  const sectionPattern =
    /(?:^|\n)\s*(Hospital|Admissions|Bed Status|Staffing|Resources?|Revenue|Analyze and provide|End your final recommendation with)\s*:\s*/gi;
  const matches = [...cleaned.matchAll(sectionPattern)];

  return matches.map((match, index) => {
    const title = match[1];
    const contentStart = (match.index ?? 0) + match[0].length;
    const contentEnd =
      index + 1 < matches.length
        ? matches[index + 1].index
        : cleaned.length;

    return {
      title,
      content: cleaned.slice(contentStart, contentEnd).trim(),
    };
  });
};

const RecommendationDataGrid = ({
  value,
}: {
  value: Record<string, unknown>;
}) => (
  <dl className="operations-agent-data-grid">
    {Object.entries(value).map(([key, itemValue]) => (
      <div className="operations-agent-data-item" key={key}>
        <dt>{formatDisplayLabel(key)}:</dt>
        <dd>{formatDisplayValue(itemValue)}</dd>
      </div>
    ))}
  </dl>
);

const RecommendationSectionContent = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  const parsed = parsePythonLikeValue(content);

  if (Array.isArray(parsed)) {
    return (
      <div className="operations-agent-record-list">
        {parsed.map((record, index) => (
          <article className="operations-agent-record" key={index}>
            <h6>
              {title.toLowerCase().startsWith("admission")
                ? `Patient ${index + 1}`
                : `${title.replace(/s$/i, "")} ${index + 1}`}
            </h6>
            {record &&
            typeof record === "object" &&
            !Array.isArray(record) ? (
              <RecommendationDataGrid
                value={record as Record<string, unknown>}
              />
            ) : (
              <p>{formatDisplayValue(record)}</p>
            )}
          </article>
        ))}
      </div>
    );
  }

  if (parsed && typeof parsed === "object") {
    return (
      <RecommendationDataGrid
        value={parsed as Record<string, unknown>}
      />
    );
  }

  if (title.toLowerCase() === "analyze and provide") {
    const items = content
      .split("\n")
      .map((item) => item.replace(/^\s*\d+\.\s*/, "").trim())
      .filter(Boolean);

    return (
      <ol className="operations-agent-analysis-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    );
  }

  return <p className="operations-agent-text">{content}</p>;
};

const AgentRecommendation = ({
  recommendation,
}: {
  recommendation: string;
}) => {
  const sections = extractRecommendationSections(recommendation);

  if (!sections.length) {
    return (
      <ReactMarkdown>
        {recommendation || "No recommendation details available."}
      </ReactMarkdown>
    );
  }

  return (
    <div className="operations-agent-sections">
      {sections.map(({ title, content }) => (
        <section
          className="operations-agent-section"
          key={`${title}-${content.slice(0, 20)}`}
        >
          <h5 className="operations-agent-section-title">{title}</h5>
          <RecommendationSectionContent
            title={title}
            content={content}
          />
        </section>
      ))}
    </div>
  );
};

const OperationsResult = ({
  result,
}: OperationsResultProps) => {
  const {
    request_id,
    analysis_timestamp,
    status,
    executive_summary,
    admissions_optimization,
    bed_optimization,
    staffing_optimization,
    resource_optimization,
    revenue_optimization,
    risk_alerts,
    operational_kpis,
    agent_recommendations,
    final_decision,
    next_actions,
    execution_time_seconds,
    generated_by,
    model_version,
  } = result;

  return (
    <section className="operations-result">
      {/* =====================================================
          RESULT HEADER
      ====================================================== */}

      <div className="operations-result-header">
        <div>
          <span className="operations-result-badge">
            Hospital Operations Platform
          </span>

          <h2>Operations Optimization Result</h2>

          <p>
            Request ID: <strong>{request_id}</strong>
          </p>

          <p>
            Analysis Time:{" "}
            <strong>
              {formatDateTime(analysis_timestamp)}
            </strong>
          </p>
        </div>

        <span
          className={`operations-status-badge operations-status-${status.toLowerCase()}`}
        >
          {status}
        </span>
      </div>

      {/* =====================================================
          EXECUTIVE SUMMARY
      ====================================================== */}

      <div className="operations-result-section">
        <div className="operations-section-title">
          <h3>Executive Summary</h3>

          <span className="operations-optimized-badge">
            {executive_summary.overall_status}
          </span>
        </div>

        <div className="operations-metric-grid">
          <MetricCard
            label="Hospital Health Score"
            value={executive_summary.hospital_health_score}
            suffix="/100"
          />

          <MetricCard
            label="Operational Efficiency"
            value={
              executive_summary.operational_efficiency_score
            }
            suffix="/100"
          />
        </div>

        <div className="operations-content-block">
          <h4>Key Findings</h4>

          <MarkdownList
            items={executive_summary.key_findings}
          />
        </div>
      </div>

      {/* =====================================================
          OPERATIONAL KPIs
      ====================================================== */}

      <div className="operations-result-section">
        <h3>Operational KPIs</h3>

        <div className="operations-metric-grid">
          <MetricCard
            label="Hospital Capacity Utilization"
            value={formatPercentage(
              operational_kpis
                .hospital_capacity_utilization,
            )}
          />

          <MetricCard
            label="Patient to Bed Ratio"
            value={
              operational_kpis.patient_to_bed_ratio
            }
          />

          <MetricCard
            label="Average Length of Stay"
            value={
              operational_kpis.average_length_of_stay
            }
            suffix=" days"
          />

          <MetricCard
            label="Patient Flow Efficiency"
            value={formatPercentage(
              operational_kpis.patient_flow_efficiency,
            )}
          />

          <MetricCard
            label="Revenue per Patient"
            value={formatCurrency(
              operational_kpis.revenue_per_patient,
            )}
          />
        </div>
      </div>

      {/* =====================================================
          ADMISSIONS OPTIMIZATION
      ====================================================== */}

      <div className="operations-result-section">
        <h3>Admissions Optimization</h3>

        <div className="operations-metric-grid">
          <MetricCard
            label="Total Admissions Processed"
            value={
              admissions_optimization
                .total_admissions_processed
            }
          />

          <MetricCard
            label="Emergency Cases"
            value={
              admissions_optimization.emergency_cases
            }
          />

          <MetricCard
            label="Elective Cases"
            value={
              admissions_optimization.elective_cases
            }
          />

          <MetricCard
            label="Critical Cases"
            value={
              admissions_optimization.critical_cases
            }
          />
        </div>

        <RecommendationSection
          title="Admissions Recommendations"
          recommendations={
            admissions_optimization.recommendations
          }
        />
      </div>

      {/* =====================================================
          BED OPTIMIZATION
      ====================================================== */}

      <div className="operations-result-section">
        <h3>Bed Optimization</h3>

        <div className="operations-metric-grid">
          <MetricCard
            label="ICU Occupancy Rate"
            value={formatPercentage(
              bed_optimization.icu_occupancy_rate,
            )}
          />

          <MetricCard
            label="Ward Occupancy Rate"
            value={formatPercentage(
              bed_optimization.ward_occupancy_rate,
            )}
          />

          <MetricCard
            label="Private Room Occupancy"
            value={formatPercentage(
              bed_optimization
                .private_room_occupancy_rate,
            )}
          />

          <MetricCard
            label="Available ICU Beds"
            value={bed_optimization.available_icu_beds}
          />

          <MetricCard
            label="Available Ward Beds"
            value={
              bed_optimization.available_ward_beds
            }
          />
        </div>

        <RecommendationSection
          title="Bed Management Recommendations"
          recommendations={
            bed_optimization.recommendations
          }
        />
      </div>

      {/* =====================================================
          STAFFING OPTIMIZATION
      ====================================================== */}

      <div className="operations-result-section">
        <h3>Staffing Optimization</h3>

        <div className="operations-metric-grid">
          <MetricCard
            label="Doctor Utilization"
            value={formatPercentage(
              staffing_optimization
                .doctor_utilization_rate,
            )}
          />

          <MetricCard
            label="Nurse Utilization"
            value={formatPercentage(
              staffing_optimization
                .nurse_utilization_rate,
            )}
          />

          <MetricCard
            label="Technician Utilization"
            value={formatPercentage(
              staffing_optimization
                .technician_utilization_rate,
            )}
          />

          <MetricCard
            label="Staffing Gap Identified"
            value={
              staffing_optimization
                .staffing_gap_identified
                ? "Yes"
                : "No"
            }
          />
        </div>

        <RecommendationSection
          title="Staffing Recommendations"
          recommendations={
            staffing_optimization.recommendations
          }
        />
      </div>

      {/* =====================================================
          RESOURCE OPTIMIZATION
      ====================================================== */}

      <div className="operations-result-section">
        <h3>Resource Optimization</h3>

        <div className="operations-metric-grid">
          <MetricCard
            label="Ventilator Utilization"
            value={formatPercentage(
              resource_optimization
                .ventilator_utilization_rate,
            )}
          />

          <MetricCard
            label="Oxygen Utilization"
            value={formatPercentage(
              resource_optimization
                .oxygen_utilization_rate,
            )}
          />

          <MetricCard
            label="Equipment Utilization"
            value={formatPercentage(
              resource_optimization
                .equipment_utilization_rate,
            )}
          />

          <MetricCard
            label="Pharmacy Stock"
            value={formatPercentage(
              resource_optimization
                .pharmacy_stock_percentage,
            )}
          />
        </div>

        <RecommendationSection
          title="Resource Recommendations"
          recommendations={
            resource_optimization.recommendations
          }
        />
      </div>

      {/* =====================================================
          REVENUE OPTIMIZATION
      ====================================================== */}

      <div className="operations-result-section">
        <h3>Revenue Optimization</h3>

        <div className="operations-metric-grid">
          <MetricCard
            label="Daily Revenue"
            value={formatCurrency(
              revenue_optimization.daily_revenue,
            )}
          />

          <MetricCard
            label="Projected Monthly Revenue"
            value={formatCurrency(
              revenue_optimization
                .projected_monthly_revenue,
            )}
          />

          <MetricCard
            label="Operational Cost"
            value={formatCurrency(
              revenue_optimization.operational_cost,
            )}
          />

          <MetricCard
            label="Profit Margin"
            value={formatPercentage(
              revenue_optimization.profit_margin,
            )}
          />

          <MetricCard
            label="Outstanding Claims"
            value={formatCurrency(
              revenue_optimization.outstanding_claims,
            )}
          />
        </div>

        <RecommendationSection
          title="Revenue Recommendations"
          recommendations={
            revenue_optimization.recommendations
          }
        />
      </div>

      {/* =====================================================
          RISK ALERTS
      ====================================================== */}

      <div className="operations-result-section">
        <h3>Operational Risk Alerts</h3>

        {risk_alerts.length === 0 ? (
          <div className="operations-success-message">
            No operational risk alerts identified.
          </div>
        ) : (
          <div className="operations-markdown">
            <ReactMarkdown>
              {risk_alerts
                .map(
                  (alert) =>
                    `- ${
                      typeof alert === "string"
                        ? alert
                        : JSON.stringify(alert)
                    }`,
                )
                .join("\n")}
            </ReactMarkdown>
          </div>
        )}
      </div>

      {/* =====================================================
          AGENT RECOMMENDATIONS
      ====================================================== */}

      <div className="operations-result-section">
        <h3>AI Agent Recommendations</h3>

        {agent_recommendations.length === 0 ? (
          <p className="operations-empty-message">
            No agent recommendations available.
          </p>
        ) : (
          <div className="operations-agent-results">
            {agent_recommendations.map(
              (agent, index) => (
                <article
                  className="operations-agent-result-card"
                  key={`${agent.agent_name}-${index}`}
                >
                  <div className="operations-agent-result-header">
                    <div>
                      <h4>{agent.agent_name}</h4>

                      <span className="operations-agent-priority">
                        Priority: {agent.priority}
                      </span>
                    </div>

                    <span className="operations-confidence-score">
                      Confidence:{" "}
                      {formatPercentage(
                        agent.confidence_score * 100,
                      )}
                    </span>
                  </div>

                  <div className="operations-agent-markdown">
                    <AgentRecommendation
                      recommendation={agent.recommendation}
                    />
                  </div>
                </article>
              ),
            )}
          </div>
        )}
      </div>

      {/* =====================================================
          FINAL COO DECISION
      ====================================================== */}

      <div className="operations-final-decision">
        <span className="operations-final-label">
          Final COO Decision
        </span>

        <h3>{final_decision}</h3>
      </div>

      {/* =====================================================
          NEXT ACTIONS
      ====================================================== */}

      <div className="operations-result-section">
        <h3>Next Actions</h3>

        <MarkdownList items={next_actions} />
      </div>

      {/* =====================================================
          EXECUTION DETAILS
      ====================================================== */}

      <div className="operations-result-section">
        <h3>Execution Details</h3>

        <div className="operations-details-grid">
          <div>
            <span>Execution Time:</span>{" "}

            <strong>
              {execution_time_seconds.toFixed(2)} seconds
            </strong>
          </div>

          <div>
            <span>Generated By:</span>{" "}

            <strong>{generated_by}</strong>
          </div>

          <div>
            <span>Model Version:</span>{" "}

            <strong>{model_version}</strong>
          </div>

          <div>
            <span>Request ID:</span>{" "}

            <strong>{request_id}</strong>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OperationsResult;

