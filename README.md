# rn-echarts-zzs
Baidu Echarts for react-native depends on the propties onMessage&amp;&amp;postMessage of the component WebView  
react-native version >= 0.40

![](./example/screenShot/simple.gif)![](./example/screenShot/advance.gif)

## propties
* option
* onMessage
* other View propties

## methods
* setOption
* on
* off
* dispatchAction 

## Install
npm install rn-echarts-zzs --save

## Usage

```javascript 
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
```