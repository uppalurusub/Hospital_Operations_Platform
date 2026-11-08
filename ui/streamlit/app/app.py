import streamlit as st
from api.api_client import OperationsAPI
from components.request_form import render_operations_form
from components.response_view import render_response
from components.sidebar import render_sidebar

st.set_page_config(page_title="Hospital Operations Platform", page_icon="🏥", layout="wide")

st.markdown("""
<style>
.block-container {padding-top: 1.5rem; padding-bottom: 2rem;}
div[data-testid="stMetric"] {border: 1px solid #e5e7eb; border-radius: 12px; padding: 14px;}
.section-title {font-size: 1.15rem; font-weight: 700; margin: 1rem 0 .5rem 0;}
.label {font-weight: 700;}
.value {margin-left: .35rem;}
.info-row {padding: .25rem 0;}
</style>
""", unsafe_allow_html=True)

api_url = render_sidebar()
api = OperationsAPI(api_url)

st.title("🏥 AutoGen Hospital Operations Platform")
st.caption("Admissions • Bed Management • Staffing • Resources • Revenue Optimization")

tab1, tab2, tab3 = st.tabs(["Optimize Operations", "API Health", "Raw Request"])

with tab1:
    payload, submitted = render_operations_form()
    if submitted:
        with st.spinner("Running hospital operations optimization..."):
            ok, result = api.optimize(payload)
        if ok:
            st.session_state["last_response"] = result
            st.success("Optimization completed successfully.")
            render_response(result)
        else:
            st.error("Optimization request failed.")
            st.json(result)

with tab2:
    c1, c2 = st.columns(2)
    if c1.button("Check Health", use_container_width=True):
        ok, result = api.health()
        (st.success if ok else st.error)("Health endpoint completed.")
        st.json(result)
    if c2.button("Ping API", use_container_width=True):
        ok, result = api.ping()
        (st.success if ok else st.error)("Ping endpoint completed.")
        st.json(result)

with tab3:
    st.json(st.session_state.get("operations_payload", {}))
