from fastapi import APIRouter
from .users.UserRouter import router as UserRouter


router = APIRouter(prefix="/api/v2")
router.include_router(router=UserRouter)


