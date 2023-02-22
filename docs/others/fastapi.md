# FastAPI

## 快速上手

- 创建
  - `python -m venv venv`
  - `venv/Scripts/activate,bat`
  - `pip install "fastapi[all]"`
  - `uvicorn main:app --reload`
- 依赖
  - fastapi 本体
  - uvicorn ASGI
  - typing 类型扩展 标准库
  - pydantic 接口类型定义
  - Starlette web相关功能
- 自动生成文档
  - `/docs`
  - `/redoc`
  - `/openapi.json`
- 类型
  - 基本 str int float bool bytes
  - 嵌套 `from typing import List`
    - `List[str]` `Tuple[int, int, str]` `Set[bytes]`
    - `Dict[str, float]` 前者表键 后者表值
  - 对象 `Person`
  - 枚举
    - `from enum import Enum`
    - `class ModelName(str, Enum):`
    - `def get_model(model_name: ModelName):`
  - Pydantic

::: code-group
```py [get]
# main.py
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

# /items/5?q=theQuery
@app.get("/items/{item_id}")
def read_item(item_id: int, q= None):
    return {"item_id": item_id, "query": q}
```
```py [post]
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float
    is_offer: bool | None = None
# 请求体
@app.put("/items/{item_id}")
def update_item(item_id: int, item: Item):
    return {"item_name": item.name, "item_id": item_id}
```
:::

## 请求信息

- 请求中的参数
  - 路径参数同时写在path中即生效
    - g大于 l小于 than equal
  - 参数为单类型时取为query
    - 每个参数分开
    - 没有默认值为必须
    - `Query(不写default或者=...)` 都表示必须
    - 多值 `q: list[str]` `?q=foo&q=bar`
    - alias title description deprecated min_length max_length regex
  - 参数使用pydantic声明取为body
    - 可多参数
    - `Field` Pydantic 模型内部声明校验
    - 可以嵌套模型



::: code-group
```py [路径参数]
from enum import Enum
from fastapi import FastAPI, Path

class ModelName(str, Enum):
    alexnet = "alexnet"
    resnet = "resnet"
    lenet = "lenet"

app = FastAPI()

@app.get("/items/{item_id}")
async def read_items(
    *,
    item_id: int = Path(title="The ID of the item to get", gt=0, le=1000),
    q: str,
):
    results = {"item_id": item_id}
    if q:
        results.update({"q": q})
    return results

@app.get("/models/{model_name}")
async def get_model(model_name: ModelName):
    if model_name is ModelName.alexnet:
        return {"model_name": model_name}

    if model_name.value == "lenet":
        return {"model_name": model_name}

    return {"model_name": model_name}
```
```py [查询参数]
from fastapi import FastAPI, Query
app = FastAPI()

@app.get("/items/{item_id}")
async def read_item(
    item_id: str, 
    q: str | None = Query(default=None, max_length=5,regex="^reg")
    ):
    if q:
        return {"item_id": item_id, "q": q}
    return {"item_id": item_id}
```
```py [请求体]
from fastapi import FastAPI
from pydantic import BaseModel


class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None


app = FastAPI()


@app.put("/items/{item_id}")
async def create_item(item_id: int, item: Item, q: str | None = None):
    result = {"item_id": item_id, **item.dict()}
    if q:
        result.update({"q": q})
    if item.tax:
        price_with_tax = item.price + item.tax
        result.update({"price_with_tax": price_with_tax})
    return result
```
```py [Cookie]
from fastapi import Cookie, FastAPI

app = FastAPI()

@app.get("/items/")
async def read_items(ads_id: str | None = Cookie(default=None)):
    return {"ads_id": ads_id}
```
```py [Header]
from fastapi import FastAPI, Header

app = FastAPI()

@app.get("/items/")
async def read_items(user_agent: str | None = Header(default=None)):
    return {"User-Agent": user_agent}
```
:::


## 额外数据类型

- `UUID` 数据库做ID
- `datetime.datetime` 时间
- `datetime.date` 日期
- `datetime.time` 时间间隔
- `datetime.timedelta` 秒差
- `frozenset` set
- `bytes` 字节
- `Decimal` 小数

## 响应模型








## ORM

`pip install sqlalchemy`

- `__init__.py` 表示模块 实为空
- `curd.py` 增删改查
- `database.py` 创建连接
- `main.py` 
- `models.py` ORM模型
- `schemas.py`


::: code-group
```python [database]
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

url = "sqlite:///./sql_app.db"
# SQLALCHEMY_DATABASE_URL = "postgresql://user:password@postgresserver/db"

engine = create_engine( url )
# connect_args={"check_same_thread": False} 只用于sqlite

# 会话类
SessionLocal = sessionmaker(bind=engine)
# autocommit=False, autoflush=False 可加

# ORM基类
Base = declarative_base()
```
```python [models]
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from .database import Base

# 一个类一个表

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    # 表关系
    items = relationship("Item", back_populates="owner")


class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="items")
```
```py [schemas]
from pydantic import BaseModel

class ItemBase(BaseModel):
    title: str
    description: str | None = None

class ItemCreate(ItemBase):
    pass

class Item(ItemBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True

class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool
    items: list[Item] = []

    class Config:
        orm_mode = True
```
```py [curd]
from sqlalchemy.orm import Session
from . import models, schemas

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

def create_user(db: Session, user: schemas.UserCreate):
    fake_hashed_password = user.password + "notreallyhashed"
    db_user = models.User(email=user.email, hashed_password=fake_hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_items(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Item).offset(skip).limit(limit).all()

def create_user_item(db: Session, item: schemas.ItemCreate, user_id: int):
    db_item = models.Item(**item.dict(), owner_id=user_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item
```
```py [main]
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)

@app.get("/users/", response_model=list[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users

@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.post("/users/{user_id}/items/", response_model=schemas.Item)
def create_item_for_user(
    user_id: int, item: schemas.ItemCreate, db: Session = Depends(get_db)
):
    return crud.create_user_item(db=db, item=item, user_id=user_id)

@app.get("/items/", response_model=list[schemas.Item])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = crud.get_items(db, skip=skip, limit=limit)
    return items
```
:::


