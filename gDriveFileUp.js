$(document).ready(function () {
    //set variables and constants to make the auth server link
    var cId = "500909083474-s7p7fo19bam0lle7j7h0plfluqgvsnml.apps.googleusercontent.com";
    const cSecrt = "T0Y3aDpGPqZAe2g3dXASb_9B";
    var access_token = ""; //this will be dynamically populated	
    var FileToGdrive = function (file) {
        this.file = file;
    };
    FileToGdrive.prototype.getName = function () {
        return this.file.name;
    };
    FileToGdrive.prototype.getSize = function () {
        //get the file size
        localStorage.setItem("size", this.file.size);
        return this.file.size;
    };
    FileToGdrive.prototype.getType = function () {
        //type of the file
        localStorage.setItem("type", this.file.type);
        return this.file.type;
    };

    // upload the files to google drive using google API service
    FileToGdrive.prototype.doUpload = function () {
        var that = this;
        var formData = new FormData();

        formData.append("file", this.file, this.getName());
        formData.append("upload_file", true);

        $.ajax({
            type: "POST",
            async: true,
            processData: false,
            url: "https://www.googleapis.com/upload/drive/v2/files",
            beforeSend: function (request) {
                //set request headers
                request.setRequestHeader("Authorization", "Bearer" + " " + localStorage.getItem("accessToken"));
            },
            xhr: function () {
                var tempx = $.ajaxSettings.xhr();
                return tempx;
            },
            contentType: false,
            data: {
                uploadType: "media"
            },
            timeout: 60000,
            cache: false,
            data: formData,
            success: function (data) {
                alert("Upload done!")
            },
            error: function (error) {
                alert("An error Occured while uploading!")
            }
        });
    };
    $("#uploadFile").on("click", function (e) {
        var localfile = $("#files")[0].files[0];
        var gdriveUp = new FileToGdrive(localfile);
        gdriveUp.doUpload();
    });

    $.ajax({
        dataType: "json",
        type: 'POST',
        data: {
            scope: "https://www.googleapis.com/auth/drive.file",
            client_secret: cSecrt,
            redirect_uri: "http://localhost/SSAssign/gdriveFileUp.html",
            grant_type: "authorization_code",
            client_id: cId,
            code: new URLSearchParams(window.location.search).get('code')
        },
        url: "https://www.googleapis.com/oauth2/v4/token",
        success: function (resultData) {
            //saving the access token in local storage
            localStorage.setItem("refreshToken", resultData.refreshToken);
            //token expiry
            localStorage.setItem("expires_in", resultData.expires_in);
            //access token
            localStorage.setItem("accessToken", resultData.access_token);

            window.history.pushState({}, document.title, "gdriveFileUp.html");

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            window.location.replace("http://localhost/SSAssign/index.html");
        }

    });

});