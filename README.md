# react-native-date-range-picker
A simple Date Range Picker implemented with [react-native-calendars](https://github.com/wix/react-native-calendars).

![date-range-picker](https://raw.githubusercontent.com/lazaronixon/react-native-date-range-picker/master/screenshots/shot1.png)

## Getting started
1. Install [react-native-calendars](https://github.com/wix/react-native-calendars/blob/master/README.md#installation).
2. Copy DateRangePicker.js to your project.


## Usage

```javascript
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import DateRangePicker from './DateRangePicker';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <DateRangePicker
          initialRange={['2018-04-01', '2018-04-10']}
          onSuccess={(s, e) => alert(s + '||' + e)}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
```

## Properties

#### `initialRange([fromDate, toDate])`
An Initial range for component. The fromDate is used to set current month.

#### `onSuccess(fromDate, toDate)`
Function executed when a valid range is selected.

#### `theme`
Extra theme properties.
- markColor
- markTextColor
