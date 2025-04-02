from config.utils.auth import utils
from repositories.users.UserRepository import UserRepository
from schemas.users import UserLoginSchema, UserSchema
from werkzeug.security import generate_password_hash, check_password_hash

from services.users.helpers import helpers
from .exceptions.exceptions import IncorrectPasswordException

class UserService:

    def __init__(self, repository: UserRepository):
        self.repository = repository


    async def registration(self, user_in: UserLoginSchema) -> helpers.TokenInfo:
        hash_password: bytes = utils.hash_passowrd(password=user_in.password)

        new_user = await self.repository.registration(hash_password, user_in.username)

        access_token: str = helpers.create_access_token(user=new_user)
        refresh_token: str = helpers.create_refresh_token(user=new_user)

        return helpers.TokenInfo(
            access_token=access_token,
            refresh_token=refresh_token
        )
    
    
    

    async def login(self, user_in: UserLoginSchema):
        user = await self.repository.login(username=user_in.username)

      #  is_valid_password: bool = check_password_hash(
      #      pwhash=user.password,
      #      password=user_in.password
       # )

        is_valid_password: bool = utils.validation_password(
            hashed_password=user.password,
            password=user_in.password
        )

        if not is_valid_password:
            raise IncorrectPasswordException()

        access_token: str = helpers.create_access_token(user=user)
        refresh_token: str = helpers.create_refresh_token(user=user)

        return helpers.TokenInfo(
            access_token=access_token,
            refresh_token=refresh_token
        )
    
    async def me(self, token: str) -> UserSchema:
        payload: dict = helpers.get_current_token(token=token)
        username: str = await helpers.get_current_auth_user(payload=payload)

        auth_user = await self.repository.get_current_auth_user(username=username)

        return UserSchema(
            id=auth_user.id,
            username=auth_user.username,
        )
    
    async def get_all_user(self) -> list:
        return await self.repository.get_all_user()
    
    async def get_user_by_username(self, username: str):
        return await self.repository.get_user_by_username(username=username)
    
    async def add_score_to_user(self, username: str, points: int):
        return await self.repository.add_score_to_user(username=username, points=points)
    
    async def delete_user_by_username(self, username: str) -> dict:
        return await self.repository.delete_user_by_username(username=username)
    
    async def reset_users_table(self) -> dict:
        return await self.repository.reset_table()


