import React, { forwardRef } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { themes } from "../../global/themes";


export const style = StyleSheet.create({
    BoxInput:{
        width: "100%",
        height: 40,
        borderWidth: 1,
        borderRadius: 40,
        borderColor: themes.colors.lightray,
        backgroundColor: themes.colors.bgScreen,
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal:20,

    },

    Input:{
        width: "100%",
        height: "100%",
        borderRadius: 40,
        backgroundColor: themes.colors.bgScreen,
    },

    titleInput:{
        width: "100%",
        marginLeft: 5,
        color: themes.colors.gray,
        marginTop: 20,
    },

    Icon:{
        width:"100%"
    },

    Button:{
        width:"10%",
    },

})