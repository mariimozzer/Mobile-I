var db;

function errorHandler(error) {
    console.error("SQL error: " + error.message);
}

var DB = {
    createDatabase: function () {
        var shortName = "MMReviewDB";
        var version = "1.0";
        var displayName = "DB For MMReviewDB app";
        var dbSize = 2 * 1024 * 1024;

        function dbCreateSuccess() {
            console.info("Success: Database created successfully");
        }

        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);
    },

    dropTableState: function () {
        db.transaction(function (tx) {
            var sql = "DROP TABLE IF EXISTS state;";

            var options = [];

            function successCallback() {
                console.info("Success: Drop table: state successful.");
            }

            tx.executeSql(sql, options, successCallback, errorHandler);

        });
    },

    createTables: function () {
        db.transaction(function (tx) {


            var sql = "CREATE TABLE IF NOT EXISTS state(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "name VARCHAR(20) NOT NULL);";

            var sql2 = "CREATE TABLE IF NOT EXISTS review(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "restaurantName VARCHAR(30) NOT NULL," +
                "restaurantId VARCHAR(20) NOT NULL," +
                "stateId INTEGER NOT NULL," +
                "reviewerEmail VARCHAR(30)," +
                "reviewerComments TEXT," +
                "hasRating VARCHAR(1)," +
                "rating1 INTEGER," +
                "rating2 INTEGER," +
                "rating3 INTEGER," +
                "FOREIGN KEY(stateId) REFERENCES state(id));";


            var options = [];

            function successCallBack() {
                console.info("Success: Create table: state and review successfully.");
            }


            tx.executeSql(sql, options, successCallBack, errorHandler);
            tx.executeSql(sql2, options, successCallBack, errorHandler);

            tx.executeSql("INSERT INTO state(name) VALUES ('Ontario');", options, successCallBack, errorHandler);
            tx.executeSql("INSERT INTO state(name) VALUES ('British Columbia');", options, successCallBack, errorHandler);
            tx.executeSql("INSERT INTO state(name) VALUES ('Alberta');", options, successCallBack, errorHandler);
            tx.executeSql("INSERT INTO state(name) VALUES ('Nova Scotia');", options, successCallBack, errorHandler);
            tx.executeSql("INSERT INTO state(name) VALUES ('Manitoba');", options, successCallBack, errorHandler);
        });
    },

    dropTables: function () {
        db.transaction(function (tx) {
            var sql = "DROP TABLE IF EXISTS state;";
            var sql2 = "DROP TABLE IF EXISTS review;";
            var options = [];

            function successCallback() {
                console.info("Success: Drop table: state and review successful.");
            }

            tx.executeSql(sql, options, successCallback, errorHandler);
            tx.executeSql(sql2, options, successCallback, errorHandler);
        });
    },

};