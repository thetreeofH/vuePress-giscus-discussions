---
title: 面试题总结
date: 2022-07-10 19:48:07
tags: Mybatis
description: 面试题总结
categories: 面试题
---

## Mybatis

### 1.什么是mybatis
 - mybatis是一个优秀的持久层框架，一个半orm（对象关系映射）框架，支持定制化sql、存储过程及高级关系映射

### 2.ORM是什么
 - 对象关系映射，是一种为了解决java对象和数据库映射关系的技术，orm通过使用描述对象和数据库之间映射的元数据，将程序中的对象自动持久化到数据库的技术

### 3.为什么mybatis是半自动orm映射工具
 - 在查询关联对象和关联集合对象时，需要手动编写sql语句

### 4.jdbc变成存在的问题
 - 频繁创建数据库连接对象、释放，耗费性能，每一个查询都要建立一次连接，使用数据库连接池可以解决这个问题
    - 使用mybatis-config.xml配置数据库连接池
 - sql语句写在代码中不易维护
    - 将sql语句配置在mapper.xml文件中，与代码分离
 - sql语句的传参麻烦，sql语句的where条件不确定，占位符要和参数一一对应
    - mybatis自动将java对象映射至sql语句
 - 结果集的接卸比较麻烦，sql语句变化导致解析代码发生变化，且解析前需要遍历
    - mybatis自动将sql结果映射至java对象

### 5.mybatis的优缺点
 - 优点
    - 基于sql语句编程，相当灵活，不会对应用程序和数据库造成影响，sql语句写在xml文件中降低耦合
    - 与jdbc相比降低了50%的代码量，消除了大量冗余代码，不需要手动开关数据库连接
    - 很好的与数据库兼容
    - 提供映射标签，支持数据库与对象的关系映射
 - 缺点
    - sql语句编写工作量大，对开发人员的sql语句功底有一定要求
    - sql语句依赖于数据库，导致数据库移植性差，不能随意更换数据库

### 6.hibernate和mybatis的区别
 - 都是对jdbc的封装，都是持久层框架，用于dao层的开发
 - mybatis是一个半自动orm映射框架，配置java对象与sql执行结果的对象关系映射
 - hibernate是一个全表映射框架，配置java对象与数据库的映射关系，多表关联更加复杂
 - hibernate对sql语句进行封装，提供了日志、缓存、级联，还支持HQL操作数据库，数据库无关性较好，但会多消耗性能，支持多种数据库，sql优化困难
 - mybatis需要手动编写sql语句，支持动态sql、动态生成表名、处理列表、支持存储过程，使用sql语句操作数据库，不支持数据库无关性，但是sql优化简单
 - hibernate时重量级框架，学习成本高，mybatis时轻量级框架，学习成本低，适合需求频繁变化的大型项目

### 7.