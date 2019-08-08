pipeline {
    agent any
    stages {
           stage('preparation') {
            steps {
                echo "workspace: ${WORKSPACE}"
                echo "build_tag: ${BUILD_TAG}"
            }
        }
            stage('Build') {
            steps {
                sh " npm install"
            }
        }
    }
}