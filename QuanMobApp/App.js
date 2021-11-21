// Enables strict mode: Strict mode makes it easier to write 'Secure' JavaScript
'use strict'

// React import
import * as React from 'react';
import { StyleSheet, StatusBar, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Library imports (Alphabetical order)
import { Provider, Appbar, Menu} from 'react-native-paper';

// Absolute imports from the project (Alphabetical order)
import { login } from './src/api/Authentication';
import { getDevices } from './src/api/Request';
import { getToken, setToken, delToken } from './src/api/Token';

import AlarmScreen from './src/screens/AlarmScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';
import ScanScreen from './src/screens/ScanScreen';
import SplashScreen from './src/screens/SplashScreen';

// Relative imports (Alphabetical order)

// Import * as

// Import ‘./<some file>.<some extension>


const AuthContext = React.createContext();

// screens
function LoginScreen() {
  //const [ username, setUsername ] = React.useState('test-api-user');
  //const [ password, setPassword ] = React.useState('MDD$kF9BztHQJRt');
  const [ username, setUsername ] = React.useState('jimmy.van.viersen@gmail.com');
  const [ password, setPassword ] = React.useState('Exitius@HSL2021');
  //const [ username, setUsername ] = React.useState('');
  //const [ password, setPassword ] = React.useState('');
  const [ errorMessage, setErrorMessage ] = React.useState('');

  const { login } = React.useContext(AuthContext);

  function checkInput () {
    // check for email input
    if (!username.trim()) {
      setErrorMessage('Please enter username...')
      return
    }
    // check for password input
    if (!password.trim()) {
      setErrorMessage('Please enter password...')
      return
    }
    // if check successful
    login({ username, password })
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' />
      <Image source={require('./src/assets/icons/quan-logo.png')} />
      <TextInput
        style={styles.input}
        placeholder='Username'
        value={username}
        onChangeText={setUsername}
        keyboardType='email-address'
        autoCapitalize='none'
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        keyboardType='visible-password'
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        title='Login'
        onPress={() => checkInput()}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null }
    </View>
  );
}

// Homescreen
function HomeTest() {

  const deviceList = [];
  const [ errorMessage, setErrorMessage ] = React.useState('');

  React.useEffect(() => {
    getDevices()
    .then((res) => {
      res.data.results.forEach(Object => {
        deviceList.push(Object)
      });
      //console.log(deviceList.length)
      //console.log(deviceList)
      
    })
    .catch((err) => {
      setErrorMessage(err.message)
    })
  });

  return (
      <NavTabs />
  );
}

// BottomTabNavigation
const Tab = createMaterialBottomTabNavigator();

const NavTabs = () => {

  return (
    <Tab.Navigator
      initialRouteName='Dashboard'
      activeColor='#54BE8C'
      barStyle={{
        backgroundColor: '#2B3647',
        position: 'absolute',
      }}
    >
      <Tab.Screen
        name='Alarm'
        component={AlarmScreen}
        options={{
          tabBarLabel: 'Alarms',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='bell-ring' color={color} size={24} />
          )
        }}
      />
      <Tab.Screen
        name='Dashboard'
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
          //unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='view-dashboard' color={color} size={24} />
          )
        }}
      />
      <Tab.Screen
        name='Map'
        component={MapScreen}
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='map-search' color={color} size={24} />
          )
        }}
      />
      <Tab.Screen
        name='Scan'
        component={ScanScreen}
        options={{
          tabBarLabel: 'Scan',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='qrcode-scan' color={color} size={24} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

// StackNavigation, is used in App
const Stack = createStackNavigator();

// App
export default function App() {

  const [ state, dispatch ] = React.useReducer(
    // switch case
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isLogout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isLogout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isLogout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // fetch the token from storage then navigate to the appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        userToken = await getToken()
        console.log(`LOGIN: ${JSON.stringify(userToken)}`)
      } catch (e) {
        // Restoring token failed
        console.log(`Error: ${e.message}`)
      }
      // After restoring token, we may need to validate it in production apps
      if (userToken !== null) {
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        dispatch({ type: 'RESTORE_TOKEN', token: userToken });
      } else {
        console.log(`NO TOKEN FOUND`)
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      login: async (credentials) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage'.

        await login(credentials)
        .then( async (res) => {
          if (res.status === 200) {
            console.log(JSON.stringify(`LOGIN: ${JSON.stringify(res)}`))
            setToken(res)
          }
        })
        .catch((err) => console.log(err.status))

        dispatch({ type: 'SIGN_IN', token: '' })
      },
      logout: () => {
        // When logging out, delete registered token
        delToken()
        dispatch({ type:'SIGN_OUT' })
      },
    }),
    []
  );

  function CustomAppBar() {

    const { logout } = React.useContext(AuthContext);

    const [visisble, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
      <Appbar.Header style={{ backgroundColor: '#2B3647' }}>
        <Appbar.Content title='Quantified' subtitle='Sensor Technology' />
          <Menu
            visible={visisble}
            onDismiss={closeMenu}
            anchor={
              <Appbar.Action icon='menu' color='#fff' onPress={openMenu}/>
            }
          >
          <Menu.Item onPress={() => { logout() }} title='Logout' icon='logout'/>
        </Menu>
      </Appbar.Header>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <Provider>
        <NavigationContainer>
            <Stack.Navigator>
              {state.isLoading ? (
                // We haven't finished checking for the token yet
                <Stack.Screen
                  name='Welcome'
                  component={SplashScreen}
                />
              ) : state.userToken == null ? (
                // No token found, user isn't signed in
                <Stack.Screen
                  name='Login'
                  component={LoginScreen}
                  options={{
                    title: '',
                    // When logging out, a pop animation feels intuitive
                    animationTypeForReplace: state.isLogout ? 'pop' : 'push',
                  }}
                />
              ) : (
                // User is signed in
                <Stack.Screen
                  name='Home'
                  component={HomeScreen}
                  options={{
                    header: (props) => <CustomAppBar {...props} />,
                  }}
                />
              )}
            </Stack.Navigator>
          </NavigationContainer>
      </Provider>
    </AuthContext.Provider>
  );
}

// css styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF2F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {

  },
  text: {
    fontSize: 20,
  },
  input: {
    height: 40,
    width: 300,
    margin: 10,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    color: 'grey',
  },
  button: {
    alignItems: 'center',
    margin: 10,
    padding: 10,
    width: 300,
    backgroundColor: '#54BE8C',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15 ,
    shadowOffset : { width: 1, height: 13},
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
  },
  errorText: {
    color: 'red',
  },
});
