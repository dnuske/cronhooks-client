import AuthBox from "../../components/auth/AuthBox";
import {useLocalStorage} from "@mantine/hooks";

export default function Authenticated({children}) {
  const [accessToken, setAccessToken] = useLocalStorage({ key: 'access-token' });

  if (accessToken) {
    return (<>{children}</>)
  } else {
    return (<AuthBox/>)
  }
}


