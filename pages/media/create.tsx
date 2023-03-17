import { DeleteIcon, PlusSquareIcon } from '@chakra-ui/icons';
import {
	Box,
	Center,
	Flex,
	FormControl,
	FormLabel,
	Grid,
	GridItem,
	Heading,
	Input,
	InputGroup,
	Switch,
	Text,
	Textarea
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Fragment, useEffect, useState } from 'react';

import ChakraDatePicker from '../../components/ChakraDatePicker';
import ChakraSelect from '../../components/ChakraSelect';
import { currencies } from '../../data/currencies';
import { formats } from '../../data/formats';
import { languages } from '../../data/languages';
import { DiscType, MediaType } from '../../types/Media';

const newDiscObject: DiscType = {
	video: {
		resolution: '',
		aspect_ratio: '',
		original_aspect_ratio: '',
		hdr: ''
	},
	metadata: '',
	audio: [],
	subtitles: [],
	format: '',
	size: '',
	regions: []
};

const CreateMediaPage: NextPage = () => {
	const [media, setMedia] = useState<MediaType>({
		title: '',
		cover: '',
		description: '',
		primary_type: '',
		discs: [],
		distribution_info: {
			licensor: '',
			distributor: '',
			sale_region: '',
			msrp: 0,
			currency: '',
			release_date: new Date()
		},
		identifiers: {
			upc: 0,
			ean: 0,
			isbn: '',
			sku: ''
		},
		other_details: {
			volume: '',
			edition: '',
			audio_languages: [],
			adult: false,
			runtime: 0,
			notes: ''
		},
		id: '',
		createdBy: '',
		createdAt: new Date()
	});

	const handleOnChange = ({ target: { name, value } }: { target: { name: string; value: any } }) =>
		setMedia({ ...media, [name]: value });

	const handleOnChangeOtherDetails = ({
		target: { name, value }
	}: {
		target: { name: string; value: any };
	}) => setMedia({ ...media, other_details: { ...media.other_details, [name]: value } });

	const handleOnChangeDistributionInfo = ({
		target: { name, value }
	}: {
		target: { name: string; value: any };
	}) => setMedia({ ...media, distribution_info: { ...media.distribution_info, [name]: value } });

	const handleOnChangeIdentifiers = ({
		target: { name, value }
	}: {
		target: { name: string; value: any };
	}) => setMedia({ ...media, identifiers: { ...media.identifiers, [name]: value } });

	const addDisc = () =>
		setMedia({ ...media, discs: [...media.discs, JSON.parse(JSON.stringify(newDiscObject))] });

	const findFormat = (val: string) => formats.find((format) => format.value === val) || [];


	return (
		<>
			<Head>
				<title>Add Release</title>
				<meta content="Add Release" property="og:title" />
			</Head>
			<Center>
				<Flex direction="column" width={{ base: '100%', md: '75%' }}>
					<Box py={{ base: '2rem', md: '4rem' }}>
						<Heading textAlign={'center'} py={4}>
							Add Release
						</Heading>
						<Grid
							gap={4}
							templateAreas={{
								base: `"cover-select"
									   "top-right-column"
									   "licensor-distributor-select"
									   "identifiers-inputs"
									   "extra-info"
									   "discs"`,
								lg: `"cover-select top-right-column top-right-column top-right-column top-right-column"
                                     "cover-select top-right-column top-right-column top-right-column top-right-column"
                                     "licensor-distributor-select identifiers-inputs identifiers-inputs extra-info extra-info"
                                     "discs discs discs discs discs"`
							}}
						>
							<GridItem area="cover-select">
								{/* <div style={{ aspectRatio: '3 / 4', background: 'darkgrey' }}></div> */}
							</GridItem>
							<GridItem area="top-right-column">
								<Box>
									<FormControl isRequired>
										<FormLabel mb={2}>Movie / Series</FormLabel>
										<Input
											size="sm"
											bg="white"
											type="text"
											placeholder="Title"
											name="title"
											onChange={handleOnChange}
											isRequired
										/>
									</FormControl>
								</Box>
								<Flex>
									<Box w={'75%'} mr={1}>
										<FormControl isRequired>
											<FormLabel mb={2}>Title</FormLabel>
											<Input
												size="sm"
												bg="white"
												type="text"
												placeholder="Title"
												name="title"
												onChange={handleOnChange}
												isRequired
											/>
										</FormControl>
									</Box>
									<Box w={'25%'}>
										<FormControl isRequired>
											<FormLabel mb={2}>Type</FormLabel>
											<ChakraSelect
												size="sm"
												name="primary_type"
												options={formats}
												onChange={({ value }: any) => setMedia({ ...media, primary_type: value })}
											/>
										</FormControl>
									</Box>
								</Flex>
								<Text mb={2}>Description</Text>
								<Textarea
									size="sm"
									bg="white"
									resize="none"
									rows={8}
									placeholder="Description"
									name="description"
									onChange={handleOnChange}
								/>
							</GridItem>
							<GridItem area="extra-info">
								<Heading as="h4" size="md" mb={4}>
									Other
								</Heading>
								<FormControl isRequired>
									<FormLabel mb={2}>Edition</FormLabel>
									<Input
										size="sm"
										bg="white"
										type="text"
										placeholder="Edition"
										name="edition"
										onChange={handleOnChangeOtherDetails}
									/>
								</FormControl>
								<FormControl isRequired>
									<FormLabel mb={2}>Languages</FormLabel>
									<div className="chakra-input">
										<ChakraSelect
											isMulti
											size="sm"
											name="audio_languages"
											options={languages}
											onChange={(value: any) =>
												setMedia({
													...media,
													other_details: { ...media.other_details, audio_languages: value }
												})
											}
											closeMenuOnSelect={false}
										/>
									</div>
								</FormControl>
								<Flex my={2} justifyContent="space-between">
									<InputGroup>
										<Text mr={2}>Adult</Text>
										<Switch mt={1} />
									</InputGroup>
									<InputGroup>
										<Text mr={2}>Runtime</Text>
										<Input
											size="sm"
											bg="white"
											type="number"
											placeholder="Runtime"
											name="runtime"
											onChange={handleOnChangeOtherDetails}
										/>
									</InputGroup>
								</Flex>
								<Text mb={2}>Notes</Text>
								<Textarea
									size="sm"
									bg="white"
									resize="none"
									rows={8}
									placeholder="Notes"
									name="notes"
									onChange={handleOnChangeOtherDetails}
								/>
							</GridItem>
							<GridItem area="licensor-distributor-select">
								<Heading as="h4" size="md" mb={4}>
									Distribution Information
								</Heading>
								<Text mb={2}>Licensor</Text>
								<Input
									size="sm"
									bg="white"
									type="text"
									placeholder="Licensor"
									name="licensor"
									onChange={handleOnChangeDistributionInfo}
								/>
								<Text mb={2}>Distributor</Text>
								<Input
									size="sm"
									bg="white"
									type="text"
									placeholder="Distributor"
									name="distributor"
									onChange={handleOnChangeDistributionInfo}
								/>
								<Text mb={2}>Sale Region</Text>
								<Input
									size="sm"
									bg="white"
									type="text"
									placeholder="Sale Region"
									name="sale_region"
									onChange={handleOnChangeDistributionInfo}
								/>
								<FormControl>
									<Text mb={2}>MSRP</Text>
									<Flex>
										<Box width="75%">
											<ChakraSelect
												size="sm"
												options={currencies.map((curr) => ({
													label: `${curr.symbol} - ${curr.name}`,
													value: curr.symbol
												}))}
											/>
										</Box>
										<Input
											width="25%"
											size="sm"
											bg="white"
											type="text"
											placeholder="Amount"
											name="msrp"
											onChange={handleOnChangeDistributionInfo}
										/>
									</Flex>
								</FormControl>
								<Text mb={2}>Release Date</Text>
								<ChakraDatePicker
									name="release_date"
									date={media.distribution_info.release_date}
									onDateChange={(date: Date) =>
										handleOnChangeDistributionInfo({
											target: { name: 'release_date', value: date }
										})
									}
								/>
							</GridItem>
							<GridItem area="identifiers-inputs">
								<Heading as="h4" size="md" mb={4}>
									Identifiers
								</Heading>
								<Text mb={2}>UPC</Text>
								<Input
									size="sm"
									bg="white"
									type="text"
									placeholder="UPC"
									name="upc"
									onChange={handleOnChangeIdentifiers}
								/>
								<Text mb={2}>EAN</Text>
								<Input
									size="sm"
									bg="white"
									type="text"
									placeholder="EAN"
									name="ean"
									onChange={handleOnChangeIdentifiers}
								/>{' '}
								<Text mb={2}>ISBN</Text>
								<Input
									size="sm"
									bg="white"
									type="text"
									placeholder="ISBN"
									name="isbn"
									onChange={handleOnChangeIdentifiers}
								/>{' '}
								<Text mb={2}>SKU</Text>
								<Input
									size="sm"
									bg="white"
									type="text"
									placeholder="SKU"
									name="sku"
									onChange={handleOnChangeIdentifiers}
								/>
							</GridItem>
							<GridItem area="discs">
								<Flex justifyContent={'space-between'}>
									<Heading as="h4" size="md" mb={4}>
										Discs
									</Heading>
									<PlusSquareIcon boxSize={5} onClick={addDisc} cursor="pointer" />
								</Flex>
								{media.discs.length > 0 ? (
									media.discs.map((disc, i) => {
										const selectedFormat: any = disc.format ? findFormat(disc.format) : [];

										return (
											<Fragment key={i}>
												<Flex wrap="wrap" justifyContent={'space-between'}>
													<Flex>
														<FormControl mr={2} w={'200px'}>
															<Text mb={2}>Type</Text>
															<ChakraSelect
																size="sm"
																options={formats}
																onChange={({ value }: any) => {
																	const newDiscs = Array.from(media.discs);

																	newDiscs[i].format = value;

																	setMedia({ ...media, discs: newDiscs });
																}}
																value={disc.format}
															/>
														</FormControl>
														<FormControl mr={2} w={'125px'}>
															<Text mb={2}>Size</Text>
															<ChakraSelect
																size="sm"
																options={selectedFormat?.sizes || []}
																isDisabled={!disc.format || false}
																onChange={({ value }: any) => {
																	const newDiscs = media.discs;

																	newDiscs[i].size = value;

																	setMedia({ ...media, discs: newDiscs });
																}}
															/>
														</FormControl>
														<FormControl w={'250px'}>
															<Text mb={2}>Region</Text>
															<ChakraSelect
																size="sm"
																isMulti
																options={selectedFormat?.regions || []}
																isDisabled={!disc.format || false}
																onChange={({ value }: any) => {
																	const newDiscs = media.discs;

																	newDiscs[i].regions = value;

																	setMedia({ ...media, discs: newDiscs });
																}}
															/>
														</FormControl>
													</Flex>
													<DeleteIcon
														cursor={'pointer'}
														mt={10}
														onClick={() => {
															const newDiscs = media.discs.filter((disc, j) => i !== j);

															setMedia({ ...media, discs: newDiscs });
														}}
													/>
												</Flex>
												<Flex mt={2}>
													<Text mb={2} fontSize={'sm'}>
														My disc has two sides
														<Switch
															mb={1}
															ml={2}
															disabled={!disc.format || disc.format === 'LaserDisc'}
														/>
													</Text>
													<Text mb={2} fontSize={'sm'} ml={2}>
														My disc is burned
														<Switch
															mb={1}
															ml={2}
															disabled={!disc.format || disc.format === 'LaserDisc'}
														/>
													</Text>
												</Flex>
												<hr />
											</Fragment>
										);
									})
								) : (
									<>You have no discs added, try adding one?</>
								)}
							</GridItem>
						</Grid>
					</Box>
				</Flex>
			</Center>
			<br />
			<br />
		</>
	);
};

export default CreateMediaPage;
