pipeline {
    agent {
        docker {
            image 'node:latest' 
            args '-p 1234:3000' 
        }
    }
    environment {
        CI = 'true'
    }
    stages {
           stage('preparation') {
            steps {
                echo "workspace: ${WORKSPACE}"
                echo "build_tag: ${BUILD_TAG}"

            }
        }
            stage('Build') {
            steps {
                sh "npm install"
            }
        }
    }
}