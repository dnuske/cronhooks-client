import NonSSRWrapper from "../components/architecture/NonSSRWrapper";
import Authenticated from "../components/auth/Authenticated";
import AppState from "../services/state";
import GlobalModal from "../components/architecture/GlobalModal";
import Main from "../components/display/Main";

// TODO: when the API retruns 401 unauthorized redirect to login.

export default function Home() {
  let appState = AppState.useContainer();

  return (
    <NonSSRWrapper>
      <Authenticated>
        <GlobalModal />
        <Main />
      </Authenticated>
    </NonSSRWrapper>
  );
}
