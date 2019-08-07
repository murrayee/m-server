pipeline {
    agent {
        docker {
            image 'node:latest' 
            args '-p 9090:9090 --name node-web --link redis-web:redis --link mongo-web:mongo' 
        }
        docker {
            image 'redis:latest' 
            args '-p 6379:6379 -d redis:3.2 redis-server --appendonly yes --name redis-web' 
        }
    
        docker {
            image 'mongo:latest' 
            args '-p 27017:27017 -v $PWD/db:/data/db --name mongo-web' 
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