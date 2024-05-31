import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function MemberList() {
  const [memberList, setMemberList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/member/list").then((res) => setMemberList(res.data));
  }, []);

  if (memberList.length === 0) {
    return <Spinner />;
  }
  return (
    <Box>
      <Box mb={10}>
        <Heading>회원 목록</Heading>
      </Box>
      <Box mb={10}>
        <Table>
          <Thead>
            <Tr>
              <Th w={20}>#</Th>
              <Th>이메일</Th>
              <Th w={"150px"}>별명</Th>
              <Th w={96}>가입일시</Th>
            </Tr>
          </Thead>
          <Tbody>
            {memberList.map((member) => (
              <Tr
                cursor={"pointer"}
                _hover={{ bgColor: "gray.200" }}
                onClick={() => navigate(`/member/${member.id}`)}
                key={member.id}
              >
                <Td>{member.id}</Td>
                <Td>{member.email}</Td>
                <Td>{member.nickName}</Td>
                <Td>{member.signupDateAndTime}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
