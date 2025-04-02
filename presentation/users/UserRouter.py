from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, OAuth2PasswordBearer
from services.users.UserService import UserService
from schemas.users import UserLoginSchema, UserSchema, UserByName
#from config.utils.auth import utils
from dependencies import get_user_service


http_bearer = HTTPBearer(auto_error=False)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v2/users/login/")

router = APIRouter(prefix="/users", tags=["User"], dependencies=[Depends(http_bearer)])


@router.post("/registration",
            summary="Регистрация нового пользователя",
            description="Добавляет новго пользователя и возвращает сообщение об успешной регистрации")
async def index(
    user_in: UserLoginSchema = Depends(UserLoginSchema),
    service: UserService = Depends(get_user_service)
):
    try:
        user = await service.registration(user_in=user_in)
        return {"message": "Пользователь успешно зарегистрирован", "user": user}
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.post("/login",
            summary="Авторизация пользователя",
            description="Аутентификация пользователя с проверкой данных")
async def index(
    user_in: UserLoginSchema = Depends(UserLoginSchema),
    service: UserService = Depends(get_user_service)
):
    try:
        user = await service.login(user_in=user_in)
        return user
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

    
@router.get("/me", response_model=UserSchema)
async def index(
    token: str = Depends(oauth2_scheme),
    service: UserService = Depends(get_user_service)
) -> UserSchema:
    return await service.me(token=token)

@router.get("/",
        summary="Список всех пользователей",
        description="Возвращает список всех пользователей с полными данными")
async def index(
    service: UserService = Depends(get_user_service)
    
):
    try:
        users = await service.get_all_user()
        return users
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.get("/{username}", 
            response_model=list[UserByName],
            summary="Получение одного пользователя",
            description="Возвращает Имя и количество очков пользователя")
async def index(
    username: str,
    service: UserService = Depends(get_user_service)
) -> list[UserByName]:
    try:
        user = await service.get_user_by_username(username=username)
        return user
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.delete("/delete/{username}", 
                response_model=dict,
                summary="Удаление пользователя",
                description="Удаляет пользователя по имени")
async def index(
    username: str,
    service: UserService = Depends(get_user_service)
) -> dict:
    try:
        user = await service.delete_user_by_username(username=username)
        return user
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
    
@router.post("/reset",
             summary="Обнуление таблицы users",
             description="Удаляет все данные из таблицы users и сбрасывает счетчик id")
async def reset_users_table(
    service: UserService = Depends(get_user_service)
) -> dict:
    try:
        result = await service.reset_users_table()
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
