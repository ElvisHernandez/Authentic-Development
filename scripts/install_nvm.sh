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
npm install --global yarn;
echo 'Changing directory' && cd /home/ubuntu/app;
echo 'Running yarn install' && yarn;

echo -e "\nNODE_ENV=production" >> .env.local;
yarn build;
echo "Starting yarn start in the background...";
/home/ubuntu/.nvm/versions/node/v18.16.1/bin/npm install -g pm2;
pm2 start npm --name "blitz" -- run start;
echo "Ran npm run start in the background...";

pm2 save;