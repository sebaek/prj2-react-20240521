import { Box } from "@chakra-ui/react";
import { CommentWrite } from "./CommentWrite.jsx";
import { CommentList } from "./CommentList.jsx";
import { useState } from "react";

export function CommentComponent({ boardId }) {
  const [isSending, setIsSending] = useState(false);

  return (
    <Box>
      <CommentWrite
        boardId={boardId}
        isSending={isSending}
        setIsSending={setIsSending}
      />
      <CommentList boardId={boardId} isSending={isSending} />
    </Box>
  );
}
