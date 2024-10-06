echo "System init start"

read -p -r "DB_USER: " DB_USER

SQL_FILE="./vblog.sql"

mysql -u "${DB_USER}" -p < $SQL_FILE
# deal with the database


# -------------------------------------------------
FILE_PATH="backend/db/index.js"
SEARCH_TEXT="localhost"
read -p -r "DB_HOST: " DB_HOST
sed -i "s/${SEARCH_TEXT}/${DB_HOST}/g" "${FILE_PATH}"
sed -i "s/root/DB_USER/g" "${FILE_PATH}"
sed -i "s/visier/DB_USER/g" "${FILE_PATH}"


# deal with the backend
# -------------------------------------------------
FILE_PATH="backend/app.js"
SEARCH_TEXT="127.0.0.1"
read -p -r "BACKEND_LISTENING_HOST(Backend): " BACKEND_LISTENING_HOST
sed -i "s/${SEARCH_TEXT}/${BACKEND_LISTENING_HOST}/g" "${FILE_PATH}"
# -------------------------------------------------
# deal with the frontend http/index.js host
FILE_PATH="frontend/src/http/index.js"
SEARCH_TEXT="127.0.0.1"
read -p -r "API_HOST(Frontend): " API_HOST
sed -i "s/${SEARCH_TEXT}/${API_HOST}/g" "${FILE_PATH}"
# deal with the vite.config.js port
SEARCH_TEXT="port: 80,"
read -p -r "PORT(Frontend): " PORT
sed -i "s/${SEARCH_TEXT}/port: ${PORT},/g" "${FILE_PATH}"
sed -i "s/open: true/open: false/g" "${FILE_PATH}"
# deal with the vite.config.js open

SEARCH_TEXT="localhost"
read -p -r "WEB_LISTENING_HOST(Frontend): " WEB_LISTENING_HOST
FILE_PATH="frontend/vite.config.js"
sed -i "s/${SEARCH_TEXT}/${WEB_LISTENING_HOST}/g" "${FILE_PATH}"
# deal with the frontend web host
# -------------------------------------------------

cd backend || exit
npm i
npm install pm2@latest -g

cd ../frontend || exit
npm i
cd ../
# -------------------------------------------------
#wirted the start script
START_SCRIPT="
pm2 start backend/app.js
cd frontend || exit
npm run dev
"
echo "${START_SCRIPT}" | sudo sh -c 'cat > /usr/bin/vblogStart.sh'
sudo chmod +x "/usr/bin/vblogStart.sh"
# -------------------------------------------------
# register the vblog service
SERVICE_CONTENT="
[Unit]
Description=VBlog Service,customized service
After=network.target

[Service]
Type=simple
ExecStart=/usr/bin/vblogStart.sh
WorkingDirectory=${PWD}
Restart=on-failure

[Install]
WantedBy=multi-user.target
"

echo "${SERVICE_CONTENT}" | sudo sh -c 'cat > /etc/systemd/system/vblog.service'

sudo systemctl daemon-reload

# optional
# sudo systemctl start vblog
# sudo systemctl enable vblog
# -------------------------------------------------

