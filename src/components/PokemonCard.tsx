import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SimplePokemon } from '../interfaces/PokemonInterfaces';
import { FadeInImage } from './FadeInImage';
import ImageColors from 'react-native-image-colors';
import { useNavigation } from '@react-navigation/native';

const windowWith = Dimensions.get('window').width

interface Props {
    pokemon: SimplePokemon;
}

const PokemonCard = ({ pokemon }: Props ) => {

    const [ bgColor, setBgColor ] = useState('grey');
    const isMounted = useRef(true);

    const navigator = useNavigation();
    

    useEffect(() => {

        ImageColors.getColors( pokemon.picture, { fallback: 'grey'})
            .then( colors => {

                if( !isMounted.current) return;
                
                ( colors.platform === 'ios')
                    ? setBgColor( colors.primary || 'grey')
                    : setBgColor( colors.dominant || 'grey')
            });
        
            return () => {
                isMounted.current = false
            }

    }, [])
    
  return (
    <TouchableOpacity
        activeOpacity={ 0.9 }
        onPress={ () => navigator.navigate('PokemonScreen' as never, {simplePokemon:pokemon, color: bgColor} as never) }
    >
      <View style={{
          ...styles.cardContainer,
          width: windowWith * 0.4,
          backgroundColor: bgColor
      }}>
          <View>
              <Text style={  styles.name }>
                  { pokemon.name }
                  { '\n#' + pokemon.id }
              </Text>
          </View>

          <View style={ styles.pokeballContainer}>
              <Image 
                source={ require('../assets/pokebola-blanca.png')}
                style={ styles.pokeball}
            />
          </View>

          <FadeInImage 
            uri={ pokemon.picture }
            style={ styles.pokemonImage }
          />            

      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        // backgroundColor: 'grey',
        width: 160,
        height:120,
        marginBottom: 25,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 10
    },
    pokeball:{
        width: 100,
        height: 100,
        position: 'absolute',
        right: -20,
        bottom: -20
    },
    pokemonImage: {
        width: 120,
        height: 120,
        position: 'absolute',
        right: -8,
        bottom: -5
    },
    pokeballContainer: {
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: 0,
        right: 0,
        overflow: 'hidden',
        opacity: 0.6
    }
});

export default PokemonCard