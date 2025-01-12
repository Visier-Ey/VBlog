#!/bin/bash

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
sed -i "s#${SEARCH_TEXT}#${DB_PASSWORD//\//\\/}#g" "${FILE_PATH}"
BASE_URL="https://visier.icu/backend"
sed -i "s#http://127.0.0.1:3000#${BASE_URL}#g" "${FILE_PATH}"
# deal with the db config
# -------------------------------------------------


# deal with the backend sever config
# -------------------------------------------------
FILE_PATH="frontend/custom.config.js"
SEARCH_TEXT="http://127.0.0.1:3000"
#read -p  "BACKEND_HOST: " BACKEND_HOST
BACKEND_HOST="https://visier.icu/backend"
sed -i "s#${SEARCH_TEXT}#${BACKEND_HOST}#g" "${FILE_PATH}"
#SEARCH_TEXT="host: localhost"
#read -p  "WEB_HOST: " WEB_HOST
#sed -i "s/${SEARCH_TEXT}/host: '${WEB_HOST}',/g" "${FILE_PATH}"
sed -i "s#open: true#open: false#g" "${FILE_PATH}"

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




sudo systemctl daemon-reload

# optional
# sudo systemctl start vblog
# sudo systemctl enable vblog
# -------------------------------------------------

