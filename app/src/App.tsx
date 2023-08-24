import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './Navigation';
import {Gradients} from './assets/Stylesheet';
import {UserProvider} from "./utils/contexts/UserContext";
import LinearGradient from 'react-native-linear-gradient';

function App() {
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <LinearGradient
                colors={Gradients.secondary}
                style={{flex: 1}}
                start={{ x: 0, y: 0.7 }}
                end={{ x: 1, y: 1.5 }}
                locations={[0, 0.15, 0.3]}
            >
                <UserProvider>
                    <SafeAreaProvider>
                        <Navigation/>
                    </SafeAreaProvider>
                </UserProvider>
            </LinearGradient>
        </GestureHandlerRootView>
    );
}

export default App;
