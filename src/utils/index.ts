import { useNavigate } from "react-router";

export function navigator(path: string) {
  const navigate = useNavigate();
  return navigate(path);
}
