echo "System init start"

read -p  "DB_USER: " DB_USER

SQL_FILE="./vblog.sql"

mysql -u "${DB_USER}" -p < $SQL_FILE
# deal with the database


# -------------------------------------------------
FILE_PATH="backend/config/index.js"
SEARCH_TEXT="root"
read -p  "DB_USER: " DB_USER
sed -i "s/${SEARCH_TEXT}/${DB_USER}/g" "${FILE_PATH}"
SEARCH_TEXT="visier"
read -p  "DB_PASSWORD: " DB_PASSWORD
sed -i "s/${SEARCH_TEXT}/${DB_PASSWORD}/g" "${FILE_PATH}"
BASE_URL="http://visier.icu:3000"
sed -i "s/http:\/\/localhost:3000/${BASE_URL}/g" "${FILE_PATH}"
# deal with the db config
# -------------------------------------------------


# deal with the backend sever config
# -------------------------------------------------
FILE_PATH="frontend/custom.config.js"
SEARCH_TEXT="127.0.0.1"
#read -p  "BACKEND_HOST: " BACKEND_HOST
BACKEND_HOST="visier.icu"
sed -i "s/${SEARCH_TEXT}/${BACKEND_HOST}/g" "${FILE_PATH}"
#SEARCH_TEXT="host: localhost"
#read -p  "WEB_HOST: " WEB_HOST
#sed -i "s/${SEARCH_TEXT}/host: '${WEB_HOST}',/g" "${FILE_PATH}"
sef -i "s/open: true/open: false/g" "${FILE_PATH}"

# deal with the frontend web host
# -------------------------------------------------
npm install pm2@latest -g
npm install -g serve

cd backend || exit
npm i

cd ../frontend || exit
npm i
npm run build
cd ../

# deal with the dependency

# -------------------------------------------------
#wirted the start script
#START_SCRIPT="
#pm2 start backend/app.js
#cd frontend || exit
#serve -s dist -p 8080
#"
#echo "${START_SCRIPT}" | sudo sh -c 'cat > /usr/bin/vblogStart.sh'
#sudo chmod +x "/usr/bin/vblogStart.sh"
## -------------------------------------------------
## register the vblog service
#SERVICE_CONTENT="
#[Unit]
#Description=VBlog Service,customized service
#After=network.target
#
#[Service]
#Type=simple
#ExecStart=/usr/bin/vblogStart.sh
#WorkingDirectory=${PWD}
#Restart=on-failure
#
#[Install]
#WantedBy=multi-user.target
#"
#
#echo "${SERVICE_CONTENT}" | sudo sh -c 'cat > /etc/systemd/system/vblog.service'
#
#sudo systemctl daemon-reload

# optional
# sudo systemctl start vblog
# sudo systemctl enable vblog
# -------------------------------------------------

