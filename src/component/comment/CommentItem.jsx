import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

export function CommentItem({ comment, isProcessing, setIsProcessing }) {
  function handleRemoveClick() {
    setIsProcessing(true);
    axios
      .delete(`/api/comment/remove`, {
        data: { id: comment.id },
      })
      .then((res) => {})
      .catch((err) => {})
      .finally(() => {
        setIsProcessing(false);
      });
  }

  return (
    <Box border={"1px solid black"} my={3}>
      <Flex>
        <Box>{comment.nickName}</Box>
        <Spacer />
        <Box>{comment.inserted}</Box>
      </Flex>
      <Flex>
        <Box>{comment.comment}</Box>
        <Spacer />
        <Box>
          <Button
            isLoading={isProcessing}
            colorScheme="red"
            onClick={handleRemoveClick}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
