pipeline {
    agent {
       dockerfile {
        filename 'Dockerfile'
        }
    }
    stages {

           stage('preparation') {
            steps {
                echo "workspace: ${WORKSPACE}"
                echo "build_tag: ${BUILD_TAG}"
                echo "node_name: ${NODE_NAME}"
                echo "version: ${version}"
            }
        }
    }
}