import React from 'react';
import { Table } from 'semantic-ui-react';
import '../App.css';
class TableList extends React.Component {
    render() {
        const custom_primary = {
            backgroundColor: '#2185d0',
            color: '#fbfbfb',
            border: '1px solid #fbfbfb'
        }
        return (
            <Table celled >
                <Table.Header >
                    <Table.Row>
                        <Table.HeaderCell style={custom_primary}>
                            Name
                        </Table.HeaderCell>
                        <Table.HeaderCell style={custom_primary}>
                            Email
                        </Table.HeaderCell>
                        <Table.HeaderCell textAlign="center" style={custom_primary}>
                            Address
                        </Table.HeaderCell>
                        <Table.HeaderCell textAlign="center" style={custom_primary}>
                            Product
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell className="hashHover">
                            Chingri Yu
                        </Table.Cell>
                        <Table.Cell>
                            fstar0550@gmail.com
                        </Table.Cell>
                        <Table.Cell textAlign="center">
                            Tianjin, China
                        </Table.Cell>
                        <Table.Cell textAlign="center">
                            Canva 24"
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        );
    }   
}
export default TableList;
