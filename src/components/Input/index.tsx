import React, { forwardRef, LegacyRef } from "react";

import {View, Text, TextInput, TextInputProps, TouchableOpacity} from 'react-native';
import { style } from "./styles";
import { FontAwesome, MaterialIcons, Octicons } from "@expo/vector-icons";
import { themes } from "../../global/themes";

type IconComponent = React.ComponentType<React.ComponentProps<typeof MaterialIcons>> |
                     React.ComponentType<React.ComponentProps<typeof FontAwesome>> |
                     React.ComponentType<React.ComponentProps<typeof Octicons>>

    // "?" na frente do componente quer dizer que ele não é obrigatório
    // "void" aceita funções

type Props = TextInputProps & {
    IconLeft?: IconComponent,
    IconRight?: IconComponent,
    iconLeftName?: string,
    iconRightName?: string,
    title?: string,
    onIconLeftPress?: () => void,
    onIconRightPress?: () => void
}

export const Input = forwardRef((Props:Props,ref: LegacyRef<TextInput> | null)=>{

    const {IconLeft, IconRight, iconLeftName, iconRightName, title, onIconLeftPress, onIconRightPress, ...rest} = Props

    const calculateSizeWidth = () =>{
        if(IconLeft && IconRight){
            return "80%"
        }else if(IconLeft || IconRight){
            return "90%"
        }else{
            return "100%"
        }
    }

    const calculateSizePaddingLeft= () =>{
        if(IconLeft && IconRight){
            return 0;
        }else if(IconLeft || IconRight){
            return 10;
        }else{
            return 20;
        }
    }

    // usa-se "[]" dentro do style para dizer que é um array de estylos, multiplos estilos
    return (        
        <>
            {title&&<Text style={style.titleInput}>{title}</Text>}
            <View style={[style.BoxInput,{paddingLeft:calculateSizePaddingLeft()}]}>
                {IconLeft && iconLeftName &&(
                <TouchableOpacity onPress={onIconLeftPress} style={style.Button}>
                    <IconLeft name={iconLeftName as any} size={20} color={themes.colors.gray} style={style.Icon} />
                </TouchableOpacity>
                )}
                 <TextInput 
                    style={[
                        style.Input,{width:calculateSizeWidth()}
                    ]}
                    {...rest}

                    />
                {IconRight && iconRightName &&(
                <TouchableOpacity onPress={onIconRightPress}>
                    <IconRight name={iconRightName as any} 
                               size={20} 
                               color={themes.colors.gray} 
                               style={style.Icon} />
                </TouchableOpacity>
                )}
              </View>
        </>
    )
})