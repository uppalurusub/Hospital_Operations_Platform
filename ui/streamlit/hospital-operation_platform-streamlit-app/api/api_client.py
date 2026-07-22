from typing import Any, Dict, Tuple
import requests

class OperationsAPI:
    def __init__(self, base_url: str, timeout: int = 180):
        self.base_url = base_url.rstrip("/")
        self.timeout = timeout

    def _handle(self, response: requests.Response) -> Tuple[bool, Dict[str, Any]]:
        try:
            body = response.json()
        except ValueError:
            body = {"detail": response.text or "Empty response"}
        return response.ok, body

    def optimize(self, payload):
        try:
            response = requests.post(
                f"{self.base_url}/operations/optimize",
                json=payload,
                timeout=self.timeout,
            )
            return self._handle(response)
        except requests.RequestException as ex:
            return False, {"detail": str(ex)}

    def health(self):
        try:
            return self._handle(requests.get(
                f"{self.base_url}/operations/health", timeout=30
            ))
        except requests.RequestException as ex:
            return False, {"detail": str(ex)}

    def ping(self):
        try:
            return self._handle(requests.get(
                f"{self.base_url}/operations/ping", timeout=30
            ))
        except requests.RequestException as ex:
            return False, {"detail": str(ex)}
