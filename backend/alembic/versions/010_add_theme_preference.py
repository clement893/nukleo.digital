"""Add theme_preference to users table

Revision ID: 010
Revises: 009
Create Date: 2025-01-27 12:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = '010'
down_revision: Union[str, None] = '009'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Add theme_preference column to users table
    op.add_column(
        'users',
        sa.Column('theme_preference', sa.String(20), nullable=False, server_default='system')
    )


def downgrade() -> None:
    # Remove theme_preference column
    op.drop_column('users', 'theme_preference')

