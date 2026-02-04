import React, { forwardRef } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { themes } from "../../global/themes";


export const style = StyleSheet.create({
    button:{
        width: 200,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: themes.colors.primary,
        borderRadius: 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 8,
    },
    textButton:{
        fontSize: 18,
        color: themes.colors.secondary,
        fontWeight: "bold"
    },

})