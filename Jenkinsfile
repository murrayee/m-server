pipeline {
  agent {
    docker {
      image 'node:latest'
      args '-p 9090:9090'
    }

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
  environment {
    CI = 'true'
  }
}