import pandas as pd
import streamlit as st

def _label(key):
    return str(key).replace("_", " ").strip().title()

def _value(value):
    if isinstance(value, bool):
        return "Yes" if value else "No"
    if value is None:
        return "N/A"
    return str(value)

def _render_dict(data):
    for key, value in data.items():
        if isinstance(value, dict):
            with st.expander(_label(key), expanded=True):
                _render_dict(value)
        elif isinstance(value, list):
            st.markdown(f"**{_label(key)}:**")
            _render_list(value)
        else:
            st.markdown(
                f'<div class="info-row"><span class="label">{_label(key)}:</span>'
                f'<span class="value">{_value(value)}</span></div>',
                unsafe_allow_html=True,
            )

def _render_list(items):
    if not items:
        st.info("No records available.")
        return
    if all(isinstance(item, dict) for item in items):
        try:
            st.dataframe(pd.DataFrame(items), use_container_width=True, hide_index=True)
        except Exception:
            for index, item in enumerate(items, 1):
                with st.expander(f"Item {index}", expanded=True):
                    _render_dict(item)
    else:
        for item in items:
            st.markdown(f"- {_value(item)}")

def render_response(response):
    st.divider()
    st.header("AI Optimization Recommendations")

    if not isinstance(response, dict):
        st.write(response)
        return

    preferred = [
        "executive_summary", "admissions_analysis", "bed_management_analysis",
        "staffing_analysis", "resource_analysis", "revenue_analysis",
        "recommendations", "ai_recommendations", "metadata"
    ]
    rendered = set()

    for key in preferred:
        if key in response:
            rendered.add(key)
            value = response[key]
            st.subheader(_label(key))
            if isinstance(value, dict):
                _render_dict(value)
            elif isinstance(value, list):
                _render_list(value)
            else:
                st.write(_value(value))

    for key, value in response.items():
        if key in rendered:
            continue
        st.subheader(_label(key))
        if isinstance(value, dict):
            _render_dict(value)
        elif isinstance(value, list):
            _render_list(value)
        else:
            st.markdown(f"**{_label(key)}:** {_value(value)}")

    with st.expander("Raw API Response"):
        st.json(response)
