import copy
import json
from pathlib import Path
import pandas as pd
import streamlit as st

DEFAULT_FILE = Path(__file__).with_name("optimize_request.json")

def _defaults():
    return json.loads(DEFAULT_FILE.read_text(encoding="utf-8"))

def _editor_records(title, records, key):
    st.markdown(f'<div class="section-title">{title}</div>', unsafe_allow_html=True)
    df = pd.DataFrame(records)
    edited = st.data_editor(df, use_container_width=True, num_rows="dynamic", key=key)
    return edited.to_dict(orient="records")

def render_operations_form():
    data = copy.deepcopy(st.session_state.get("operations_payload", _defaults()))

    with st.form("operations_form"):
        st.subheader("Request Information")
        c1, c2 = st.columns(2)
        data["request_id"] = c1.text_input("Request ID", data["request_id"])
        data["analysis_timestamp"] = c2.text_input("Analysis Timestamp", data["analysis_timestamp"])

        st.subheader("Hospital Information")
        h = data["hospital_info"]
        c1, c2, c3 = st.columns(3)
        h["hospital_name"] = c1.text_input("Hospital Name", h["hospital_name"])
        h["hospital_id"] = c2.text_input("Hospital ID", h["hospital_id"])
        h["city"] = c3.text_input("City", h["city"])
        c1, c2, c3 = st.columns(3)
        h["state"] = c1.text_input("State", h["state"])
        h["total_capacity"] = c2.number_input("Total Capacity", min_value=1, value=int(h["total_capacity"]))
        h["current_patient_count"] = c3.number_input("Current Patient Count", min_value=0, value=int(h["current_patient_count"]))

        data["admissions"] = _editor_records("Admissions", data["admissions"], "admissions_editor")

        st.subheader("Bed Status")
        b = data["bed_status"]
        cols = st.columns(3)
        b["total_icu_beds"] = cols[0].number_input("Total ICU Beds", 0, value=int(b["total_icu_beds"]))
        b["occupied_icu_beds"] = cols[1].number_input("Occupied ICU Beds", 0, value=int(b["occupied_icu_beds"]))
        b["total_ward_beds"] = cols[2].number_input("Total Ward Beds", 0, value=int(b["total_ward_beds"]))
        cols = st.columns(3)
        b["occupied_ward_beds"] = cols[0].number_input("Occupied Ward Beds", 0, value=int(b["occupied_ward_beds"]))
        b["total_private_rooms"] = cols[1].number_input("Total Private Rooms", 0, value=int(b["total_private_rooms"]))
        b["occupied_private_rooms"] = cols[2].number_input("Occupied Private Rooms", 0, value=int(b["occupied_private_rooms"]))

        data["staffing_status"] = _editor_records("Staffing Status", data["staffing_status"], "staffing_editor")

        st.subheader("Resource Status")
        r = data["resource_status"]
        c1, c2, c3 = st.columns(3)
        r["ventilators_available"] = c1.number_input("Ventilators Available", 0, value=int(r["ventilators_available"]))
        r["oxygen_units_available"] = c2.number_input("Oxygen Units Available", 0, value=int(r["oxygen_units_available"]))
        r["operation_theaters_available"] = c3.number_input("Operation Theaters Available", 0, value=int(r["operation_theaters_available"]))
        c1, c2, c3 = st.columns(3)
        r["ambulances_available"] = c1.number_input("Ambulances Available", 0, value=int(r["ambulances_available"]))
        r["diagnostic_machines_available"] = c2.number_input("Diagnostic Machines Available", 0, value=int(r["diagnostic_machines_available"]))
        r["pharmacy_stock_percentage"] = c3.number_input("Pharmacy Stock (%)", 0.0, 100.0, value=float(r["pharmacy_stock_percentage"]))

        st.subheader("Revenue Status")
        rev = data["revenue_status"]
        c1, c2, c3 = st.columns(3)
        rev["daily_revenue"] = c1.number_input("Daily Revenue", 0.0, value=float(rev["daily_revenue"]))
        rev["monthly_revenue"] = c2.number_input("Monthly Revenue", 0.0, value=float(rev["monthly_revenue"]))
        rev["operational_cost"] = c3.number_input("Operational Cost", 0.0, value=float(rev["operational_cost"]))
        c1, c2 = st.columns(2)
        rev["outstanding_claims"] = c1.number_input("Outstanding Claims", 0.0, value=float(rev["outstanding_claims"]))
        rev["pending_bills"] = c2.number_input("Pending Bills", 0.0, value=float(rev["pending_bills"]))

        data["optimization_goal"] = st.text_area("Optimization Goal", data["optimization_goal"], height=100)
        data["additional_notes"] = st.text_area("Additional Notes", data["additional_notes"], height=100)

        submitted = st.form_submit_button("🚀 Optimize Hospital Operations", type="primary", use_container_width=True)

    st.session_state["operations_payload"] = data
    return data, submitted
