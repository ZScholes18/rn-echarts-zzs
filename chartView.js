import React, { PureComponent } from 'react';
import {
    View,
    Button,
    WebView,
    Platform
} from 'react-native';
const resolveAssetSource = require('react-native/Libraries/Image/resolveAssetSource.js');
import _ from 'lodash';

// transform object to string
//copy from https://github.com/somonus/react-native-echarts
function toString(obj) {
    return JSON.stringify(obj, function (key, val) {
        if (typeof val === 'function') {
            return `~--demo--~${val}~--demo--~`;
        }
        return val;
    }).replace('~--demo--~', '').replace('~--demo--~', '').replace(/\\n/g, '');
}

export default class ChartView extends PureComponent {
    constructor(props) {
        super(props);
        this.isLoaded = false;
        this.eventsQueue = [];
    }
    postMessage(type, params) {
        var data = {
            type: type,
            params: params
        };
        var _this = this;
        var action = function () {
            _this.webView.postMessage(toString(data));
        };
        if (!this.isLoaded) {
            this.eventsQueue.push(action);
        }

        else {
            action();
        }
    }
    setOption(option) {
        this.postMessage.call(this, 'setOption', [option]);
    }
    on(name, handle) {
        this.postMessage.call(this, 'on', [name, handle]);
    }
    off(name, handle) {
        this.postMessage.call(this, 'off', [name, handle]);
    }
    dispatchAction(params) {
        this.postMessage.call(this, 'dispatchAction', [params]);
    }
    componentWillReceiveProps(nextProps) {
        if(!_.isEqual(this.props.option,nextProps.option)){
            this.postMessage('setOption', [nextProps.option]);
        }
    }
    onLoad = () => {
        this.isLoaded = true;
        this.postMessage('setOption', [this.props.option]);
        for (let i = 0; i < this.eventsQueue.length; i++) {
            this.eventsQueue[i]();
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }
    getUri() {
        let source;
        if (__DEV__) {
            source = require('./assest/index.html');
        } else {
            source = { uri: 'file:///android_asset/echarts/assets/index.html' };
        }

        return source;
    }

    render = () => {
        var uri = this.getUri();
        return <View ref={w => this.view = w} style={[{ flex: 1 }, this.props.style]} {...this.props}>
            <WebView
                ref={w => this.webView = w}
                source={uri}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                onLoad={this.onLoad}
                onMessage={this.props.onMessage}
            />
        </View>;
    }
}