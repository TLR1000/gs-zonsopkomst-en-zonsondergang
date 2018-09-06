// call this function on a cell via =ImportJSON("http://...") and data will show up verbatim
function ImportJSON(url) {  
    var response = UrlFetchApp.fetch(url);
    var data = JSON.parse(response.getContentText());

    if (!data.length) {
        return [];
    }

    var rows = [];
    var headers = Object.keys(data[0]);

    rows.push(headers);

    for (var i=0; i<data.length; i++) {
        var row = [];
        for (var j=0; j<headers.length; j++) {
            row.push(data[i][headers[j]]);
        }
        rows.push(row);
    }

    return rows;
}