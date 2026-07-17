from pydantic import BaseModel

class task_schema(BaseModel):
    title:str
    description:str
    is_completed:bool = False
    