"""
API v1 router registration.
"""
from fastapi import APIRouter
from app.api.v1.endpoints import themes, projects, websocket, admin, auth

api_router = APIRouter()

# Register auth endpoints
api_router.include_router(
    auth.router,
    prefix="/auth",
    tags=["auth"]
)

# Register theme endpoints
api_router.include_router(
    themes.router,
    prefix="/themes",
    tags=["themes"]
)

# Register project endpoints
api_router.include_router(
    projects.router,
    prefix="/projects",
    tags=["projects"]
)

# Register WebSocket endpoints
api_router.include_router(
    websocket.router,
    tags=["websocket"]
)

# Register admin endpoints
api_router.include_router(
    admin.router,
    prefix="/admin",
    tags=["admin"]
)
