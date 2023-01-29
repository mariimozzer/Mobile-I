$(document).ready(function () {
    init();
    initDB();
});


function init() {

    $("#divRatings").hide();
    $("#cbRatings").click(function () {
        if ($("#cbRatings").is(":checked")) {
            $("#divRatings").show()
        } else {
            $("#divRatings").hide()
        }
    });

    $("#cbRatingsReview").click(function () {
        if ($("#cbRatingsReview").is(":checked")) {
            $("#divModifyRatings").show()
        } else {
            $("#divModifyRatings").hide()
        }
    });

    //Review Average Handler
    $("#txtFood").on("change", ReviewAverage);
    $("#txtService").on("change", ReviewAverage);
    $("#txtValue").on("change", ReviewAverage);


    //Average Handler
    $("#txtModifyFood").on("change", ModifyAverage);
    $("#txtModifyService").on("change", ModifyAverage);
    $("#txtModifyValue").on("change", ModifyAverage);

    //CRUD
    $("#btnAdd").on("click", btnAdd_click);
    $("#btnUpdateModify").on("click", btnUpdateModify_click);
    $("#btnDeleteModify").on("click", btnDeleteModify_click);
    $("#btnCancelModify").on("click", btnCancelModify_click);

    //Show Reviews
    $("#MMReviewPage").on("pageshow", pageParticipants_show);
    $("#MMModifyReviewPage").on("pageshow", pageDetail_show);

    //Database
    $("#btnClearDatabase").on("click", btnClearDatabase_click);

    //Local Storage
    $("#btnSaveSettings").on("click", btnSaveSettings_click);
    $("#MMSettingsPage").on("pageshow", settingsLoaded);

    //States DropDown
   $("#MMAddReviewPage").on("pageshow",   updateStatesDropdown);
   $("#MMModifyReviewPage").on("pageshow",   updateStatesDropdownModify);

    //Load Storage
    loadDefaults();
}

function initDB() {
    try {
        DB.createDatabase();
        if (db) {
            console.info("Drop table if exist...");
            DB.dropTableState();

            console.info("Creating Tables...");
            DB.createTables();
        } else {
            console.error("Error: Can't create tables: Database doesn't exists");
        }
    } catch (e) {
        console.error("Error (Fatal): Error in initDB. Can't proceed");
    }
}

//Button cancel to return home
function btnCancelModify_click(){
    cancelModification();
}

//Clear the database
function btnClearDatabase_click() {
    dropTables();
}

//Calculate average function call
function ReviewAverage() {
    averageReview();
}

//Calculate average function call
function ModifyAverage() {
    averageModify();
}

//Add a review
function btnAdd_click() {
    add();
}

//Update on Modify page
function btnUpdateModify_click() {
    updateReview();
}

//Delete on Modify page
function btnDeleteModify_click() {
    deleteReview();
}

//Page Review Details
function pageDetail_show() {
    showReviewDetails();
}

//Review Event
function pageParticipants_show() {
    getReviews();
}

//Save Default Email
function btnSaveSettings_click() {
    saveDefaults();
}

//Load Default Email
function settingsLoaded() {
    loadDefaults();
}



