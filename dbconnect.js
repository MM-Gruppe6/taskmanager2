var pgp = require('pg-promise')();

pgp.pg.defaults.ssl = true;


//db connect string
var conn = process.env.DATABASE_URL || 'postgres://mrkzqengigyvmy:6061543bdd29cacf8345e7c961e76dbed61cd373e553899b5a108abf25493d08@ec2-54-247-123-130.eu-west-1.compute.amazonaws.com:5432/d9hrc499slemoh';

var db = pgp(conn);


//export module
module.exports = db;
