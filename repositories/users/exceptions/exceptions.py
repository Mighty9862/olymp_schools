

USER_EXCEPTION_DETAIL: str = "Пользователи не найдены"
USER_EXISTS_EXCEPTION_DETAIL: str = "Пользовтаель с таким именем уже существует"
USER_NOT_EXISTS_EXCEPTION_DETAIL: str = "Пользователя с таким именем не существует"

# Ошибка при которой не найден пользователь
class UserNotFoundException(Exception):
    def __init__(self, message: str = USER_EXCEPTION_DETAIL):
        self.message = message
        super().__init__(self.message)
        

# Ошибка при которой не найдены пользователи
class UsersNotFoundException(Exception):
    def __init__(self, message: str = USER_EXCEPTION_DETAIL):
        self.message = message
        super().__init__(self.message)
        

# Ошибка уже существующего пользователя
class UserExistsException(Exception):
    def __init__(self, message: str = USER_EXISTS_EXCEPTION_DETAIL):
        self.message = message
        super().__init__(self.message)
        
        

# Ошибка еще не существующего пользователя
class UserNotExistsException(Exception):
    def __init__(self, message: str = USER_NOT_EXISTS_EXCEPTION_DETAIL):
        self.message = message
        super().__init__(self.message)
        