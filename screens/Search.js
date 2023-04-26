import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { getAuth, listUsers } from "firebase/auth";

export default function Search() {
   const [users, setUsers] = useState([]);

   const listAllUsers = (nextPageToken) => {
    // List batch of users, 1000 at a time.
    const auth=getAuth()
      listUsers(auth ,1000, nextPageToken)
      .then((listUsersResult) => {
        listUsersResult.users.forEach((userRecord) => {
          console.log('user', userRecord.toJSON());
        });
        if (listUsersResult.pageToken) {
          // List next batch of users.
          listAllUsers(listUsersResult.pageToken);
        }
      })
      .catch((error) => {
        console.log('Error listing users:', error);
      });
  };

  useEffect(() => {
    listAllUsers();
  }, []);

  return (
    <View>
      <Text>List of all users:</Text>
    </View>
  );
}
