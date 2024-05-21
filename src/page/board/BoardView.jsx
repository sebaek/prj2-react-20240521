import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export function BoardView() {
  const { id } = useParams();
  useEffect(() => {
    axios.get(`/api/board/${id}`);
  }, []);
  return null;
}
