async function loadOrganizations() {
	// submit API request to custom API
	// request input User_ID
	
	// somehow sort organizations that contain User_ID
	
	//list of organizations that user is in
	const json = ["srhs","ovms","ucsd","pratham's house"].sort();
	
	var retstr = "";
	
	for(let i = 0; i < json.length; i++) {
		retstr += '<a href="#" onclick = loadChannels(' + i + ')>'+json[i]+'</a>'; //change "... + i + ..." to "json[i].orgID"
		
	}
	document.getElementById("orgCol").innerHTML = retstr;
}

async function loadChannels(orgID) {
	//the following is for testing purposes
	var json = [];
	if (orgID==0){
		json = ["some dumb ov class or smth","ovmsp1","ovmsp2"]
	}
	if (orgID==1){
		json = ["creme de la creme","creamery","ice cream machine"]
	}
	if (orgID==2){
		json = ["apush","bio","bc","lit"]
	}
	
	var retstr = "";
	
	for(let i = 0; i < json.length; i++){
		retstr += '<a href="#" onclick = loadMessages('+ orgID + ',' + i + ')>' + json[i] + '</a>'; //change "... + i + ..." to "json[i].channelID"	
	}
	document.getElementById("channelCol").innerHTML = retstr;
}

async function loadMessages(orgID,channelID)
{
	// submit API request to custom API
	// load messages within org and channel to json
	var json = ["hehe lmao you suck" + orgID + channelID,"yoru players op","pratham is getting detention"];
	var retstr = "";
	for(let i = 0; i < json.length; i++){
		retstr += '<a href="#">' + json[i] + '</a>';
	}
	document.getElementById("messageCol").innerHTML = retstr;
	
}