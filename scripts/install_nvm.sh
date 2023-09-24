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
yarn cache clean;
echo -e "\nNODE_ENV=production" >> .env.local;
yarn build;
echo "Starting yarn start in the background...";
npm install --global pm2;
pm2 start yarn --name "blitz" -- start;
echo "Ran npm run start in the background...";

pm2 save;

(crontab -l 2>/dev/null; echo "0 * * * * aws s3 cp /home/ubuntu/app/db/db.sqlite s3://adb-ec2-config-files/db.sqlite-\$(date +\%F-\%T) >> /home/ubuntu/cron.log 2>&1") | crontab -