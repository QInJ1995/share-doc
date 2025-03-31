pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS 23'  // 使用你在全局工具配置中定义的名称
    }
    
    environment {
        RECIPIENTS = '953373752@qq.com'
        JOB_NAME
    }
    
    stages {
        stage('Checkout Code') {
            steps {
                script {
                    if (fileExists("${env.WORKSPACE}/.git")) {
                        echo "Existing repository found, pulling changes..."
                        sh """
                            rm -rf ${env.WORKSPACE}/*  # 删除工作空间下的所有文件和目录
                            mkdir -p ${env.WORKSPACE}  # 重新创建工作空间目录
                        """
                        git credentialsId: 'gitee-up', url: 'https://gitee.com/QInJ1995/share-doc.git', branch: 'main'
                    } else {
                        echo "No repository found, cloning..."
                        git credentialsId: 'gitee-up', url: 'https://gitee.com/QInJ1995/share-doc.git', branch: 'main'
                    }
                }
            }
        }

        stage('Build Docs') {
            steps {
                script {
                    // 安装依赖并构建文档
                    sh '''
                        node --version
                        npm --version
                        pnpm --version
                        pnpm install
                        npm run docs:build
                    '''
                }
            }
        }

        stage('Deploy with Docker') {
            steps {
                script {
                    sh 'docker -v'
                    
                    sh 'docker-compose down'
                    
                    sh 'docker-compose up -d'
                }
            }
        }
    }

    post {

        failure {
            // 失败通知（可选）
            echo "Pipeline failed!"
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
            echo "Pipeline succeeded!"
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