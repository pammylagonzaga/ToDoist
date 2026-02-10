import React, { forwardRef } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { themes } from "../../global/themes";


export const style = StyleSheet.create({
    container:{
        width:70,
        height:30,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: themes.colors.red,
        borderRadius:4,
    }

})