"""empty message

Revision ID: 713b0c561e3d
Revises: 
Create Date: 2022-04-17 15:38:34.089807

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '713b0c561e3d'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('profilePic', sa.Text(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username')
    )
    op.create_table('products',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=500), nullable=False),
    sa.Column('description', sa.String(length=500), nullable=False),
    sa.Column('image_url', sa.Text(), nullable=False),
    sa.Column('price', sa.Integer(), nullable=False),
    sa.Column('category', sa.String(), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('shoppingcart',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('shoppingcart')
    op.drop_table('products')
    op.drop_table('users')
    # ### end Alembic commands ###