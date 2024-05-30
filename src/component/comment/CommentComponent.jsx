import { Box } from "@chakra-ui/react";
import { CommentWrite } from "./CommentWrite.jsx";
import { CommentList } from "./CommentList.jsx";

export function CommentComponent({ boardId }) {
  return (
    <Box>
      <CommentWrite boardId={boardId} />
      <CommentList boardId={boardId} />
    </Box>
  );
}
