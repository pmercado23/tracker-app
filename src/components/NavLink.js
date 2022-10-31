import React, { useContext} from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Spacer from "./Spacer";
import { withNavigation } from "react-navigation";
import { Text } from "react-native-elements";
import { Context as AuthContext } from '../context/AuthContext';

const NavLink = ({navigation, text, routeName, clearMessage}) => {
    const { clearErrorMessage } = useContext(AuthContext);
    const clearMessageHandler = () => {
        navigation.navigate(routeName);
        clearErrorMessage()
    }
    return (
        <TouchableOpacity onPress={() => {clearMessageHandler()}}>
            <Spacer>
            <Text style={styles.link} >{text}</Text>
            </Spacer>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    link: {
        color: 'blue'
    }
});

export default withNavigation(NavLink);
