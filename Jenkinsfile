pipeline {
    agent {
        docker {
            image 'node:latest' 
            args '-p 9090:9090 --name node-web --link redis --link mongo' 
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') { 
            steps {
                sh 'docker stop m-server || true  &&  docker rm m-server || true && docker build --rm --no-cache=true  -t node  - < Dockerfile' 
            }
        }
        stage('deploy') { 
            steps {
                sh 'docker run -d --privileged=true --name  m-server -p 9090:9090 ' 
            }
        }
    }
}