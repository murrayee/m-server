pipeline {
    agent {
        docker {
            image 'node:latest' 
            args '-p 9090:9090 --name node-web --link redis:redis --link mongo:mongo' 
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Install') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('Deploy') { 
            steps {
                sh 'npm run dev' 
            }
        }
    }
}