from utils.logger import logger

from autogen_agentchat.teams import RoundRobinGroupChat
from autogen_agentchat.conditions import (
    TextMentionTermination,
    MaxMessageTermination
)

from agents.admissions_agent import (
    get_admissions_agent
)

from agents.bed_management_agent import (
    get_bed_management_agent
)

from agents.staffing_agent import (
    get_staffing_agent
)

from agents.resource_agent import (
    get_resource_agent
)

from agents.revenue_agent import (
    get_revenue_agent
)
from config.llm_config import get_model_client
#model_client = get_model_client()


class OperationsOrchestrator:

    def __init__(self, model_client):

        self.model_client = model_client

        logger.info(
            "OperationsOrchestrator Initialized"
        )


    def build_team(self):

        try:

            logger.info(
                "Creating Hospital Operations Agents"
            )

            admissions_agent = get_admissions_agent(
                self.model_client
            )

            bed_management_agent = get_bed_management_agent(
                self.model_client
            )

            staffing_agent = get_staffing_agent(
                self.model_client
            )

            resource_agent = get_resource_agent(
                self.model_client
            )

            revenue_agent = get_revenue_agent(
                self.model_client
            )

            logger.success(
                "All Agents Created Successfully"
            )

            logger.info(
                "Configuring Termination Conditions"
            )

            termination_condition = (
                TextMentionTermination(
                    "APPROVED"
                )
                |
                MaxMessageTermination(25)
            )

            logger.info(
                "Creating RoundRobinGroupChat Team"
            )

            team = RoundRobinGroupChat(
                participants=[
                    admissions_agent,
                    bed_management_agent,
                    staffing_agent,
                    resource_agent,
                    revenue_agent
                ],
                termination_condition=
                termination_condition
            )

            logger.success(
                "Hospital Operations Team Created"
            )

            return team

        except Exception as ex:

            logger.exception(
                f"Failed To Create Team: {str(ex)}"
            )

            raise ex

