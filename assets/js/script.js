var csv;
var mode = "csv";

function csvToJSON (csv, fieldDelimiter, textDelimiter) {
    fieldDelimiter = fieldDelimiter || ",";
    var objPattern = new RegExp("\\" + textDelimiter + "(.*?)\\" + textDelimiter + "|" + fieldDelimiter, "gi");
    var arrAux;
    var lastMatch = 'none';
    var propertyNames = [];
    var row = 0;
    var obj = {};
    var result = [];
    var k = 0;
   
    while(arrAux = objPattern.exec(csv)){     
        if(arrAux[0] == fieldDelimiter) {
            lastMatch = 'delimiter';
            continue;
        } else if (lastMatch == 'text')
            row++;

        if(row > 0) {
            obj[propertyNames[k]] = arrAux[0].replaceAll(textDelimiter, '');
            k++;
            if(k == propertyNames.length){
                result.push(obj);
                k = 0;
                obj = {};
            }   
        } else 
            propertyNames.push(arrAux[0].replaceAll(textDelimiter,''));
        
        lastMatch = 'text';
    }
    return JSON.stringify(result, null, 2);
}

document.getElementById('convert-bttn').addEventListener('click', function(){
    let textarea = document.getElementById('text-content');
    let res;

    if (mode == 'csv') {
        let fieldDelimiter = document.getElementById('field-delimiter').value;
        let textDelimiter = document.getElementById('text-delimiter').value;

        if(fieldDelimiter == '{Space}')     fieldDelimiter = ' ';
        else if(fieldDelimiter == '{Tab}')  fieldDelimiter = '\t';

        csv = textarea.value;
        res = csvToJSON(textarea.value, fieldDelimiter, textDelimiter);
        textarea.value = res;
    } else
        textarea.value = csv;

    document.getElementById('convert-bttn').innerText = mode == 'csv' ? 'Back to CSV' : 'Convert to JSON';
    document.getElementById('main-header').innerText = mode == 'csv' ? 'Result:' : 'Enter CSV here:';
    mode = mode == 'csv' ? 'json' : 'csv';
});
