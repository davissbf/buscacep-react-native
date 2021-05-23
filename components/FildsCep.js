import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

export default function FildsCep({title, fildType, value, ...rest}) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputStyle}
        placeholder={title}
        keyboardType={fildType}
        value={value}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#e6e6ff',
    paddingHorizontal: 22,
    marginTop: 3,
    borderRadius: 35,
  },
  inputStyle: {
    backgroundColor: '#e6e6ff',
    color: '#111',
    fontSize: 18,
    paddingHorizontal: 10,
    width: '100%',
  },
});
