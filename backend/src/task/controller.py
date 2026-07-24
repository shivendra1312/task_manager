from src.task.dtos import task_schema 
from sqlalchemy.orm import Session
from src.task.models import TaskModel
from fastapi import HTTPException
from src.user.models import userModel

def create_task(body:task_schema,db:Session,user:userModel):
    data= body.model_dump()
    new_task = TaskModel(title = data["title"],
                        description = data["description"],
                        priority=data["priority"],
                        due_date=data["due_date"],
                        is_completed = data["is_completed"],
                        user_id = user.id
                        )
    
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return {"status":"task created sucessfully...",
            "data":new_task}

def get_tasks(db:Session,user:userModel):
    tasks = db.query(TaskModel).filter(TaskModel.user_id == user.id).all()
    return{"status ":"success",
        "data":tasks}

def get_one_task(task_id:int,db:Session):
    one_task = db.query(TaskModel).get(task_id)
    if not one_task:
        raise HTTPException(404,detail="task id is incorrect")
    return{"status":"success",
        "data": one_task}

def update_task(body:task_schema,task_id:int,db:Session,user:userModel):
    one_task:TaskModel = db.query(TaskModel).get(task_id)
    if not one_task:
        raise HTTPException(404,detail="task id is incorrect")
    
    if one_task.user_id != user.id:
        raise HTTPException(401,"not authorised")

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

def delete_task(task_id:int,db:Session,user:userModel):
    one_task:TaskModel = db.query(TaskModel).get(task_id)
    if not one_task:
        raise HTTPException(404,detail="task id is incorrect")
    
    if one_task.user_id != user.id:
        raise HTTPException(401,"not authorised")

    
    db.delete(one_task)
    db.commit()
    
    return {
        "status":"success",
        "data": one_task
    }