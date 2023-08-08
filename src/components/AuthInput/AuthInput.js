import { View, TextInput, StyleSheet, Text } from 'react-native';
import { useState } from 'react';
import { Controller } from 'react-hook-form';

export const AuthInput = ({
  control,
  fieldName,
  placeholder,
  secureTextEntry,
  type = 'default',
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <View>
          {error && <Text style={styles.errorMessage}>{error.message}</Text>}

          <View
            style={[
              styles.container,
              {
                borderColor: isFocused ? '#FF6C00' : error ? 'red' : '#E8E8E8',
              },
            ]}
          >
            <TextInput
              style={styles.textInput}
              onFocus={() => setIsFocused(true)}
              placeholder={placeholder}
              onChangeText={onChange}
              onBlur={() => setIsFocused(false)}
              value={value}
              secureTextEntry={secureTextEntry}
              keyboardType={type}
            />
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 6,
    color: '#BDBDBD',
    height: 50,

    backgroundColor: '#F6F6F6',
  },
  textInput: {
    color: '#212121',
    fontSize: 16,
    padding: 16,
    paddingBottom: 15,
    height: '100%',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 5,
  },
});
