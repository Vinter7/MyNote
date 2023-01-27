# NestJS

[文档](https://nestjs.com/)

----

## 快速上手

1. `npm i -g @nestjs/cli`
2. `nest new project-name`
3. `npm run start:dev`

**创建模块**

1. `nest g module girl`
2. `nest g controller girl --no-spec`
3. `nest g service girl --no-spec`
4. `nest g res boy`


::: code-group
```ts [app.module.ts]
import { Module } from '@nestjs/common';
import { GirlModule } from './girl/girl.module';

@Module({
  imports: [GirlModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

```ts [girl.module.ts]
import { Module } from '@nestjs/common';
import { GirlController } from './girl/girl.controller';
import { GirlService } from './girl/girl.service';

@Module({
  controllers: [GirlController],
  providers: [GirlService],
})
export class GirlModule {}
```

```ts [girl.controller.ts]
import { Controller, Get } from '@nestjs/common';
import { GirlService } from './girl.service';

@Controller('girl')
export class GirlController {
  constructor(private girlService:GirlService){}
  @Get()
  getGirls():any{
    return this.girlService.getGirls()
  }
}
```

```ts [girl.service.ts]
import { Injectable } from '@nestjs/common';

@Injectable()
export class GirlService {
  getGirls(){
    return {
      code:0,
      data:['翠花','小红','大丫'],
      msg:'请求成功'
    }
  }
}
```
:::


## Get & Post

::: code-group
```ts [GET]
import { Request, Query } from '@nestjs/common'
@Get('/getGirlById')
getGirlById(@Request() req){
  let id:number = parseInt(req.query.id) 
  return this.girlService.getGirlById(id)
}

// 同上
@Get('/getGirlById')
getGirlById(@Query() query){
  let id:number = parseInt(query.id) 
  return this.girlService.getGirlById(id)
}
```

```ts [POST]
import { Body } from '@nestjs/common'
@Post('/addGirl')
addGirl(@Body() body){
  console.log(body)
  return this.girlService.addGirl(body)
}
```
:::

## 动态路由


```ts
import { Param, Headers } from '@nestjs/common'
@Get('/findGirlById/:id/:name')
findGirlById(@Param() params ,@Headers() header):any{
  console.log(params.name)
  console.log(header)
  let id:number = parseInt(params.id) 
  return this.girlService.getGirlById(id)
}
```

## TypeORM

`npm install --save @nestjs/typeorm typeorm mysql2`

::: code-group
```ts [配置]
// app.module.ts
import { Module } from '@nestjs/common';
import { GirlModule } from './girl/girl.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[ 
    TypeOrmModule.forRoot({
      type:'mysql',           // 数据库类型
      host:'localhost',       // 数据库的连接地址host
      port:3306,              // 数据库的端口 3306
      username:'root',        // 连接账号
      password:'root123',     // 连接密码
      database:'test_db',     // 连接的表名
      retryDelay:500,         // 重试连接数据库间隔
      retryAttempts:10,       // 允许重连次数
      synchronize:true,       // 是否将实体同步到数据库
      autoLoadEntities:true,  // 自动加载实体配置
    }),
    GirlModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

```ts [实体]
// girl/entities/girl.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Generated,
  } from 'typeorm'

@Entity()
export class Girl{
  
  // id 自增
  @PrimaryGeneratedColumn()
  id:number

  @Column({type:"varchar",length:255})
  name:string

  @Column({type:"int"})
  age:number

  @Column({type:"varchar"})
  skill:string

  @CreateDateColumn({type:"timestamp"})
  entryTime:Date

  @Generated('uuid')
  uuid:string
}
```

```ts [引入]
// girl.module.ts
import { Module } from '@nestjs/common';
import { GirlController } from './girl/girl.controller';
import { GirlService } from './girl/girl.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { Girl } from "./entities/girl.entity";

@Module({
  imports:[TypeOrmModule.forFeature([Girl])],
  controllers: [GirlController],
  providers: [GirlService],
})
export class GirlModule {}
```

```ts [增删改查]
// girl.service.ts
import {Like, Repository} from 'typeorm'
import {InjectRepository}from '@nestjs/typeorm'
import {Girl} from './entities/girl.entity'

@Injectable()
export class GirlService {
  // 依赖注入
  constructor(@InjectRepository(Girl) private readonly girl:Repository<Girl>){}

  // 增
  addGirl(){
    const data = new Girl()
    data.name='tony';
    data.age=25;
    data.skill='JavaScript';
    return this.girl.save(data);
  }

  // 删
  delGirl(id:number){
    return this.girl.delete(id)
  }

  // 改
  updateGirl( id: number ){
    let data = new Girl()
    data.name="王小丫";
    data.age=19
    return this.girl.update(id,data)
  }

  // 查全部
  getGirls(){
    return this.girl.find()
  }

  // 查名字
  getGirlByName(name:string){
    return this.girl.find({
      where:{
        name:Like(`%${name}%`)
      }
    })
  }


}
```

```ts [路由]
import { Controller, Get } from '@nestjs/common';
import { GirlService } from './girl.service';

@Controller('girl')
export class GirlController {
  constructor(private girlService:GirlService){}

  // 增
  @Get('/add')
  addGirl(@Body() body):any{
    console.log(body)
    return this.girlService.addGirl()
  }

  // 删
  @Get('/delete/:id')
  deleteGirl(@Param() params):any{
    let id:number = parseInt(params.id)
    return this.girlService.delGirl(id)
  }

  //查
  @Get()
  getGirls():any{
    return this.girlService.getGirls()
  }

  @Get('/findGirlByName/:name')
  findGirlByName(@Param() params ):any{
    let name:string = params.name
    return this.girlService.getGirlByName(name)
  }
}
```
:::

## 依赖注入

`module.ts`文件相当于连接和汇总的桥梁\
`imports` 写要导入的模块\
`controllers` 写路由\
`providers` 写依赖,常为业务逻辑相关

::: code-group
```ts [test.module.ts]
@Module({
  controllers:[TestController],
  providers:[
    TestService1, //类简写法
    {
      provide: 'test2',
      useClass: TestService2
    },
    {
      provide: 'testArray',
      useValue: ['tom','kiton','vinter']
    },
    {
      provide: 'myFunc',
      useFactory(){
        return 'it is good'
      }
    }
  ]
})
```

```ts [test.controller.ts]
import { Controller, Inject, Get } from "@nestjs/common";

@Controller('test')
export class TestController{
  constructor(
    private testService1, //简写无需注入
    @Inject('test2') private testService2,
    @Inject('testArray') private testList:string[],
    @Inject('myFunc') private thefunc:string
  ){}

  @Get('/test1')
  getTest1(){
    return this.testService1.get()
  }

  @Get('/test2')
  getTest1(){
    return this.testService2.get()
  }

  @Get('/tests')
  getTests(){
    return this.testList
  }

  @Get('/func')
  getfunc(){
    console.log(this.thefunc)
    return this.thefunc
  }
}
```
:::


## 中间件



::: code-group
```ts [局部中间件定义]
// nest g mi theName
// /src/theName/theName.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class NameMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('进入中间件') //具体业务逻辑
    next();
  }
}
```

```ts [局部中间件使用]
import {NameMiddleware} from '../theName/theName.middleware.ts'
import { Module, NestModule,MiddlewareConsumer } from '@nestjs/common';
import { GirlController } from './girl/girl.controller';
import { GirlService } from './girl/girl.service';

@Module({
  controllers: [GirlController],
  providers: [GirlService],
})
export class GirlModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    //consumer.apply(CounterMiddleware).forRoutes('girl') // 局部路径
    consumer.apply(CounterMiddleware).forRoutes({
      path:'girl',
      method:RequestMethod.GET
      }) // 局部路径
  }
}
```

```ts [全局中间件]
// main.js
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
function MiddleWareAll(req:any,res:any,next:any){
  console.log('我是全局中间件.....') // 业务逻辑
  // res.send('禁止访问，你被拦截了')
  next()
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  app.use(MiddleWareAll) // 引用

  await app.listen(3000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
```

## 模块调用