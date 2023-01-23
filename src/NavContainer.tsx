import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  MoonIcon,
  Pressable,
  StatusBar,
  SunIcon,
  useColorMode,
  useTheme,
} from 'native-base';
import React, {FunctionComponent, useCallback, useMemo} from 'react';
import HomeScreen from './screens/Home';
import {ROUTES} from './utils/types';

const Stack = createNativeStackNavigator();

/**
 * NavContainer props
 */
interface Props {}

/**
 * NavContainer Component
 */
const NavContainer: FunctionComponent<Props> = ({...props}) => {
  const {colorMode, toggleColorMode} = useColorMode();
  const theme = useTheme();

  const isDark = useMemo(() => colorMode === 'dark', [colorMode]);

  const navTheme = useMemo(() => {
    return {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: theme.colors.coolGray[isDark ? 800 : 100],
        card: theme.colors.coolGray[isDark ? 900 : 50],
        text: theme.colors.text[isDark ? 50 : 900],
      },
    };
  }, [isDark, theme.colors]);

  const headerRight = useCallback(
    () => (
      <Pressable onPress={toggleColorMode}>
        {isDark ? <MoonIcon /> : <SunIcon />}
      </Pressable>
    ),
    [isDark, toggleColorMode],
  );
  return (
    <>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator
          screenOptions={{
            headerTintColor: theme.colors.text[isDark ? 50 : 900],
          }}>
          <Stack.Screen
            name={ROUTES.HOME}
            component={HomeScreen}
            options={{
              title: 'Hacker News',
              headerRight,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default NavContainer;
