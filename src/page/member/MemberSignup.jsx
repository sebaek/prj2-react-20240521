import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

export function MemberSignup() {
  return (
    <Box>
      <Box>회원 가입</Box>
      <Box>
        <Box>
          <FormControl>
            <FormLabel>이메일</FormLabel>
            <Input />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>암호</FormLabel>
            <Input />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>별명</FormLabel>
            <Input />
          </FormControl>
        </Box>
        <Box>
          <Button colorScheme={"blue"}>가입</Button>
        </Box>
      </Box>
    </Box>
  );
}
