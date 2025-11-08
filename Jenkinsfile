pipeline {
    agent any

    stages {
        stage('gitcheckout') {
            steps {
                git branch: 'main', url: 'https://github.com/tirucloud/student-registration-form.git'
            }
        }
        stage('npminit') {
            steps {
                sh 'npm install '
            }
        }
       stage('clear containers') {
            steps {
                sh 'docker compose down '
            }
        } 
        stage('run the application') {
            steps {
                sh 'docker compose up -d --build'
            }
        }
        
    }
}
