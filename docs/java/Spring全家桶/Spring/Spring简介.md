# Spring简介

## Spring课程介绍

### 问题导入

我们为什么要学习Spring框架？

### 为什么要学

- Spring技术是JavaEE开发必备技能，企业开发技术选型命中率>==90%==

- 专业角度
  - ==**简化开发**==，降低企业级开发的复杂性
  - **==框架整合==**，高效整合其他技术，提高企业级应用开发与运行效率

![image-20210729171139088](https://lsky-pro.smartideahub.site:2083/qls/image-20210729171139088.png)

### 学什么

- 简化开发
  - ==IOC(反转控制)==
  - ==AOP(面向切面编程)==
    - ==事务处理==

- 框架整合
  - MyBatis
  - MyBatis-plus
  - Struts
  - Struts2
  - Hibernate
  - ……

### 怎么学

- 学习Spring框架设计思想
- 学习基础操作，思考操作与思想间的联系
- 学习案例，熟练应用操作的同时，体会思想

![image-20210729171346022](https://lsky-pro.smartideahub.site:2083/qls/image-20210729171346022.png)

## 初识Spring

### 问题导入

目前我们使用的是Spring几版本？

### Spring家族

- 官网：<https://spring.io>
- Spring发展到今天已经形成了一种开发的生态圈，Spring提供了若干个项目，每个项目用于完成特定的功能。

![image-20210729171850181](https://lsky-pro.smartideahub.site:2083/qls/image-20210729171850181.png)

### Spring发展史

![image-20210729171926576](https://lsky-pro.smartideahub.site:2083/qls/image-20210729171926576.png)

## Spring体系结构

### 问题导入

通过系统架构图，Spring能不能进行数据层开发？Spring能不能进行web层开发？

### Spring Framework系统架构图

- Spring Framework是Spring生态圈中最基础的项目，是其他项目的根基

![image-20210729172153796](https://lsky-pro.smartideahub.site:2083/qls/image-20210729172153796.png)

![image-20210729172352627](https://lsky-pro.smartideahub.site:2083/qls/image-20210729172352627.png)

### Spring Framework课程学习路线

![image-20210729172513669](https://lsky-pro.smartideahub.site:2083/qls/image-20210729172513669.png)

## Spring核心概念

### 问题导入

问题1：目前我们的代码存在什么问题以及怎么解决这些问题？

问题2：请描述什么是IOC，什么是DI？

### 目前我们代码存在的问题

![image-20210729173516149](https://lsky-pro.smartideahub.site:2083/qls/image-20210729173516149.png)

- 代码书写现状
  - 耦合度偏高
- 解决方案
  - 使用对象时，在程序中不要主动使用new产生对象，转换为由外部提供对象

### 核心概念

- ==IOC（Inversion of Control）控制反转==

  使用对象时，由主动new产生对象转换为由==外部==提供对象，此过程中对象创建控制权由程序转移到外部，此思想称为控制反转。通俗的讲就是“==将new对象的权利交给Spring，我们从Spring中获取对象使用即可==”

- Spring技术对IoC思想进行了实现

  - Spring提供了一个容器，称为==IOC容器==，用来充当IoC思想中的“外部”
  - IOC容器负责对象的创建、初始化等一系列工作，被创建或被管理的对象在IoC容器中统称为==Bean==

- ==DI（Dependency Injection）依赖注入==
  
  - 在容器中建立bean与bean之间的依赖关系的整个过程，称为依赖注入。

![image-20210729174148134](https://lsky-pro.smartideahub.site:2083/qls/image-20210729174148134.png)

- 目标：充分解耦
  - 使用IoC容器管理bean（IOC)
  - 在IoC容器内将有依赖关系的bean进行关系绑定（DI）
- 最终效果
  - 使用对象时不仅可以直接从IoC容器中获取，并且获取到的bean已经绑定了所有的依赖关系
