/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
} from 'react-native';

import FildsCep from './components/FildsCep';

export default App => {
  const [cep, setCep] = useState('');
  const [adress, setAdress] = useState('');
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState('');

  async function callCep(cep) {
    const validatedCep = cep.replace(/[^0-9]/g, '');

    setSearching(true);
    if (validatedCep === '') {
      setSearching(false);
    }

    if (validatedCep.length > 8) {
      setError('CEP com mais de 8 digítos.');
      setSearching(false);
      setAdress('');
      return;
    }

    if (validatedCep.length === 8) {
      await fetch(`https://viacep.com.br/ws/${validatedCep}/json`)
        .then(response => response.json())
        .then(obj => {
          if (obj.erro) {
            setError('Ops CEP inválido..');
            return;
          }

          setAdress(obj);
          setError('');
        })
        .catch(() => {
          setError('Error ao buscar CEP.');
          setAdress('');
        })
        .finally(() => setSearching(false));
    }
  }

  function clearFilds() {
    setAdress('');
    setCep('');
  }

  return (
    <ImageBackground
      source={require('./src/assets/back.png')}
      style={styles.background}>
      <View style={{paddingHorizontal: 45, marginTop: 25}}>
        <Text style={styles.paragraph}>Busca CEP</Text>
        <Text style={styles.descriptionParagraph}>
          No primeiro campo digite um CEP.
        </Text>

        {error !== '' && <Text style={styles.textError}>{error}</Text>}
        {searching && (
          <Text style={styles.textResearching}>Buscando CEP...</Text>
        )}
        <FildsCep
          autoFocus={true}
          onFocus={text => setCep(text)}
          onChangeText={text => callCep(text)}
          clearTextOnFocus={true}
          title="CEP"
          fildType="number-pad"
          maxLength={9}
          value={cep}
        />
        <FildsCep title="Endereço" value={adress.logradouro} />
        <FildsCep title="Casa" />
        <FildsCep title="Complemento" />
        <FildsCep title="Bairro" value={adress.bairro} />
        <FildsCep title="Cidade" value={adress.localidade} />
        <FildsCep title="UF" value={adress.uf} />
        <View style={styles.buttonClear}>
          <Text onPress={clearFilds} style={styles.textButtonClear}>
            Limpar Campos
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  paragraph: {
    color: '#5222db',
    fontSize: 40,
    fontWeight: 'bold',
  },
  descriptionParagraph: {
    color: '#9f9cdf',
    fontSize: 16,
    lineHeight: 22,
    paddingVertical: 10,
    paddingRight: 85,
    marginBottom: 35,
  },
  buttonClear: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#522268',
    padding: 10,
    marginTop: 30,
    borderRadius: 46,
  },
  textButtonClear: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
  },
  textError: {
    color: '#d81e5b',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textResearching: {
    color: '#b7b5e4',
    fontSize: 18,
    textAlign: 'center',
  },
});
