---
title: 面试题总结
date: 2022-07-10 19:48:07
tags: redis
description: 面试题总结
categories: 面试题
---


## redis
### 1.redis集群模式的工作原理能说一下么？在集群模式下，redis的key是如何寻址的？分布式寻址都有哪些算法？了解一致性hash算法吗？
 - 工作原理
   - redis cluster没有使用一致性hash算法，采用的是slot槽的模式，根据hash值的不同，将数据分片，每个节点存储一定哈希槽区间的数据，默认分配16384个槽位
   - 每份数据分辨存储再互为主从的几个节点上
   - 每个数据默认先存储在主节点，然后再同步到各个分节点
   - 同一分片的各个节点数据不一定一致，收取数据时，当此节点没有对应的key会发送转向指令，指向正确的节点
 - 分布式寻址算法
   - hash算法
   - 一致性hash算法+虚拟节点
   - redis cluster的hash slot算法
 - 一致性hash算法
   - 将整个hash算法空间组成一个圆环，然后将各个master节点进行hash，确定每个节点再圆环上的位置
 - hash slot
   - redis有固定的16384个hash slot，对每个key计算CRC16的值，然后对16384取模，可以获取对应key的hash slot值

### 2.redis集群的几种模式
 - 哨兵模式
 - redis cluster
 - 基于客户端
 - 基于代理服务器
 - 主从模式
### 3.redis的主从模式
 - redis replation的核心机制
   - redis采用异步方式复制数据到slave node，一个master可以有多个salve，salve node可以连接其他slave node，从节点复制的时候不会锁定主节点，也不会锁定自己节点的查询操作，但是节点复制完成后需要进行数据采集，这时服务时停止状态
   - slave node主要用来横向扩容，做读写分离
   - 采用主从结构的话必须要开启主节点的持久化，不建议使用从节点进行热备
 - 主从复制的原理
   - 当主节点和从节点建立主从关系后，从节点会项主节点发送一个SYNC消息
   - 主节点收到这个消息后会在后台开始保存快照，生成rdb文件，并将期间收到的命令缓存起来
   - 当快照完成后，会将快照文件和所有缓存的写命令发送给从节点
   - 从节点接受到后，会载入所有快照文件（先写入本地磁盘，然后再从磁盘加载入内存中），并执行缓存中的写命令，同步所有的数据信息（如果缓存发送失败，会自动重新连接，并重新发送失败的命令）
   - 之后主节点收到的所有写命令也会同步发送给从节点

### 4.redis的hash槽
 - hash slot，redis集群有16384个hash槽，对每个key求CRC16的值，然后对16384取模，就可以找到每个key对应的hash槽，每个redis节点保存一定数量的槽

### 5.缓存异常
 - 缓存雪崩：大量的缓存在同一时间失效
   - 设置随机的过期时间
   - 并发量不大时，可以采用加锁排队的方式
   - 对每个缓存加上缓存标记，当缓存失效时，则更新缓存
 - 缓存穿透：查询一个补丁不会存在的数据时，会发生缓存穿透
   - 接口增加校验
   - 缓存取不到的数据，设置缓存的为key-null，这是可以设置失效时间短一点
   - 采用布隆过滤器，将所有存在数据的hash缓存到一个bitmap中，必定不存在的数据会被这个bitmap拦截
 - 缓存击穿：查询缓存中没有，但是数据库有的数据，多个用户并发访问同一个数据，这是这个数据的缓存刚好失效
   - 热点数据缓存永不失效
   - 加互斥锁，及一个请求在访问时，缓存不存在则查询数据库，查询完成后保存至缓存，其它请求先等待锁释放，这是缓存中存在即可直接查询缓存
 - 缓存预热：项目上线后，将相关的缓存数据加载到缓存系统中，避免用户请求的过程中去查询数据库
    - 手写脚本，项目启动后运行即可
    - 数据量小的数据可以启动视时自动加载
    - 定时刷新缓存
 - 缓存降级：当访问量急剧增加时，为防止因缓存宕机导致数据库出现问题可以对缓存进行降级处理
    - 当redis出现问题时，不去查询数据库，而是返回固定的数据

### 6.如何保证缓存和数据库双写时的一致性，四种方案各有利弊
  - 先更新数据库，然后更新缓存
    - 如果大量数据对数据库进行写的操作，但是读的操作很少，这时会导致性能的消耗很大，入对于0，我们执行10次加1的操作，但是这个期间没有读的操作进来，就会有10次对缓存的跟新操作，产生了大量的冷数据
  - 先更新缓存，然后更新数据库
    - 跟第一种情况一样
  - 先删除缓存，然后更新数据库
   - 这种情况下会出现，如果在跟新数据库的过程中里一个请求过来进行查询操作，就会导致数据库和缓存不一致的情况，这个可以采用延时双删的方法，但是这种情况下如果mysql是读写分离模式，数据同步存在时间差，这时也会存在数据不一致的情况，可以设置redis的填充操作强制从主数据库获取值
  ```flow
  op1=>operation: redis更新缓存
  op2=>operation: 更新数据库成功，事务已提交
  op3=>operation: redis删除缓存
  op1->op2->op3
  ```
  - 先更新数据库，后删除缓存
    - 问题时，如果删除数据成功后，在进行删除缓存的操作时发生异常，则会出现数据不一致的问题，可以使用redis对mysql的binlog订阅方式保证数据库和缓存一致

### 7.redis常见的性能问题和解决方案
  - master最好不要进行持久化操作，如果数据比较关键，则在某个salve上开启AOF备份数据，时间周期设置为每秒一次
  - 为了主从网路的稳定性，主机和从机最好在同一个局域网内部署
  - 尽量避免在压力大的主机上增加从机
  - master调用BGrewirteAOF重写AOF文件时，会占用大量内存和cpu资源，导致load过高，出现短暂服务暂停现象
  - 为了master的稳定性，主从复制不要采用网状，而是使用单向链式结构

### 8.假如 Redis 里面有 1 亿个 key，其中有 10w 个 key 是以某个固定 的已知的前缀开头的，如果将它们全部找出来？
  - 使用keys指令
  - 如果这个redis正在给现上的业务提供服务，因为redis时单线程的，keys会导致线程阻塞一段时间，这时可以使用scan指令，不过需要客户端去重。

### 9.redis的内存是如何回收+

  - 一个客户端提交了一条指令，添加了新的数据，这时redis会检查内存，判断是否超过了maxmemory的限制，然后根据设定好的策略进行回收，redis会反复的到达内存边界，通过不断地回收降到内存边界以下
  - 如果一个命令导致内存被大量占用，内存占用量会很快的超过内存限制

### 10.redis的持久化方式
  - RDB，redis将内存数据用快照的数据保存下来
    - 只有一个文件移植性好，容灾性好，性能最大化，启动效率更高
    - rbd时间隔一段时间进行持久化，数据安全性低
  - AOF，redis将所有执行的写命令保存到一个单独的日志文件中，每次redis会读取文件的命令进行恢复
    - 数据安全性高，redis宕机也可以通过redis-check-aof解决数据一致性问题，在rewirte前可以删除某些命令
    - 数据文件大，恢复速度慢，数据集很大时，启动效率低

### 11.redis的过期策略
  - 定时过期
  - 惰性过期
  - 定期过期

### 12.redis的应用场景
 - 热点数据缓存，限时业务的应用，计数器相关问题，排行榜问题，分布式锁，点赞、好友等相关存储

### 13.redis数据存储的数据类型
 - 数据结构是key-value类型
 - value的类型包括:String,list,set,zset,hash五种

### 14.redis实现分布式锁
 - 加锁使用setnx命令
 - 释放锁使用delete命令删除锁