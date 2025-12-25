import { View, Text, Button, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme(); 

  const containerStyle = {
    ...styles.container,
    backgroundColor: theme === 'light' ? '#ffffff' : '#333333'
  };

  const textStyle = {
    fontSize: 20,
    marginBottom: 20,
    color: theme === 'light' ? '#000000' : '#ffffff'
  };

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>Current Theme: {theme}</Text>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});