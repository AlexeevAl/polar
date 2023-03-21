"""user_organization_is_admin

Revision ID: 8a14e99b6079
Revises: eb8714b4b6ca
Create Date: 2023-03-20 17:25:08.831886

"""
from alembic import op
import sqlalchemy as sa

# Polar Custom Imports

# revision identifiers, used by Alembic.
revision = "8a14e99b6079"
down_revision = "eb8714b4b6ca"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "user_organizations",
        sa.Column(
            "is_admin",
            sa.Boolean(),
            nullable=False,
            server_default="false",
        ),
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column("user_organizations", "is_admin")
    # ### end Alembic commands ###
