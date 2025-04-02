from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, DateTime, LargeBinary, Integer
from .base import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"
    
    username: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)
    password: Mapped[bytes] = mapped_column(LargeBinary, nullable=False)
    score: Mapped[int] = mapped_column(Integer, nullable=True, default=0)
