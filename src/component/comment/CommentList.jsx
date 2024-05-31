import { useEffect, useState } from "react";
import { Box, Card, CardBody, Stack, StackDivider } from "@chakra-ui/react";
import axios from "axios";
import { CommentItem } from "./CommentItem.jsx";

export function CommentList({ boardId, isProcessing, setIsProcessing }) {
  const [commentList, setCommentList] = useState([]);
  useEffect(() => {
    if (!isProcessing) {
      axios
        .get(`/api/comment/list/${boardId}`)
        .then((res) => {
          setCommentList(res.data);
        })
        .catch((err) => console.log(err))
        .finally(() => {});
    }
  }, [isProcessing]);
  if (commentList.length === 0) {
    return <Box>댓글이 없습니다. 첫 댓글을 작성해보세요.</Box>;
  }
  return (
    <Card>
      <CardBody>
        <Stack divider={<StackDivider />} spacing={4}>
          {commentList.map((comment) => (
            <CommentItem
              isProcessing={isProcessing}
              setIsProcessing={setIsProcessing}
              comment={comment}
              key={comment.id}
            />
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
}
