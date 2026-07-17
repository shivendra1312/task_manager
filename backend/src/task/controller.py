from src.task.dtos import task_schema 
from sqlalchemy.orm import Session
from src.task.models import TaskModel
from fastapi import HTTPException


def create_task(body:task_schema,db:Session):
    data= body.model_dump()
    new_task = TaskModel(title = data["title"],
                        description = data["description"],
                        is_completed = data["is_completed"])
    
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return {"status":"task created sucessfully...",
            "data":new_task}

def get_tasks(db:Session):
    tasks = db.query(TaskModel).all()
    return{"status ":"success",
        "data":tasks}

def get_one_task(task_id:int,db:Session):
    one_task = db.query(TaskModel).get(task_id)
    if not one_task:
        raise HTTPException(404,detail="task id is incorrect")
    return{"status":"success",
        "data": one_task}

def update_task(body:task_schema,task_id:int,db:Session):
    one_task = db.query(TaskModel).get(task_id)
    if not one_task:
        raise HTTPException(404,detail="task id is incorrect")
    
    body = body.model_dump()
    for field,value in body.items():
        setattr(one_task,field,value)

    db.add(one_task)
    db.commit()
    db.refresh(one_task)

    return {
        "status":"success",
        "data": one_task
    }

def delete_task(task_id:int,db:Session):
    one_task = db.query(TaskModel).get(task_id)
    if not one_task:
        raise HTTPException(404,detail="task id is incorrect")
    
    db.delete(one_task)
    db.commit()
    
    return {
        "status":"success",
        "data": one_task
    }