import React, { Component } from 'react';
import Chart from 'chart.js';
var currentPalette = "cool";

export class LineGraph extends Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    componentDidUpdate() {
        this.myChart.data.labels = this.props.data.map((d) => d.time);
        this.myChart.data.datasets[0].data = this.props.data.map(
            (d) => d.value
        );
        this.myChart.data.datasets[0].label = this.props.title;
        this.myChart.update();
    }

    componentDidMount() {
        this.myChart = new Chart(this.canvasRef.current, {
            type: 'line',
            options: {
                legend: { display: false },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [
                        {
                            type: 'time',
                            time: { unit: 'day' },
                            ticks: { autoSkip: true, maxTicksLimit: 12 },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                min: 0,
                                suggestedMax: this.props.max,
                            },
                        },
                    ],
                },
            },
            data: {
                labels: this.props.data.map((d) => d.time),
                datasets: [
                    {
                        label: this.props.title,
                        data: this.props.data.map((d) => d.value),
                        backgroundColor: '#F6F6F6',
                        borderColor:'#78CA80'
                    },
                ],
            },
        });
        this.chartColors();
    }

    chartColors(palette) {
        if (!palette) palette = currentPalette;
        currentPalette = palette;
    
        /*Gradients
          The keys are percentage and the values are the color in a rgba format.
          You can have as many "color stops" (%) as you like.
          0% and 100% is not optional.*/
        var gradient;
        switch (palette) {
            case 'cool':
                gradient = {
                    0: [255, 255, 255, 1],
                    20: [220, 237, 200, 1],
                    45: [66, 179, 213, 1],
                    65: [26, 39, 62, 1],
                    100: [0, 0, 0, 1]
                };
                break;
            case 'warm':
                gradient = {
                    0: [255, 255, 255, 1],
                    20: [254, 235, 101, 1],
                    45: [228, 82, 27, 1],
                    65: [77, 52, 47, 1],
                    100: [0, 0, 0, 1]
                };
                break;
            case 'neon':
                gradient = {
                    0: [255, 255, 255, 1],
                    20: [255, 236, 179, 1],
                    45: [232, 82, 133, 1],
                    65: [106, 27, 154, 1],
                    100: [0, 0, 0, 1]
                };
                break;
        }
    
        //Get a sorted array of the gradient keys
        var gradientKeys = Object.keys(gradient);
        gradientKeys.sort(function(a, b) {
            return +a - +b;
        });
    
        //Find datasets and length
        var chartType = this.myChart.config.type;
        switch (chartType) {
            case "pie":
            case "doughnut":
                var datasets = this.myChart.config.data.datasets[0];
                var setsCount = datasets.data.length;
                break;
            case "bar":
            case "line":
                var datasets = this.myChart.config.data.datasets;
                var setsCount = datasets.length;
                break;
        }
    
        //Calculate colors
        var chartColors = [];
        for (var i = 0; i < setsCount; i++) {
            var gradientIndex = (i + 1) * (100 / (setsCount + 1)); //Find where to get a color from the gradient
            for (var j = 0; j < gradientKeys.length; j++) {
                var gradientKey = gradientKeys[j];
                if (gradientIndex === +gradientKey) { //Exact match with a gradient key - just get that color
                    chartColors[i] = 'rgba(' + gradient[gradientKey].toString() + ')';
                    break;
                } else if (gradientIndex < +gradientKey) { //It's somewhere between this gradient key and the previous
                    var prevKey = gradientKeys[j - 1];
                    var gradientPartIndex = (gradientIndex - prevKey) / (gradientKey - prevKey); //Calculate where
                    var color = [];
                    for (var k = 0; k < 4; k++) { //Loop through Red, Green, Blue and Alpha and calculate the correct color and opacity
                        color[k] = gradient[prevKey][k] - ((gradient[prevKey][k] - gradient[gradientKey][k]) * gradientPartIndex);
                        if (k < 3) color[k] = Math.round(color[k]);
                    }
                    chartColors[i] = 'rgba(' + color.toString() + ')';
                    break;
                }
            }
        }
    
        //Copy colors to the chart
        for (var i = 0; i < setsCount; i++) {
            switch (chartType) {
                case "pie":
                case "doughnut":
                    if (!datasets.backgroundColor) datasets.backgroundColor = [];
                    datasets.backgroundColor[i] = chartColors[i];
                    if (!datasets.borderColor) datasets.borderColor = [];
                    datasets.borderColor[i] = "rgba(255,255,255,1)";
                    break;
                case "bar":
                    datasets[i].backgroundColor = chartColors[i];
                    datasets[i].borderColor = "rgba(255,255,255,0)";
                    break;
                case "line":
                    datasets[i].borderColor = chartColors[i];
                    datasets[i].backgroundColor = "rgba(255,255,255,0)";
                    break;
            }
        }
    
        //Update the chart to show the new colors
        this.myChart.update();
    };

    render() {
        return <canvas ref={this.canvasRef}></canvas>;
    }
}

export default LineGraph;
