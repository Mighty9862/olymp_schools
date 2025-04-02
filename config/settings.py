from pydantic_settings import BaseSettings
from pydantic import BaseModel
from dotenv import load_dotenv
import os


load_dotenv()


DB_URL: str = os.environ.get("DB_URL")

CORS_ORIGIN: str = os.environ.get("CORS_ORIGIN")

TEST_DB_URL: str = os.environ.get("TEST_DB_URL")

PORT: int = os.environ.get("PORT")

JWT_SECRET: str = os.environ.get("JWT_SECRET")

REDIS_URL: str = os.environ.get("REDIS_URL")
REDIS_PORT: int = os.environ.get("REDIS_PORT")


class RunConfig(BaseModel):
    port: int = PORT



class CORSConfig(BaseModel):
    origin: str = CORS_ORIGIN



class DBConfig(BaseModel):
    url: str = DB_URL
    echo: bool = True
    echo_pool: bool = True
    pool_size: int = 500
    test_url: str = TEST_DB_URL

class JWTConfig(BaseModel):
    secret: str = JWT_SECRET
    access_token_expires_minutes: int = 60 * 24 * 30
    refresh_token_expires_minutes: int = 60 * 24 * 30


class RedisConfig(BaseModel):
    url: str = REDIS_URL
    port: int = REDIS_PORT


#----------------------------------------------------------------
class Settings(BaseSettings):
    db: DBConfig = DBConfig()
    jwt: JWTConfig =JWTConfig()
    cors: CORSConfig = CORSConfig()
    redis: RedisConfig = RedisConfig()
    run: RunConfig = RunConfig()
    
    
    

settings = Settings()