from fastapi import APIRouter,Depends,status,Request
from src.user import controller
from src.user.dtos import user_schema,user_response_schema,login_schema
from src.utils.db import get_db
from sqlalchemy.orm import Session

user_routes = APIRouter(prefix="/user")

@user_routes.post("/create_account",response_model=user_response_schema,status_code=status.HTTP_201_CREATED)
def user_register(body:user_schema,db:Session=Depends(get_db)):
    return controller.user_register(body,db)

@user_routes.post("/login",status_code=status.HTTP_200_OK)
def user_login(body:login_schema,db:Session=Depends(get_db)):
    return controller.user_login(body,db)

@user_routes.get("/is_auth",response_model=user_response_schema)
def is_auth(request:Request,db:Session=Depends(get_db)):
    return controller.is_auth(request,db)