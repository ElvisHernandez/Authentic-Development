#!/bin/bash

apt-get update;
apt-get install -y nginx certbot python3-certbot-nginx;
systemctl start nginx
systemctl enable nginx
# certbot --nginx -d ${website_domain} --non-interactive --agree-tos -m ${admin_email} --redirect

adduser --disabled-password --gecos "" elvis;
echo "elvis:${user_password}" | chpasswd;

usermod -aG sudo elvis;

cd /home/elvis;

mkdir -p /home/elvis/.ssh;
chmod 700 /home/elvis/.ssh;

cp /root/.ssh/authorized_keys /home/elvis/.ssh/;
chown -R elvis:elvis /home/elvis/.ssh;
chmod 600 /home/elvis/.ssh/authorized_keys;

# aws s3 cp s3://adb-ec2-config-files/db.sqlite /home/ubuntu/app/db/db.sqlite;


su - elvis <<EOF
    echo ${user_password} | sudo -S apt-get update;
    echo ${user_password} | sudo -S apt-get install -y awscli;
    curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash;
    
    [ -s "/home/elvis/.nvm/nvm.sh" ] && \. "/home/elvis/.nvm/nvm.sh"  # This loads nvm
    [ -s "/home/elvis/.nvm/bash_completion" ] && \. "/home/elvis/.nvm/bash_completion"  # This loads nvm bash_completion

    nvm install 18;
    nvm use 18;
    mkdir /home/elvis/.aws;
    touch /home/elvis/.aws/credentials;
    
    echo "[default]
        aws_access_key_id = ${aws_access_key_id}
        aws_secret_access_key = ${aws_secret_access_key}
    " > /home/elvis/.aws/credentials

    
    mkdir /home/elvis/app;
    npm i -g blitz pm2;
    cd /home/elvis/app;
    pm2 start "npm run start" --name "blitz";
    pm2 save;

    (crontab -l 2>/dev/null; echo "0 * * * * aws s3 cp /home/elvis/app/db/db.sqlite s3://${s3_config_bucket}/db.sqlite-\$(date +\%F-\%T) >> /home/elvis/cron.log 2>&1") | crontab -

    EOT
EOF

sed -i "s/WEBSITE_DOMAIN/${website_domain}/g" /tmp/nginx.conf;
# mv /tmp/nginx.conf /etc/nginx/sites-available/default;
# systemctl restart nginx;