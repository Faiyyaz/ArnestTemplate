import React from 'react';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {View} from 'react-native';
import RNPTextInput from '../components/text/RNPTextInput';
import appStyles from '../styles/styles';
import RNPButton from '../components/button/RNPButton';

type FormData = {
  email: string;
  password: string;
};

export default function FormExampleScreen() {
  const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    console.log('data', data);
  };

  return (
    <View style={appStyles.flexDirectionColumn}>
      <RNPTextInput<FormData>
        control={control}
        name="email"
        label="Email"
        keyboardType="email-address"
        errorText={errors.email?.message}
      />
      <RNPTextInput<FormData>
        control={control}
        name="password"
        label="Password"
        secureTextEntry
        errorText={errors.password?.message}
      />
      <RNPButton onPress={handleSubmit(onSubmit)}>Login</RNPButton>
    </View>
  );
}
