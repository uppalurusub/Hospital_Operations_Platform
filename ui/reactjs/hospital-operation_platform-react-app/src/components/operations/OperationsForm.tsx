// src/components/operations/OperationsForm.tsx

import { useState, type FormEvent } from "react";

import type {
  Admission,
  HospitalOperationsRequest,
  StaffingStatus,
} from "../../models/operations";

interface OperationsFormProps {
  loading: boolean;
  onOptimize: (
    request: HospitalOperationsRequest,
  ) => Promise<void>;
}

const createRequestId = (): string =>
  `OPS-${Date.now()}`;

const createAdmission = (): Admission => ({
  patient_id: "",
  patient_name: "",
  age: 0,
  gender: "Male",
  department: "",
  admission_type: "Emergency",
  severity: "Medium",
  estimated_length_of_stay: 1,
  requires_icu: false,
});

const createStaffingStatus = (): StaffingStatus => ({
  department: "",
  doctors_available: 0,
  nurses_available: 0,
  technicians_available: 0,
  support_staff_available: 0,
  current_shift: "Morning",
});

const createInitialRequest =
  (): HospitalOperationsRequest => ({
    "request_id": "OPS-20260623-001",
    "analysis_timestamp": "2026-06-23T09:22:46.318Z",
    "hospital_info": {
        "hospital_name": "Apollo Multi Specialty Hospital",
        "hospital_id": "APH-HYD-001",
        "city": "Hyderabad",
        "state": "Telangana",
        "total_capacity": 500,
        "current_patient_count": 425
    },
    "admissions": [
        {
            "patient_id": "PAT-1001",
            "patient_name": "Ramesh Kumar",
            "age": 68,
            "gender": "Male",
            "department": "Cardiology",
            "admission_type": "Emergency",
            "severity": "Critical",
            "estimated_length_of_stay": 7,
            "requires_icu": true
        },
        {
            "patient_id": "PAT-1002",
            "patient_name": "Priya Sharma",
            "age": 45,
            "gender": "Female",
            "department": "Neurology",
            "admission_type": "Elective",
            "severity": "Medium",
            "estimated_length_of_stay": 4,
            "requires_icu": false
        },
        {
            "patient_id": "PAT-1003",
            "patient_name": "Mohammed Ali",
            "age": 59,
            "gender": "Male",
            "department": "Pulmonology",
            "admission_type": "Emergency",
            "severity": "High",
            "estimated_length_of_stay": 5,
            "requires_icu": true
        }
    ],
    "bed_status": {
        "total_icu_beds": 50,
        "occupied_icu_beds": 46,
        "total_ward_beds": 300,
        "occupied_ward_beds": 255,
        "total_private_rooms": 150,
        "occupied_private_rooms": 124
    },
    "staffing_status": [
        {
            "department": "Cardiology",
            "doctors_available": 12,
            "nurses_available": 25,
            "technicians_available": 8,
            "support_staff_available": 10,
            "current_shift": "Morning"
        },
        {
            "department": "Neurology",
            "doctors_available": 8,
            "nurses_available": 18,
            "technicians_available": 5,
            "support_staff_available": 7,
            "current_shift": "Morning"
        },
        {
            "department": "Pulmonology",
            "doctors_available": 6,
            "nurses_available": 14,
            "technicians_available": 4,
            "support_staff_available": 6,
            "current_shift": "Morning"
        }
    ],
    "resource_status": {
        "ventilators_available": 18,
        "oxygen_units_available": 65,
        "operation_theaters_available": 6,
        "ambulances_available": 10,
        "diagnostic_machines_available": 15,
        "pharmacy_stock_percentage": 92.5
    },
    "revenue_status": {
        "daily_revenue": 2750000,
        "monthly_revenue": 82500000,
        "operational_cost": 1900000,
        "outstanding_claims": 12500000,
        "pending_bills": 4500000
    },
    "optimization_goal": "Reduce ICU congestion, optimize staffing utilization, improve patient flow, and maximize hospital revenue.",
    "additional_notes": "Expected increase in emergency admissions due to seasonal respiratory infections. ICU occupancy is nearing capacity."
});

const OperationsForm = ({
  loading,
  onOptimize,
}: OperationsFormProps) => {
  const [formData, setFormData] =
    useState<HospitalOperationsRequest>(
      createInitialRequest,
    );

  const [validationError, setValidationError] = useState<
    string | null
  >(null);

  const updateHospitalInfo = (
    field: keyof HospitalOperationsRequest["hospital_info"],
    value: string | number,
  ) => {
    setFormData((previous) => ({
      ...previous,
      hospital_info: {
        ...previous.hospital_info,
        [field]: value,
      },
    }));
  };

  const updateBedStatus = (
    field: keyof HospitalOperationsRequest["bed_status"],
    value: number,
  ) => {
    setFormData((previous) => ({
      ...previous,
      bed_status: {
        ...previous.bed_status,
        [field]: value,
      },
    }));
  };

  const updateResourceStatus = (
    field: keyof HospitalOperationsRequest["resource_status"],
    value: number,
  ) => {
    setFormData((previous) => ({
      ...previous,
      resource_status: {
        ...previous.resource_status,
        [field]: value,
      },
    }));
  };

  const updateRevenueStatus = (
    field: keyof HospitalOperationsRequest["revenue_status"],
    value: number,
  ) => {
    setFormData((previous) => ({
      ...previous,
      revenue_status: {
        ...previous.revenue_status,
        [field]: value,
      },
    }));
  };

  const updateAdmission = <K extends keyof Admission>(
    index: number,
    field: K,
    value: Admission[K],
  ) => {
    setFormData((previous) => {
      const admissions = [...previous.admissions];

      admissions[index] = {
        ...admissions[index],
        [field]: value,
      };

      return {
        ...previous,
        admissions,
      };
    });
  };

  const addAdmission = () => {
    setFormData((previous) => ({
      ...previous,
      admissions: [
        ...previous.admissions,
        createAdmission(),
      ],
    }));
  };

  const removeAdmission = (index: number) => {
    setFormData((previous) => ({
      ...previous,
      admissions: previous.admissions.filter(
        (_, admissionIndex) =>
          admissionIndex !== index,
      ),
    }));
  };

  const updateStaffing = <
    K extends keyof StaffingStatus,
  >(
    index: number,
    field: K,
    value: StaffingStatus[K],
  ) => {
    setFormData((previous) => {
      const staffingStatus = [
        ...previous.staffing_status,
      ];

      staffingStatus[index] = {
        ...staffingStatus[index],
        [field]: value,
      };

      return {
        ...previous,
        staffing_status: staffingStatus,
      };
    });
  };

  const addStaffingDepartment = () => {
    setFormData((previous) => ({
      ...previous,
      staffing_status: [
        ...previous.staffing_status,
        createStaffingStatus(),
      ],
    }));
  };

  const removeStaffingDepartment = (index: number) => {
    setFormData((previous) => ({
      ...previous,
      staffing_status:
        previous.staffing_status.filter(
          (_, staffingIndex) =>
            staffingIndex !== index,
        ),
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.hospital_info.hospital_name.trim()) {
      setValidationError(
        "Hospital name is required.",
      );

      return false;
    }

    if (!formData.hospital_info.hospital_id.trim()) {
      setValidationError(
        "Hospital ID is required.",
      );

      return false;
    }

    if (formData.hospital_info.total_capacity <= 0) {
      setValidationError(
        "Hospital total capacity must be greater than zero.",
      );

      return false;
    }

    if (
      formData.hospital_info.current_patient_count >
      formData.hospital_info.total_capacity
    ) {
      setValidationError(
        "Current patient count cannot exceed total hospital capacity.",
      );

      return false;
    }

    if (!formData.optimization_goal.trim()) {
      setValidationError(
        "Optimization goal is required.",
      );

      return false;
    }

    setValidationError(null);

    return true;
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const request: HospitalOperationsRequest = {
      ...formData,
      request_id: formData.request_id || createRequestId(),
      analysis_timestamp: new Date().toISOString(),
    };

    await onOptimize(request);
  };

  const handleReset = () => {
    setValidationError(null);
    setFormData(createInitialRequest());
  };

  return (
    <section className="operations-card">
      <div className="operations-card-header">
        <h2>Hospital Operations Request</h2>

        <p>
          Enter hospital operational data for AI-based
          optimization.
        </p>
      </div>

      <form
        className="operations-form"
        onSubmit={handleSubmit}
      >
        <div className="operations-form-section">
          <h3>Request Information</h3>

          <div className="operations-form-grid">
            <div className="operations-form-field">
              <label>Request ID</label>

              <input
                type="text"
                value={formData.request_id}
                onChange={(event) =>
                  setFormData((previous) => ({
                    ...previous,
                    request_id: event.target.value,
                  }))
                }
                disabled={loading}
              />
            </div>

            <div className="operations-form-field">
              <label>Analysis Timestamp</label>

              <input
                type="text"
                value={formData.analysis_timestamp}
                disabled
              />
            </div>
          </div>
        </div>

        <div className="operations-form-section">
          <h3>Hospital Information</h3>

          <div className="operations-form-grid">
            <div className="operations-form-field">
              <label>Hospital Name</label>

              <input
                type="text"
                value={
                  formData.hospital_info.hospital_name
                }
                onChange={(event) =>
                  updateHospitalInfo(
                    "hospital_name",
                    event.target.value,
                  )
                }
                required
                disabled={loading}
              />
            </div>

            <div className="operations-form-field">
              <label>Hospital ID</label>

              <input
                type="text"
                value={
                  formData.hospital_info.hospital_id
                }
                onChange={(event) =>
                  updateHospitalInfo(
                    "hospital_id",
                    event.target.value,
                  )
                }
                required
                disabled={loading}
              />
            </div>

            <div className="operations-form-field">
              <label>City</label>

              <input
                type="text"
                value={formData.hospital_info.city}
                onChange={(event) =>
                  updateHospitalInfo(
                    "city",
                    event.target.value,
                  )
                }
                disabled={loading}
              />
            </div>

            <div className="operations-form-field">
              <label>State</label>

              <input
                type="text"
                value={formData.hospital_info.state}
                onChange={(event) =>
                  updateHospitalInfo(
                    "state",
                    event.target.value,
                  )
                }
                disabled={loading}
              />
            </div>

            <div className="operations-form-field">
              <label>Total Capacity</label>

              <input
                type="number"
                min="1"
                value={
                  formData.hospital_info.total_capacity
                }
                onChange={(event) =>
                  updateHospitalInfo(
                    "total_capacity",
                    Number(event.target.value),
                  )
                }
                required
                disabled={loading}
              />
            </div>

            <div className="operations-form-field">
              <label>Current Patient Count</label>

              <input
                type="number"
                min="0"
                value={
                  formData.hospital_info
                    .current_patient_count
                }
                onChange={(event) =>
                  updateHospitalInfo(
                    "current_patient_count",
                    Number(event.target.value),
                  )
                }
                disabled={loading}
              />
            </div>
          </div>
        </div>

        <div className="operations-form-section">
          <div className="operations-section-header">
            <h3>Admissions</h3>

            <button
              type="button"
              className="operations-add-button"
              onClick={addAdmission}
              disabled={loading}
            >
              + Add Patient
            </button>
          </div>

          {formData.admissions.map(
            (admission, index) => (
              <div
                className="operations-dynamic-card"
                key={`admission-${index}`}
              >
                <div className="operations-section-header">
                  <h4>Patient {index + 1}</h4>

                  {formData.admissions.length > 1 && (
                    <button
                      type="button"
                      className="operations-remove-button"
                      onClick={() =>
                        removeAdmission(index)
                      }
                      disabled={loading}
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="operations-form-grid">
                  <div className="operations-form-field">
                    <label>Patient ID</label>

                    <input
                      type="text"
                      value={admission.patient_id}
                      onChange={(event) =>
                        updateAdmission(
                          index,
                          "patient_id",
                          event.target.value,
                        )
                      }
                    />
                  </div>

                  <div className="operations-form-field">
                    <label>Patient Name</label>

                    <input
                      type="text"
                      value={admission.patient_name}
                      onChange={(event) =>
                        updateAdmission(
                          index,
                          "patient_name",
                          event.target.value,
                        )
                      }
                    />
                  </div>

                  <div className="operations-form-field">
                    <label>Age</label>

                    <input
                      type="number"
                      min="0"
                      value={admission.age}
                      onChange={(event) =>
                        updateAdmission(
                          index,
                          "age",
                          Number(event.target.value),
                        )
                      }
                    />
                  </div>

                  <div className="operations-form-field">
                    <label>Gender</label>

                    <select
                      value={admission.gender}
                      onChange={(event) =>
                        updateAdmission(
                          index,
                          "gender",
                          event.target.value,
                        )
                      }
                    >
                      <option value="Male">Male</option>
                      <option value="Female">
                        Female
                      </option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="operations-form-field">
                    <label>Department</label>

                    <input
                      type="text"
                      value={admission.department}
                      onChange={(event) =>
                        updateAdmission(
                          index,
                          "department",
                          event.target.value,
                        )
                      }
                    />
                  </div>

                  <div className="operations-form-field">
                    <label>Admission Type</label>

                    <select
                      value={admission.admission_type}
                      onChange={(event) =>
                        updateAdmission(
                          index,
                          "admission_type",
                          event.target.value,
                        )
                      }
                    >
                      <option value="Emergency">
                        Emergency
                      </option>

                      <option value="Elective">
                        Elective
                      </option>
                    </select>
                  </div>

                  <div className="operations-form-field">
                    <label>Severity</label>

                    <select
                      value={admission.severity}
                      onChange={(event) =>
                        updateAdmission(
                          index,
                          "severity",
                          event.target.value,
                        )
                      }
                    >
                      <option value="Critical">
                        Critical
                      </option>
                      <option value="High">High</option>
                      <option value="Medium">
                        Medium
                      </option>
                      <option value="Low">Low</option>
                    </select>
                  </div>

                  <div className="operations-form-field">
                    <label>
                      Estimated Length of Stay
                    </label>

                    <input
                      type="number"
                      min="1"
                      value={
                        admission.estimated_length_of_stay
                      }
                      onChange={(event) =>
                        updateAdmission(
                          index,
                          "estimated_length_of_stay",
                          Number(event.target.value),
                        )
                      }
                    />
                  </div>

                  <div className="operations-checkbox-field">
                    <input
                      id={`requires-icu-${index}`}
                      type="checkbox"
                      checked={admission.requires_icu}
                      onChange={(event) =>
                        updateAdmission(
                          index,
                          "requires_icu",
                          event.target.checked,
                        )
                      }
                    />

                    <label
                      htmlFor={`requires-icu-${index}`}
                    >
                      Requires ICU
                    </label>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>

        <div className="operations-form-section">
          <h3>Bed Status</h3>

          <div className="operations-form-grid">
            {(
              [
                ["total_icu_beds", "Total ICU Beds"],
                [
                  "occupied_icu_beds",
                  "Occupied ICU Beds",
                ],
                ["total_ward_beds", "Total Ward Beds"],
                [
                  "occupied_ward_beds",
                  "Occupied Ward Beds",
                ],
                [
                  "total_private_rooms",
                  "Total Private Rooms",
                ],
                [
                  "occupied_private_rooms",
                  "Occupied Private Rooms",
                ],
              ] as const
            ).map(([field, label]) => (
              <div
                className="operations-form-field"
                key={field}
              >
                <label>{label}</label>

                <input
                  type="number"
                  min="0"
                  value={formData.bed_status[field]}
                  onChange={(event) =>
                    updateBedStatus(
                      field,
                      Number(event.target.value),
                    )
                  }
                />
              </div>
            ))}
          </div>
        </div>

        <div className="operations-form-section">
          <div className="operations-section-header">
            <h3>Staffing Status</h3>

            <button
              type="button"
              className="operations-add-button"
              onClick={addStaffingDepartment}
              disabled={loading}
            >
              + Add Department
            </button>
          </div>

          {formData.staffing_status.map(
            (staffing, index) => (
              <div
                className="operations-dynamic-card"
                key={`staffing-${index}`}
              >
                <div className="operations-section-header">
                  <h4>Department {index + 1}</h4>

                  {formData.staffing_status.length >
                    1 && (
                    <button
                      type="button"
                      className="operations-remove-button"
                      onClick={() =>
                        removeStaffingDepartment(index)
                      }
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="operations-form-grid">
                  <div className="operations-form-field">
                    <label>Department</label>

                    <input
                      type="text"
                      value={staffing.department}
                      onChange={(event) =>
                        updateStaffing(
                          index,
                          "department",
                          event.target.value,
                        )
                      }
                    />
                  </div>

                  {(
                    [
                      [
                        "doctors_available",
                        "Doctors Available",
                      ],
                      [
                        "nurses_available",
                        "Nurses Available",
                      ],
                      [
                        "technicians_available",
                        "Technicians Available",
                      ],
                      [
                        "support_staff_available",
                        "Support Staff Available",
                      ],
                    ] as const
                  ).map(([field, label]) => (
                    <div
                      className="operations-form-field"
                      key={field}
                    >
                      <label>{label}</label>

                      <input
                        type="number"
                        min="0"
                        value={staffing[field]}
                        onChange={(event) =>
                          updateStaffing(
                            index,
                            field,
                            Number(event.target.value),
                          )
                        }
                      />
                    </div>
                  ))}

                  <div className="operations-form-field">
                    <label>Current Shift</label>

                    <select
                      value={staffing.current_shift}
                      onChange={(event) =>
                        updateStaffing(
                          index,
                          "current_shift",
                          event.target.value,
                        )
                      }
                    >
                      <option value="Morning">
                        Morning
                      </option>
                      <option value="Afternoon">
                        Afternoon
                      </option>
                      <option value="Evening">
                        Evening
                      </option>
                      <option value="Night">
                        Night
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>

        <div className="operations-form-section">
          <h3>Resource Status</h3>

          <div className="operations-form-grid">
            {(
              [
                [
                  "ventilators_available",
                  "Ventilators Available",
                ],
                [
                  "oxygen_units_available",
                  "Oxygen Units Available",
                ],
                [
                  "operation_theaters_available",
                  "Operation Theaters Available",
                ],
                [
                  "ambulances_available",
                  "Ambulances Available",
                ],
                [
                  "diagnostic_machines_available",
                  "Diagnostic Machines Available",
                ],
                [
                  "pharmacy_stock_percentage",
                  "Pharmacy Stock %",
                ],
              ] as const
            ).map(([field, label]) => (
              <div
                className="operations-form-field"
                key={field}
              >
                <label>{label}</label>

                <input
                  type="number"
                  min="0"
                  step={
                    field ===
                    "pharmacy_stock_percentage"
                      ? "0.1"
                      : "1"
                  }
                  value={formData.resource_status[field]}
                  onChange={(event) =>
                    updateResourceStatus(
                      field,
                      Number(event.target.value),
                    )
                  }
                />
              </div>
            ))}
          </div>
        </div>

        <div className="operations-form-section">
          <h3>Revenue Status</h3>

          <div className="operations-form-grid">
            {(
              [
                ["daily_revenue", "Daily Revenue"],
                ["monthly_revenue", "Monthly Revenue"],
                ["operational_cost", "Operational Cost"],
                [
                  "outstanding_claims",
                  "Outstanding Claims",
                ],
                ["pending_bills", "Pending Bills"],
              ] as const
            ).map(([field, label]) => (
              <div
                className="operations-form-field"
                key={field}
              >
                <label>{label}</label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.revenue_status[field]}
                  onChange={(event) =>
                    updateRevenueStatus(
                      field,
                      Number(event.target.value),
                    )
                  }
                />
              </div>
            ))}
          </div>
        </div>

        <div className="operations-form-section">
          <h3>Optimization Objective</h3>

          <div className="operations-form-field">
            <label>Optimization Goal</label>

            <textarea
              rows={4}
              value={formData.optimization_goal}
              onChange={(event) =>
                setFormData((previous) => ({
                  ...previous,
                  optimization_goal: event.target.value,
                }))
              }
              required
              disabled={loading}
            />
          </div>

          <div className="operations-form-field">
            <label>Additional Notes</label>

            <textarea
              rows={4}
              value={formData.additional_notes}
              onChange={(event) =>
                setFormData((previous) => ({
                  ...previous,
                  additional_notes: event.target.value,
                }))
              }
              disabled={loading}
            />
          </div>
        </div>

        {validationError && (
          <div className="operations-validation-error">
            {validationError}
          </div>
        )}

        <div className="operations-form-actions">
          <button
            type="button"
            className="operations-secondary-button"
            onClick={handleReset}
            disabled={loading}
          >
            Reset
          </button>

          <button
            type="submit"
            className="operations-primary-button"
            disabled={loading}
          >
            {loading
              ? "Optimizing Operations..."
              : "Optimize Hospital Operations"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default OperationsForm;

