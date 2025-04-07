# SpringBoot简介

## 入门案例

### 问题导入

SpringMVC的HelloWord程序大家还记得吗？

- SpringBoot是由Pivotal团队提供的全新框架，其设计目的是用来简化Spring应用的初始搭建以及开发过程

- 原生开发SpringMVC程序过程

![image-20210811205020792](/image/java/Spring全家桶/SpringBoot/image-20210811205020792.png)

### 入门案例开发步骤

①：创建新模块，选择Spring初始化，并配置模块相关基础信息

![image-20210811183922621](/image/java/Spring全家桶/SpringBoot/image-20210811183922621.png)

 ②：选择当前模块需要使用的技术集

![image-20210811183956586](/image/java/Spring全家桶/SpringBoot/image-20210811183956586.png)

 ③：开发控制器类

```java
@RestController
@RequestMapping("/books")
public class BookController {
    @GetMapping("/{id}")
    public String getById(@PathVariable Integer id) {
        System.out.println("id ==> " + id);
        return "hello , spring boot! ";
    }
}
```

④：运行自动生成的Application类

![image-20210811184126747](/image/java/Spring全家桶/SpringBoot/image-20210811184126747.png)

- 最简SpringBoot程序所包含的基础文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.5.0</version>
    </parent>
    <groupId>com.itheima</groupId>
    <artifactId>springboot-01-quickstart</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>
</project>

```

```java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

- Spring程序与SpringBoot程序对比

![image-20210811184326884](/image/java/Spring全家桶/SpringBoot/image-20210811184326884.png)

**注意事项：**

**基于idea开发SpringBoot程序需要确保联网且能够加载到程序框架结构**

### 基于SpringBoot官网创建项目

![image-20210811184424903](/image/java/Spring全家桶/SpringBoot/image-20210811184424903.png)

### SpringBoot项目快速启动

① 对SpringBoot项目打包（执行Maven构建指令package）

② 执行启动指令

```cmd
java -jar springboot_01_quickstart.jar # 项目的名称根据实际情况修改
```

**注意事项：**

**jar支持命令行启动需要依赖maven插件支持，请确认打包时是否具有SpringBoot对应的maven插件。**

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```

## SpringBoot概述

### 问题导入

学习了SpringBoot入门案例之后，感觉对比SpringMVC哪一个更加方便简洁？

- SpringBoot是由Pivotal团队提供的全新框架，其设计目的是用来**简化**Spring应用的**初始搭建**以及**开发过程**
- Spring程序缺点
  - 配置繁琐
  - 依赖设置繁琐
- SpringBoot程序优点
  - 自动配置
  - 起步依赖（简化依赖配置）
  - 辅助功能（内置服务器，……）

### 起步依赖

- starter
  - SpringBoot中常见项目名称，定义了当前项目使用的所有项目坐标，以达到减少依赖配置的目的

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
          <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.5.0</version>
    </parent>
    <groupId>com.itheima</groupId>
    <artifactId>springboot-01-quickstart</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>
</project>
```

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <modelVersion>4.0.0</modelVersion>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-dependencies</artifactId>
    <version>2.5.0</version>
    <packaging>pom</packaging>
    <properties>
        <servlet-api.version>4.0.1</servlet-api.version>        
        ...
    </properties>
</project>

```

- parent
  - 所有SpringBoot项目要继承的项目，定义了若干个坐标版本号（依赖管理，而非依赖），以达到减少依赖冲突的目的
  - spring-boot-starter-parent（2.5.0）与 spring-boot-starter-parent（2.4.6）共计57处坐标版本不同

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-dependencies</artifactId>
        <version>2.5.0</version>
    </parent>
    <artifactId>spring-boot-starter-parent</artifactId>
    <packaging>pom</packaging>    
    ...
</project>
```

- 实际开发
  - 使用任意坐标时，仅书写GAV中的G和A，V由SpringBoot提供
  - 如发生坐标错误，再指定version（要小心版本冲突）

```xml
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>${junit.version}</version>
</dependency>
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>${servlet-api.version}</version>
</dependency>
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.5.0</version>
    </parent>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>

```

### 辅助功能

- SpringBoot程序启动

```java
@SpringBootApplication
public class Springboot01QuickstartApplication {
    public static void main(String[] args) {
        SpringApplication.run(Springboot01QuickstartApplication.class, args);
    }
}
```

- SpringBoot在创建项目时，采用jar的打包方式
- SpringBoot的引导类是项目的入口，运行main方法就可以启动项目
- 使用maven依赖管理变更起步依赖项
- Jetty比Tomcat更轻量级，可扩展性更强（相较于Tomcat），谷歌应用引擎（GAE）已经全面切换为Jetty

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <!--web起步依赖环境中，排除Tomcat起步依赖-->
        <exclusions>
            <exclusion>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-tomcat</artifactId>
            </exclusion>
        </exclusions>
    </dependency>
    <!--添加Jetty起步依赖，版本由SpringBoot的starter控制-->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-jetty</artifactId>
    </dependency>
</dependencies>

```
