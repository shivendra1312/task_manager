from fastapi import APIRouter,Depends,status
from src.task import controller
from src.task.dtos import task_schema
from src.utils.db import get_db
from sqlalchemy.orm import Session


task_routes = APIRouter(prefix="/tasks",)

@task_routes.post("/create",status_code=status.HTTP_201_CREATED)
def create_task(body:task_schema,db:Session = Depends(get_db)):
    return controller.create_task(body,db)

@task_routes.get("/all_tasks",status_code=status.HTTP_200_OK)
def get_tasks(db:Session = Depends(get_db)):
    return controller.get_tasks(db)

@task_routes.get("/get_one_task/{task_id}",status_code=status.HTTP_200_OK)
def get_one_task(task_id:int ,db:Session = Depends(get_db)):
    return controller.get_one_task(task_id,db)

@task_routes.put("/update_task/{task_id}",status_code=status.HTTP_201_CREATED)
def update_task(task_id:int,body:task_schema,db:Session = Depends(get_db)):
    return controller.update_task(body,task_id,db)

@task_routes.delete("/delete_task/{task_id}")
def delete_task(task_id:int ,db:Session = Depends(get_db)):
    return controller.delete_task(task_id,db)