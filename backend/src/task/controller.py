from src.task.dtos import task_schema 
from sqlalchemy.orm import Session
from src.task.models import TaskModel
from fastapi import HTTPException
from src.user.models import userModel
import math
from sqlalchemy import case

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



def get_tasks(
    db: Session,
    user: userModel,
    page: int,
    limit: int,
    sort_by: str,
    order: str,
    search: str,
    status: str,
    priority: str,
):
    task_query = db.query(TaskModel).filter(TaskModel.user_id == user.id)

    
    if search:
        task_query = task_query.filter(
            TaskModel.title.ilike(f"%{search}%")
        )

    
    if status == "completed":
        task_query = task_query.filter(
            TaskModel.is_completed == True
        )

    elif status == "pending":
        task_query = task_query.filter(
            TaskModel.is_completed == False
        )

    
    if priority != "all":
        task_query = task_query.filter(
            TaskModel.priority == priority
        )

    offset = (page - 1) * limit

    total_tasks = task_query.count()

    allowed_sort_fields = {
        "id": TaskModel.id,
        "title": TaskModel.title,
        "due_date": TaskModel.due_date,
        "is_completed": TaskModel.is_completed,
    }

    
    if sort_by == "priority":
        sort_column = case(
            (TaskModel.priority == "high", 1),
            (TaskModel.priority == "medium", 2),
            (TaskModel.priority == "low", 3),
            else_=0,
        )
    else:
        sort_column = allowed_sort_fields.get(sort_by, TaskModel.id)

    if order.lower() == "asc":
        task_query = task_query.order_by(sort_column.asc())
    else:
        task_query = task_query.order_by(sort_column.desc())

    tasks = (
        task_query
        .offset(offset)
        .limit(limit)
        .all()
    )

    total_pages = math.ceil(total_tasks / limit)

    return {
        "status": "success",
        "data": tasks,
        "total_tasks": total_tasks,
        "total_pages": total_pages,
        "page": page,
        "limit": limit,
        "sort_by": sort_by,
        "order": order,
    }

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