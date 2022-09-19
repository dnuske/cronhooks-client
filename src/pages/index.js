import NonSSRWrapper from '../components/architecture/NonSSRWrapper';
import Authenticated from '../components/auth/Authenticated';
import GlobalModal from '../components/architecture/GlobalModal';
import Main from '../components/display/Main';

export default function Home() {
  return (
    <NonSSRWrapper>
      <Authenticated>
        <GlobalModal />
        <Main />
      </Authenticated>
    </NonSSRWrapper>
  );
}
