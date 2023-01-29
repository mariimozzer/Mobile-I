//Review
var Participants = {
    insert: function (objEvent) {
        db.transaction(function (tx) {
            var sql = "INSERT INTO review(restaurantName, restaurantId, stateId, reviewerEmail, reviewerComments, hasRating, rating1, rating2, rating3) VALUES (?,?,?,?,?,?,?,?,?);";
            var options = [objEvent.restaurantName, objEvent.restaurantId, objEvent.stateId, objEvent.reviewerEmail, objEvent.reviewerComments, objEvent.hasRating, objEvent.rating1, objEvent.rating2, objEvent.rating3];

            function successTransaction() {
                console.info("Success: Insert transaction successfully");
                alert("New review added! ");
            }

            tx.executeSql(sql, options, successTransaction, errorHandler);
        });
    },

    selectAll: function (options, callback) {
        db.transaction(function (tx) {
            var sql = "SELECT * FROM review;";
            tx.executeSql(sql, options, callback, errorHandler);
        });
    },

    select: function (options, callback) {
        var options = options;
        db.transaction(function (tx) {
            var sql = "SELECT * FROM review WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        });
    },

    delete: function (options) {
        var options = options;
        db.transaction(function (tx) {
            var sql = "DELETE FROM review WHERE id=?;";

            function successTransaction() {
                console.info("Success: Review deleted successfully");
            }

            tx.executeSql(sql, options, successTransaction, errorHandler);
        });
    },

    update: function (objEvent, id) {
        db.transaction(function (tx) {
            var sql = "UPDATE review SET restaurantName=?, restaurantId=? ,stateId=?, reviewerEmail=? ,reviewerComments=?, hasRating=?, rating1=?, rating2=?, rating3=? WHERE id=?;";
            var options = [objEvent.restaurantName, objEvent.restaurantId, objEvent.stateId, objEvent.reviewerEmail, objEvent.reviewerComments, objEvent.hasRating, objEvent.rating1, objEvent.rating2, objEvent.rating3, id];

            function successTransaction() {
                console.info("Success: Review details updated successfully");
                alert('Review details updated successfully');
            }

            tx.executeSql(sql, options, successTransaction, errorHandler)
        });
    }
};

//State
var State = {
    insertState: function (objState) {
        db.transaction(function (tx) {
            var sql = "INSERT INTO state(name) VALUES ('Ontario','Manitoba','Nova Scotia','Alberta','British Columbia');";
            var options = [objState.name];

            function successTransaction() {
                console.info("Success: Insert State transaction successfully");
            }

            tx.executeSql(sql, options, successTransaction, errorHandler);
        });
    },

    selectAllState: function (options, callback) {
        db.transaction(function (tx) {
            var sql = "SELECT * FROM state;";
            tx.executeSql(sql, options, callback, errorHandler);
        });
    },

};