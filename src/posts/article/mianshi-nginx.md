---
title: 面试题总结
date: 2022-07-10 19:48:07
tags: MQ
description: 面试题总结
categories: 面试题
---

## nginx

### 1.nginx的应用场景
 - 负载均衡
 - 反向代理
 - 正向代理
 - 静态资源服务器

### 2.nginx负载均衡的策略
 - 轮询
 - 权重
 - IP hash

### 3.nginx的进程模型
 - nginx由master和worker组成，master进程主要用来管理worker进程，用于接收网络消息，向worker发送外界信号，监控worker进程状态，worker掉线后会自动重启worker
 - 进本网络事件主要由worker进行处理，一个master可以有多个worker，每个worker之间是竞争关系，一个信号只能有一个worker处理

### 4.nignx的常用命令
 - 启动./nginx start 或 ./nginx
 - 强制停止 ./nginx stop
 - 安全退出 ./nginx quit
 - 查看nginx进程 ps -ef|grep nginx
 - 查看nginx监听的端口 netstat -anp|grep nginx
 - 重新加载nginx配置文件 ./nginx -s reload

### 5.nginx的优化方案
 - 进程数一般与cpu数量相同，两个四核的cpu则部署8个nginx
