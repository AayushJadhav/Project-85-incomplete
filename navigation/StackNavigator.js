import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import TabNavigator from './TabNavigator';
import PostScreen from '../screens/PostScreen';

const Stack = createStackNavigator()

export default function StackNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Tab" component={TabNavigator}></Stack.Screen>
            <Stack.Screen name="PostScreen" component={PostScreen}></Stack.Screen>
        </Stack.Navigator >
    )
}
