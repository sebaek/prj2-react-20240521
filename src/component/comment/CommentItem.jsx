import { Box, Flex, Spacer } from "@chakra-ui/react";

export function CommentItem({ comment }) {
  return (
    <Box border={"1px solid black"} my={3}>
      <Flex>
        <Box>{comment.nickName}</Box>
        <Spacer />
        <Box>{comment.inserted}</Box>
      </Flex>
      <Box>{comment.comment}</Box>
    </Box>
  );
}
