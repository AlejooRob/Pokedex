import React from 'react'
import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { styles } from '../theme/appTheme'
import { usePokemonPaginated } from '../hooks/usePokemonPaginated';
import PokemonCard from '../components/PokemonCard';

const HomeScreen = () => {

  const{ top } = useSafeAreaInsets();
  const { simplePokemonList, loadPokemons } = usePokemonPaginated();

  return (
    <>
      <Image 
        source={ require('../assets/pokebola.png')}
        style= { styles.pokeBG }
      />

      <View
        style={{ alignItems: 'center' }}
      >
      
        <FlatList 
          data={ simplePokemonList }
          keyExtractor= { (pokemon) => pokemon.id }
          showsVerticalScrollIndicator={ false }
          numColumns={ 2 }

          // header
          ListHeaderComponent={(
            <Text style={{
              ...styles.title,
              ...styles.globalMargin,
              top: top + 20,
              marginBottom: top + 20,
              paddingBottom: 10 
            }}>Pokedex</Text>
          )}
          renderItem={ ({ item }) => <PokemonCard pokemon={ item } />}

          // Infinity Scroll
          onEndReached={ loadPokemons }
          onEndReachedThreshold={ 0.4 }

          ListFooterComponent= {( 
            <ActivityIndicator 
              style={{ height: 100 }} 
              size={ 20 }
              color='grey'
            />
          
          )}
        />

      </View>
      
    </>
  )
}

export default HomeScreen