import { forwardRef } from '@chakra-ui/react';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';

const ChakraDatePicker: any = forwardRef(({ ...props }: any, ref: any) => {
	return (
		<SingleDatepicker
			{...props}
			ref={ref}
			propsConfigs={{
				inputProps: {
					bg: 'white',
					size: 'sm'
				},
				dayOfMonthBtnProps: {
					defaultBtnProps: {
						border: 0,
						_hover: {
							background: 'var(--chakra-colors-gray-200)'
						}
					},
					selectedBtnProps: {
						background: 'var(--chakra-colors-gray-200)',
						border: 0,
						_hover: {
							background: 'var(--chakra-colors-gray-300)'
						}
					}
				}
			}}
		/>
	);
});

export default ChakraDatePicker;
