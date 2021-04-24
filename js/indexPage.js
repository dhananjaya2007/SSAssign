function signingoogle(){
	// generate authentication server link and load
	   var webLink = "";
	   var cId = "500909083474-s7p7fo19bam0lle7j7h0plfluqgvsnml.apps.googleusercontent.com";
	   var prjScope = "https://www.googleapis.com/auth/drive.file";
	   var reURI = "http://localhost/SSAssign/gdriveFileUp.html";
	   
	   webLink = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri="+reURI
	   +"&prompt=consent&response_type=code&client_id="+cId+"&scope="+prjScope
	   +"&access_type=offline";
	   
	   window.location = webLink;
	   }