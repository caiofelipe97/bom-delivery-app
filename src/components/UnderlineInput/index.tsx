import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, Content, TextInput, Label, HelperText } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  label: string;
  containerStyle?: {};
  defaultValue?: string;
  helperText?: string;
  onChangeText?: (value: string) => void;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  {
    name,
    label,
    defaultValue,
    helperText,
    onChangeText,
    containerStyle = {},
    ...rest
  },
  ref,
) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({
    value: defaultValue || '',
  });

  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(_ref: any, value: string) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container style={containerStyle}>
      <Content isFocused={isFocused} isErrored={!!error}>
        <Label isFocused={isFocused} isErrored={!!error}>
          {label}
        </Label>
        <TextInput
          ref={inputElementRef}
          keyboardAppearance="dark"
          defaultValue={defaultValue}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChangeText={value => {
            inputValueRef.current.value = value;
            if (onChangeText) onChangeText(value);
          }}
          {...rest}
        />
      </Content>
      {!!helperText ||
        (!!error && (
          <HelperText isFocused={isFocused} isErrored={!!error}>
            {error || helperText}
          </HelperText>
        ))}
    </Container>
  );
};

export default forwardRef(Input);
