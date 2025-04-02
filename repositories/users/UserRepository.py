from ..base.base_repository import BaseRepository
from models import User
from sqlalchemy.ext.asyncio import AsyncSession
from .exceptions.exceptions import UserNotFoundException, UsersNotFoundException, UserExistsException, UserNotExistsException
from sqlalchemy import select, delete, text

class UserRepository(BaseRepository[User]):
    model: User = User
    exception: UserNotFoundException = UserNotFoundException()
          
    def __init__(self, session: AsyncSession):
        super().__init__(session=session, model=self.model, exception=self.exception)

    async def registration(self, hash_password: bytes, username: str) -> User:
        query = select(self.model).where(self.model.username == username)
        stmt = await self.session.execute(query)
        candidate = stmt.scalars().first()

        if candidate:
            raise UserExistsException(f"Пользователь с именем {username} уже существует.")
        
        new_user_dict = {
            "username": username,
            "password": hash_password
        }
        new_user = User(**new_user_dict)
        self.session.add(new_user)
        await self.session.commit()

        return new_user
    
    
    async def login(self, username: str) -> User:
        query = select(self.model).where(self.model.username == username)
        stmt = await self.session.execute(query)
        res = stmt.scalars().first()

        if not res:
            raise self.exception

        return res
    
    
    async def get_all_user(self) -> list[User]:
        query = select(self.model).order_by(self.model.score.desc())
        stmt = await self.session.execute(query)
        res = stmt.scalars().all()

        if not res:
            raise UsersNotFoundException("Пользователи не найдены.")
        
        user_list = []
        for user in res:
            user_data = {
                "id": user.id,
                "username": user.username,
                "score": user.score
            }
            user_list.append(user_data)

        return user_list

    
    async def get_user_by_username(self, username: str) -> list[User]:
        query = select(self.model).where(self.model.username == username)
        stmt = await self.session.execute(query)
        res = stmt.scalars().all()

        if not res:
            raise self.exception

        return list(res)
    

    async def delete_user_by_username(self, username: str) -> User:
        # Сначала проверяем, существует ли пользователь
        query = select(self.model).where(self.model.username == username)
        stmt = await self.session.execute(query)
        user = stmt.scalars().first()

        if not user:
            raise self.exception

        # Выполняем запрос на удаление
        delete_query = delete(self.model).where(self.model.username == username)
        await self.session.execute(delete_query)
        await self.session.commit()

        return {
            "message": "Пользователь успешно удален"
        }
    
    async def get_current_auth_user(self, username: str) -> User:
        query = select(self.model).where(self.model.username == username)
        stmt = await self.session.execute(query)
        res = stmt.scalars().first()
        

        if not res:
            raise UserNotExistsException()

        return res
    
    async def reset_table(self) -> dict:
        # Удаляем все записи из таблицы
        delete_query = delete(self.model)
        await self.session.execute(delete_query)

        # Сбрасываем последовательность id (для PostgreSQL)
        reset_sequence_query = text("ALTER SEQUENCE users_id_seq RESTART WITH 1")
        await self.session.execute(reset_sequence_query)

        await self.session.commit()

        return {"message": "Таблица users успешно обнулена"}

        
