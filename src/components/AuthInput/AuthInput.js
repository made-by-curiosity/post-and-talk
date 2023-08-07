import { View, TextInput, StyleSheet, Text } from 'react-native';
import { Controller } from 'react-hook-form';

export const AuthInput = ({
  control,
  fieldName,
  placeholder,
  onFocus,
  secureTextEntry,
  rules = {},
}) => {
  return (
    <Controller
      control={control}
      name={fieldName}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <View>
          {error && <Text style={styles.errorMessage}>{error.message}</Text>}

          <View
            style={[
              styles.container,
              {
                borderColor: error ? 'red' : '#E8E8E8',
              },
            ]}
          >
            <TextInput
              style={styles.textInput}
              onFocus={onFocus}
              placeholder={placeholder}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              secureTextEntry={secureTextEntry}
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
    padding: 16,
    paddingBottom: 15,
    height: '100%',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 5,
  },
});
