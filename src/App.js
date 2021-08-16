import React from 'react';
import './App.css';
import Highchart from './Highchart'
import Table from './Table'
import {parse} from 'papaparse';

import gamine from './gamine.csv';
import hookfish from './hookfish.csv';


class App extends React.Component {
    state = {gamine: [], hookfish: []};

    componentDidMount(){
        parse(gamine, {
            download: true,
            header: true,
            complete: (input) => {
                input.data.forEach(row => {row.location = 'Gamine'});
                this.setState({gamine: input.data});
            }
        });
        parse(hookfish, {
            download: true,
            header: true,
            complete: (input) => {
                input.data.forEach(row => {row.location = 'Hookfish'});
                this.setState({hookfish: input.data});
            }
        });
    }

    render() {
        const data = [
            ...this.state.gamine,
            ...this.state.hookfish,
        ];
        return (
            <div className="App">
                <Highchart data={data}/>
                <Table data={data}/>
            </div>
        );
    }
}

export default App;
