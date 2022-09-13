import AuthBox from "../../components/auth/AuthBox";
import { useLocalStorage } from "@mantine/hooks";
import SpotlightActions from "../SpotlightActions";

export default function Authenticated({ children }) {
  const [accessToken] = useLocalStorage({ key: "access-token" });

  if (accessToken) {
    return <SpotlightActions>{children}</SpotlightActions>;
  } else {
    return <AuthBox />;
  }
}
