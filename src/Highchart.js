import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Select from 'react-select'
import React from "react";

function isNumeric(str) {
    if (typeof str != "string") return false; // we only process strings!
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

class Highchart extends React.Component {
    state = {xAxis: null, yAxis: null};

    constructor(props) {
        super(props);
        this.state.options = Object.keys(props.data?.[0] ?? {});
    }

    render() {
        const options = Object.keys(this.props.data?.[0] ?? {}).map(value => ({value, label: value}));
        const fieldPickers = (
            <>
                X Axis
                <Select
                    options={options}
                    defaultValue={this.state.xAxis}
                    onChange={(value) => {this.setState({xAxis: value})}}
                />
                Y Axis
                <Select
                    options={options}
                    defaultValue={this.state.yAxis}
                    onChange={(value) => {this.setState({yAxis: value})}}
                />
            </>
        );
        if (!this.state.xAxis || !this.state.yAxis) {
            return fieldPickers;
        }
        const points = {};
        this.props.data.forEach(row => {
            const xValue = row[this.state.xAxis.value];
            if (!points[xValue]) {
                points[xValue] = [];
            }
            points[xValue].push(row[this.state.yAxis.value]);
        });

        const chartData = {
            title: {
                text: "Chart"
            },
            series: Object.keys(points).map(key => {
                const result = {type: 'line', name: key};
                const values = points[key];
                result.data = values.every(isNumeric) ? values.map(parseFloat).sort((a, b) => a-b) : values.length;
                return result;
            })
        };
        console.log(chartData);

        return (
            <div>
                {fieldPickers}
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartData}
                />
            </div>
        );
    }
}

export default Highchart;