import React from 'react';

function Table({data}) {
    return (
        <table>
            <tbody>
            <tr>
                {Object.keys(data[0] ?? {}).map((key, i) => <td key={i}>{key}</td>)}
            </tr>
            {data.map((row, i) => <tr key={i}>
                {Object.values(row).map((value, i) => <td key={i}>{value}</td>)}
            </tr>)}
            </tbody>
        </table>
    );
}

export default Table;