$(window).on('message', function (event) {

    var data = event.originalEvent.data;
    var dataUrl = data.dataUrl + '?limit=9999';
    console.log(data);

    $.getJSON(dataUrl, function (jsonData) {
        // var jsonData = JSON.parse('{"data":[["setosa","10","99","99"],["versicolor","0","9","3"],["virginica","0","1","7"]],"vizType":"table","metaData":{"column_names":["observation/predict","setosa","versicolor","virginica"\],"column_types":["string","numeric","numeric","numeric"],"sql":null,"title":"test","subtitle":"Report by confusionmatrix","db_table_name":"\\\"public\\\".\\\"confusionmatrix\\\"","job_id":null,"app_id":0,"sorted_column_name":null,"search_term":null,"filter":null,"number_of_rows":3,"columnSettings":null}}');
        var column_names = jsonData.metaData.column_names;
        buildHtmlTable('#heatmap');
        visualizeTable();

        function buildHtmlTable(selector) {
            addAllColumnHeaders(selector, column_names);

            for (var i = 0; i < jsonData.data.length; i++) {
                var row$ = $('<tr class="stats-row"/>');
                for (var colIndex = 0; colIndex < column_names.length; colIndex++) {
                    var cellValue = jsonData.data[i][colIndex];
                    if (cellValue == null) cellValue = "";

                    if (colIndex == 0) {
                        row$.append($('<td class="stats-title" height="100px" width="100px"/>').html(cellValue));
                    } else {
                        row$.append($('<td/>').html(cellValue));
                    }
                }
                $(selector).append(row$);
            }
        }

        function addAllColumnHeaders(selector, column_names) {
            var columnSet = [];
            var headerTr$ = $('<tr/>');

            for (var i = 0; i < column_names.length; i++) {
                var key = column_names[i];
                columnSet.push(key);
                headerTr$.append($('<th/>').html(key));
            }
            $(selector).append(headerTr$);
        }

        function visualizeTable() {
            Array.max = function (array) {
                return Math.max.apply(Math, array);
            };
            var counts = $('#heatmap tbody td').not('.stats-title').map(function () {
                return parseInt($(this).text());
            }).get();
            var max = Array.max(counts);

            xr = 255; xg = 255; xb = 255; yr = 243; yg = 32; yb = 117; n = 100;

            $('#heatmap tbody td').not('.stats-title').each(function () {
                var val = parseInt($(this).text());
                var pos = parseInt((Math.round((val / max) * 100)).toFixed(0));
                red = parseInt((xr + ((pos * (yr - xr)) / (n - 1))).toFixed(0));
                green = parseInt((xg + ((pos * (yg - xg)) / (n - 1))).toFixed(0));
                blue = parseInt((xb + ((pos * (yb - xb)) / (n - 1))).toFixed(0));
                clr = 'rgb(' + red + ',' + green + ',' + blue + ')';
                $(this).css({ backgroundColor: clr });
            });
        }
    });
});