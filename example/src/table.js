

'use strict';

import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, Image } from 'react-native';
import _ from 'lodash';
const styles = StyleSheet.create({
    thead: {
        flexDirection: 'row'
    },
    row: {
        flexDirection: 'row',
        borderColor: '#f5f5f5',
        borderBottomWidth: 1
    },
    cell: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 16,
        color: '#333'
    }
});
export default class Table extends Component {
    ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    });
    constructor(props) {
        super(props);
        this.rows = new Set();
        this.currentHighlightRow = null;
    }
    generateRow = rowData => {
        // var cellWidths = this.props.cellWidths;
        // return rowData.map((item, key) => (
        //     <View style={{ flex: cellWidths[key] }}>
        //         <Text>{item}</Text>
        //     </View>
        // ));
        var cellWidths = [];
        if (this.props.cellWidths) {
            cellWidths = this.props.cellWidths;
        }
        else {
            for (let i = 0; i < rowData.length; i++) {
                cellWidths.push(1);
            }
        }
        return rowData.map((item, key) => {
            if (typeof item == 'string' || typeof item == 'number') {
                item = <Text style={[styles.text, this.props.cellTextStyle]}>{item + ''}</Text>;
            }
            return <View style={[{ flex: cellWidths[key] }, styles.cell, this.props.cellStyle]}>
                {item}
            </View>;
        });
    };
    shouldComponentUpdate(nextProps, nextState) {
        return !_.isEqual(this.props.data, nextProps.data);
    }
    setHighlight(index) {
        this._clearHighlight();
        if (index > -1) {
            this.list.scrollTo({ x: 0, y: 40 * index, animated: true });
            var row = Array.from(this.rows)[index];
            row.setNativeProps({
                style: {
                    backgroundColor: "#f0f7fb"
                }
            });
            this.currentHighlightRow = row;
        }
    }
    componentWillReceiveProps(nextProps) {
        var index = parseInt(nextProps.highlightIndex, 10);
        this.setHighlight(index);
    }
    componentWillUpdate(nextProps, nextState) {
        if (!_.isEqual(this.props.data, nextProps.data)) {
            this.rows = new Set();
            this.currentHighlightRow = null;
        }
    }
    componentDidMount() {
        var index = parseInt(this.props.highlightIndex, 10);
        this.setHighlight(index);
    }
    initRows = (row) => {
        if (row) {
            this.rows.add(row);
        }

    }
    _clearHighlight() {
        if (this.currentHighlightRow) {
            this.currentHighlightRow.setNativeProps({
                style: {
                    backgroundColor: '#fff'
                }
            });
        }
    }
    _renderRow(rowData, sectionId, rowId) {
        return (
            <View ref={(row) => { this.initRows(row); }} style={[styles.row, this.props.rowStyle]}>
                {this.generateRow(rowData)}
            </View>
        );
    }

    render = () => {
        return (
            <ListView
                ref={(l) => this.list = l}
                contentContainerStyle={[{ backgroundColor: '#fff' }, this.props.contentContainerStyle]}
                dataSource={this.ds.cloneWithRows(this.props.data.slice())}
                enableEmptySections={true}
                renderRow={this._renderRow.bind(this)}
                initialListSize={12}
                {...this.props}
            />
        );

    };
}
