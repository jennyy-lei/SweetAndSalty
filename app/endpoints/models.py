from sqlalchemy import Column, Integer, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class Recipes(Base):
    __tablename__ = 'Recipes'
    rid = Column(Integer, primary_key=True)
    rname = Column(String)
    time = Column(Integer)
    link = Column(String)

class Ingredients(Base):
    __tablename__ = 'Ingredients'
    iid = Column(Integer, primary_key=True)
    iname = Column(String)

class IngredientsToReceipes(Base):
    __tablename__ = 'IngredientsToRecipes'
    iid = Column(Integer, primary_key=True)
    rid= Column(Integer)