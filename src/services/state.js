import { useState } from "react"
import {createContainer} from "unstated-next";

export function useAppState() {
  // modal management
  let [globalModalOpen, setGlobalModalOpen] = useState(false);
  let [globalModalWhich, setGlobalModalWhich] = useState();

  const openGlobalModal = (whichOne) => {
    setGlobalModalOpen(true);
    setGlobalModalWhich(whichOne);
  }
  const closeGlobalModal = () => {
    setGlobalModalOpen(false);
    setGlobalModalWhich(null);
  }

  // cronhooks
  let [cronhooks, setCronhooks] = useState([]);


  return { globalModalOpen, openGlobalModal, closeGlobalModal, globalModalWhich, cronhooks, setCronhooks }
}

const AppState = createContainer(useAppState);

export default AppState;
