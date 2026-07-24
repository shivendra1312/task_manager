from pydantic import BaseModel
from typing import Literal
from datetime import date
class task_schema(BaseModel):
    title:str
    description:str
    priority: Literal["low", "medium", "high"] = "medium"
    due_date: date | None = None
    is_completed:bool = False
    