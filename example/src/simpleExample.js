import React, { Component } from 'react';
import {
    View
} from 'react-native';
import styles from './styles';
import ChartView from './rn-echarts/index';
import { StackNavigator } from 'react-navigation';
import { barOption } from './data';

export default class SimpleExample extends Component {
    static navigationOptions = {
        title: 'SimpleExample',
    };
    render() {
        return (
            <View style={styles.container}>
                <ChartView
                    ref={(c) => this.chart = c}
                    option={barOption}
                />
            </View>
        );
    }
}