# Bean的基础配置

## 问题导入

问题1：在\<bean>标签上如何配置别名？

问题2：Bean的默认作用范围是什么？如何修改？

## Bean基础配置【重点】

### 配置说明

![image-20210729183500978](/image/java/Spring全家桶/Spring/image-20210729183500978.png)

### 代码演示

> 见《IOC入门案例》applicationContext.xml配置

### 运行结果

> 见《IOC入门案例》运行结果

## Bean别名配置

### 配置说明

![image-20210729183558051](/image/java/Spring全家桶/Spring/image-20210729183558051.png)

### 代码演示

![image-20210729191924626](/image/java/Spring全家桶/Spring/image-20210729191924626.png)

### 打印结果

![image-20210729191954870](/image/java/Spring全家桶/Spring/image-20210729191954870.png)

## Bean作用范围配置【重点】

### 配置说明

![image-20210729183628138](/image/java/Spring全家桶/Spring/image-20210729183628138.png)

> 扩展：scope的取值不仅仅只有singleton和prototype，还有request、session、application、 websocket ，表示创建出的对象放置在web容器(tomcat)对应的位置。比如：request表示保存到request域中。

### 代码演示

![image-20210729192420048](/image/java/Spring全家桶/Spring/image-20210729192420048.png)

### 打印结果

![image-20210729192730871](/image/java/Spring全家桶/Spring/image-20210729192730871.png)

> 最后给大家说明一下：在我们的实际开发当中，绝大部分的Bean是单例的，也就是说绝大部分Bean不需要配置scope属性。
