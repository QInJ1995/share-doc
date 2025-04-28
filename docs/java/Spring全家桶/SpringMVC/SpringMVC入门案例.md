# SpringMVC入门案例

因为SpringMVC是一个Web框架，将来是要替换之前我们所使用的Servlet,所以我们先来回顾下以前Servlet是如何进行开发的?

![1651596381129](https://lsky-pro.smartideahub.site:2083/qls/1651596381129.png)

1.浏览器发送请求到Tomcat服务器

2.Tomcat服务器接收到请求后，会根据请求路径来匹配对应的Servlet,并将请求交给对应的Servlet来处理

所以对于Servlet来说，我们主要完成的是Servlet类的开发以及对应路径的配置。

那么对于SpringMVC程序的流程会是什么样的呢?

![1651596361174](https://lsky-pro.smartideahub.site:2083/qls/1651596361174.png)

1.浏览器发送请求到Tomcat服务器

2.Tomcat服务器接收到请求后，会将请求交给SpringMVC中的==DispatcherServlet[前端控制器]==来处理请求

3.DispatcherServlet不真正处理请求，只是按照对应的规则将请求分发到对应的Bean对象

4.Bean对象是有我们自己编写来处理不同的请求，每个Bean中可以处理一个或多个不同的请求url

5.DispatcherServlet和Bean对象都需要交给Spring容器来进行管理

综上所述，需要我们编写的内容包含:

* Bean对象的编写
* 请求url和Bean对象对应关系的配置
* 构建Spring容器，将DispatcherServlet和Bean对象交给容器管理
* 配置Tomcat服务器，使其能够识别Spring容器，并将请求交给容器中的DispatcherServlet来分发请求

具体的实现步骤如下:

1.创建web工程(Maven结构)并在工程的pom.xml添加SpringMVC和Servlet坐标

2.创建SpringMVC控制器类(等同于Servlet功能)

3.初始化SpringMVC环境(同Spring环境)，设定SpringMVC加载对应的bean

4.初始化Servlet容器，加载SpringMVC环境，并设置SpringMVC技术处理的请求

## 需求分析

## 案例制作

### 步骤1:创建Maven项目，并导入对应的jar包

打开IDEA,创建一个新的web项目

![1630428920116](https://lsky-pro.smartideahub.site:2083/qls/1630428920116.png)

因为使用骨架创建的项目结构不完整，需要手动补全

![1630429288339](https://lsky-pro.smartideahub.site:2083/qls/1630429288339.png)

将pom.xml中多余的内容删除掉，再添加SpringMVC需要的依赖

```java
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.itheima</groupId>
  <artifactId>springmvc_01_quickstart</artifactId>
  <version>1.0-SNAPSHOT</version>
  <packaging>war</packaging>
  <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
   </properties>
   <!--1. 导入SpringMVC与servlet的坐标--> 
  <dependencies>
    <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>javax.servlet-api</artifactId>
      <version>3.1.0</version>
      <scope>provided</scope>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-webmvc</artifactId>
      <version>5.2.10.RELEASE</version>
    </dependency>
  </dependencies>

  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.tomcat.maven</groupId>
        <artifactId>tomcat7-maven-plugin</artifactId>
        <version>2.1</version>
        <configuration>
          <port>80</port>
          <path>/</path>
        </configuration>
      </plugin>
    </plugins>
  </build>
</project>

```

**说明:**servlet的坐标为什么需要添加`<scope>provided</scope>`?

* scope是maven中jar包依赖作用范围的描述，
* 如果不设置默认是`compile`在在编译、运行、测试时均有效
* 如果运行有效的话就会和tomcat中的servlet-api包发生冲突，导致启动报错

* provided代表的是该包只在编译和测试的时候用，运行的时候无效直接使用tomcat中的，就避免冲突

### 步骤2:创建控制器类

```java
//2.制作控制器类，等同于Servlet
//2.1必须是一个spring管理的bean
//2.2定义具体处理请求的方法
//2.3设置当前方法的访问路径
//2.4设置响应结果为json数据
@Controller
public class UserController {
    
    @RequestMapping("/save")
    @ResponseBody
    public String save(){
        System.out.println("user save ...");
        return "{'module':'springmvc'}";
    }
}

```

### 步骤3:创建配置类

```java
//3.定义配置类加载Controller对应的bean
@Configuration
@ComponentScan("com.itheima.controller")
public class SpringMvcConfig {
}
```

### 步骤4:创建Tomcat的Servlet容器配置类

```java
//4.定义servlet容器的配置类
public class ServletContainersInitConfig extends AbstractDispatcherServletInitializer {
    //加载springMVC配置
    protected WebApplicationContext createServletApplicationContext() {
        //初始化WebApplicationContext对象
        AnnotationConfigWebApplicationContext ctx = new AnnotationConfigWebApplicationContext();
        //加载指定配置类
        ctx.register(SpringMvcConfig.class);
        return ctx;
    }

    //设置Tomcat接收的请求哪些归SpringMVC处理
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }

    //设置spring相关配置
    protected WebApplicationContext createRootApplicationContext() {
        return null;
    }
}
```

### 步骤5:配置Tomcat环境

![1630430302683](https://lsky-pro.smartideahub.site:2083/qls/1630430302683.png)

### 步骤6:启动运行项目

![1630430345246](https://lsky-pro.smartideahub.site:2083/qls/1630430345246.png)

### 步骤7:浏览器访问

浏览器输入`http://localhost/save`进行访问，可以看得如下内容

![1651602301329](https://lsky-pro.smartideahub.site:2083/qls/1651602301329.png)

至此SpringMVC的入门案例就已经完成。

## 知识点1：@Controller

| 名称 | @Controller                   |
| ---- | ----------------------------- |
| 类型 | 类注解                        |
| 位置 | SpringMVC控制器类定义上方     |
| 作用 | 设定SpringMVC的核心控制器bean |

## 知识点2：@RequestMapping

| 名称     | @RequestMapping                 |
| -------- | ------------------------------- |
| 类型     | 类注解或方法注解                |
| 位置     | SpringMVC控制器类或方法定义上方 |
| 作用     | 设置当前控制器方法请求访问路径  |
| 相关属性 | value(默认)，请求访问路径       |

## 知识点3：@ResponseBody

| 名称 | @ResponseBody                                    |
| ---- | ------------------------------------------------ |
| 类型 | 类注解或方法注解                                 |
| 位置 | SpringMVC控制器类或方法定义上方                  |
| 作用 | 设置当前控制器方法响应内容为当前返回值，无需解析 |

## 入门案例总结

SpringMVC入门程序开发总结(1+N)

* 一次性工作
  * 创建工程，设置服务器，加载工程
  * 导入坐标
  * 创建web容器启动类，加载SpringMVC配置，并设置SpringMVC请求拦截路径
  * SpringMVC核心配置类（设置配置类，扫描controller包，加载Controller控制器bean）
* 多次工作
  * 定义处理请求的控制器类
  
  * 定义处理请求的控制器方法，并配置映射路径（@RequestMapping）与返回json数据（@ResponseBody）
  
  * 多次工作我们可以通过实现一个用户的删除功能来体验一把
  
    * controller类中编写删除方法
  
    ```java
    //2.制作控制器类，等同于Servlet
    //2.1必须是一个spring管理的bean
    //2.2定义具体处理请求的方法
    //2.3设置当前方法的访问路径
    //2.4设置响应结果为json数据
    @Controller
    public class UserController {
        
        @RequestMapping("/save")
        @ResponseBody
        public String save(){
            System.out.println("user save ...");
            return "{'module':'springmvc'}";
        }
        @RequestMapping("/delete")
        @ResponseBody
        public String delete(){
            System.out.println("user delete ...");
            return "{'module':'springmvc delete '}";
        }
    }
    
    ```
  
    * 重启服务器，访问`http://localhost/delete`,可以看得如下效果:
  
    ![1651602676209](https://lsky-pro.smartideahub.site:2083/qls/1651602676209.png)

最后针对本案例中出现的Tomcat的Servlet容器配置再来总结下:

* AbstractDispatcherServletInitializer类是SpringMVC提供的快速初始化Web3.0容器的抽象类
* AbstractDispatcherServletInitializer提供三个接口方法供用户实现
  * createRootApplicationContext()方法，如果创建Servlet容器时需要加载非SpringMVC对应的bean，使用当前方法进行，使用方式同createServletApplicationContext()
  * createServletApplicationContext()方法，创建Servlet容器时，加载SpringMVC对应的bean并放入WebApplicationContext对象范围中，而WebApplicationContext的作用范围为ServletContext范围，即整个web容器范围
  * ngetServletMappings()方法，设定SpringMVC对应的请求映射路径，设置为/表示拦截所有请求，任意请求都将转入到SpringMVC进行处理
  * createServletApplicationContext用来加载SpringMVC环境
  * createRootApplicationContext用来加载Spring环境

## 入门案例工作流程分析

为了更好的使用SpringMVC,我们将SpringMVC的使用过程总共分两个阶段来分析，分别是`启动服务器初始化过程`和`单次请求过程`

![1630432494752](https://lsky-pro.smartideahub.site:2083/qls/1630432494752.png)

### 启动服务器初始化过程

1. 服务器启动，执行ServletContainersInitConfig类，初始化web容器

2. 执行createServletApplicationContext方法，创建了WebApplicationContext对象

   * 该方法加载SpringMVC的配置类SpringMvcConfig来初始化SpringMVC的容器

3. 加载SpringMvcConfig配置类

   ![1630433335744](https://lsky-pro.smartideahub.site:2083/qls/1630433335744.png)

4. 执行@ComponentScan加载对应的bean

   * 扫描指定包下所有类上的注解，如Controller类上的@Controller注解

5. 加载UserController，每个@RequestMapping的名称对应一个具体的方法

   ![1630433398932](https://lsky-pro.smartideahub.site:2083/qls/1630433398932.png)

   * 此时就建立了 `/save` 和 save方法的对应关系

6. 执行getServletMappings方法，定义所有的请求都通过SpringMVC

   ![1630433510528](https://lsky-pro.smartideahub.site:2083/qls/1630433510528.png)

   * `/`代表所拦截请求的路径规则，只有被拦截后才能交给SpringMVC来处理请求

### 单次请求过程

1. 发送请求localhost/save
2. web容器发现所有请求都经过SpringMVC，将请求交给SpringMVC处理
   * 因为符合上面第六步设置的请求路径，所以该请求会交给SpringMVC来处理
3. 解析请求路径/save
4. 由/save匹配执行对应的方法save(）
   * 上面的第五步已经将请求路径和方法建立了对应关系，通过/save就能找到对应的save方法
5. 执行save()
6. 检测到有@ResponseBody直接将save()方法的返回值作为响应求体返回给请求方

## bean加载控制

### 问题分析

入门案例的内容已经做完了，在入门案例中我们创建过一个`SpringMvcConfig`的配置类，再回想前面咱们学习Spring的时候也创建过一个配置类`SpringConfig`。这两个配置类都需要加载资源，那么它们分别都需要加载哪些内容?

我们先来看下目前我们的项目目录结构:

![1630459727575](https://lsky-pro.smartideahub.site:2083/qls/1630459727575.png)

* config目录存入的是配置类,写过的配置类有:

  * ServletContainersInitConfig
  * SpringConfig
  * SpringMvcConfig
  * JdbcConfig
  * MybatisConfig
* controller目录存放的是SpringMVC的controller类
* service目录存放的是service接口和实现类
* dao目录存放的是dao/Mapper接口

controller、service和dao这些类都需要被容器管理成bean对象，那么到底是该让SpringMVC加载还是让Spring加载呢?

* SpringMVC加载其相关bean(表现层bean),也就是controller包下的类
* Spring控制的bean
  * 业务bean(Service)
  * 功能bean(DataSource,SqlSessionFactoryBean,MapperScannerConfigurer等)

分析清楚谁该管哪些bean以后，接下来要解决的问题是如何让Spring和SpringMVC分开加载各自的内容。

在SpringMVC的配置类`SpringMvcConfig`中使用注解`@ComponentScan`，我们只需要将其扫描范围设置到controller即可，如

![1630460319004](https://lsky-pro.smartideahub.site:2083/qls/1630460319004.png)

在Spring的配置类`SpringConfig`中使用注解`@ComponentScan`,当时扫描的范围中其实是已经包含了controller,如:

![1630460408159](https://lsky-pro.smartideahub.site:2083/qls/1630460408159.png)

从包结构来看的话，Spring已经多把SpringMVC的controller类也给扫描到，所以针对这个问题该如何解决，就是咱们接下来要学习的内容。

概况的描述下咱们现在的问题就是==因为功能不同，如何避免Spring错误加载到SpringMVC的bean?==

### 思路分析

针对上面的问题，解决方案也比较简单，就是:

* 加载Spring控制的bean的时候排除掉SpringMVC控制的备案

具体该如何排除，有两种方式来解决:

* 方式一:Spring加载的bean设定扫描范围为com.itheima,排除掉controller包中的bean
* 方式二:Spring加载的bean设定扫描范围为精准范围，例如service包、dao包等
* 方式三:不区分Spring与SpringMVC的环境，加载到同一个环境中[了解即可]

### 环境准备

* 创建一个Web的Maven项目

* pom.xml添加Spring依赖

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  
  <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
  
    <groupId>com.itheima</groupId>
    <artifactId>springmvc_02_bean_load</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>war</packaging>
  
    <dependencies>
      <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>javax.servlet-api</artifactId>
        <version>3.1.0</version>
        <scope>provided</scope>
      </dependency>
      <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-webmvc</artifactId>
        <version>5.2.10.RELEASE</version>
      </dependency>
      <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>druid</artifactId>
        <version>1.1.16</version>
      </dependency>
  
      <dependency>
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis</artifactId>
        <version>3.5.6</version>
      </dependency>
  
      <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>5.1.47</version>
      </dependency>
  
      <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-jdbc</artifactId>
        <version>5.2.10.RELEASE</version>
      </dependency>
  
      <dependency>
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis-spring</artifactId>
        <version>1.3.0</version>
      </dependency>
    </dependencies>
  
    <build>
      <plugins>
        <plugin>
          <groupId>org.apache.tomcat.maven</groupId>
          <artifactId>tomcat7-maven-plugin</artifactId>
          <version>2.1</version>
          <configuration>
            <port>80</port>
            <path>/</path>
          </configuration>
        </plugin>
      </plugins>
    </build>
  </project>
  
  ```

* 创建对应的配置类

  ```java
  public class ServletContainersInitConfig extends AbstractDispatcherServletInitializer {
      protected WebApplicationContext createServletApplicationContext() {
          AnnotationConfigWebApplicationContext ctx = new AnnotationConfigWebApplicationContext();
          ctx.register(SpringMvcConfig.class);
          return ctx;
      }
      protected String[] getServletMappings() {
          return new String[]{"/"};
      }
      protected WebApplicationContext createRootApplicationContext() {
        return null;
      }
  }
  
  @Configuration
  @ComponentScan("com.itheima.controller")
  public class SpringMvcConfig {
  }
  
  @Configuration
  @ComponentScan("com.itheima")
  public class SpringConfig {
  }
  
  ```

* 编写Controller，Service，Dao，Domain类

  ```java
  @Controller
  public class UserController {
  
      @RequestMapping("/save")
      @ResponseBody
      public String save(){
          System.out.println("user save ...");
          return "{'info':'springmvc'}";
      }
  }
  
  public interface UserService {
      public void save(User user);
  }
  
  @Service
  public class UserServiceImpl implements UserService {
      public void save(User user) {
          System.out.println("user service ...");
      }
  }
  
  public interface UserDao {
      @Insert("insert into tbl_user(name,age)values(#{name},#{age})")
      public void save(User user);
  }
  public class User {
      private Integer id;
      private String name;
      private Integer age;
      //setter..getter..toString略
  }
  ```

最终创建好的项目结构如下:

![1630461261820](https://lsky-pro.smartideahub.site:2083/qls/1630461261820.png)

### 设置bean加载控制

方式一:修改Spring配置类，设定扫描范围为精准范围。

```java
@Configuration
@ComponentScan({"com.itheima.service","comitheima.dao"})
public class SpringConfig {
}
```

**说明:**

上述只是通过例子说明可以精确指定让Spring扫描对应的包结构，真正在做开发的时候，因为Dao最终是交给`MapperScannerConfigurer`对象来进行扫描处理的，我们只需要将其扫描到service包即可。

方式二:修改Spring配置类，设定扫描范围为com.itheima,排除掉controller包中的bean

```java
@Configuration
@ComponentScan(value="com.itheima",
    excludeFilters=@ComponentScan.Filter(
     type = FilterType.ANNOTATION,
        classes = Controller.class
    )
)
public class SpringConfig {
}
```

* excludeFilters属性：设置扫描加载bean时，排除的过滤规则

* type属性：设置排除规则，当前使用按照bean定义时的注解类型进行排除

  * ANNOTATION：按照注解排除
  * ASSIGNABLE_TYPE:按照指定的类型过滤
  * ASPECTJ:按照Aspectj表达式排除，基本上不会用
  * REGEX:按照正则表达式排除
  * CUSTOM:按照自定义规则排除

  大家只需要知道第一种ANNOTATION即可

* classes属性：设置排除的具体注解类，当前设置排除@Controller定义的bean

如何测试controller类已经被排除掉了?

```java
public class App{
 public static void main (String[] args){
        AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext(SpringConfig.class);
        System.out.println(ctx.getBean(UserController.class));
    }
}
```

如果被排除了，该方法执行就会报bean未被定义的错误

![1630462200947](https://lsky-pro.smartideahub.site:2083/qls/1630462200947.png)

==注意:测试的时候，需要把SpringMvcConfig配置类上的@ComponentScan注解注释掉，否则不会报错==

出现问题的原因是，

* Spring配置类扫描的包是`com.itheima`
* SpringMVC的配置类，`SpringMvcConfig`上有一个@Configuration注解，也会被Spring扫描到
* SpringMvcConfig上又有一个@ComponentScan，把controller类又给扫描进来了
* 所以如果不把@ComponentScan注释掉，Spring配置类将Controller排除，但是因为扫描到SpringMVC的配置类，又将其加载回来，演示的效果就出不来
* 解决方案，也简单，把SpringMVC的配置类移出Spring配置类的扫描范围即可。

最后一个问题，有了Spring的配置类，要想在tomcat服务器启动将其加载，我们需要修改ServletContainersInitConfig

```java
public class ServletContainersInitConfig extends AbstractDispatcherServletInitializer {
    protected WebApplicationContext createServletApplicationContext() {
        AnnotationConfigWebApplicationContext ctx = new AnnotationConfigWebApplicationContext();
        ctx.register(SpringMvcConfig.class);
        return ctx;
    }
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }
    protected WebApplicationContext createRootApplicationContext() {
      AnnotationConfigWebApplicationContext ctx = new AnnotationConfigWebApplicationContext();
        ctx.register(SpringConfig.class);
        return ctx;
    }
}
```

对于上述的配置方式，Spring还提供了一种更简单的配置方式，可以不用再去创建`AnnotationConfigWebApplicationContext`对象，不用手动`register`对应的配置类，如何实现?

```java
public class ServletContainersInitConfig extends AbstractAnnotationConfigDispatcherServletInitializer {

    protected Class<?>[] getRootConfigClasses() {
        return new Class[]{SpringConfig.class};
    }

    protected Class<?>[] getServletConfigClasses() {
        return new Class[]{SpringMvcConfig.class};
    }

    protected String[] getServletMappings() {
        return new String[]{"/"};
    }
}
```

## 知识点1：@ComponentScan

| 名称     | @ComponentScan                                               |
| -------- | ------------------------------------------------------------ |
| 类型     | 类注解                                                       |
| 位置     | 类定义上方                                                   |
| 作用     | 设置spring配置类扫描路径，用于加载使用注解格式定义的bean     |
| 相关属性 | excludeFilters:排除扫描路径中加载的bean,需要指定类别(type)和具体项(classes)`<br/>`includeFilters:加载指定的bean，需要指定类别(type)和具体项(classes) |
