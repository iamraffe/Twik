//  CSV Parsing Function from Ben Nadel, http://www.bennadel.com/blog/1504-Ask-Ben-Parsing-CSV-Strings-With-Javascript-Exec-Regular-Expression-Command.htm
var isDecimal_re     = /^\s*(\+|-)?((\d+([,\.]\d+)?)|([,\.]\d+))\s*$/;

var CSVParser = {

  //---------------------------------------
  // UTILS
  //---------------------------------------

  isNumber: function(string) {
    if( (string == null) || isNaN( new Number(string) ) ) {
      return false;
    }
    return true;
  },


  //---------------------------------------
  // PARSE
  //---------------------------------------
  //var parseOutput = CSVParser.parse(this.inputText, this.headersProvided, this.delimiter, this.downcaseHeaders, this.upcaseHeaders);

  parse: function (input, headersIncluded, delimiterType, downcaseHeaders, upcaseHeaders, decimalSign) {
    var dataArray = [];

    var errors = [];

    //test for delimiter
    //count the number of commas
    var RE = new RegExp("[^,]", "gi");
    var numCommas = input.replace(RE, "").length;

    //count the number of tabs
    RE = new RegExp("[^\t]", "gi");
    var numTabs = input.replace(RE, "").length;

    var rowDelimiter = "\n";
    //set delimiter
    var columnDelimiter = ",";
    if (numTabs > numCommas) {
      columnDelimiter = "\t"
    };

    if (delimiterType === "comma") {
      columnDelimiter = ","
    } else if (delimiterType === "tab") {
      columnDelimiter = "\t"
    }


    // kill extra empty lines
    RE = new RegExp("^" + rowDelimiter + "+", "gi");
    input = input.replace(RE, "");
    RE = new RegExp(rowDelimiter + "+$", "gi");
    input = input.replace(RE, "");

    // var arr = input.split(rowDelimiter);
    //
    // for (var i=0; i < arr.length; i++) {
    //   dataArray.push(arr[i].split(columnDelimiter));
    // };


    // dataArray = jQuery.csv(columnDelimiter)(input);
    dataArray = this.CSVToArray(input, columnDelimiter);

    //escape out any tabs or returns or new lines
    for (var i = dataArray.length - 1; i >= 0; i--){
      for (var j = dataArray[i].length - 1; j >= 0; j--){
        dataArray[i][j] = dataArray[i][j].replace("\t", "\\t");
        dataArray[i][j] = dataArray[i][j].replace("\n", "\\n");
        dataArray[i][j] = dataArray[i][j].replace("\r", "\\r");
      };
    };


    var headerNames = [];
    var headerTypes = [];
    var numColumns = dataArray[0].length;
    var numRows = dataArray.length;
    if (headersIncluded) {

      //remove header row
      headerNames = dataArray.splice(0,1)[0];
      numRows = dataArray.length;

    } else { //if no headerNames provided

      //create generic property names
      for (var i=0; i < numColumns; i++) {
        headerNames.push("val"+String(i));
        headerTypes.push("");
      };

    }


    if (upcaseHeaders) {
      for (var i = headerNames.length - 1; i >= 0; i--){
        headerNames[i] = headerNames[i].toUpperCase();
      };
    };
    if (downcaseHeaders) {
      for (var i = headerNames.length - 1; i >= 0; i--){
        headerNames[i] = headerNames[i].toLowerCase();
      };
    };

    //test all the rows for proper number of columns.
    for (var i=0; i < dataArray.length; i++) {
      var numValues = dataArray[i].length;
      if (numValues != numColumns) {this.log("Error parsing row "+String(i)+". Wrong number of columns.")};
    };

    //test columns for number data type
    var numRowsToTest = dataArray.length;
    var threshold = 0.9;
    for (var i=0; i < headerNames.length; i++) {
      var numFloats = 0;
      var numInts = 0;
      for (var r=0; r < numRowsToTest; r++) {
        if (dataArray[r]) {
          //replace comma with dot if comma is decimal separator
          if(decimalSign='comma' && isDecimal_re.test(dataArray[r][i])){
            dataArray[r][i] = dataArray[r][i].replace(",", ".");
          }
          if (CSVParser.isNumber(dataArray[r][i])) {
            numInts++
            if (String(dataArray[r][i]).indexOf(".") > 0) {
              numFloats++
            }
          };
        };

      };

      if ((numInts / numRowsToTest) > threshold){
        if (numFloats > 0) {
          headerTypes[i] = "float"
        } else {
          headerTypes[i] = "int"
        }
      } else {
        headerTypes[i] = "string"
      }
    }





    return {'dataGrid':dataArray, 'headerNames':headerNames, 'headerTypes':headerTypes, 'errors':this.getLog()}

  },


  //---------------------------------------
  // ERROR LOGGING
  //---------------------------------------
  errorLog:[],

  resetLog: function() {
    this.errorLog = [];
  },

  log: function(l) {
    this.errorLog.push(l);
  },

  getLog: function() {
    var out = "";
    if (this.errorLog.length > 0) {
      for (var i=0; i < this.errorLog.length; i++) {
        out += ("!!"+this.errorLog[i] + "!!\n");
      };
      out += "\n"
    };

    return out;
  },



  //---------------------------------------
  // UTIL
  //---------------------------------------

    // This Function from Ben Nadel, http://www.bennadel.com/blog/1504-Ask-Ben-Parsing-CSV-Strings-With-Javascript-Exec-Regular-Expression-Command.htm
    // This will parse a delimited string into an array of
    // arrays. The default delimiter is the comma, but this
    // can be overriden in the second argument.
    CSVToArray: function( strData, strDelimiter ){
      // Check to see if the delimiter is defined. If not,
      // then default to comma.
      strDelimiter = (strDelimiter || ",");

      // Create a regular expression to parse the CSV values.
      var objPattern = new RegExp(
        (
          // Delimiters.
          "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

          // Quoted fields.
          "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

          // Standard fields.
          "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );


      // Create an array to hold our data. Give the array
      // a default empty first row.
      var arrData = [[]];

      // Create an array to hold our individual pattern
      // matching groups.
      var arrMatches = null;


      // Keep looping over the regular expression matches
      // until we can no longer find a match.
      while (arrMatches = objPattern.exec( strData )){

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
          strMatchedDelimiter.length &&
          (strMatchedDelimiter != strDelimiter)
          ){

          // Since we have reached a new row of data,
          // add an empty row to our data array.
          arrData.push( [] );

        }


        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[ 2 ]){

          // We found a quoted value. When we capture
          // this value, unescape any double quotes.
          var strMatchedValue = arrMatches[ 2 ].replace(
            new RegExp( "\"\"", "g" ),
            "\""
            );

        } else {

          // We found a non-quoted value.
          var strMatchedValue = arrMatches[ 3 ];

        }


        // Now that we have our value string, let's add
        // it to the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
      }

      // Return the parsed data.
      return( arrData );
    }
}

//  Based on Mr-Data-Converter by Shan Carter on 2010-09-01.
//

function render(dataGrid, headerNames, headerTypes, indent, newLine) {
  //inits...
  var commentLine = "//";
  var commentLineEnd = "";
  var outputText = "[";
  var numRows = dataGrid.length;
  var numColumns = headerNames.length;

  //begin render loop
  for (var i=0; i < numRows; i++) {
    var row = dataGrid[i];
    outputText += "{";
    for (var j=0; j < numColumns; j++) {
      if ((headerTypes[j] == "int")||(headerTypes[j] == "float")) {
        var rowOutput = row[j] || "null";
      } else {
        var rowOutput = '"' + ( row[j] || "" ) + '"';
      };

    outputText += ('"'+headerNames[j] +'"' + ":" + rowOutput );

      if (j < (numColumns-1)) {outputText+=","};
    };
    outputText += "}";
    if (i < (numRows-1)) {outputText += ","+newLine};
  };
  outputText += "]";

  return outputText;
}

export class DataConverter {
  constructor(){
  // export function DataConverter(nodeId) {
    // console.log(this)

    //---------------------------------------
    // PUBLIC PROPERTIES
    //---------------------------------------

    // this.nodeId                 = nodeId;
    // this.node                   = $("#"+nodeId);

    // this.outputDataTypes        = [
    //                               {"text":"Actionscript",           "id":"as",               "notes":""},
    //                               {"text":"ASP/VBScript",           "id":"asp",              "notes":""},
    //                               {"text":"HTML",                   "id":"html",             "notes":""},
    //                               {"text":"JSON - Properties",      "id":"json",             "notes":""},
    //                               {"text":"JSON - Column Arrays",   "id":"jsonArrayCols",    "notes":""},
    //                               {"text":"JSON - Row Arrays",      "id":"jsonArrayRows",    "notes":""},
    //                               {"text":"JSON - Dictionary",      "id":"jsonDict",         "notes":""},
    //                               {"text":"MySQL",                  "id":"mysql",            "notes":""},
    //                               {"text":"PHP",                    "id":"php",              "notes":""},
    //                               {"text":"Python - Dict",          "id":"python",           "notes":""},
    //                               {"text":"Ruby",                   "id":"ruby",             "notes":""},
    //                               {"text":"XML - Properties",       "id":"xmlProperties",    "notes":""},
    //                               {"text":"XML - Nodes",            "id":"xml",              "notes":""},
    //                               {"text":"XML - Illustrator",      "id":"xmlIllustrator",   "notes":""}];
    this.outputDataType         = "json";

    this.columnDelimiter        = "\t";
    this.rowDelimiter           = "\n";

    this.inputTextArea          = {};
    this.outputTextArea         = {};

    this.inputHeader            = {};
    this.outputHeader           = {};
    this.dataSelect             = {};

    this.inputText              = "";
    this.outputText             = "";

    this.newLine                = "\n";
    this.indent                 = "  ";

    this.commentLine            = "//";
    this.commentLineEnd         = "";
    // this.tableName              = "MrDataConverter"

    this.useUnderscores         = true;
    this.headersProvided        = false;
    this.downcaseHeaders        = false;
    this.upcaseHeaders          = false;
    this.includeWhiteSpace      = true;
    this.useTabsForIndent       = false;
  }

  convert = (inputText) => {
    // this.inputText = this.inputTextArea.val();
    this.outputText = "";
    this.inputText = inputText
    //make sure there is input data before converting...
    if (this.inputText.length > 0) {
      if (this.includeWhiteSpace) {
        this.newLine = "\n";
        // console.log("yes")
      }
      else {
        this.indent = "";
        this.newLine = "";
        // console.log("no")
      }
      CSVParser.resetLog();
      var parseOutput = CSVParser.parse(this.inputText, this.headersProvided, this.delimiter, this.downcaseHeaders, this.upcaseHeaders);
      // console.log(parseOutput)
      var dataGrid = parseOutput.dataGrid;
      var headerNames = parseOutput.headerNames;
      var headerTypes = parseOutput.headerTypes;
      var errors = parseOutput.errors;
      this.outputText = render(dataGrid, headerNames, headerTypes, this.indent, this.newLine);
      return errors + this.outputText
    }; //end test for existence of input text
  }
}

//---------------------------------------
// PUBLIC METHODS
//---------------------------------------

// DataConverter.prototype.convert = function() {

//   this.inputText = this.inputTextArea.val();
//   this.outputText = "";

//   this.inputText = 'June 25, 2012  120 80  189'


//   //make sure there is input data before converting...
//   if (this.inputText.length > 0) {

//     if (this.includeWhiteSpace) {
//       this.newLine = "\n";
//       // console.log("yes")
//     } else {
//       this.indent = "";
//       this.newLine = "";
//       // console.log("no")
//     }

//     CSVParser.resetLog();
//     var parseOutput = CSVParser.parse(this.inputText, this.headersProvided, this.delimiter, this.downcaseHeaders, this.upcaseHeaders);

//     var dataGrid = parseOutput.dataGrid;
//     var headerNames = parseOutput.headerNames;
//     var headerTypes = parseOutput.headerTypes;
//     var errors = parseOutput.errors;

//     this.outputText = render(dataGrid, headerNames, headerTypes, this.indent, this.newLine);

//     return errors + this.outputText
//     // this.outputTextArea.val(errors + this.outputText);

//   }; //end test for existence of input text
// }

