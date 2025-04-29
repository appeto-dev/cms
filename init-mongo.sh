#!/bin/bash
set -e

cat <<EOF > /docker-entrypoint-initdb.d/init-mongo.js
db = db.getSiblingDB("$MONGO_INITDB_DATABASE");

db.createUser({
    user: "$APPETO_DB_USERNAME",
    pwd: "$APPETO_DB_PASSWORD",
    roles: [{ role: "readWrite", db: "$MONGO_INITDB_DATABASE" }]
});
EOF
