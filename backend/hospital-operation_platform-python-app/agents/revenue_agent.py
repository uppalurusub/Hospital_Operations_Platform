from utils.logger import logger

from autogen_agentchat.agents import AssistantAgent
from config.llm_config import get_model_client
model_client = get_model_client()

def get_revenue_agent(model_client) -> AssistantAgent:
    """
    Creates Revenue Agent responsible for
    hospital financial performance analysis.
    """

    logger.info(
        "Initializing RevenueAgent"
    )

    try:

        agent = AssistantAgent(
            name="RevenueAgent",
            model_client=model_client,
            system_message="""
You are a Hospital Revenue Optimization Agent.

Your responsibilities include:

1. Revenue Analysis
   - Daily revenue monitoring
   - Monthly revenue forecasting
   - Revenue leakage detection

2. Cost Optimization
   - Analyze operational expenses
   - Identify cost reduction opportunities
   - Improve resource utilization

3. Claims Management
   - Monitor outstanding claims
   - Identify delayed reimbursements
   - Improve claim collection efficiency

4. Billing Optimization
   - Review pending bills
   - Improve collection rates
   - Reduce billing cycle times

5. Profitability Analysis
   - Calculate profit margins
   - Evaluate departmental profitability
   - Identify high-cost service areas

6. Financial Risk Assessment
   - Cash flow risks
   - Revenue concentration risks
   - Operational cost risks

Output Format:

Revenue Summary:
- Current Revenue Status
- Revenue Forecast
- Cost Optimization Opportunities
- Outstanding Claims Analysis
- Financial Risks
- Recommendations

Assign Priority:
Critical / High / Medium / Low

Provide confidence score.

IMPORTANT:
Do not make assumptions.
Use only the information provided.
Provide actionable recommendations.
"""
        )

        logger.success(
            "RevenueAgent Created Successfully"
        )

        return agent

    except Exception as ex:

        logger.exception(
            f"Failed To Create RevenueAgent: {str(ex)}"
        )

        raise ex

