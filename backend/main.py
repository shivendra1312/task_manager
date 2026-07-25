from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.utils.db import base,engine

from src.task.models import TaskModel

from src.task.routers import task_routes
from src.user.routers import user_routes


base.metadata.create_all(bind=engine)

app = FastAPI()

# Allows the React development server to call this API from a different port.
origins = [
    "http://localhost:5173",
    "https://task-manager-shivendra4.vercel.app",
    "https://task-manager-pi-dusky-20.vercel.app"
    
    
    
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(task_routes)
app.include_router(user_routes)
