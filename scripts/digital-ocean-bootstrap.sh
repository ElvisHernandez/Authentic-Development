#!/bin/bash

curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash;
nvm install 18;

npm i -g blitz

adduser elvis
usermod -aG sudo elvis

sudo apt update
sudo apt install nginx
sudo apt install certbot python3-certbot-nginx
# Make sure that firewall settings allow 
# http traffic on port 80
# and https traffic on port 443
sudo certbot --nginx -d authenticdevelopment.net

# sudo certbot certonly --standalone -d authenticdevelopment.net

