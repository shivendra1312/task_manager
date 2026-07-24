from sqlalchemy import Column,Integer,String,Boolean,ForeignKey,Date
from src.utils.db import base


class TaskModel(base):
    __tablename__ = "task_table"

    id = Column(Integer,primary_key = True)
    title = Column(String)
    description = Column(String)
    priority = Column(String, default="medium", nullable=False)
    due_date = Column(Date, nullable=True)
    is_completed = Column(Boolean,default = False)
    user_id = Column(Integer, ForeignKey("user_table.id",ondelete = "CASCADE"))
    