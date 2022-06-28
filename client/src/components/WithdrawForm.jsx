import { useForm } from 'react-hook-form'
import { Button, Text, Center } from '@chakra-ui/react'
import { useContext } from 'react'
import { BlockchainContext } from '../context/BlockchainContext'

export default function WithdrawForm() {
    const { ownerWithdraw } = useContext(BlockchainContext)

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
      } = useForm()

      const onSubmit = async (values) => {
        await ownerWithdraw()
      }

      return (
        <>
            <Center>
                <Text
                    fontFamily={'heading'}
                    fontSize={'x-large'}
                    fontWeight={600}
                    mt={10}
                    mb={4}>
                    Withdraw your earnings:
                </Text>
            </Center>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Center>
                    <Button colorScheme='teal' isLoading={isSubmitting} type='submit'>
                        Withdraw
                    </Button>
                </Center>
            </form>
        </>
      )

}