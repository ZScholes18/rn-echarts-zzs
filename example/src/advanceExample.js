import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';
import styles from './styles';
import ChartView from './rn-echarts/index';
import Table from './table';
import { StackNavigator } from 'react-navigation';
import { pieOption, tableData } from './data';
export default class extends Component {
    static navigationOptions = {
        title: 'AdvanceExample',
    };
    state = {
        highlightIndex: -1
    }
    componentDidMount() {
        this.chart.on('click', function (e) {
            window.postMessage(e.dataIndex)
        })
    }
    onMessage = e => {
        var index = e.nativeEvent.data;
        this.setState({
            highlightIndex: index
        })

    }
    render() {
        return (
            <View style={styles.container}>
                <ChartView
                    style={{ flex: 2, marginTop: 5 }}
                    ref={(c) => this.chart = c}
                    option={pieOption}
                    onMessage={this.onMessage}
                />
                <Table
                    style={{ marginTop: 5 }}
                    data={tableData}
                    highlightIndex={this.state.highlightIndex}
                    cellStyle={{ height: 40 }}
                />
            </View>
        );
    }
}