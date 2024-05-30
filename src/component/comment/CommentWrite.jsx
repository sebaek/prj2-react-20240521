import { Box, Button, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function CommentWrite({ boardId }) {
  const [comment, setComment] = useState("");

  function handleCommentSubmitClick() {
    axios
      .post("/api/comment/add", {
        boardId,
        comment,
      })
      .then((res) => {})
      .catch(() => {})
      .finally(() => {});
  }

  return (
    <Box>
      <Textarea
        placeholder="댓글을 작성해 보세요."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button onClick={handleCommentSubmitClick} colorScheme={"blue"}>
        <FontAwesomeIcon icon={faPaperPlane} />
      </Button>
    </Box>
  );
}
