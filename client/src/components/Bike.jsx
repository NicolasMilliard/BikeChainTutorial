import { Box, Button, Image, Text, Stack } from "@chakra-ui/react"
import { useContext } from "react"
import { BlockchainContext } from "../context/BlockchainContext"

const Bike = ({bike}) => {
    const {checkOut, checkIn} = useContext(BlockchainContext)
    return(
        <Box boxSize='lg' mx={2}>
            <Image src={bike} mb={10} />
            <Text>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim cupiditate cumque unde modi deleniti aliquam quos, iste quibusdam repellendus minus doloremque molestias architecto velit numquam dolores fugiat quam nostrum similique.
            </Text>
            <Stack spacing={0} direction={'row'} align={'center'} justify={'center'} mt={5}>
            <Button
                onClick={checkOut}
                m={2}
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'teal.500'}
                _hover={{
                bg: 'teal.300',
                }}>
                Checkout
            </Button>
            <Button
                onClick={checkIn}
                m={2}
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'teal.500'}
                _hover={{
                bg: 'teal.300',
                }}>
                Checkin
            </Button>
            </Stack>
        </Box>
    )
}

export default Bike