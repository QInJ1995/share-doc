pipeline {
    agent any // 指定 Jenkins 节点
    
    environment {
        PROJECT_NAME = 'share-doc' // 项目名称
    }
    
    stages {
        // 拉取代码
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/your-repo/vue-project.git'
            }
        }
        // 构建 Docker 镜像
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${PROJECT_NAME}:${env.BUILD_NUMBER}")
                }
            }
        }
        // 推送 Docker 镜像到 Docker 仓库
        stage('Deploy with Docker Compose') {
            steps {
                sh 'docker compose down'
                sh 'docker compose up -d --build'
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
    }
}