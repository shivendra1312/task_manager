from pydantic import BaseModel

class user_schema(BaseModel):

    name :str
    username :str
    hash_password:str
    email:str


class user_response_schema(BaseModel):

    name :str
    username :str
    email:str
    id:int

class login_schema(BaseModel):
    username:str
    password:str