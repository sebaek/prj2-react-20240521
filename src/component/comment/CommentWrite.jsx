import {
  Box,
  Button,
  Flex,
  Textarea,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import axios from "axios";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoginContext } from "../LoginProvider.jsx";

export function CommentWrite({ boardId, isProcessing, setIsProcessing }) {
  const [comment, setComment] = useState("");
  const toast = useToast();
  const account = useContext(LoginContext);

  function handleCommentSubmitClick() {
    setIsProcessing(true);
    axios
      .post("/api/comment/add", {
        boardId,
        comment,
      })
      .then((res) => {
        setComment("");
        toast({
          description: "댓글이 등록되었습니다.",
          position: "top",
          status: "success",
        });
      })
      .catch(() => {})
      .finally(() => {
        setIsProcessing(false);
      });
  }

  return (
    <Flex gap={2}>
      <Box flex={1}>
        <Textarea
          isDisabled={!account.isLoggedIn()}
          placeholder={
            account.isLoggedIn()
              ? "댓글을 작성해 보세요."
              : "댓글을 작성하시려면 로그인하세요."
          }
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </Box>
      <Box>
        <Tooltip
          label="로그인 하세요"
          isDisabled={account.isLoggedIn()}
          placement="top"
        >
          <Button
            h={"100%"}
            isDisabled={comment.trim().length === 0 || !account.isLoggedIn()}
            isLoading={isProcessing}
            onClick={handleCommentSubmitClick}
            colorScheme={"blue"}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </Button>
        </Tooltip>
      </Box>
    </Flex>
  );
}
