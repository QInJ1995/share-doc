# SpringMVC简介

看到SpringMVC这个名字我们会发现其中包含Spring,那么SpringMVC和Spring之间的会有关系么?答案是肯定有，SpringMVC隶属于Spring，是Spring技术中的一部分。那么SpringMVC到底是用来做什么的呢?

* 回想web阶段，我们学习过Servlet,而SpringMVC与Servlet技术功能等同，均属于web层或者说表现层开发技术。

那么既然已经有了Servlet为什么还需要花时间再学习一个SpringMVC技术?要回答这个问题，我们就需要搞清楚SpringMVC与Servlet相比，有什么优势:

框架我们都知道是用来简化开发的，所以SpringMVC与Servlet相比，开发起来更简单快捷，用更少的代码完成表现层代码的开发，那么问题又来了，到底有多简单呢?我们通过一个例子来体验一把吧。

将资料中的项目导入到IDEA中，打开后格式如下:

![1651590778564](https://lsky-pro.smartideahub.site:2083/qls/1651590778564.png)

* UserSaveServlet:使用Servlet开发的用户新增模块

```java
@WebServlet("/user/save")
public class UserSaveServlet extends HttpServlet{

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //1.接收请求参数
        String name = req.getParameter("name");
        System.out.println("servlet save name ==> " + name);
        //2.生产响应
        resp.setContentType("text/json;charset=utf-8");
        PrintWriter pw = resp.getWriter();
        pw.write("{'module':'servlet save'}");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doGet(req,resp);
    }
}
```

* UserUpdateServlet:使用Servlet开发的用户修改模块

```java
@WebServlet("/user/update")
public class UserUpdateServlet extends HttpServlet{
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //1.接收请求参数
        String name = req.getParameter("name");
        System.out.println("servlet update name ==> " + name);
        //2.生产响应
        resp.setContentType("text/json;charset=utf-8");
        PrintWriter pw = resp.getWriter();
        pw.write("{'module':'servlet update'}");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doGet(req,resp);
    }
}
```

* UserDeleteServlet:使用Servlet开发的用户删除模块

```java
@WebServlet("/user/delete")
public class UserDeleteServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //1.接收请求参数
        String name = req.getParameter("name");
        System.out.println("servlet delete name ==> " + name);
        //2.生产响应
        resp.setContentType("text/json;charset=utf-8");
        PrintWriter pw = resp.getWriter();
        pw.write("{'module':'servlet delete'}");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doGet(req,resp);
    }
}
```

* UserDeleteServlet:使用Servlet开发的用户查询模块

```java
@WebServlet("/user/select")
public class UserSelectServlet extends HttpServlet{

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //1.接收请求参数
        String name = req.getParameter("name");
        System.out.println("servlet select name ==> " + name);
        //2.生产响应
        resp.setContentType("text/json;charset=utf-8");
        PrintWriter pw = resp.getWriter();
        pw.write("{'module':'servlet select'}");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doGet(req,resp);
    }
}
```

启动项目，测试结果如下:

![1651591732224](https://lsky-pro.smartideahub.site:2083/qls/1651591732224.png)

上面就是通过Servlet的方式来实现的用户模块的增删改查功能。那么如果使用SpringMVC来开发相同的功能，做出来是什么样子的呢?

打开项目springmvc包下的`UserController`类，内容如下:

```java
@Controller
public class UserController {

    @RequestMapping("/save")
    @ResponseBody
    public String save(String name){
        System.out.println("springmvc save name ==> " + name);
        return "{'module':'springmvc save'}";
    }

    @RequestMapping("/delete")
    @ResponseBody
    public String delete(String name){
        System.out.println("springmvc delete name ==> " + name);
        return "{'module':'springmvc delete'}";
    }

    @RequestMapping("/update")
    @ResponseBody
    public String update(String name){
        System.out.println("springmvc update name ==> " + name);
        return "{'module':'springmvc update'}";
    }

    @RequestMapping("/select")
    @ResponseBody
    public String select(String name){
        System.out.println("springmvc select name ==> " + name);
        return "{'module':'springmvc select'}";
    }
}
```

启动项目，测试结果如下:

![1651592524644](https://lsky-pro.smartideahub.site:2083/qls/1651592524644.png)

通过两种技术对相同功能的实现，我们会发现打印输出的结果是一样的，但是对比编写的代码会发现SpringMVC这种开发方式==更简单、更高效==。

所以接下来我们就需要来学习下SpringMVC这门技术，主要学习那些内容呢?

学习之前大家需要记住一件事是，SpringMVC是用来替换Servlet的，所以Servlet能实现的，SpringMVC就能实现，主要学习的内容包含如下模块:

* SpringMVC简介
* ==请求与响应==
* ==REST风格==
* ==SSM整合(注解版)==
* 拦截器

SpringMVC简介：主要是来认识下到底什么是SpringMVC。

请求与相应：SpringMVC是替换Servlet处于Web的框架，所以其主要的作用就是用来接收前端发过来的请求和数据然后经过处理并将处理的结果响应给前端，所以如何处理请求和响应是SpringMVC中非常重要的一块内容。

REST风格：是一种软件架构风格，可以降低开发的复杂性，提高系统的可伸缩性，在以后开发中非常重要和常用。

SSM整合：是把咱们所学习的SpringMVC+Spring+Mybatis整合在一起来完成业务开发，是对我们所学习这三个框架的一个综合应用。

拦截器：是SpringMVC中的一个小知识点。

对于SpringMVC的学习，最终要达成的目标:

1. ==掌握基于SpringMVC获取请求参数和响应json数据操作==
2. ==熟练应用基于REST风格的请求路径设置与参数传递==
3. 能够根据实际业务建立前后端开发通信协议并进行实现
4. ==基于SSM整合技术开发任意业务模块功能==

下面我们就进入SpringMVC这一章内容的学习，在这一章中，我们主要学习如下内容:

* SpringMVC概述
* 入门案例
* 入门案例工作流程分析
* Controller加载控制
* PostMan

本章的核心内容为:`入门案例`和`入门案例工作流程分析`。

## SpringMVC概述

我们要学习的SpringMVC究竟是一门什么技术呢?

![1651595619453](https://lsky-pro.smartideahub.site:2083/qls/1651595619453.png)

当前WEB程序的工作流程:

三层架构

* web程序通过浏览器访问前端页面，发送异步请求到后端服务器

* 后台服务器采用三层架构进行功能开发
  * 表现层负责接收请求和数据然后将数据转交给业务层
  * 业务层负责调用数据层完成数据库表的增删改查，并将结果返给表现层
  * 表现层将数据转换成json格式返回给前端

* 前端页面将数据进行解析最终展示给用户。

表现层与数据层的技术选型:

* 数据层采用Mybatis框架
* 变现层采用SpringMVC框架，SpringMVC==主要==负责的内容有:
  * controller如何接收请求和数据
  * 如何将请求和数据转发给业务层
  * 如何将响应数据转换成json发回到前端

介绍了这么多，最后我们来对SpringMVC一个概述:

* SpringMVC是一种基于Java实现MVC模型的轻量级Web框架

* 优点

  * 使用简单、开发便捷(相比于Servlet)
  * 灵活性强

  这里所说的优点，就需要我们再使用的过程中慢慢体会。
