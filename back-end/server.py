import logging
from fastapi import FastAPI
from contextlib import asynccontextmanager
import database

logging.basicConfig(level=logging.DEBUG)
database.setup()


app = FastAPI(
    lifespan=database.lifespan,
    title="stevens sex dungeon",
    description=f'peanits',
    root_path="/api"
)

@app.get("/")
async def read_root():
    return {"message": "steeeeeeeeeeeeeeeeewen"}

from fastapi import Request, HTTPException, status
from fastapi.responses import JSONResponse
import sqlalchemy

@app.get("/get_user")
async def get_user(
    request: Request,
    db_session: database.DBSession,
    email: str | None = None,
    username: str | None = None,
    u_token: str | None = None
):
    res = None
    if email is not None:
        res = await db_session.scalar(
            sqlalchemy.select(BedrockUser)
            .where(BedrockUser.email == email)
        )
    if username is not None:
        res = await db_session.scalar(
            sqlalchemy.select(BedrockUser)
            .where(BedrockUser.username == username)
        )
    if u_token is not None:
        res = await db_session.scalar(
            sqlalchemy.select(BedrockUser)
            .where(BedrockUser.u_token == u_token)
        )

    if res is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Could not find user!"
        )
    return JSONResponse(res.to_dict())

@app.post("/create_user")
async def create_user(
    request: Request,
    db_session: database.DBSession,
    username: str,
    email: str,
    u_token: str
):
    if username is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username cannot be of length zero!"
        )
    if email is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email cannot be of length zero!"
        )
    if u_token is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Token cannot be of length zero!"
        )
    
    db_session.add(BedrockUser(
        username=username,
        email=email,
        u_token=u_token
    ))

    await db_session.commit()

    res = await db_session.scalar(
        sqlalchemy.select(BedrockUser)
        .where(BedrockUser.username == username)
    )
    return JSONResponse(res.to_dict())

from database import Base
from sqlalchemy import (
    Column,
    ForeignKey,
    PrimaryKeyConstraint,
    String,
    Text,
    UUID,
    Integer
)
from sqlalchemy.orm import mapped_column

class BedrockUser(Base):
    __tablename__ = "bedrock_user"

    username = Column(String(255), primary_key=True, nullable=False, unique=True)
    email = Column(String(255), nullable=False, unique=True)
    u_token = Column(String(255))

    def to_dict(self) -> dict:
        return {
            "username" : self.username,
            "email" : self.email,
            "u_token" : self.u_token
        }
    
class BedrockFamily(Base):
    __tablename__ = "bedrock_family"

    f_id = Column(UUID(), primary_key=True, nullable=False)
    f_owner = Column(ForeignKey("bedrock_user.username"))

    def to_dict(self) -> dict:
        return {
            "f_id" : self.f_id,
            "f_owner" : self.f_owner
        }

class BedrockFamilyMember(Base):
    __tablename__ = "bedrock_family_member"

    f_id = Column(ForeignKey("bedrock_family.f_id"), nullable=False, primary_key=True)
    username = Column(ForeignKey("bedrock_user.username"), nullable=False)

    def to_dict(self) -> dict:
        return {
            "f_id" : self.f_id,
            "username" : self.username
        }
    
class BedrockNote(Base):
    __tablename__ = "bedrock_note"

    n_id = Column(Integer, primary_key=True)
    n_data = Column(String(65535))

    def to_dict(self) -> dict:
        return {
            "n_id" : self.n_id
        }
    
class BedrockUserNote(BedrockNote):
    n_type = mapped_column(String(50), default='USER', use_existing_column=True)
    n_owner = mapped_column(ForeignKey("bedrock_user.username"), use_existing_column=True)

    def to_dict(self) -> dict:
        return {
            "n_id" : BedrockNote.n_id,
            "n_type" : self.n_type,
            "n_owner" : self.n_owner,
            "n_data" : self.n_data
        }
    
class BedrockFamilyNote(BedrockNote):
    n_type = mapped_column(String(50), default='FAMILY', use_existing_column=True)
    n_owner = mapped_column(ForeignKey("bedrock_family.f_id"), use_existing_column=True)
    def to_dict(self) -> dict:
        return {
            "n_id" : BedrockNote.n_id,
            "n_type" : self.n_type,
            "n_owner" : self.n_owner,
            "n_data" : self.n_data
        }