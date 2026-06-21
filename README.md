# 张善茹 Chat App

张善茹 Chat App 是一个面向移动端浏览器的实时聊天系统。项目采用 React + TypeScript 构建前端页面，Node.js + Express + Socket.io 提供后端接口和实时通信能力，SQLite 数据库用于保存用户、聊天室、联系人和聊天记录。

## 功能简介

- 用户注册与登录
- JWT 身份认证
- 创建、加入和查看聊天室
- 公共聊天室实时消息发送与接收
- 联系人和私聊功能
- 聊天记录持久化保存
- 移动端自适应界面

## 技术栈

- 前端：React、TypeScript、Vite、Tailwind CSS、Socket.io Client
- 后端：Node.js、Express、TypeScript、Socket.io
- 数据库：SQLite、Sequelize
- 认证：JWT、bcrypt

## 作者信息

- 作者：张善茹
- GitHub：https://github.com/aaaaafdd

## 本地运行

前端配置文件 `client/.env`：

```env
VITE_REACT_URL_API=http://localhost:3030/api
VITE_REACT_URL_SOCKET=http://localhost:3030
```

后端配置文件 `server/.env`：

```env
PORT=3030
SECRET_KEY=dev_secret_key
FRONTEND_URL=http://localhost:5173
```

启动后端：

```bash
cd server
npm install
npm start
```

启动前端：

```bash
cd client
npm install
npm run dev
```

浏览器访问：

```text
http://localhost:5173
```

## 测试账号

```text
juan.perez@example.com / Ju@nP3r3z!
maria.garcia@example.com / M@r1a2024
```

## 数据库说明

数据库文件位于：

```text
server/src/database/database.sqlite
```

主要数据表包括：

- `users`：用户信息
- `rooms`：聊天室信息
- `RoomUser`：用户与聊天室关系
- `room_messages`：公共聊天室消息
- `private_messages`：私聊消息
- `contacts`：联系人关系
