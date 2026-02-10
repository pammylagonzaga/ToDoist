import React from "react";
import { style } from "./styles";
import { View } from "react-native";

type Props = {
    color:string
}

export function Ball({...rest}:Props){
    return (
        <View style={[style.ball,{borderBlockColor:rest.color||'gray'}]}/>

    )
}