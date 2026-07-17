
from fastapi import FastAPI,status,HTTPException,Request
import jwt
from jwt.exceptions import InvalidTokenError
from src.user.models import userModel
from sqlalchemy.orm import Session
from src.utils.settings import settings
from src.utils.db import get_db

def is_auth(request:Request,db:Session):
    try:
        token = request.headers.get("authorization")
        token = token.split(" ")[-1]
        if not token:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="not authorized")

        data = jwt.decode(token,settings.SECRET_KEY,settings.ALGORITHM)
        user_id = data.get("_id")
        

        user = db.query(userModel).filter(userModel.id==user_id).first()
        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="not authorized")

        return user
    except InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="not authorized")