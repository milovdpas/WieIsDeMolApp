import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import WalktroughScreen from './screens/WalktroughScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import {Colors} from './assets/Stylesheet';
import {useUser} from "./utils/contexts/UserContext";
import RegistrationScreen from "./screens/RegistrationScreen";
import GroupAdminScreen from "./screens/GroupAdminScreen";

const MainStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();


const StartRouting = () => {
    return (
        <MainStack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'fade',
                animationDuration: 100,
                contentStyle: {
                    backgroundColor: Colors.transparent,
                },
            }}>
            <MainStack.Screen name="Start" component={WalktroughScreen}/>
            <MainStack.Screen name="Registration" component={RegistrationScreen}/>
            <MainStack.Screen name="Home" component={HomeRouting}/>
        </MainStack.Navigator>
    );
};

const headerStyling = {
    title: '',
    headerStyle: {
        backgroundColor: Colors.transparent,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
    },
    headerShadowVisible: false,
    headerBackTitleVisible: false,
    headerTintColor: Colors.white,
};

const HomeRouting = () => {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerShown: true,
                animation: 'fade',
                animationDuration: 100,
                contentStyle: {
                    backgroundColor: Colors.transparent,
                },
            }}
            initialRouteName="Home">
            <HomeStack.Screen name="Home" component={HomeScreen} options={headerStyling}/>
            <HomeStack.Screen name="GroupAdmin" component={GroupAdminScreen} options={headerStyling}/>
            <HomeStack.Screen name="Leaderboard" component={LeaderboardScreen} options={headerStyling}/>
        </HomeStack.Navigator>
    );
};

const Navigation = () => {
    const {user} = useUser();
    return (
        <NavigationContainer>
            {!user ? StartRouting() : HomeRouting()}
        </NavigationContainer>
    );
};

export default Navigation;
