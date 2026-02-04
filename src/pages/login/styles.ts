import { Dimensions, StyleSheet } from "react-native";
import { themes } from "../../global/themes";

export const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    },
    boxTop: {
        height: Dimensions.get('window').height / 4,
        width: '100%',
       // backgroundColor: "lightblue",
        alignItems: "center",
        justifyContent: "center"
    },
    boxMid: {
        height: Dimensions.get('window').height / 4,
        width: '100%',
        //backgroundColor: "red",
        paddingHorizontal: 37,
        alignItems: "center",
        justifyContent: "center"
    },
    boxBottom: {
        height: Dimensions.get('window').height / 3,
        width: '100%',
        // backgroundColor: "green",
        alignItems: "center",
        marginTop: 20
    },
    logo: {
        width: 100,
        height: 100
    },
    titulo:{
        fontWeight: "bold",
        marginTop: 40,
        fontSize: 18
    },

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
    text:{
        fontSize: 16,
        color: themes.colors.gray,
        marginTop: 20
    }

});