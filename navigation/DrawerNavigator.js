import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";
import Profile from "../screens/Profile";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator screenOptions={{ headerShown: false }}>
                <Drawer.Screen name="Home" component={StackNavigator} />
                <Drawer.Screen name="Profile" component={Profile} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default DrawerNavigator;