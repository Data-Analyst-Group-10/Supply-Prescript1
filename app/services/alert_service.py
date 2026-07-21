from fastapi import HTTPException
from typing import List
from app.models import Alert
from app.schemas import AlertCreate, AlertUpdate
from app.crud.alert import AlertCRUD

class AlertService:
    def __init__(self, alert_crud: AlertCRUD):
        self.alert_crud = alert_crud

    def create_alert(self, alert_create: AlertCreate) -> Alert:
        return self.alert_crud.create(alert_create)

    def get_alerts(self) -> List[Alert]:
        return self.alert_crud.get_all()

    def update_alert(self, alert_id: int, alert_update: AlertUpdate) -> Alert:
        alert = self.alert_crud.get(alert_id)
        if not alert:
            raise HTTPException(status_code=404, detail="Alert not found")
        return self.alert_crud.update(alert_id, alert_update)

    def delete_alert(self, alert_id: int) -> None:
        alert = self.alert_crud.get(alert_id)
        if not alert:
            raise HTTPException(status_code=404, detail="Alert not found")
        self.alert_crud.delete(alert_id)