//Function to calculate the average on Review Page
function averageReview() {
    var quality = $("#txtFood").val();
    var service = $("#txtService").val();
    var value = $("#txtValue").val();
    $("#sldRange").val(((parseInt(quality) + parseInt(service) + parseInt(value)) * 100 / 15).toFixed(0)).slider("refresh");
}

//Function to calculate the average on Modify Page
function averageModify() {
    var quality = $("#txtModifyFood").val();
    var service = $("#txtModifyService").val();
    var value = $("#txtModifyValue").val();
    $("#sldModifyRatings").val(((parseInt(quality) + parseInt(service) + parseInt(value)) * 100 / 15).toFixed(0)).slider("refresh");
}

//Function to add a new review
function add() {
    if (validate_frmAdd()) {
        console.info("Add form is valid");

        var restaurantName = $("#txtName").val();
        var restaurantId = $("#txtBusiness").val();
        var stateId = $("#cmbState1").val();
        var reviewerEmail = $("#txtEmail").val();
        var reviewerComments = $("#txtComments").val();
        var hasRating = $("#cbRatings").prop("checked");
        var rating1 = $("#txtFood").val();
        var rating2 = $("#txtService").val();
        var rating3 = $("#txtValue").val();

        var objEvent = new Event(restaurantName, restaurantId, stateId, reviewerEmail, reviewerComments, hasRating, rating1, rating2, rating3);
        Participants.insert(objEvent);

    } else {

        console.info("Add Review form is invalid!");
    }

}

//Function to show all review's
function getReviews() {
    var options = [];

    Participants.selectAll(options, callback);

    function callback(tx, results) {
        console.info("Success: Records selected successfully");
        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            var id = row['id'];
            var restaurantName = row['restaurantName'];
            var restaurantId = row['restaurantId'];
            var stateId = row['stateId'];
            var reviewerEmail = row['reviewerEmail'];
            var reviewerComments = row['reviewerComments'];
            var hasRating = row['hasRating'];
            var rating1 = row['rating1'];
            var rating2 = row['rating2'];
            var rating3 = row['rating3'];


            var overall = ((rating1 + rating2 + rating3) * 100 / 15).toFixed(0);

            //console.info(`id: ${id} restaurantName: ${restaurantName} restaurantId:${restaurantId} stateId:${stateId} reviewerEmail: ${reviewerEmail} reviewerComments: ${reviewerComments} hasRating: ${hasRating} rating1: ${rating1} rating2: ${rating2} rating3: ${rating3} overall: ${overall}`);

            htmlCode += `
                <li>
                    <a data-role="button" data-row-id=${row['id']} href="#MMModifyReviewPage"> 
                    <h2>Id: ${id}</h2>
                    <h1>Restaurant Name: ${restaurantName}</h1>       
                    <h2>Reviewer Email: ${reviewerEmail}</h2>
                    <h2>Reviewer Comments: ${reviewerComments}</h2>
                    <h2>Overall Rating: ${overall}</h2>                   
                    </a>
                    </li>
                `;
        }

        var lv = $("#lvAll");
        lv = lv.html(htmlCode);
        lv.listview("refresh");

        function clickHandler() {
            localStorage.setItem("id", $(this).attr("data-row-id"));
            $(location).prop('href', '#MMModifyReviewPage');
        }

        $("#lvAll a").on("click", clickHandler);
    }


}

//Function to update the Review
function updateReview() {
    if (validate_frmModify()) {
        console.info("Modify Participant form is valid");

        var id = localStorage.getItem("id");

        var restaurantName = $("#txtModifyName").val();
        var restaurantId = $("#txtModifyBusiness").val();
        var stateId = $("#cmbStateModify").val();
        var reviewerEmail = $("#txtModifyEmail").val();
        var reviewerComments = $("#txtModifyComments").val();
        var rating1 = $("#txtModifyFood").val();
        var rating2 = $("#txtModifyService").val();
        var rating3 = $("#txtModifyValue").val();
        var hasRating = '';

        if ($("#cbRatingsReview").is(':checked')) {
            hasRating = 'true'
        } else {
            hasRating = 'false'
        }

        var objEvent = new Event(restaurantName, restaurantId, stateId, reviewerEmail, reviewerComments, hasRating, rating1, rating2, rating3);
        Participants.update(objEvent, id);
    } else {
        console.info("Modify Participant form is invalid");
    }

}

//Function to Clear the Database
function dropTables() {
    var result = confirm("Are you sure you want to clear the database?");
    if (result) {
        try {
            DB.dropTables();
            alert("Database cleared: All tables dropped! ");
        } catch (e) {
            alert(e);
        }
    }
}

//Save Email Default
function saveDefaults() {
    var defEmail = $("#txtDefaultUser").val();
    localStorage.setItem("Email", defEmail)
    alert("Email saved in the local storage");

}

//Load Email Default
function loadDefaults() {
    $("#txtEmail").val(localStorage.getItem("Email"));
}

//Function to show the Review Details on Modify page
function showReviewDetails() {
    var id = localStorage.getItem("id");
    var options = [id];
    //console.info(id)

    Participants.select(options, callback);

    function callback(tx, results) {
        console.info("Success: Review details selected successfully");

        var row = results.rows[0];
        var id = row['id'];
        var restaurantName = row['restaurantName'];
        var restaurantId = row['restaurantId'];
        var stateId = row['stateId'];
        var reviewerEmail = row['reviewerEmail'];
        var reviewerComments = row['reviewerComments'];
        var hasRating = row['hasRating'];
        var rating1 = row['rating1'];
        var rating2 = row['rating2'];
        var rating3 = row['rating3'];
        var overall = ((rating1 + rating2 + rating3) * 100 / 15).toFixed(0);

        /*console.info(`id: ${id} restaurantName: ${restaurantName} restaurantId: ${restaurantId}
        stateId: ${stateId} reviewerEmail: ${reviewerEmail} reviewerComments: ${reviewerComments} 
        hasRating: ${hasRating} rating1: ${rating1} rating2: ${rating2} rating3: ${rating3} overall: ${overall}`);*/

        $("#txtModifyName").val(restaurantName);
        $("#txtModifyBusiness").val(restaurantId);
        $("#cmbStateModify").val(stateId);
        $("#cmbStateModify").selectmenu("refresh");
        $("#txtModifyEmail").val(reviewerEmail);
        $("#txtModifyComments").val(reviewerComments);
        $("#txtModifyFood").val(rating1);
        $("#txtModifyService").val(rating2);
        $("#txtModifyValue").val(rating3);

        if (hasRating === 'true') {
            $("#cbRatingsReview").checkboxradio("refresh");
            $("#cbRatingsReview").prop("checked", true);
            $("#sldModifyRatings").val(overall).slider("refresh");
            $("#divModifyRatings").show();
        } else {
            $("#cbRatingsReview").prop("checked", false);
            $("#divModifyRatings").hide();

        }
        $("#cbRatingsReview").checkboxradio("refresh");
    }
}

//Function to delete the Review
function deleteReview() {
    var id = localStorage.getItem("id");
    var options = [id];
    Participants.delete(options);
}

//Populate the DropDownList
function updateStatesDropdown() {
    var options = [];

    function callback(tx, results) {
        console.info("Success: States selected")

        var cmbState1 = $("#cmbState1")
        var htmlCode = ''
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            var id = row["id"]
            var name = row["name"]
            htmlCode += `               
            <option value="${id}">${name}</option>`
        }

        cmbState1.html(htmlCode)
        cmbState1.selectmenu('refresh', true)
    }

    State.selectAllState(options, callback)
}

//Populate States on Modify Page
function updateStatesDropdownModify() {
    var options = [];

    function callback(tx, results) {
        console.info("Success: States selected")

        var cmbStateModify = $("#cmbStateModify")
        var htmlCode = ''
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            var id = row["id"]
            var name = row["name"]
            htmlCode += `               
            <option value="${id}">${name}</option>`
        }

        cmbStateModify.html(htmlCode)
        cmbStateModify.selectmenu('refresh', true)
    }

    State.selectAllState(options, callback)
}


function cancelModification() {
    return "#MMHomePage";
}