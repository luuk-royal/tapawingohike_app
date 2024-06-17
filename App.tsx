import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

import NotificationToast from './components/NotificationToast';
import Header from './components/Header';
import HikePage from './pages/HikePage';
import InfoPage from './pages/InfoPage';
import { NavigationContainer } from '@react-navigation/native';

type RootStackParamList = {
  Login: undefined;
  Hike: undefined;
  Info: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const Stack = createStackNavigator<RootStackParamList>();

function LoginScreen({ navigation }: Props) {
  const [teamCode, setTeamCode] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'default'>('default');

  const handleLogin = () => {
    console.log('Logging in with team code:', teamCode);
    if (teamCode === 'expectedCode') {
      setToastMessage('Login successful!');
      setToastType('success');
      setShowToast(true);
      setTimeout(() => {
        navigation.navigate('Hike');
      }, 1500); // Navigate after 1.5 seconds
    } else {
      setToastMessage('Login failed: Invalid team code');
      setToastType('error');
      setShowToast(true);
    }
  };

  const hideToast = () => {
    setShowToast(false);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Header />
          <TextInput
            label="Team Code"
            value={teamCode}
            onChangeText={setTeamCode}
            style={styles.input}
          />
          <Button mode="contained" onPress={handleLogin}>
            Inloggen
          </Button>
          <TouchableOpacity style={styles.footerLink} onPress={() => navigation.navigate('Info')}>
            <Text style={styles.footerText}>Hoe werkt deze app?</Text>
            <FontAwesome name="question-circle" size={20} color="black" />
          </TouchableOpacity>
        </Card.Content>
      </Card>

      <NotificationToast
        message={toastMessage}
        type={toastType}
        showToast={showToast}
        onHide={hideToast}
      />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Hike" component={HikePage} />
        <Stack.Screen name="Info" component={InfoPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bcebdf',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  input: {
    marginBottom: 30,
    marginTop: 100,
  },
  footerLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  footerText: {
    marginRight: 10,
    marginLeft: 10,
  },
});
