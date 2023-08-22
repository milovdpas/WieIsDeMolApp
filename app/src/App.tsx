import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './Navigation';
import {Colors} from './assets/Stylesheet';
import {UserProvider} from "./utils/contexts/UserContext";

function App() {
    return (
        <GestureHandlerRootView style={{flex: 1, backgroundColor: Colors.purple}}>
            <UserProvider>
                <SafeAreaProvider>
                    <Navigation/>
                </SafeAreaProvider>
            </UserProvider>
        </GestureHandlerRootView>
    );
}

export default App;
