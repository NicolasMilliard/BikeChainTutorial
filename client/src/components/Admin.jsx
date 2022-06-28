import { Box, chakra, Flex, SimpleGrid, Stat, StatLabel, StatNumber, useColorModeValue } from "@chakra-ui/react"
import { useContext } from "react"
import { BlockchainContext } from "../context/BlockchainContext"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { MdOutlineAccountBalanceWallet } from 'react-icons/md'

function StatsCard(props) {
    const { title, stat, icon, bgColor } = props;
    return (
      <Stat
        px={{ base: 2, md: 4 }}
        py={'5'}
        shadow={'xl'}
        border={'1px solid'}
        borderColor={useColorModeValue('gray.800', 'gray.500')}
        rounded={'lg'}
        backgroundColor={bgColor}>
        <Flex justifyContent={'space-between'}>
          <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontWeight={'medium'}>
              {title}
            </StatLabel>
            <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
              {stat}
            </StatNumber>
          </Box>
          <Box
            my={'auto'}
            color={useColorModeValue('gray.800', 'gray.200')}
            alignContent={'center'}>
            {icon}
          </Box>
        </Flex>
      </Stat>
    );
  }

export default function Admin() {
    const { owner, balance, ownerBalance } = useContext(BlockchainContext)
    return(
        owner ? (
            <>
                <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
                    <chakra.h1
                        textAlign={'center'}
                        fontSize={'48'}
                        py={10}
                        fontWeight={'bold'}>
                        Here's your balance:
                    </chakra.h1>
                    <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 5, lg: 8 }}>
                        <StatsCard
                            title={"Contract's balance:"}
                            stat={balance}
                            icon={<MdOutlineAccountBalanceWallet size={'3em'} />}
                        />
                        <StatsCard
                            title={"Owner's balance:"}
                            stat={ownerBalance}
                            icon={<MdOutlineAccountBalanceWallet size={'3em'} />}
                        />
                    </SimpleGrid>
                    <Flex justifyContent={'center'} alignItems={'center'}>
                        <chakra.h2
                            textAlign={'center'}
                            fontSize={'24'}
                            py={10}
                            fontWeight={'bold'}>
                            Withdraw your earnings:
                        </chakra.h2>                        
                    </Flex>
                </Box>
                <ToastContainer autoClose={10000} />
            </>
        )
        : (
            <>
            <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
                    <chakra.h1
                        textAlign={'center'}
                        fontSize={'48'}
                        py={10}
                        fontWeight={'bold'}>
                        Access Denied
                    </chakra.h1>
                </Box>
            </>
        )
    )
}