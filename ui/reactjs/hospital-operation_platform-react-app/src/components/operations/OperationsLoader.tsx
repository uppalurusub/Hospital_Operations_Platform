// src/components/operations/OperationsLoader.tsx

const optimizationAgents = [
  {
    name: "Admissions Agent",
    description:
      "Analyzing patient admissions, severity, and ICU requirements.",
  },
  {
    name: "Bed Management Agent",
    description:
      "Evaluating ICU, ward, and private room utilization.",
  },
  {
    name: "Staffing Agent",
    description:
      "Reviewing doctors, nurses, technicians, and support staff.",
  },
  {
    name: "Resource Agent",
    description:
      "Analyzing critical hospital equipment and resource availability.",
  },
  {
    name: "Revenue Agent",
    description:
      "Evaluating revenue, operational costs, claims, and pending bills.",
  },
];

const OperationsLoader = () => {
  return (
    <section
      className="operations-loader-container"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className="operations-spinner"
        aria-hidden="true"
      />

      <div className="operations-loader-header">
        <h2>Optimizing Hospital Operations</h2>

        <p>
          Autonomous AI agents are analyzing hospital
          operations and generating optimization
          recommendations.
        </p>
      </div>

      <div className="operations-agent-list">
        {optimizationAgents.map((agent, index) => (
          <div
            className="operations-agent-card"
            key={agent.name}
          >
            <div className="operations-agent-indicator">
              <span className="operations-agent-number">
                {index + 1}
              </span>

              <span className="operations-agent-pulse" />
            </div>

            <div className="operations-agent-content">
              <h3>{agent.name}</h3>

              <p>{agent.description}</p>
            </div>

            <span className="operations-agent-status">
              Processing
            </span>
          </div>
        ))}
      </div>

      <div className="operations-loader-footer">
        <span className="operations-processing-dot" />
        <span className="operations-processing-dot" />
        <span className="operations-processing-dot" />

        <p>
          Generating operational KPIs and final optimization
          decision...
        </p>
      </div>
    </section>
  );
};

export default OperationsLoader;

