import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React, { useLayoutEffect, useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import UserChat from '../components/UserChat'
import { AntDesign } from '@expo/vector-icons';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  const [acceptedFriends, setAcceptedFriends] = useState([])
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Chating</Text>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <AntDesign onPress={() => navigation.navigate("AddFriends")} name="adduser" size={24} color="black" />
          <MaterialIcons
            onPress={() => navigation.navigate("Friends")}
            name="people-outline"
            size={24}
            color="black"
          />
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try{
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);

      const response = await fetch(`http://localhost:8000/accepted-friends/${userId}`)
        const data = await response.json();
        if(response.ok){
          setAcceptedFriends(data)
        }
      } catch(err){
        console.log(err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <Pressable>
      {acceptedFriends.map((item, index) => (
        <UserChat key={index} item={item}/>
      ))}
    </Pressable>
  </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});