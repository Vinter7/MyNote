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

::: code-group
```py [路径参数]
from enum import Enum
from fastapi import FastAPI

class ModelName(str, Enum):
    alexnet = "alexnet"
    resnet = "resnet"
    lenet = "lenet"

app = FastAPI()

@app.get("/models/{model_name}")
async def get_model(model_name: ModelName):
    if model_name is ModelName.alexnet:
        return {"model_name": model_name}

    if model_name.value == "lenet":
        return {"model_name": model_name}

    return {"model_name": model_name}
```
```py [查询参数]
from fastapi import FastAPI
app = FastAPI()

@app.get("/items/{item_id}")
async def read_item(item_id: str, q: str | None = None):
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
:::


