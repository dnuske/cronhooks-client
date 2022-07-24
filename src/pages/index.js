import NonSSRWrapper from "../components/architecture/NonSSRWrapper";
import Authenticated from "../components/auth/Authenticated";

export default function Home() {
  return (<NonSSRWrapper>
      <Authenticated>authenticated</Authenticated>
    </NonSSRWrapper>
    )
}


