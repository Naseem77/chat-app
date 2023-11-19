import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useContext, useState, useLayoutEffect} from "react";
import axios from "axios";
import { UserType } from "../UserContext";
import FriendRequest from "../components/FriendRequest";
import { useNavigation } from "@react-navigation/native";

const FriendsScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [friendRequests, setFriendRequests] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    fetchFriendRequests();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Friend Requests",
    });
  }, []);

  const fetchFriendRequests = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/friend-request/${userId}`
      );
      if (response.status === 200) {
        console.log(response.data);
        const friendRequestsData = response.data.map((friendRequest) => ({
          _id: friendRequest._id,
          name: friendRequest.name,
          email: friendRequest.email,
          image: friendRequest.image,
        }));
        setFriendRequests(friendRequestsData);
      }
    } catch (err) {
      console.log("error message", err);
    }
  };

  console.log(friendRequests);

  return (
    <View style={{ padding: 10, marginHorizontal: 12 }}>
      {friendRequests.length > 0 && <Text>Your Friend Requests!</Text>}
      {friendRequests.map((item, index) => (
        <FriendRequest
          key={index}
          item={item}
          friendRequests={friendRequests}
          setFriendRequests={setFriendRequests}
        />
      ))}
    </View>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({});
