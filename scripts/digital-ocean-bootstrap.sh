#!/bin/bash

curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash;
nvm install 18;

npm i -g blitz pm2

adduser elvis
usermod -aG sudo elvis

sudo apt update
sudo apt install nginx
sudo apt install certbot python3-certbot-nginx
# Make sure that firewall settings allow 
# http traffic on port 80
# and https traffic on port 443
sudo certbot --nginx -d authenticdevelopment.net

# has to be in app directory
pm2 start "npm run start" --name "blitz"
# sudo certbot certonly --standalone -d authenticdevelopment.net

apt-get update;
apt-get install -y awscli;