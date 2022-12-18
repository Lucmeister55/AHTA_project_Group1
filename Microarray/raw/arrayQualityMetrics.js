// (C) Wolfgang Huber 2010-2011

// Script parameters - these are set up by R in the function 'writeReport' when copying the 
//   template for this script from arrayQualityMetrics/inst/scripts into the report.

var highlightInitial = [ false, true, false, false, false, false, true, true, true, false, false, false, false, false, true, true, false, false ];
var arrayMetadata    = [ [ "1", "GSM907854", "AD_HI, biological rep1", "Public on Apr 17 2013", "Apr 02 2012", "Apr 17 2013", "Hippocampus of of AD brain", "age: 88", "Sex: F", "", "88", "F", "AD" ], [ "2", "GSM907855", "AD_HI, biological rep2", "Public on Apr 17 2013", "Apr 02 2012", "Apr 17 2013", "Hippocampus of of AD brain", "age: 95", "Sex: F", "", "95", "F", "AD" ], [ "3", "GSM907856", "AD_HI, biological rep3", "Public on Apr 17 2013", "Apr 02 2012", "Apr 17 2013", "Hippocampus of of AD brain", "age: 95", "Sex: F", "", "95", "F", "AD" ], [ "4", "GSM907857", "AD_HI, biological rep4", "Public on Apr 17 2013", "Apr 02 2012", "Apr 17 2013", "Hippocampus of of AD brain", "age: 100", "Sex: F", "", "100", "F", "AD" ], [ "5", "GSM907858", "AD_HI, biological rep5", "Public on Apr 17 2013", "Apr 02 2012", "Apr 17 2013", "Hippocampus of of AD brain", "age: 99", "Sex: M", "", "99", "M", "AD" ], [ "6", "GSM907859", "AD_HI, biological rep6", "Public on Apr 17 2013", "Apr 02 2012", "Apr 17 2013", "Hippocampus of of AD brain", "age: 83", "Sex: M", "", "83", "M", "AD" ], [ "7", "GSM907860", "AD_HI, biological rep7", "Public on Apr 17 2013", "Apr 02 2012", "Apr 17 2013", "Hippocampus of of AD brain", "age: 90", "Sex: M", "", "90", "M", "AD" ], [ "8", "GSM4764672", "AD_HI, biological rep8", "Public on Sep 04 2020", "Sep 03 2020", "Sep 04 2020", "Hippocampus of of AD brain", "age: 84", "Sex: F", "2020/09/03 newly added", "84", "F", "AD" ], [ "9", "GSM907861", "non-AD_HI, biological rep1", "Public on Apr 17 2013", "Apr 02 2012", "Apr 17 2013", "Hippocampus of of non-AD brain", "age: 87", "Sex: F", "", "87", "F", "CT" ], [ "10", "GSM907870", "non-AD_HI, biological rep10", "Public on Apr 17 2013", "Apr 02 2012", "Sep 05 2013", "Hippocampus of of non-AD brain", "age: 74", "Sex: M", "", "74", "M", "CT" ], [ "11", "GSM907862", "non-AD_HI, biological rep2", "Public on Apr 17 2013", "Apr 02 2012", "Apr 17 2013", "Hippocampus of of non-AD brain", "age: 80", "Sex: F", "", "80", "F", "CT" ], [ "12", "GSM907863", "non-AD_HI, biological rep3", "Public on Apr 17 2013", "Apr 02 2012", "Apr 17 2013", "Hippocampus of of non-AD brain", "age: 84", "Sex: F", "", "84", "F", "CT" ], [ "13", "GSM907864", "non-AD_HI, biological rep4", "Public on Apr 17 2013", "Apr 02 2012", "Apr 17 2013", "Hippocampus of of non-AD brain", "age: 77", "Sex: M", "", "77", "M", "CT" ], [ "14", "GSM907865", "non-AD_HI, biological rep5", "Public on Apr 17 2013", "Apr 02 2012", "Apr 17 2013", "Hippocampus of of non-AD brain", "age: 55", "Sex: M", "", "55", "M", "CT" ], [ "15", "GSM907866", "non-AD_HI, biological rep6", "Public on Apr 17 2013", "Apr 02 2012", "Apr 17 2013", "Hippocampus of of non-AD brain", "age: 72", "Sex: F", "", "72", "F", "CT" ], [ "16", "GSM907867", "non-AD_HI, biological rep7", "Public on Apr 17 2013", "Apr 02 2012", "Apr 17 2013", "Hippocampus of of non-AD brain", "age: 78", "Sex: F", "", "78", "F", "CT" ], [ "17", "GSM907868", "non-AD_HI, biological rep8", "Public on Apr 17 2013", "Apr 02 2012", "Apr 17 2013", "Hippocampus of of non-AD brain", "age: 83", "Sex: M", "", "83", "M", "CT" ], [ "18", "GSM907869", "non-AD_HI, biological rep9", "Public on Apr 17 2013", "Apr 02 2012", "Apr 17 2013", "Hippocampus of of non-AD brain", "age: 80", "Sex: M", "", "80", "M", "CT" ] ];
var svgObjectNames   = [ "pca", "dens" ];

var cssText = ["stroke-width:1; stroke-opacity:0.4",
               "stroke-width:3; stroke-opacity:1" ];

// Global variables - these are set up below by 'reportinit'
var tables;             // array of all the associated ('tooltips') tables on the page
var checkboxes;         // the checkboxes
var ssrules;


function reportinit() 
{
 
    var a, i, status;

    /*--------find checkboxes and set them to start values------*/
    checkboxes = document.getElementsByName("ReportObjectCheckBoxes");
    if(checkboxes.length != highlightInitial.length)
	throw new Error("checkboxes.length=" + checkboxes.length + "  !=  "
                        + " highlightInitial.length="+ highlightInitial.length);
    
    /*--------find associated tables and cache their locations------*/
    tables = new Array(svgObjectNames.length);
    for(i=0; i<tables.length; i++) 
    {
        tables[i] = safeGetElementById("Tab:"+svgObjectNames[i]);
    }

    /*------- style sheet rules ---------*/
    var ss = document.styleSheets[0];
    ssrules = ss.cssRules ? ss.cssRules : ss.rules; 

    /*------- checkboxes[a] is (expected to be) of class HTMLInputElement ---*/
    for(a=0; a<checkboxes.length; a++)
    {
	checkboxes[a].checked = highlightInitial[a];
        status = checkboxes[a].checked; 
        setReportObj(a+1, status, false);
    }

}


function safeGetElementById(id)
{
    res = document.getElementById(id);
    if(res == null)
        throw new Error("Id '"+ id + "' not found.");
    return(res)
}

/*------------------------------------------------------------
   Highlighting of Report Objects 
 ---------------------------------------------------------------*/
function setReportObj(reportObjId, status, doTable)
{
    var i, j, plotObjIds, selector;

    if(doTable) {
	for(i=0; i<svgObjectNames.length; i++) {
	    showTipTable(i, reportObjId);
	} 
    }

    /* This works in Chrome 10, ssrules will be null; we use getElementsByClassName and loop over them */
    if(ssrules == null) {
	elements = document.getElementsByClassName("aqm" + reportObjId); 
	for(i=0; i<elements.length; i++) {
	    elements[i].style.cssText = cssText[0+status];
	}
    } else {
    /* This works in Firefox 4 */
    for(i=0; i<ssrules.length; i++) {
        if (ssrules[i].selectorText == (".aqm" + reportObjId)) {
		ssrules[i].style.cssText = cssText[0+status];
		break;
	    }
	}
    }

}

/*------------------------------------------------------------
   Display of the Metadata Table
  ------------------------------------------------------------*/
function showTipTable(tableIndex, reportObjId)
{
    var rows = tables[tableIndex].rows;
    var a = reportObjId - 1;

    if(rows.length != arrayMetadata[a].length)
	throw new Error("rows.length=" + rows.length+"  !=  arrayMetadata[array].length=" + arrayMetadata[a].length);

    for(i=0; i<rows.length; i++) 
 	rows[i].cells[1].innerHTML = arrayMetadata[a][i];
}

function hideTipTable(tableIndex)
{
    var rows = tables[tableIndex].rows;

    for(i=0; i<rows.length; i++) 
 	rows[i].cells[1].innerHTML = "";
}


/*------------------------------------------------------------
  From module 'name' (e.g. 'density'), find numeric index in the 
  'svgObjectNames' array.
  ------------------------------------------------------------*/
function getIndexFromName(name) 
{
    var i;
    for(i=0; i<svgObjectNames.length; i++)
        if(svgObjectNames[i] == name)
	    return i;

    throw new Error("Did not find '" + name + "'.");
}


/*------------------------------------------------------------
  SVG plot object callbacks
  ------------------------------------------------------------*/
function plotObjRespond(what, reportObjId, name)
{

    var a, i, status;

    switch(what) {
    case "show":
	i = getIndexFromName(name);
	showTipTable(i, reportObjId);
	break;
    case "hide":
	i = getIndexFromName(name);
	hideTipTable(i);
	break;
    case "click":
        a = reportObjId - 1;
	status = !checkboxes[a].checked;
	checkboxes[a].checked = status;
	setReportObj(reportObjId, status, true);
	break;
    default:
	throw new Error("Invalid 'what': "+what)
    }
}

/*------------------------------------------------------------
  checkboxes 'onchange' event
------------------------------------------------------------*/
function checkboxEvent(reportObjId)
{
    var a = reportObjId - 1;
    var status = checkboxes[a].checked;
    setReportObj(reportObjId, status, true);
}


/*------------------------------------------------------------
  toggle visibility
------------------------------------------------------------*/
function toggle(id){
  var head = safeGetElementById(id + "-h");
  var body = safeGetElementById(id + "-b");
  var hdtxt = head.innerHTML;
  var dsp;
  switch(body.style.display){
    case 'none':
      dsp = 'block';
      hdtxt = '-' + hdtxt.substr(1);
      break;
    case 'block':
      dsp = 'none';
      hdtxt = '+' + hdtxt.substr(1);
      break;
  }  
  body.style.display = dsp;
  head.innerHTML = hdtxt;
}
