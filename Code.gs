function myFunction() {
  //Maakt gebruik van https://sunrise-sunset.org/api
  //
  //voorbeeld:
  //https://api.sunrise-sunset.org/json?lat=51.85423308&lng=4.14337754&date=2018-09-06&formatted=1
  //overige parameters:
  //date=today
  //formatted=0 betreft datum/tijd format. Voorbeeld:
  //formatted=0:"sunrise": "2018-09-06T05:04:25+00:00"
  //formatted=1:"sunrise": "5:04:25 AM",
  //
  //NOTE: All times are in UTC and summer time adjustments are not included in the returned data.
  //dus zomertijd in NL is UTC + 2, wintertijd is UTC + 1
  //
  //Coordinaten vinden: http://www.mapcoordinates.net/en
  //Uitleg twilight: https://en.wikipedia.org/wiki/Twilight
  //
  
  var apiBaseUrl = "https://api.sunrise-sunset.org/json?";
  var latlon = "lat=51.85423308&lng=4.14337754";
  var datum = "date=today";
  var format = "formatted=0";
  var apiUrl = apiBaseUrl + "&" + latlon + "&" + format;
    
  doTheCall(apiUrl)
  
}

function doTheCall(apiUrl) {
//  Logger.log(apiUrl);

  var response = UrlFetchApp.fetch(apiUrl); // get feed
  var data = JSON.parse(response.getContentText()); 
  var status = data.status;
  
//  Logger.log(response);
//
//  Logger.log("status: " + data.status);  
  if (status == "OK") {
//    Logger.log("raw data sunrise:" + data.results.sunrise);
//    Logger.log("raw data sunset:" + data.results.sunset);
    
    //tijdzone automatisch aanpassen door new Date object
    var sunriseCorr = new Date(data.results.sunrise);
    var sunsetCorr = new Date(data.results.sunset);
//    Logger.log("zon op:" + sunriseCorr);  
//    Logger.log("zon onder:" + sunsetCorr);  
    
    //complete datum/tijd info
    var sunriseTime = sunriseCorr.toLocaleTimeString();
    var sunsetTime = sunsetCorr.toLocaleTimeString();    
//    Logger.log("zon op:" + sunriseTime);  
//    Logger.log("zon onder:" + sunsetTime);  
    
    //tijd in 24 uur format converteren
    var timezone = Session.getScriptTimeZone(); 
    var format = 'HH:mm'; // Set date format for output
    var sunriseTime24 = Utilities.formatDate(sunriseCorr,timezone,format);  
    var sunsetTime24 = Utilities.formatDate(sunsetCorr,timezone,format); 
    Logger.log("sunriseTime24:" + sunriseTime24);  
    Logger.log("sunsetTime24:" + sunsetTime24);  

    
  } else {
    Logger.log("error in response data");
  }
  
  
}