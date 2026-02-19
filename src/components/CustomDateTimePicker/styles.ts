import { StyleSheet, TextInput, View } from "react-native";
import { themes } from "../../global/themes";


export const style = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: themes.colors.transparente,

    },
    container: {
        width: '80%',
        padding: 16,
        backgroundColor: "white",
        elevation: 5,
        alignItems: 'center',
    }

})
