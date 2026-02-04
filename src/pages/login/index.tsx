import React, { useState } from "react";

import { 
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator
 } from "react-native";

import { style } from "./styles";
import Logo from '../../assects/logo.png';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { themes } from "../../global/themes";
import { Input } from "../../components/Input";
import { Octicons } from "@expo/vector-icons";
import { Button } from "../../components/Button";
 
export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassWord, setShowpassword] = useState(true);
  const [loading, setLoading] = useState(false);

 async function getLogin(){
   setLoading(true);
    try {
      
      if(!email || !password){
        return Alert.alert('Atenção 2', 'Informe todos os campos');
      }

      console.log("LOGOU!")
          
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
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