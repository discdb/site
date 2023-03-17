import { useColorMode } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { forwardRef } from 'react';

const ChakraSelect: any = forwardRef(({ ...props }: any, ref: any) => {
	const { colorMode } = useColorMode();

	return (
		<Select
			{...props}
			ref={ref}
			defaultValue={
				props?.defaultValue
					? props.defaultValue.map((val: string) => ({ value: val, label: val }))
					: undefined
			}
			instanceId="select-123"
			chakraStyles={{
				control: (baseStyles) => ({
					...baseStyles,
					background: `var(--chakra-colors-${colorMode ? 'white' : 'black'}) !important`
				}),
				dropdownIndicator: (baseStyles) => ({
					...baseStyles,
					background: `var(--chakra-colors-${colorMode ? 'white' : 'black'}) !important`
				})
			}}
		/>
	);
});

export default ChakraSelect;
