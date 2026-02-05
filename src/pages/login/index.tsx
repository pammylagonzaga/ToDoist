import React, { useState } from "react";

import { Text, View, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { style } from "./styles";
import Logo from '../../assects/logo.png';
import { themes } from "../../global/themes";
import { Input } from "../../components/Input";
import { Octicons, MaterialIcons } from "@expo/vector-icons";
import { Button } from "../../components/Button";
import {useNavigation, NavigationProp} from '@react-navigation/native'
import Routes from "../../routes/index.routes";

export default function Login() {

  const navigation = useNavigation<NavigationProp<any>>();

  const [email, setEmail] = useState('a');
  const [password, setPassword] = useState('a');
  const [showPassWord, setShowpassword] = useState(true);
  const [loading, setLoading] = useState(false);

 async function getLogin(){
   setLoading(true);
    try {
      
      if(!email || !password){
        return Alert.alert('Atenção 2', 'Informe todos os campos');
      }

      navigation.reset({routes:[{name:"BottomRoutes"}]})

    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  }

  return (
       <View style={style.container}>
      
            <View style={style.boxTop}>
              <Image 
              source={Logo}
              style={style.logo}
              resizeMode="contain"
              />
              <Text style={style.titulo}>Bem Vindo de Volta</Text>
            </View>

            <View style={style.boxMid}>
              <Input 
                value={email}
                onChangeText={setEmail}
                title="Endereço de E-mail"
                IconRight={MaterialIcons}
                iconRightName="email"
              />
              <Input 
                value={password}
                onChangeText={setPassword}
                title="Senha"
                IconRight={Octicons}
                iconRightName={showPassWord?"eye-closed":"eye"}
                secureTextEntry={showPassWord}
                onIconRightPress={()=>setShowpassword(!showPassWord)}
              />
            </View>

            <View style={style.boxBottom}>
                <Button
                  text="Entrar"
                  loading={loading}
                  onPress={()=> getLogin()}
                />
            </View>
            <Text style={style.text}>Não tem conta?<Text style={{color:themes.colors.primary}}> Crie agora!</Text></Text>
        </View>
  )
}