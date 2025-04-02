from fastapi import Depends
from repositories import UserRepository
from services import UserService
from config import DatabaseConnection, settings
from sqlalchemy.ext.asyncio import AsyncSession


def get_db() -> DatabaseConnection:
    return DatabaseConnection(
        db_url=settings.db.test_url,
        echo_pool=settings.db.echo_pool,
        pool_size=settings.db.pool_size,
        db_echo=settings.db.echo
    )
    
    
def get_user_repository(session: AsyncSession = Depends(get_db().sesion_creation)) -> UserRepository:
    return UserRepository(session=session)


#==================================================================

def get_user_service(repository: UserRepository = Depends(get_user_repository)) -> UserService:
    return UserService(repository=repository)
