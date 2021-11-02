/* Function for populating the table*/
window.onload = () => {
    $.getJSON( "https://api.npoint.io/77b2340219c2a6b02836", function( data ) {
        $.each(data, function( key, value ) {
          const tableRow = document.createElement('tr')
          tableRow.innerHTML = "<td>"+(key+1)+"</td><td><strong>"+value.name+"</strong><br><p>Error value: "+value.error+"<br>Branching function:"+katex.renderToString(value.latex, { throwOnError: true})+"<br>Average: "+value.average+"<br>Category: "+value.category+`<br><br>${JSON.stringify(value.measurements)}<br><br><a href="#">Click here for advanced results</a></p></td><td><div id="highchart${key}" style="height: 200px; width: 600px;"></div></td>`

          document.getElementById('results').appendChild(tableRow)
          
          $("#highchart"+key).highcharts({
            credits: {
                enabled: !1
            },
            chart: {
                type: "scatter",
                height: 140,
                width: 580,
                renderTo: "chart"
            },
            title: {
                style: {
                    color: "#000",
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    whiteSpace: "normal"
                },
                text: value.name+" - "+value.category
            },
            legend: {
                text: null,
                useHTML: !0,
                x: 20,
                align: "center",
                borderWidth: 1,
                enabled: !0,
                itemMarginTop: 0,
                itemMarginBottom: 0,
                layout: "horizontal",
                verticalAlign: "bottom"
            },
            xAxis: {
                title: {
                    text: null,
                },
                min: 0.001,
                max: 0.75,
                labels: {
                    enabled: !1
                },
                tickLength: 0,
                lineWidth: 0
            },
            yAxis: [{
                max: 0,
                min : 0,
                minRange :0.1,
                maxPadding: .01,
                lineWidth: 0,
                tickWidth: 2,
                tickLength: 6,
                tickInterval: 1,
                labels: {
                    y: 3
                },
    
                title: {
                    text: "Branching function",
                    rotation: 0,
                    align: "middle",
                    offset: 50,
                },
                labels: {
                    enabled: !1
                },
                tickWidth: 0,
                tickLength: 0,
                maxPadding: 0,
                padding: 30,
                gridLineWidth: 2
            }, {
                title: {
                    text: '',
                    rotation: 0,
                    align: "middle",
                    offset: 50
                },
                opposite: !0
            }],
            plotOptions: {
                scatter: {
                    events: {
                        legendItemClick: function () {
                            return !1
                        }
                    },
                    marker: {
                        radius: 5,
                        states: {
                            hover: {
                                enabled: !0
                            }
                        },
                        symbol: "circle"
                    },
                    tooltip: {
                        headerFormat: "<b>{series.name}</b><br>",
                        pointFormat: "{point.x}"
                    }
                }
            },
            series: [{
                    name: "Measurement",
                    data: [[value.measurements[0].value, 0]],
                }, {
                    name: "Uncertainty bounds",
                    data: [[value.measurements[0].value+value.measurements[0].error, 0],[value.measurements[0].value-value.measurements[0].error, 0]],
                    zIndex: 8 
                }],
            });
        });
    });
}

/* Function for dynamic filtering of table entries*/
function mySearch() {
    var input, filter, table, tr, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    table = document.getElementById("results");
    tr = table.getElementsByTagName('tr');

    for (i = 0; i < tr.length; i++) {
      txtValue = tr[i].innerText;
      console.log(txtValue)
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
    }
  }
}
