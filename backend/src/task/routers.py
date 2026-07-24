from fastapi import APIRouter,Depends,status
from src.task import controller
from src.task.dtos import task_schema
from src.utils.db import get_db
from sqlalchemy.orm import Session
from src.utils.helpers import is_auth
from src.user.models import userModel

task_routes = APIRouter(prefix="/tasks",)

@task_routes.post("/create",status_code=status.HTTP_201_CREATED)
def create_task(body:task_schema,db:Session = Depends(get_db), user:userModel = Depends(is_auth)):
    return controller.create_task(body,db,user)

@task_routes.get("/all_tasks", status_code=status.HTTP_200_OK)
def get_tasks(
    page: int = 1,
    limit: int = 10,
    sort_by: str = "id",
    order: str = "desc",
    db: Session = Depends(get_db),
    user: userModel = Depends(is_auth),
    search: str = "",
    status: str = "all",
    priority: str = "all"
):
    return controller.get_tasks(db, user, page, limit,sort_by,order,search,status,priority)

@task_routes.get("/get_one_task/{task_id}",status_code=status.HTTP_200_OK)
def get_one_task(task_id:int ,db:Session = Depends(get_db),user:userModel = Depends(is_auth)):
    return controller.get_one_task(task_id,db)

@task_routes.put("/update_task/{task_id}",status_code=status.HTTP_201_CREATED)
def update_task(task_id:int,body:task_schema,db:Session = Depends(get_db),user:userModel = Depends(is_auth)):
    return controller.update_task(body,task_id,db,user)

@task_routes.delete("/delete_task/{task_id}")
def delete_task(task_id:int ,db:Session = Depends(get_db),user:userModel = Depends(is_auth)):
    return controller.delete_task(task_id,db,user)