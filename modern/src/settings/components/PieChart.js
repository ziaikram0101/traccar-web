/* eslint-disable */
import React, { PureComponent } from "react";
import { Doughnut } from "react-chartjs-2";
import "chartjs-plugin-doughnut-innertext";

Chart.pluginService.register({
  beforeDraw: function (chart) {
    var width = chart.chart.width,
      height = chart.chart.height,
      ctx = chart.chart.ctx;
    ctx.restore();
    var fontSize = (height / 160).toFixed(2);
    ctx.font = fontSize + "em sans-serif";
    ctx.textBaseline = "top";
    var text = "2",
      textX = Math.round((width - ctx.measureText(text).width) / 2),
      textY = height / 2.2;
    ctx.fillText(text, textX, textY);
    ctx.save();
  }
});
const data = {
  labels: ["Active", "Inactive"],
  datasets: [
    {
      label: "Active Devices",
      fill: false,
      // lineTension: 0.0,
      // backgroundColor: "rgba(75,192,192,0.4)",
      backgroundColor: ["#56d7a3", "#fe8a5d"],
      hoverBackgroundColor: ["#56d7a3", "#fe8a5d"],
      // borderColor: "#56d7a3",
      // borderColor: "rgba(75,192,192,1)",
      // borderCapStyle: "butt",
      // borderDash: [],
      // borderDashOffset: 0.0,
      // borderJoinStyle: "miter",
      // pointBorderColor: "rgba(75,192,192,1)",
      // pointBackgroundColor: "#fff",
      // pointBorderWidth: 1,
      // pointHoverRadius: 5,
      // pointHoverBackgroundColor: "rgba(75,192,192,1)",
      // pointHoverBorderColor: "rgba(220,220,220,1)",
      // pointHoverBorderWidth: 2,
      // pointRadius: 1,
      // pointHitRadius: 10,
      data: [2, 8]
    }
  ]
};

export default class PieChart extends PureComponent {
  state = {
    legend: []
  };

  componentDidMount() {
    const component = this.doughnut;
    // console.log('component', component)
    this.setState({ legend: component.chartInstance.legend.legendItems });
  }

  render() {
    return (
      <div>
        <Doughnut
          ref={(ref) => (this.doughnut = ref)}
          data={data}
          options={{
            legend: {
              display: false
            },
            elements: {
              arc: {
                borderWidth: 0
              }
            },
            cutoutPercentage: 80,
            centerText: {
              // color of the text
              color: "#fe8a5d",
              // text to be display in the doughnut chart center
              value: 340,
              //manually adjust the font size on top of the default font size
              fontSizeAdjust: 0.2 // 20% larger of the default size
            }
          }}
        />
        <h2>Active</h2>
      </div>
    );
  }
}
