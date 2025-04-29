# SpringBoot项目搭建

## 创建项目

### 1. 通过 Spring Initializr 创建

访问地址：<https://start.spring.io/>

[Snipaste_2025-04-29_10-02-54](https://lsky-pro.smartideahub.site:2083/qls/Snipaste_2025-04-29_10-02-54.png)

然后点击页面底部的 "Generate" 按钮，下载一个压缩包（如 demo.zip）。

最后，解压压缩包，得到一个项目文件夹（如 demo），导入ID。

### 2. 通过命令行（curl）

```bash
curl https://start.spring.io/starter.zip -o demo.zip -d type=maven-project -d language=java -d bootVersion=3.2.0 -d groupId=com.example -d artifactId=demo -d dependencies=web,lombok
```

### 3. 通过 IDE 集成

- IntelliJ IDEA：新建项目时选择 Spring Initializr，后续步骤与网页版一致。
- VS Code：安装 Spring Boot Extension Pack 插件后，通过命令面板创建。

### 常见问题

1. 依赖下载慢：检查 Maven/Gradle 配置是否使用了国内镜像（如阿里云）。
2. 端口冲突：在 application.properties 中修改 server.port=8081。
3. Java 版本不匹配：确保 IDE 和项目的 JDK 版本一致。
4. 缺少依赖：在 pom.xml 中添加依赖，或者使用 Spring Initializr 创建项目时选择依赖。

## 模块拆分

在实际开发中，为了提高代码的可维护性和可扩展性，可以将项目拆分为多个模块。以下是推荐的模块拆分方式：

1. **启动模块（bootstrap）**  
   包含项目的启动类（如 SpringBootApplication 注解的主类），用于启动整个项目。

2. **门户模块（portal）**  
   处理用户端的业务逻辑和接口，通常用于对外提供服务。

3. **管理模块（admin）**  
   处理后台管理相关的业务逻辑和接口，通常用于内部管理系统。

4. **基础模块（common）**  
   包含项目的通用工具类、常量、枚举等，供其他模块复用。

5. **配置模块（config）**  
   管理项目的配置文件和配置类。

### 示例结构

```
project-root/
├── bootstrap/      # 启动模块
├── portal/         # 门户模块
├── admin/          # 管理模块
├── common/         # 基础模块
├── config/         # 配置模块
└── pom.xml         # 父模块的 POM 文件
```

### 注意事项

- 每个模块应独立开发和测试，尽量减少模块之间的耦合。
- 使用 Maven 或 Gradle 的多模块项目结构管理依赖关系。
- 根据实际需求调整模块划分，避免过度拆分导致复杂度增加。
