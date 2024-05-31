import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  StackDivider,
  Switch,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function BoardEdit() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [removeFileList, setRemoveFileList] = useState([]);
  const [addFileList, setAddFileList] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    axios.get(`/api/board/${id}`).then((res) => setBoard(res.data.board));
  }, []);

  function handleClickSave() {
    axios
      .putForm("/api/board/edit", {
        id: board.id,
        title: board.title,
        content: board.content,
        removeFileList,
        addFileList,
      })
      .then(() => {
        toast({
          status: "success",
          description: `${board.id}번 게시물이 수정되었습니다.`,
          position: "top",
        });
        navigate(`/board/${board.id}`);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast({
            status: "error",
            description: `게시물이 수정되지 않았습니다. 작성한 내용을 확인해주세요.`,
            position: "top",
          });
        }
      })
      .finally(() => {
        onClose();
      });
  }

  if (board === null) {
    return <Spinner />;
  }

  const fileNameList = [];
  for (let addFile of addFileList) {
    // 이미 있는 파일과 중복된 파일명인지?
    let duplicate = false;
    for (let file of board.fileList) {
      if (file.name === addFile.name) {
        duplicate = true;
        break;
      }
    }
    fileNameList.push(
      <Flex>
        <Text fontSize={"md"} mr={3}>
          {addFile.name}
        </Text>
        <Box>{duplicate && <Badge colorScheme="red">override</Badge>}</Box>
      </Flex>,
    );
  }

  function handleRemoveSwitchChange(name, checked) {
    if (checked) {
      setRemoveFileList([...removeFileList, name]);
    } else {
      setRemoveFileList(removeFileList.filter((item) => item !== name));
    }
  }

  return (
    <Box>
      <Box mb={10}>
        <Heading>{board.id}번 게시물 수정</Heading>
      </Box>
      <Box>
        <Box mb={7}>
          <FormControl>
            <FormLabel>제목</FormLabel>
            <Input
              defaultValue={board.title}
              onChange={(e) => setBoard({ ...board, title: e.target.value })}
            />
          </FormControl>
        </Box>
        <Box mb={7}>
          <FormControl>
            <FormLabel>본문</FormLabel>
            <Textarea
              defaultValue={board.content}
              onChange={(e) => setBoard({ ...board, content: e.target.value })}
            ></Textarea>
          </FormControl>
        </Box>
        <Box mb={7}>
          {board.fileList &&
            board.fileList.map((file) => (
              <Card m={3} key={file.name}>
                <CardFooter>
                  <Flex gap={3}>
                    <Box>
                      <FontAwesomeIcon color="red" icon={faTrashCan} />
                    </Box>
                    <Box>
                      <Switch
                        colorScheme={"red"}
                        onChange={(e) =>
                          handleRemoveSwitchChange(file.name, e.target.checked)
                        }
                      />
                    </Box>
                    <Box>
                      <Text>{file.name}</Text>
                    </Box>
                  </Flex>
                </CardFooter>
                <CardBody>
                  <Image
                    sx={
                      removeFileList.includes(file.name)
                        ? { filter: "blur(8px)" }
                        : {}
                    }
                    src={file.src}
                  />
                </CardBody>
              </Card>
            ))}
        </Box>
        <Box mb={7}>
          <FormControl>
            <FormLabel>파일</FormLabel>
            <Input
              multiple
              type="file"
              accept="image/*"
              onChange={(e) => setAddFileList(e.target.files)}
            />
            <FormHelperText>
              총 용량은 10MB, 한 파일은 1MB를 초과할 수 없습니다.
            </FormHelperText>
          </FormControl>
        </Box>
        {fileNameList.length > 0 && (
          <Box mb={7}>
            <Card>
              <CardHeader>
                <Heading size="md">선택된 파일 목록</Heading>
              </CardHeader>
              <CardBody>
                <Stack divider={<StackDivider />} spacing={4}>
                  {fileNameList}
                </Stack>
              </CardBody>
            </Card>
          </Box>
        )}
        <Box mb={7}>
          <FormControl>
            <FormLabel>작성자</FormLabel>
            <Input defaultValue={board.writer} readOnly />
          </FormControl>
        </Box>
        <Box mb={7}>
          <Button colorScheme={"blue"} onClick={onOpen}>
            저장
          </Button>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalBody>저장하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button mr={2} onClick={onClose}>
              취소
            </Button>
            <Button onClick={handleClickSave} colorScheme={"blue"}>
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
