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

## 请求

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
- 响应
  - 通过 response_model 参数来定义响应模型
  - 使用 status_code 参数声明状态码
- 多模型间可用继承



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

## 校验

前面的部分应该拆分成请求和校验

等有空了改下


## 表单和文件

- 当接受的并非JSON而是表单时使用`Form`
- `pip install python-multipart`
- UploadFile
  - filename content_type file
  - write(data) read(?size) seek(offset) close()

::: code-group
```py [字段]
from fastapi import FastAPI, Form

app = FastAPI()

@app.post("/login/")
async def login(username: str = Form(), password: str = Form()):
    return {"username": username}
```
```py [文件]
from fastapi import FastAPI, File, UploadFile

app = FastAPI()

@app.post("/files/")
async def create_file(file: bytes = File()):
    return {"file_size": len(file)}

@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile):
    return {"filename": file.filename}
```
```py [同时]
from fastapi import FastAPI, File, Form, UploadFile

app = FastAPI()

@app.post("/files/")
async def create_file(
    file: bytes = File(), fileb: UploadFile = File(), token: str = Form()
):
    return {
        "file_size": len(file),
        "token": token,
        "fileb_content_type": fileb.content_type,
    }
```
:::



## 杂项

- 错误处理
  - `from fastapi import HTTPException`
  - `raise HTTPException(status_code=404, detail="Item not found")`
- 路径操作配置
  - 通过传递参数给路径操作装饰器 ，即可轻松地配置路径操作、添加元数据
- JSON 兼容编码器
  - `jsonable_encoder(item)`
- 额外数据类型
  - `UUID` 数据库做ID
  - `datetime.datetime` 时间
  - `datetime.date` 日期
  - `datetime.time` 时间间隔
  - `datetime.timedelta` 秒差
  - `frozenset` set
  - `bytes` 字节
  - `Decimal` 小数
- PUT & PATCH


## 依赖注入

要造汽车,可以买来所有的原材料属性丢进构造函数里,汽车类里面又分成引擎,轮胎等多个类,要是其中一个类要加一个属性,那么一层层的直到汽车类的构造函数里都要引入新的原材料,这样的话就比较麻烦了.因此使用依赖注入,造汽车我不关心你轮胎,引擎怎么造,我只要直接去买轮胎引擎就好了.在构造函数里我直接就输入的是轮胎对象,引擎对象,我自己只要再加个标牌就完事了,这样的方法就叫依赖注入,其目的叫控制反转.

::: code-group
```py [函数]
from fastapi import Depends, FastAPI

app = FastAPI()

async def common_parameters(q: str | None = None, skip: int = 0, limit: int = 100):
    return {"q": q, "skip": skip, "limit": limit}

@app.get("/items/")
async def read_items(commons: dict = Depends(common_parameters)):
    return commons

@app.get("/users/")
async def read_users(commons: dict = Depends(common_parameters)):
    return commons
```
```py [类]
from fastapi import Depends, FastAPI

app = FastAPI()

fake_items_db = [{"item_name": "Foo"}, {"item_name": "Bar"}, {"item_name": "Baz"}]

class CommonQueryParams:
    def __init__(self, q: str | None = None, skip: int = 0, limit: int = 100):
        self.q = q
        self.skip = skip
        self.limit = limit

@app.get("/items/")
async def read_items(commons: CommonQueryParams = Depends(CommonQueryParams)):
    response = {}
    if commons.q:
        response.update({"q": commons.q})
    items = fake_items_db[commons.skip : commons.skip + commons.limit]
    response.update({"items": items})
    return response
```
:::

## 安全

- 登录验证
  - 手机号和密码发给后端
  - 密码转哈希存入数据库完成注册
  - 登录时发送手机号和密码
  - 查询数据库
  - 验证哈希后生成token
  - 后端返回token
  - 前端保存token到LocalStorage
- 登录保持
  - 前端发送请求时把token放在请求头中
  - 后端获取token并检验有效性
  - 得出手机号并去数据库读取请求内容
  - 返回响应

::: code-group
```py [main]
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from orm import UserAll, hasUser, c_user, u_user, engine, SessionLocal, Base
# 连接数据库
Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

theHash = CryptContext(schemes=["bcrypt"], deprecated="auto")

KEY = "09d25e094fa"

def c_token(phone: str):
    expire = datetime.utcnow()+timedelta(days=7)
    info = {"phone": phone, "exp": expire}
    return jwt.encode(info, KEY)

def r_token(token: str):
    info = jwt.decode(token, KEY, "HS256")
    return info.get("phone"), info.get('exp')

@app.post("/user/sign")
# 注册
def sign(user: UserAll, db: Session = Depends(get_db)):
    # 数据校验pass
    if (hasUser(db, user.phone)):
        return "用户已存在"
    user.password = theHash.hash(user.password)
    return c_user(db=db, user=user)

@app.get("/user/login")
# 登录
def login(user: UserAll, db: Session = Depends(get_db)):
    pwd = hasUser(db, user.phone)
    if (not pwd):
        return '无用户'
    if (theHash.verify(user.password, pwd)):
        return c_token(user.phone)
    else:
        return "密码错误"

@app.post("/user/update")
# 改
def update(user: UserAll, db: Session = Depends(get_db)):
    # 验证权限
    return u_user(db, user)

@app.get("/user/me")
def test(token: str = Depends(OAuth2PasswordBearer(tokenUrl="token"))):
    print(token)
    return r_token(token)
```
```py [orm]
from sqlalchemy import create_engine, Boolean, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel

engine = create_engine(
    "sqlite:///./sql_app.db",
    connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# 表类
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    phone = Column(String, unique=True, index=True)
    password = Column(String)
    username = Column(String)
    status = Column(Boolean, default=True)

class UserBase(BaseModel):
    phone: str

class UserCreate(BaseModel):
    password: str
    username: str | None = None

class UserAll(UserBase):
    password: str | None = None
    username: str | None = None
    is_active: bool | None = None

def hasUser(db: Session, phone: str):
    u = db.query(User).filter(User.phone == phone).first()
    if (u):
        return u.password
    else:
        return False

# curd create update read delete

def c_user(db: Session, user: UserCreate):
    username = user.username
    if (username == None):
        username = user.phone[-4:]

    db_user = User(
        phone=user.phone,
        password=user.password,
        username=username
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return True

def u_user(db: Session, user: UserAll):
    arr = ['password', 'username', 'is_active']
    dic = {}
    for i in arr:
        print(i)
        if (user.__dict__[i] == None):
            continue
        dic[i] = user.__dict__[i]
    db.query(User).filter(User.phone == user.phone).update(dic)
    db.commit()
    return True
```
:::


## 中间件

```py
import time
from fastapi import FastAPI, Request

app = FastAPI()

@app.middleware("http")
async def theTime(request: Request, call_next):
    start_time = time.time()
    # 处理前
    response = await call_next(request)
    # 处理后
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response
```


## CORS

```py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def main():
    return {"message": "Hello World"}
```


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


## 文件组织


## 后台任务

```py
from fastapi import BackgroundTasks, FastAPI

app = FastAPI()

# 具体任务
def write_notification(email: str, message=""):
    with open("log.txt", mode="w") as email_file:
        content = f"notification for {email}: {message}"
        email_file.write(content)


@app.post("/send-notification/{email}")
async def send_notification(email: str, background_tasks: BackgroundTasks):
    background_tasks.add_task(write_notification, email, message="some notification")
    return {"message": "Notification sent in the background"}
```


## 静态文件


```py
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
```

