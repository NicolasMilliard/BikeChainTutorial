import { Text } from "@chakra-ui/react"
import { useContext } from "react"
import { BlockchainContext } from "../context/BlockchainContext"

const Admin = () => {
    const { owner } = useContext(BlockchainContext)
    console.log(owner)

    return(
        owner ? (
            <>
                <Text fontSize={'x-large'} fontWeight={600}>Access Allowed</Text>
            </>
        )
        : (
            <>
                <Text fontSize={'x-large'} fontWeight={600}>Access Denied</Text>
            </>
        )
    )
}

export default Admin