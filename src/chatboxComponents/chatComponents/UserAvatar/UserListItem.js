import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";
import { useChatState } from "../../chatContext/Chatprovider";

const UserListItem = ({ user,handleFunction }) => {
  //const { user } = useChatState();
  //const user = JSON.parse(localStorage.getItem('userDetalies'));

  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
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
        <Text>{user.firstName}</Text>
        <Text fontSize="xs">
          <b>Batch : </b>
          {user.batch}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;