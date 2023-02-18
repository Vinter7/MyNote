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

