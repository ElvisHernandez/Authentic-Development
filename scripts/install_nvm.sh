#!/bin/bash

echo 'Running as user:' && whoami;
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash;
NVM_DIR="/home/ubuntu/.nvm";
echo 'NVM Directory:' && echo $NVM_DIR;
# echo 'Contents of NVM Directory:' && ls $NVM_DIR;
[ -s "$NVM_DIR/nvm.sh" ] && echo 'Sourcing nvm.sh' && \. "$NVM_DIR/nvm.sh";
[ -s "$NVM_DIR/bash_completion" ] && echo 'Sourcing bash_completion' && \. "$NVM_DIR/bash_completion";
echo 'Installing Node.js' && nvm install 18;
echo 'Node version:' && node -v;
echo 'Changing directory' && cd /home/ubuntu/app/cms-backend;
echo 'Running npm install' && npm i;

echo -e "\nNODE_ENV=production" >> .env;
npm run build;
echo "Starting npm run start in the background...";
/home/ubuntu/.nvm/versions/node/v18.16.1/bin/npm install -g pm2;
pm2 start npm --name "strapi" -- run start;
echo "Ran npm run start in the background...";

cd /home/ubuntu/app/website;
npm i;
npm run build;
pm2 start npm --name "website" -- run start;
pm2 save;