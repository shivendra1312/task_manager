from src.user.dtos import user_schema,login_schema
from sqlalchemy.orm import Session
from src.user.models import userModel
from fastapi import HTTPException,status,Request,BackgroundTasks
from pwdlib import PasswordHash
import jwt
from src.utils.settings import settings
from datetime import timedelta,datetime
from jwt.exceptions  import InvalidTokenError
from src.utils.mail import simple_send

password_hash = PasswordHash.recommended()

def get_password_hash(password):
    return password_hash.hash(password)

def verify_password(plain_password, hashed_password):
    return password_hash.verify(plain_password, hashed_password)

async def user_register(body:user_schema,db:Session,bg_task:BackgroundTasks):
    is_user = db.query(userModel).filter(userModel.username==body.username).first()
    if is_user:
        raise HTTPException(400,"username already exist..")

    is_email= db.query(userModel).filter(userModel.email==body.email).first()
    if is_email:
        raise HTTPException(400,"email already exist..")

    hash_password = get_password_hash(body.hash_password)

    new_user = userModel(
        name = body.name,
    username = body.username,
    hash_password = hash_password,
    email = body.email
    )

    

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    
    bg_task.add_task(simple_send,[new_user.email])

    return new_user



def user_login(body:login_schema,db:Session):
    user = db.query(userModel).filter(userModel.username==body.username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="entered wrong username")
    
    if not verify_password(body.password, user.hash_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="entered wrong password")
    
    exp_time = datetime.now() + timedelta(minutes=settings.EXP_TIME)

    token = jwt.encode({"_id":user.id , "exp":exp_time.timestamp()},settings.SECRET_KEY,settings.ALGORITHM)
    
    return {"token":token}


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