import streamlit as st

def render_sidebar():
    with st.sidebar:
        st.header("API Configuration")
        api_url = st.text_input("FastAPI Base URL", value="http://127.0.0.1:8000/api/v1")
        st.divider()
        st.subheader("Optimization Agents")
        st.write("• Admissions Agent")
        st.write("• Bed Management Agent")
        st.write("• Staffing Agent")
        st.write("• Resource Agent")
        st.write("• Revenue Agent")
        st.info("The UI calls /operations/optimize, /operations/health and /operations/ping.")
    return api_url
