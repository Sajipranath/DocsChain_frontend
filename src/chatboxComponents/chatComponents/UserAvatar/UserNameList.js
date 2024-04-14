import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";
import { useChatState } from "../../chatContext/Chatprovider";

const UserNameList = ({ user,handleFunction }) => {
  //const { user } = useChatState();
  //const user = JSON.parse(localStorage.getItem('userDetalies'));

  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#F4F9FC",
        color: "#04314C",
      }}
      w="100%"
      display="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.firstName}
        src={user.pic}
      />
      <Box>
        <Text><b>{user.firstName}</b></Text>
        
      </Box>
    </Box>
  );
};

export default UserNameList;