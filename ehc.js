function getStarted() {

    
    // global xhr requests
    gl_xhr = new XMLHttpRequest();

    gl_email_config = [
	{ "id" :"domain_name","value":"", "label": "DOMAIN NAME","csa":false },
	{ "id" :"internal_mail_servers","value":"", "label": "INTERNAL MAIL SERVERS","csa":true },
	{ "id" :"approved_mx_hostnames","value":"", "label": "APPROVED MX HOSTNAMES","csa":true },
	{ "id" :"approved_nameservers","value":"", "label": "APPROVED NAME SERVERS","csa":true },			
    ];
    
    mAbout();    

    gl_retcode = ""
}

//
//  Helper Functions
//
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function shortString(s) {
    shorter = s
    if (s.length > 20) {
	shorter = s.substring(0,15) + "...";
//	endstr  = s.substring((s.length-5),4);
//	alert(s.length-5);
//	alert(endstr);
	shorter = shorter;
    }
    return shorter;
    
}
function catchEvent(eventObj, event, eventHandler) {
    if (eventObj.addEventListener) {
        eventObj.addEventListener(event, eventHandler, false);
    }
    else if (eventObj.attachEvent) {
        event = "on" + event;
        eventObj.attachEvent(event, eventHandler);
    }
}

function timeGlass() {
    gl_timeglass = window.setTimeout(cbTimeGlass,1000);
}
function cbTimeGlass() {
    gl_timeelapsed = gl_timeelapsed +1;
    var tmpstring = gl_retcode + " ... " + gl_timeelapsed + " seconds";
    updateRetCode("Wait",tmpstring);
    timeGlass();
}



function stopTimeGlass() {
    window.clearTimeout(gl_timeglass)
    gl_timeglass = null;
    gl_retcode = "";
    gl_timeelapsed = 0;
}

//
//   DOM creation Helpers
//
function buildTable() {

    var oldChild = document.getElementById("divChild");
    var divContent = document.getElementById("divContent");
    var divChild = document.createElement("div");
    divContent.replaceChild(divChild,oldChild);    
    divChild.setAttribute("id","divChild");
    divChild.setAttribute("class","container");

    var divTable = document.createElement("div");
    divTable.setAttribute("class","divTable");

    divChild.appendChild(divTable);
    return divTable

}

function buildTable2() {

    var tables = [];
    var oldChild = document.getElementById("divChild");
    var divContent = document.getElementById("divContent");

    var divChild = document.createElement("div");
    divContent.replaceChild(divChild,oldChild);    
    divChild.setAttribute("id","divChild");
    divChild.setAttribute("class","container");

    var divTable = document.createElement("div");
    divTable.setAttribute("class","divTable2");
    divTable.setAttribute("id","divTable");


    var divDetails = document.createElement("div");
    divDetails.setAttribute("class","divDetails");
    divDetails.setAttribute("id","divDetails");
    
    divChild.appendChild(divTable);
    divChild.appendChild(divDetails);
    
    tables = [];
    tables[0] = divTable;
    tables[1] = divDetails;
    return tables;

}

function buildDivDetails() {
    var divChild = document.getElementById("divChild");
    var divOld = document.getElementById("divDetails");
    var divDetails = document.createElement("div");
    divDetails.setAttribute("class","divDetails");
    divDetails.setAttribute("id","divDetails");
    divChild.replaceChild(divDetails,divOld);    
    return divDetails;
}

function startEdit() {
    var divContent = document.getElementById("divContent");
    var oldChild   = document.getElementById("divChild");
    var divChild = document.createElement("div");
    divChild.setAttribute("id","divChild");
    divChild.setAttribute("class","container");
    divContent.replaceChild(divChild,oldChild);
    return divChild
}

function tableHeader(divTable) {
    var divHeadRow = document.createElement("div");
    divHeadRow.setAttribute("class","divHeadRow");
    divTable.appendChild(divHeadRow);
    return divHeadRow;
}


function displayText(t) {

    var oldChild = document.getElementById("divChild");
    var divContent = document.getElementById("divContent");
    var divChild = document.createElement("div");
    divChild.setAttribute("id","divChild");

    divChild.innerHTML = t;

    divContent.replaceChild(divChild,oldChild);
    
}
function updateRetCode(result,result2) {

    if (result == "OK") {
	rsptext = result2;
	cssClass = "divOK";
    }
    else {
	rsptext = result2;
	cssClass = "divError";
    }
    var divContent = document.getElementById("divContent");
    var oldDivRetCode = document.getElementById("divRetCode");
    var divRetCode = document.createElement("div");
    divRetCode.setAttribute("id","divRetCode");
    divRetCode.setAttribute("class",cssClass);
    divRetCode.innerHTML = rsptext;
//    var p = document.createElement("p");
//    var txt = document.createTextNode(rsptext);
//    p.appendChild(txt);
//    divRetCode.appendChild(p);
    divContent.replaceChild(divRetCode,oldDivRetCode);

}

function addCell(divRow,text,color="") {

    var divHeader = document.createElement("div");
    if (color) {
	divHeader.style.backgroundColor = color;
    }
    divHeader.setAttribute("class","divCell");
    var txt = document.createTextNode(text);
    divHeader.appendChild(txt);
    divRow.appendChild(divHeader);

}
function addCellwCallback2(divRow,text,callback) {

    var divHeader = document.createElement("div");
    divHeader.setAttribute("class","divCell");
    divHeader.setAttribute("id",text);    
    var txt = document.createTextNode(text);
    catchEvent(divHeader,"click",callback);
    divHeader.appendChild(txt);
    divRow.appendChild(divHeader);

}

function addCellwCallback(divRow,iconClass,id,callback,tooltiptext) {


    var divHeader = document.createElement("div");
    divHeader.setAttribute("class","divCell");
    divHeader.setAttribute("id",id);
    catchEvent(divHeader,"click",callback);
    var tooltip = document.createElement("span");
    tooltip.setAttribute("class","tooltiptext");
    var t = document.createTextNode(tooltiptext);
    tooltip.appendChild(t);
    divHeader.appendChild(tooltip);
    var icon = document.createElement("i");
    icon.setAttribute("class",iconClass);
    divHeader.appendChild(icon);
    divRow.appendChild(divHeader);

}
function addCellIcon(divRow,iconClass,color) {


    var divHeader = document.createElement("div");
    divHeader.setAttribute("class","divCell");
    var icon = document.createElement("i");
    icon.setAttribute("class",iconClass);
    icon.setAttribute("style","color:"+color);
    divHeader.appendChild(icon);
    divRow.appendChild(divHeader);

}

function addCellImage(divRow,imgsrc) {


    var divImage = document.createElement("div");
    divImage.setAttribute("class","divCell");
    var image = document.createElement("img");
    image.setAttribute("src",imgsrc);
    image.setAttribute("class","imgTable");    
    divImage.appendChild(image);
    divRow.appendChild(divImage);

}



function addCellPassword(divRow,id,text,size) {

    var inputObj = document.createElement("input");
    inputObj.setAttribute("id",id);

    inputObj.setAttribute("type", "password");
    inputObj.setAttribute("value", text);
    inputObj.setAttribute("size", size);
    inputObj.setAttribute("class","inputText");


    var divHeader = document.createElement("div");
    divHeader.setAttribute("id","divRightCell");
    divHeader.setAttribute("class","divRightCell");

    divHeader.appendChild(inputObj);
    divRow.appendChild(divHeader);

}
function addCellSelection(divRow,id,options,selectedname) {
    var divSel = document.createElement("div");
    divSel.setAttribute("class","col-75");
    var select = document.createElement("select");
    select.setAttribute("id",id);
    for (i=0;i<options.length;i++) {
        option =  document.createElement("option");
        option.value = options[i];
        option.textContent = options[i];
        select.appendChild(option);
    }
    if (selectedname) {
	select.value = selectedname;
    }
    divSel.appendChild(select);
    divRow.appendChild(divSel);
}

function addHeaderCell(divRow,text) {


    var divHeader = document.createElement("div");
    divHeader.setAttribute("class","divHeaderCell");
    var txt = document.createTextNode(text);
    divHeader.appendChild(txt);
    divRow.appendChild(divHeader);

}
function addCellRow(divChild) {
    var divRow = document.createElement("div");
    //    divRow.setAttribute("class","divrow");
    divRow.setAttribute("class","row");    
    divChild.appendChild(divRow);
    return divRow;
}
function addCellStatic(divRow,lbltxt,bgcolor=false) {
    var divStatic = document.createElement("div");
    divStatic.setAttribute("class","col-25-1");
    if (bgcolor) {
	divStatic.setAttribute("class","col-25-2");
    }
    var label = document.createElement("label");
    label.setAttribute("for",lbltxt);
    var t = document.createTextNode(lbltxt);
    label.appendChild(t);
    divStatic.appendChild(label);
    divRow.appendChild(divStatic);
}
function addCellStaticRight(divRow,lbltxt) {
    if (lbltxt) {
    }
    else {
	lbltxt = "-"
    }
    var divStatic = document.createElement("div");
    divStatic.setAttribute("class","col-75");
    var label = document.createElement("label");
    label.setAttribute("for",lbltxt);
    var t = document.createTextNode(lbltxt);
    label.appendChild(t);
    divStatic.appendChild(label);
    divRow.appendChild(divStatic);
}

function cbSectionClick(ev1) {
    divID = this.id;
    thisDiv = document.getElementById(divID+"Section");
    if (thisDiv.style.display === 'none') {
	thisDiv.style.display = 'block';
    }
    else {
	thisDiv.style.display = 'none';	
    }

    
}
function addCellSectionHead(divRow,lbltxt,divid) {

    var divStatic = document.createElement("div");
    if (divid) {
	lbltxt = "+- " + lbltxt;	
	divStatic.setAttribute("id",divid);

    }
    divStatic.setAttribute("class","col-100-1");
    var label = document.createElement("label");
    label.setAttribute("for",lbltxt);
    var t = document.createTextNode(lbltxt);
    label.appendChild(t);
    divStatic.appendChild(label);
    if (divid) {
	catchEvent(divStatic,"click",cbSectionClick);
    }
    divRow.appendChild(divStatic);
}


function addHiddenPassword(divParent) {
    var divInput = document.createElement("div");
    divInput.setAttribute("class","hideme");
    var input = document.createElement("input");
    input.setAttribute("type","password");
    input.setAttribute("id","hideme");
    input.setAttribute("name","");
    input.setAttribute("value","");
    divInput.appendChild(input);
    divParent.appendChild(divInput);
}

function addCellInput(divRow,type,id,name,value) {
    var divInput = document.createElement("div");
    divInput.setAttribute("class","col-75");
    var input = document.createElement("input");
    input.setAttribute("type",type);
    input.setAttribute("id",id);
    input.setAttribute("name",name);
    input.setAttribute("value",value);
    divInput.appendChild(input);
    divRow.appendChild(divInput);
}
function addCellNumber(divRow,id,name,value,min,max) {
    var divInput = document.createElement("div");
    divInput.setAttribute("class","col-75");
    var input = document.createElement("input");
    input.setAttribute("type","number");
    input.setAttribute("id",id);
    input.setAttribute("name",name);
    input.setAttribute("value",value);
    input.setAttribute("min",min);
    input.setAttribute("max",max);        
    divInput.appendChild(input);
    divRow.appendChild(divInput);
}
// needs a hidden password field before real one to avoid browser remembering password

function addCellInputRO(divRow,type,id,name,value) {
    var divInput = document.createElement("div");
    divInput.setAttribute("class","col-75");
    var input = document.createElement("input");
    input.setAttribute("type",type);
    input.setAttribute("id",id);
    input.setAttribute("name",name);
    input.setAttribute("value",value);
    input.readOnly = true;
    
    divInput.appendChild(input);
    divRow.appendChild(divInput);
}
function addCellTextArea(divRow,id,name,value) {
    var divInput = document.createElement("div");
    divInput.setAttribute("class","col-75");
    var ta = document.createElement("textarea");
    ta.setAttribute("id",id);
    ta.setAttribute("name",name);
    ta.setAttribute("style","height:200px");
    txt = document.createTextNode(value);
    ta.appendChild(txt);

    divInput.appendChild(ta);
    divRow.appendChild(divInput);

}


function addCellHTML(divRow,html) {
    var divHTML = document.createElement("div");
    divHTML.setAttribute("class","col-75");
    divHTML.innerHTML = html;
    divRow.appendChild(divHTML);

}

function addCellButton(divRow,id,label,type,callback) {


    var btnAdd = document.createElement("input");
    btnAdd.setAttribute("type", type);
    btnAdd.setAttribute("value", label);
    btnAdd.setAttribute("id", id);
    catchEvent(btnAdd, "click", callback);

    var divHeader = document.createElement("div");
    divHeader.setAttribute("class","divButton");
    divHeader.appendChild(btnAdd);
    divRow.appendChild(divHeader);

}

//
//  Menu Callbacks
//
function mAbout() {

    var t = "EHC - A revolutionary system for Email Health Checks!<br><br>";
    t = t+ '<img src="about.jpg"></img><br><br>';
    t = t+ "Copyright &copy 1997-2018";
    displayText(t);
    updateRetCode("OK","About EHC");
}

function mCreateDatabase() {

    post = {"fullreset":true};
    sendXpost(gl_xhr,"/cgi-bin/ehcResetDB.py",post,resetDBresponse);
    updateRetCode("Wait","Recreating Database");
}

function resetDBresponse(xhr) {
    updateRetCode("OK","Reset Events");
    var rsp = JSON.parse(xhr.responseText);
    if (rsp.ehcResult == "OK") {
        if (rsp.fullreset) {
            updateRetCode("OK","Reset DB - full reset");
        }
        else {
            updateRetCode("OK","Reset DB - reset events only");
        }
    }
    else {
        alert(rsp.ehcResult);
        updateRetCode("Error","Could not Reset Events - Process running");
    }
}

function mUploadFile() {

    var divChild = startEdit();
    var divRow = addCellRow(divChild);

    divRow = addCellRow(divChild);		
    addCellStatic(divRow,"File to Upload");
    addCellHTML(divRow,'<input id="the-file" name="file" type="file">')

    divRow = addCellRow(divChild);
    addCellButton(divRow,"Submit","Submit","submit",cbSubmitFile);
    addCellButton(divRow,"Cancel","Cancel","submit",mAbout);
    updateRetCode("OK","")
    
}


function submitFileResponse(xhr) {
    stopTimeGlass();
    var rsp = JSON.parse(xhr.responseText);
    if (rsp.result != "OK") {
	alert("Error submitting File" + rsp.result);
	return
    }
    var checks =[];
    checks = rsp.checks;
    divTable = buildTable()
    var divHeadRow = document.createElement("div");
    divHeadRow.setAttribute("class","divHeadRow");
    divTable.appendChild(divHeadRow);

    addHeaderCell(divHeadRow,"Result");
    addHeaderCell(divHeadRow,"Category");    
    addHeaderCell(divHeadRow,"Check");
    for (var i=0;i<checks.length;i++) {
	var check = {}
	check = checks[i];
	divRow = document.createElement("div");
	divRow.setAttribute("class","divRow3");
	if (check["level"] != "ok") {
	    icon = "fa fa-question-circle";
	    color = "red"
	}
	else {
	    icon = "fa fa-check-circle"
	    color = "green"	    
	}
	
	addCellIcon(divRow,icon,color);
	addCell(divRow,check["category"]);
	addCell(divRow,check["text"]);
	divTable.appendChild(divRow);
    }
    updateRetCode("OK","")

}

function cbSubmitFile() {

    var fileInput = document.getElementById('the-file');
    var file = fileInput.files[0];
    var formData = new FormData();
    formData.append('file', file);    

    sendXfile(gl_xhr,"/cgi-bin/ehctestme.py",formData,submitFileResponse);
    gl_retcode = "Analysing ESA config file, please wait!"    
    updateRetCode("Wait",gl_retcode);
    gl_timeelapsed = 0;
    timeGlass()
}


function mEditProfile() {
    alert("Not implemented yet")
}


//   mEditEmail -> REST ehcGetEmailConfig.py --> updateEmailResponse
//   updateEmailResponse --> editEmail
//   editEmail -> cbUpdateEmailConfig 
//   cbUpdateEmailConfig REST ehcUpdateEmail.py --> updateEmailResponse);

function mEditEmail() {
    post = {}
    sendXpost(gl_xhr,"/cgi-bin/ehcGetEmailConfig.py",post,updateEmailResponse);
}




function updateEmailResponse(xhr) {
    var rsp = JSON.parse(xhr.responseText);
    if (rsp.result == "OK") {
	var config = JSON.parse(rsp.configstring);
	for (var i=0;i<gl_email_config.length;i++) {
	    var id = gl_email_config[i].id
	    gl_email_config[i].value = config[id]
	}
    }
    else {
	alert("Error received---"+rsp.result)	
	for (var i=0;i<gl_email_config.length;i++) {
	    gl_email_config[i].value = ""
	}
    }
    editEmail()

}



function editEmail() {
    var divChild = startEdit();
    var divRow = addCellRow(divChild);
    for (var i=0;i<gl_email_config.length;i++) {
	divRow = addCellRow(divChild);		
	addCellStatic(divRow,gl_email_config[i].label);
	addCellInput(divRow,"text",gl_email_config[i].id,gl_email_config[i].id,gl_email_config[i].value);
    }

    divRow = addCellRow(divChild);
    addCellButton(divRow,"Submit","Submit","submit",cbUpdateEmailConfig);
    addCellButton(divRow,"Cancel","Cancel","submit",mAbout);
    updateRetCode("OK","Updated Email Configuration")
}




function cbUpdateEmailConfig() {
    var post = {};

    for (var i=0;i<gl_email_config.length;i++) {
	post[(gl_email_config[i].id)] = document.getElementById(gl_email_config[i].id).value;
    }
    sendXpost(gl_xhr,"/cgi-bin/ehcUpdateEmailConfig.py",post,updateEmailResponse);
}



function sendXpost(xhr,posturl,post,callback) {

/*    var pjson = encodeURIComponent(JSON.stringify(post)); */

    pjson = JSON.stringify(post)
//    alert(pjson);
    xhr.open("POST",posturl,true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
	    callback(xhr);
        }
    }
    /*    xhr.send("x=" + pjson); */
   xhr.send( pjson); 

}
function sendXfile(xhr,posturl,post,callback) {

/*    var pjson = encodeURIComponent(JSON.stringify(post)); */

    xhr.open("POST",posturl,true);
//    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
	    callback(xhr);
        }
    }
    /*    xhr.send("x=" + pjson); */
   xhr.send(post); 

}




