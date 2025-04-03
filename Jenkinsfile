pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS 23'  // 使用你在全局工具配置中定义的名称
    }
    
    environment {
        RECIPIENTS = '953373752@qq.com'
    }
    
    stages {
        stage('拉取远程代码') {
            steps {
                script {
                    // 拉取最新代码
                    echo "拉取代码..."
                    // 使用Git插件拉取代码
                    git credentialsId: 'gitee-up', url: 'https://gitee.com/QInJ1995/share-doc.git', branch: 'main'
                }
            }
        }
        stage('打包本地代码') {
            steps {
                script {
                    echo "检测打包环境..."
                    // 安装依赖并构建文档
                    sh '''
                        node --version
                        npm --version
                        pnpm --version
                    '''
                    echo "安装依赖..."
                    sh '''
                        pnpm install
                    '''
                    echo "依赖安装完成！"

                    echo "开始打包..."
                    sh '''
                        pnpm run docs:build
                    '''
                    echo "打包完成！"
                }
            }
        }

        stage('部署到Docker') {
            steps {
                script {
                    echo "监测Docker环境..."
                    sh '''
                        docker -v
                        docker-compose -v
                    '''
                    echo "移除旧的Docker容器..."
                    sh 'docker-compose down'
                    echo "Docker容器已移除！"

                    echo "构建新的Docker镜像..."
                    sh 'docker-compose build'
                    echo "Docker镜像已构建！"

                    echo "启动Docker容器..."
                    sh 'docker-compose up -d'
                    echo "Docker容器已启动！"
                }
            }
        }
    }

    post {
        always {
            // 刪除share-doc目錄下的所有文件和目錄
            script {
                echo "删除本地代码..."
                sh """
                    rm -rf ${env.WORKSPACE}/*
                    mkdir -p ${env.WORKSPACE}
                """
                echo "本地代码已删除！"
            }
            // 清理Docker容器和镜像（可选）
            script {
                echo "清除 Docker 容器和镜像..."
                sh 'docker system prune -f'
                echo "Docker 容器和镜像已清除！"
            }
            // 清理Jenkins工作区（可选）
            script {
                echo "清除 Jenkins 工作区..."
                cleanWs()
            }
        }
        failure {
            // 失败通知（可选）
            echo "构建失败！"
            emailext (
                subject: "FAILED: ${env.JOB_NAME} - Build #${env.BUILD_NUMBER}",
                body: """
                <p>构建失败！请检查！</p>
                <p>项目：${env.JOB_NAME}</p>
                <p>构建编号：${env.BUILD_NUMBER}</p>
                <p>详情：<a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                """,
                to: "${env.RECIPIENTS}"
            )
        }
        success {
            // 成功通知（可选）
            echo "构建成功！"
            emailext (
                subject: "SUCCESS: ${env.JOB_NAME} - Build #${env.BUILD_NUMBER}",
                body: """
                <p>构建成功！</p>
                <p>项目：${env.JOB_NAME}</p>
                <p>构建编号：${env.BUILD_NUMBER}</p>
                <p>详情：<a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                """,
                to: "${env.RECIPIENTS}",
                attachLog: true  // 可选：附加日志
            )
        }
    }
}    