import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import SimpleExample from './simpleExample';

class Home extends Component {
    static navigationOptions = {
        title: 'Welcome',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Button
                    onPress={() => navigate('SimpleExample')}
                    title="SimpleExample"
                />
            </View>
        )
    }
}

const SimpleApp = StackNavigator({
    Home: { screen: Home },
    SimpleExample: { screen: SimpleExample }
});

export default SimpleApp;