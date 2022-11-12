const sql = require('./db/db');
const uniqid = require('uniqid');
const csv = require('csvtojson')

const register = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "content cannot be empty"
        });
    }

    const NewUserEntry = {
        "email": req.body.email,
        "password": req.body.pass,
        "first_name": req.body.firstname,
        "last_name": req.body.lastName,
        "id": uniqid()
    }
    const Q1 = "INSERT INTO users SET ?";
    sql.query(Q1, NewUserEntry, (err, mysqlres) => {
        if (err) {
            res.status(400).send({ message: "error on creating user " + err });
        }
        res.redirect(`/dashboard/${NewUserEntry.id}`);
    });
};

const login = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "content cannot be empty"
        });
        return;
    }
    const UserEmail = req.body.email;
    const UserPassword = req.body.password;


    const Q3 = "SELECT * FROM users WHERE (email=? AND password = ?)";
    sql.query(Q3, [UserEmail, UserPassword], (err, mysqlres) => {
        if (err) {
            res.status(400).send({ message: "error in getting all users " + err });
            return;
        }
        if (mysqlres.length == 0) {

            res.render('404');
            return;
        }

        res.redirect(`/dashboard/${mysqlres[0].id}`);
        return;
    });

};

const createOrder = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "content cannot be empty"
        });
    }
    const point = req.body.courtSelection.split(',');
    const lon = point[0].slice(0, point[0].length);
    const lat = point[1].slice(0, point[1].length);
    const searchQuery = `SELECT id FROM courts WHERE lon=${lon} AND lat=${lat}`;
 
    sql.query(searchQuery, (err, mysqlres) => {
        if (err) {
            res.status(400).send({ message: "error on finding courts: " + err });
        }

        const NewOrderEntry = {

            "id": uniqid(),
            "date": req.body.date,
            "time": req.body.time,
            "players_number": req.body.playersNumber,
            "user_id": req.params.id,
            "court_id": mysqlres[0].id.toString()

        }
        
        const Q11 = "INSERT INTO orders SET ?";
        sql.query(Q11, NewOrderEntry, (err, mysqlres) => {
            if (err) {
                res.status(400).send({ message: "error on creating order: " + err });
            }
            res.redirect(`/dashboard/${req.params.id}`);
        });
    })
};

const showCourts = (req, res) => {
    const Q56 = "SELECT * FROM courts";
    sql.query(Q56, (err, mysqlres) => {
        if (err) {
            res.status(400).send({ message: "error on finding courts" + err });
        }
        const points = [];
        mysqlres.forEach(court => {
            points.push(`{"coordinates":[${[court.lon, court.lat]}],"id":"${court.id}", "name":"${court.name}"}`)
        })



        res.render("courts", { courts: mysqlres, points, user_id: req.params.id,maptoken:process.env.MAP_TOKEN });
    })
};

const getProfile = (req, res) => {
    const id = req.params.id;
    const Q19 = "SELECT first_name from users WHERE id=?"
    sql.query(Q19, id, (err, user) => {
        if (err)
            return res.status(400).send({ message: "error on finding user" + err });

        const Q20 = "SELECT users.first_name,orders.id,courts.img ,orders.date,orders.time,orders.players_number,courts.name,courts.address,courts.lat,courts.lon FROM orders JOIN users ON orders.user_id=users.id JOIN courts ON orders.court_id=courts.id WHERE users.id=?";
        sql.query(Q20, id, (err, orders) => {
            if (err)
                return res.status(400).send({ message: "error on finding user" + err });

            const userFirstName = user[0].first_name;

            if (!orders.length)
                return res.render('dashboard', { orders: [], userId: id, userFirstName });

            return res.render('dashboard', { orders: orders, userId: id, userFirstName });
        });
    });
}

const insertCourtsFromCSV = async () => {
    const csvFilePath = './db/courts.csv';
    const jsonArray = await csv().fromFile(csvFilePath);
    jsonArray.forEach(court => {
        const Q11 = "INSERT INTO courts SET ?";
        sql.query(Q11, court, (err, mysqlres) => {
            if (err) {
                return err;
            }
        });
    })
}

const createAllTables = () => {
    const tablesQuery = [
        "CREATE TABLE IF NOT EXISTS `users` (id varchar(255) NOT NULL PRIMARY KEY ,email varchar(255) NOT NULL,password varchar(255) NOT NULL,first_name varchar(255) NOT NULL,last_name varchar(255) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8;",
        "CREATE TABLE IF NOT EXISTS `courts` (id varchar(255) NOT NULL PRIMARY KEY,name varchar(255) NOT NULL,lon varchar(80) NOT NULL,lat varchar(80) NOT NULL,address varchar(80) NOT NULL,img varchar(255) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8;",
        "CREATE TABLE IF NOT EXISTS `orders` (id varchar(255) NOT NULL PRIMARY KEY ,date varchar(255) NOT NULL,time varchar(80) NOT NULL,players_number int NOT NULL,court_id varchar(255) NOT NULL,user_id varchar(255) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8;"
    ]

    tablesQuery.forEach(query => createOneTable(query));
}

const createOneTable = (query) => {
    sql.query(query, (err, mySQLres) => {
        if (err)
            return err;
        return mySQLres;
    })
}


module.exports = { register, login, getProfile, showCourts, createOrder, createAllTables, insertCourtsFromCSV };