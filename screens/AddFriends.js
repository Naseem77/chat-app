import { StyleSheet, Text, View, ScrollView, Pressable, ActivityIndicator } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { UserType } from "../UserContext";
import axios from "axios";
import User from "../components/User";

const AddFriends = () => {
  const { userId, setUserId } = useContext(UserType);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const acceptedFriendsList = async() => {
      try {
        setIsLoading(true)
        axios
        .get(`http://localhost:8000/users/${userId}`)
        .then((response) => {
          setUsers(response.data);
          setIsLoading(false)
        })
        .catch((error) => {
          console.log("error retrieving users", error);
        });
      } catch(err){
        console.log("error showing the accepted friends",err);
      } 
    }
    acceptedFriendsList()
  },[])

  return (
    <View>
      <View style={{ padding: 10 }}>
        {users.map((item, index) => (
          <User key={index} item={item} />
        ))}
      </View>
    </View>
  )
}

export default AddFriends

const styles = StyleSheet.create({})