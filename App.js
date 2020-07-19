/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
} from 'react-native';

import { Picker } from '@react-native-community/picker';


const THEME_COLOR = '#BDFCC9';

const SCALES = ['Cups','Gallons','Quarts','Pints','Ounces','Tablespoons','Teaspoons'];

function getConvertedAmount(value, convert) {
  const input = parseFloat(value);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.changeBaseUnit = this.changeBaseUnit.bind(this);
    this.changeConvertToUnit = this.changeConvertToUnit.bind(this);
    this.changeBaseAmount = this.changeBaseAmount.bind(this);
    this.changeConvertAmount = this.changeConvertAmount.bind(this);
    this.state = { baseUnit: 'Cups', convertToUnit: 'Ounces', baseAmount: 1, chosenPick: ''};
  }
  
  changeBaseUnit(selectedValue) {
    this.setState({ baseUnit: selectedValue});
  }

  changeConvertToUnit(e) {
    this.setState({
      convertToUnit: e.selectedValue
    });
  }

  changeBaseAmount(value) {
    this.setState({
      baseAmount: value
    });
  }

  changeConvertAmount(e) {
    this.setState({
      result: e.value
    });
  }

  toCups = (value) => {
    if (this.state.baseUnit === 'Ounces') {
      return String(value / 8);
    } else {
      return String(value);
    }
  }

  toOunces = (value) => {
    if (this.state.baseUnit === 'Cups') {
      return String(value * 8);
    } else {
      return String(value);
    }
  }

  toQuarts = (value) => {
    if (this.state.baseUnit === 'Cups') {
      return String(value / 4);
    }
  }

  converter() {
    if (this.state.baseUnit === 'Cups' && this.state.convertToUnit === 'Ounces') {
      return getConvertedAmount(this.state.baseAmount, this.toOunces);
    } else if (this.state.baseUnit === 'Cups' && this.state.convertToUnit === 'Quarts') {
      return getConvertedAmount(this.state.baseAmount, this.toQuarts);
    } else {
      return this.state.baseAmount
    }
  }

  render() {
    const {baseUnit, convertToUnit, baseAmount} = this.state;
    const scaleChoice = SCALES.map(scale =>
      <Picker.Item label={scale} key={scale} value={scale} />
    );
    const result = this.converter();

    return (
      <SafeAreaView style={styles.topSafeArea}>
        <ScrollView style={styles.bottomSafeArea}>
          <View style={styles.container}>
            <View>
              <Text style={styles.header}>Unit in {baseUnit}</Text>
              <View className="input-select">
                <TextInput keyboardType={'numeric'} style={styles.input} value={String(baseAmount)}
                  onChangeText={(value) => this.changeBaseAmount(value)} />
                <View className="select">
                  <Picker selectedValue={baseUnit} onValueChange={(itemValue) => this.setState({ baseUnit: itemValue })}>
                     {scaleChoice}
                  </Picker>
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.header}>Unit in {convertToUnit}</Text>
              <View className="input-select">
                <TextInput keyboardType={'numeric'} style={styles.input} value={String(result)}
                  onChangeText={(text) => this.changeConvertAmount(text)} />
                <View className="select">
                  <Picker selectedValue={convertToUnit} onValueChange={(itemValue) => this.setState({ convertToUnit: itemValue })}>
                    {scaleChoice}
                  </Picker>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  topSafeArea: {
    flex: 1,
    fontSize: 16,
    backgroundColor: THEME_COLOR
  }, 
  bottomSafeArea: {
    backgroundColor: THEME_COLOR,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: '#337147',
    borderRadius: 4,
    fontSize: 18,
    paddingTop: 16,
    paddingBottom: 16,
    marginRight: 16,
    marginLeft: 16,
    textAlign: 'center'
  },
  scrollView: {
    backgroundColor: THEME_COLOR,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  header: {
    color: '#337147',
    fontWeight: '700',
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    marginTop: 64,
    paddingHorizontal: 24
  },
});

export default Calculator;
