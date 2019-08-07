pipeline {
    agent {
        docker {
            image 'node:latest' 
            args '-p 9090:9090' 
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
                sh 'yarn start' 
            }
        }
    }
}