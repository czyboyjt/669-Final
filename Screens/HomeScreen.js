import { View, Text, Button } from 'react-native';
import { styles } from '../Styles';
import { getAuthUser, signOut } from '../auth/AuthManager';

function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>
      You're signed in, { getAuthUser().displayName }!
      </Text>

      <Button
      title="Now sign out!"
        onPress={async () => {
          try {
            await signOut();
            navigation.navigate('Login');
          } catch (error) {
            Alert.alert("Sign Out Error", error.message,[{ text: "OK" }])
          }
        }}
      />
    </View>
  );
}
export default HomeScreen;