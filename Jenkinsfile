pipeline {
    parameters {
        booleanParam(name: 'RELEASE', defaultValue: false, description: 'Set to true to flag this build as a release.')
    }
    options {
        skipDefaultCheckout()
    }

    stages {
        stage('Preparation') {
            steps {
                checkout scm
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                script {
                    try {
                        sh 'npm test'
                    }
                    catch (e) {
                        if (params.RELEASE) {
                            currentBuild.result = 'FAILURE'
                        }
                    }
                }
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
                dir('dist') {
                    archiveArtifacts artifacts: '**', fingerprint: true
                }
            }
        }
    }
}