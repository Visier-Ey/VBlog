read -p "DB_USER: " DB_USER
read -p "DB_PASSWORD: " DB_PASSWORD

SQL_FILE="./init.sql"

mysql -u $DB_USER -p $DB_PASSWORD < $SQL_FILE
# deal with the database


# -------------------------------------------------
FILE_PATH="../backend/app.js"
SEARCH_TEXT="127.0.0.1"

read -p "DB_HOST: " DB_HOST

sed -i "s/${SEARCH_TEXT}/${DB_HOST}/g" "${FILE_PATH}"

# deal with the backend
# -------------------------------------------------

# -------------------------------------------------
FILE_PATH="../frontend/vue.config.js"
SEARCH_TEXT="localhost"
REPLACE_TEXT="0.0.0.0"
sed -i "s/${SEARCH_TEXT}/${REPLACE_TEXT}/g" "${FILE_PATH}"
SEARCH_TEXT="80"
REPLACE_TEXT="8080"
sed -i "s/${SEARCH_TEXT}/${REPLACE_TEXT}/g" "${FILE_PATH}"
# deal with the vite.config.js
FILE_PATH="../frontend/src/http/index.js"
SEARCH_TEXT="127.0.0.1"
read -p "API_HOST: " API_HOST
REPLACE_TEXT="42.121.125.52"
sed -i "s/${SEARCH_TEXT}/${API_HOST}/g" "${FILE_PATH}"
# deal with the frontend
# -------------------------------------------------