import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const cardWidth = width * 0.7; // Largura do card
  const cardMarginRight = 15; // Margem direita do card
  const [currentScrollX, setCurrentScrollX] = useState(0);

  // Dados mockados para os eventos do carrossel
  const events = [
    {
      id: '1',
      image: require('../../assets/images/festajunina.jpg'), // Imagem do ExpoEcomm
      text: 'Campinas Innovation Week...',
      details: 'Pátio Ferroviário de Campinas - ...\n09 de Jun a 13 de Jun',
    },
    {
      id: '2',
      image: require('../../assets/images/festajunina.jpg'),
      text: 'Ceará Trap Music Festival',
      details: 'Fortaleza - CE | Sábado, 28 Set. • 19h',
    },
    {
      id: '3',
      image: require('../../assets/images/festajunina.jpg'),
      text: 'Festa Junina APAE',
      details: 'APAE 2025 | Terça-feira, 14 Jun. • 13h',
    },
    {
      id: '4',
      image: require('../../assets/images/festajunina.jpg'),
      text: 'Mega Encontro Tech',
      details: 'São Paulo - SP | Sexta-feira, 05 Dez. • 09h',
    },
    {
      id: '5',
      image: require('../../assets/images/festajunina.jpg'),
      text: 'Conferência de IA',
      details: 'Rio de Janeiro - RJ | Quarta-feira, 20 Nov. • 10h',
    },
  ];

  const handleLoginPress = () => {
    router.push('/login');
  };

  const handleEventPress = (eventId: string) => {
    router.push({ pathname: '/eventdescription', params: { eventId: eventId } });
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setCurrentScrollX(event.nativeEvent.contentOffset.x);
  };

  const scrollLeft = () => {
    if (scrollViewRef.current) {
      const newX = Math.max(0, currentScrollX - (cardWidth + cardMarginRight));
      scrollViewRef.current.scrollTo({ x: newX, animated: true });
    }
  };

  const scrollRight = () => {
    if (scrollViewRef.current) {
      const totalContentWidth = events.length * (cardWidth + cardMarginRight);
      const maxScrollX = totalContentWidth - width + cardMarginRight;
      const newX = Math.min(maxScrollX, currentScrollX + (cardWidth + cardMarginRight));
      scrollViewRef.current.scrollTo({ x: newX, animated: true });
    }
  };

  return (
    <ThemedView style={styles.mainContainer}>
      <SafeAreaView style={styles.safeArea}>
        {/* Top Bar / Header */}
        <LinearGradient
          colors={['#ffca1a', '#ffca1a']} // Azul mais escuro
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.topBar}
        >
          <TouchableOpacity onPress={handleLoginPress} style={styles.loginButton}>
            <ThemedText style={styles.loginButtonText}>Login</ThemedText>
          </TouchableOpacity>
        </LinearGradient>

        {/* Corpo principal com azul mais claro */}
        <ThemedView style={styles.bodyContainer}>
          {/* Logo no centro, pegando a parte de cima e o corpo */}
          <Image
            source={require('../../assets/images/SmartEventos1.png')} // Usando SmartEventos2.png
            style={styles.centerLogo}
          />

          {/* Texto "Eventos APAE" com fundo amarelo */}
          <ThemedView style={styles.eventsApaeContainer}>
            <ThemedText style={styles.eventsApaeText}>Eventos APAE</ThemedText>
          </ThemedView>

          {/* Carrossel de Eventos */}
          <ThemedView style={styles.carouselWrapper}>
            <ScrollView
              ref={scrollViewRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.eventsCarousel}
              snapToInterval={cardWidth + cardMarginRight}
              decelerationRate="fast"
              onScroll={handleScroll}
              scrollEventThrottle={16}
            >
              {events.map(event => (
                <TouchableOpacity key={event.id} style={styles.eventCard} onPress={() => handleEventPress(event.id)}>
                  <Image source={event.image} style={styles.eventImage} />
                  <ThemedText style={styles.eventCardText}>{event.text}</ThemedText>
                  <ThemedText style={styles.eventCardDetails}>{event.details}</ThemedText>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </ThemedView>
        </ThemedView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff099',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  topBar: {
    width: '100%',
    height: 220, // Ajustado para dar espaço à logo e ao corpo
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 20,
    paddingRight: 25,
    borderRadius: 30, // Arredondamento conforme a imagem
     // Arredondamento conforme a imagem
    position:'sticky', // Para o zIndex funcionar corretamente
    zIndex: 2, // Garante que a topBar fique por cima
    top:0,
    //marginBottom: 20,
     
  },
  loginButton: {
    backgroundColor: '#fff', // azul para o botão
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 10, // Ajuste para posicionamento
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000', // Texto braco
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: '#fff099', // Amarelo mais claro
    alignItems: 'center',
    //paddingTop: 80, // Espaço para a logo que se sobrepõe

    marginTop: 0, // Remove o marginTop negativo
    zIndex: 1,
    
  },
  centerLogo: {
    width: 150, // Ajuste o tamanho conforme necessário
    height: 150, // Ajuste o tamanho conforme necessário
    resizeMode: 'contain',
    position: 'relative', // Posiciona a logo de forma absoluta
    //top: 55, // Ajustado para ficar sobre a topBar (150px de altura / 2 - metade da altura da logo)
    zIndex: 1, // Garante que a logo fique acima da topBar
  paddingBottom: 10,
    borderRadius: 40, // Arredondamento para o corpo
  },
  eventsApaeContainer: {
    backgroundColor: '#FFD700', // Fundo amarelo para o texto
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 80, // Ajusta a posição abaixo da logo
  },
  eventsApaeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', // Texto preto
  },
  carouselWrapper: {
    width: '100%',
    padding: 20,
  },
  eventsCarousel: {
    paddingBottom: 20,
    paddingRight: 40, // Para garantir que o último item não fique colado na borda
  },
  eventCard: {
    width: width * 0.7,
    marginRight: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  eventImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  eventCardText: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    color: '#fff',
  },
  eventCardDetails: {
    fontSize: 13,
    color: '#666',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});
