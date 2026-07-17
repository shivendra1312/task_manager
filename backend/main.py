from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.utils.db import base,engine

from src.task.models import TaskModel

from src.task.routers import task_routes
from src.user.routers import user_routes


base.metadata.create_all(bind=engine)

app = FastAPI()

# Allows the React development server to call this API from a different port.
app.add_middleware(
    CORSMiddleware,
    # Vite selects the next free port if 5173 is already in use.
    # Permit any local development port while keeping credentials enabled.
    allow_origin_regex=r"https?://(localhost|127\.0\.0\.1)(:\d+)?",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(task_routes)
app.include_router(user_routes)
