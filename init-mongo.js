// init-mongo.js
db = db.getSiblingDB("appeto_cms");

db.createUser({
    user: "cmsuser",
    pwd: "cmspass",
    roles: [{ role: "readWrite", db: "appeto_cms" }],
});
