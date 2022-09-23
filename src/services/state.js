import { useState } from 'react';
import { createContainer } from 'unstated-next';

export function useAppState() {
  // modal management
  let [globalModalOpen, setGlobalModalOpen] = useState(false);
  let [globalModalWhich, setGlobalModalWhich] = useState();

  const openGlobalModal = (whichOne) => {
    setGlobalModalOpen(true);
    setGlobalModalWhich(whichOne);
  };
  const closeGlobalModal = () => {
    setGlobalModalOpen(false);
    setGlobalModalWhich(null);
  };

  // cronhooks
  let [cronhooks, setCronhooks] = useState([]);

  // selected cronhook
  let [selectedHook, setSelectedHook] = useState(null);

  // lastHook created
  let [lastHookCreated, setLastHookCreated] = useState({});

  let [updateToken, _setUpdateToken] = useState('');
  function setUpdateToken() {
    _setUpdateToken(String(Math.random()));
  }

  return {
    globalModalOpen,
    openGlobalModal,
    closeGlobalModal,
    globalModalWhich,
    cronhooks,
    setCronhooks,
    selectedHook,
    setSelectedHook,
    lastHookCreated,
    setLastHookCreated,
    updateToken,
    setUpdateToken
  };
}

const AppState = createContainer(useAppState);

export default AppState;
