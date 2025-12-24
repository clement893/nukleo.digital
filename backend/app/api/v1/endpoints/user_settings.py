"""
User Settings Endpoints
Endpoints for managing user preferences and settings
"""

from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.core.logging import logger

router = APIRouter()


class ThemePreferenceUpdate(BaseModel):
    """Theme preference update schema"""
    theme: str = Field(..., description="Theme preference: 'light', 'dark', or 'system'")
    
    def __init__(self, **data):
        super().__init__(**data)
        if self.theme not in ['light', 'dark', 'system']:
            raise ValueError("Theme must be 'light', 'dark', or 'system'")


class ThemePreferenceResponse(BaseModel):
    """Theme preference response schema"""
    theme: str
    message: str


@router.get(
    "/theme",
    response_model=ThemePreferenceResponse,
    tags=["user-settings"]
)
async def get_theme_preference(
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[AsyncSession, Depends(get_db)]
) -> ThemePreferenceResponse:
    """
    Get current user's theme preference.
    Requires authentication.
    """
    try:
        theme = current_user.theme_preference or 'system'
        return ThemePreferenceResponse(
            theme=theme,
            message="Theme preference retrieved successfully"
        )
    except Exception as e:
        logger.error(f"Error getting theme preference: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve theme preference"
        )


@router.put(
    "/theme",
    response_model=ThemePreferenceResponse,
    tags=["user-settings"]
)
async def update_theme_preference(
    theme_update: ThemePreferenceUpdate,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[AsyncSession, Depends(get_db)]
) -> ThemePreferenceResponse:
    """
    Update current user's theme preference.
    Requires authentication.
    
    Args:
        theme_update: Theme preference update data
        current_user: Current authenticated user
        db: Database session
    
    Returns:
        Updated theme preference
    """
    try:
        # Validate theme value
        if theme_update.theme not in ['light', 'dark', 'system']:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Theme must be 'light', 'dark', or 'system'"
            )
        
        # Update user's theme preference
        current_user.theme_preference = theme_update.theme
        await db.commit()
        await db.refresh(current_user)
        
        logger.info(f"Updated theme preference for user {current_user.email}: {theme_update.theme}")
        
        return ThemePreferenceResponse(
            theme=current_user.theme_preference,
            message="Theme preference updated successfully"
        )
    except HTTPException:
        raise
    except Exception as e:
        await db.rollback()
        logger.error(f"Error updating theme preference: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update theme preference"
        )

