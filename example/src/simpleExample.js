import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';
import styles from './styles';
import ChartView from './rn-echarts/index';
import { StackNavigator } from 'react-navigation';
import { barOption } from './data';
export default class extends Component {
    static navigationOptions = {
        title: 'SimpleExample',
    };
    render() {
        return (
            <View style={styles.container}>
                <ChartView
                    option={barOption}
                />
            </View>
        );
    }
}