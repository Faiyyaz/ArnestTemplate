import React from 'react';
import WebView from 'react-native-webview';
import appStyles from '../styles/styles';
import {WebViewSource} from 'react-native-webview/lib/WebViewTypes';

export default function WebViewScreen(props: any) {
  const params = props.route.params;
  const {url} = params;

  function getSource(): WebViewSource {
    return url.startsWith('http') ? {uri: url} : {html: url};
  }

  return (
    <WebView
      originWhitelist={['*']}
      style={appStyles.pageContainer}
      source={getSource()}
    />
  );
}
