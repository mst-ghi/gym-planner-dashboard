import { useThemeStyle } from '@/hooks';
import { Flex, Input, Text } from '@mantine/core';
import { IconCalendar } from '@tabler/icons-react';
import DatePicker, { DateObject, DatePickerProps, Value } from 'react-multi-date-picker';

interface DateTimeInput extends Omit<DatePickerProps, 'onChange'> {
  label?: string;
  value?: Value;
  error?: any;
  withAsterisk?: boolean;
  maxDate?: string | number | Date | DateObject;
  onChange?: (value: Date) => void;
}

const DateTimeInput = ({ withAsterisk, label, onChange, ...props }: DateTimeInput) => {
  const { theme } = useThemeStyle();

  return (
    <Input.Wrapper
      mt={5}
      w='100%'
      style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}
    >
      <Flex direction='row' align='center' justify='space-between' gap='sm'>
        {label && (
          <Flex direction='row' gap={6}>
            <Text size='sm' fw={500}>
              {label}
            </Text>
            {withAsterisk && <Text c='red'> *</Text>}
          </Flex>
        )}
      </Flex>

      <DatePicker
        {...props}
        onChange={(object) => {
          if (object && onChange) {
            onChange(object.toDate());
          }
        }}
        style={{
          paddingLeft: 12,
          paddingRight: 12,
          height: 42,
          width: '100%',
          borderRadius: 8,
          backgroundColor: 'inherit',
          borderColor: theme.colors.gray[4],
          fontSize: 'var(--input-label-size, var(--mantine-font-size-md))',
        }}
      />

      <IconCalendar color='gray' style={{ position: 'absolute', right: 8, top: 34 }} />
    </Input.Wrapper>
  );
};

export default DateTimeInput;
