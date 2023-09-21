#!/bin/bash

{
    # bootstrap project and clone repo from github
    su - ubuntu -c "mkdir /home/ubuntu/app"
    echo "${private_key}" > /home/ubuntu/deploy_key.pem;
    chown ubuntu:ubuntu /home/ubuntu/deploy_key.pem;
    chmod 600 /home/ubuntu/deploy_key.pem;
    chown -R ubuntu:ubuntu /home/ubuntu/.ssh;
    su - ubuntu -c "mkdir -p /home/ubuntu/.ssh"
    su - ubuntu -c "ssh-keyscan github.com >> /home/ubuntu/.ssh/known_hosts"
    su - ubuntu -c "GIT_SSH_COMMAND=\"ssh -i /home/ubuntu/deploy_key.pem\" git clone git@github.com:${github_username}/${github_repository}.git /home/ubuntu/app"

    # install aws-cli and download config files from s3
    apt-get update;
    apt-get install -y awscli;
    su - ubuntu -c "
        aws s3 cp s3://adb-ec2-config-files/.env /home/ubuntu/app/cms-backend;
        aws s3 cp s3://adb-ec2-config-files/data.db /home/ubuntu/app/cms-backend/.tmp/;
    "
} &> /home/ubuntu/user_data.log
