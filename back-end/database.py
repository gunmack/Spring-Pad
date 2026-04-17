import asyncio
import contextlib
import os
import sqlalchemy
import asyncpg
from sqlalchemy import MetaData, text
from typing import Annotated, Any
from fastapi import FastAPI, Depends
from collections.abc import AsyncIterator
from sqlalchemy.ext.asyncio import (
    AsyncConnection,
    AsyncSession
)
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Fetch database credentials from environment variables
USER = os.getenv("user")
PASSWORD = os.getenv("password")
HOST = os.getenv("host")
PORT = os.getenv("port")
DBNAME = os.getenv("dbname")

convention = {
    "ix": "ix_%(column_0_label)s", # index
    "uq": "uq_%(table_name)s_%(column_0_name)s", # unique
    "ck": "ck_%(table_name)s_%(constraint_name)s", # check
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s", # foreign key
    "pk": "pk_%(table_name)s", # primary key
}

Base = sqlalchemy.orm.declarative_base()
Base.metadata = MetaData(naming_convention=convention)

class DatabaseSessionManager:
    def __init__(self, db_url: str, engine_kwargs: dict[str, Any], check_db=True):
        self._engine = sqlalchemy.ext.asyncio.create_async_engine(db_url, **engine_kwargs)
        self._sessionmaker = sqlalchemy.ext.asyncio.async_sessionmaker(autocommit=False, bind=self._engine)
        ###
        # Can't call asyncio.run() because 
        # Render/Uvicorn already runs inside an asyncio event loop
        # if check_db:
        #     asyncio.run(DatabaseSessionManager.test_connection(db_url))
        ###
        
        


    @staticmethod
    async def test_connection(url: str):
        try:
            url = url.replace("+asyncpg", "")
            print(url.replace("+asyncpg", ""))
            conn = await asyncpg.connect(host=HOST, user=USER,
                                         database=DBNAME, port=PORT,
                                         password=PASSWORD, ssl="require")  
            await conn.close()
        except Exception as e:
            raise Exception("fuck my baka chungus life")

    async def close(self):
        if self._engine is None:
            raise Exception("DatabaseSessionManager is not initialized")
        await self._engine.dispose()

        self._engine = None
        self._sessionmaker = None

    @contextlib.asynccontextmanager
    async def connect(self) -> AsyncIterator[AsyncConnection]:
        if self._engine is None:
            raise Exception("DatabaseSessionManager is not initialized")

        async with self._engine.begin() as connection:
            try:
                yield connection
            except Exception:
                await connection.rollback()
                raise

    @contextlib.asynccontextmanager
    async def session(self) -> AsyncIterator[AsyncSession]:
        if self._sessionmaker is None:
            raise Exception("DatabaseSessionManager is not initialized")

        session = self._sessionmaker()
        try:
            yield session
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()

def setup():
    global dbsessionmanager
    DATABASE_URL = f"postgresql+asyncpg://{USER}:{PASSWORD}@{HOST}:{PORT}/{DBNAME}"
    dbsessionmanager = DatabaseSessionManager(DATABASE_URL,
                                              {"echo":True})

@contextlib.asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    if dbsessionmanager._engine is not None:
        await dbsessionmanager.close()

async def _db_session():
    async with dbsessionmanager.session() as session:
        yield session

DBSession = Annotated[AsyncSession, Depends(_db_session)]