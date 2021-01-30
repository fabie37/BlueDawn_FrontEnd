import React, { Component } from 'react'
import Chart from 'chart.js'

export class LineGraph extends Component {
    
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    componentDidUpdate() {
        
        this.myChart.data.labels = this.props.data.map(d => d.time);
        this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
        this.myChart.data.datasets[0].label = this.props.title;
        this.myChart.update();
      }

    componentDidMount() {
        this.myChart = new Chart(this.canvasRef.current, {
          type: 'line',

          options:{
            responsive:true,
            maintainAspectRatio: false,
            scales: {
            xAxes: [
              {
                type: 'time',
                time: {unit:'day'}
              }
            ],
            yAxes: [
              {
                ticks: {
                  min: 0,
                  suggestedMax: this.props.max
                }
              }
            ]
        }},
          data: {
            labels: this.props.data.map(d => d.time),
            datasets: [{
                label: this.props.title,
                data: this.props.data.map(d => d.value),
      }]
    }
        });
      }
    
    render() {
        return (
            <canvas ref={this.canvasRef}></canvas>
        )
    }
}

export default LineGraph
