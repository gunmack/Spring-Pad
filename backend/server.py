import logging
from fastapi import FastAPI
from contextlib import asynccontextmanager

logging.basicConfig(level=logging.DEBUG)

@asynccontextmanager
async def lifespan(app: FastAPI):
    yield


app = FastAPI(
    lifespan=lifespan,
    title="stevens sex dungeon",
    description=f'peanits',
    root_path="/api"
)

@app.get("/")
async def read_root():
    return {"message": "steeeeeeeeeeeeeeeeewen"}


