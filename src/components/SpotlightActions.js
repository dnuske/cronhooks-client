import { Door, Search, Webhook } from 'tabler-icons-react';
import { SpotlightProvider } from '@mantine/spotlight';
import AppState from '../services/state';

export default function SpotlightActions({ children }) {
  let appState = AppState.useContainer();

  const spotlightActionsMain = [
    {
      title: 'Add a cronhook',
      // description: 'Add a new cron hook',
      onTrigger: () => appState.openGlobalModal('create-cronhook'),
      icon: <Webhook size={18} />,
    },
    {
      title: 'Add a one-time cronhook',
      // description: 'Add a new cron hook',
      onTrigger: () => appState.openGlobalModal('create-onetime-cronhook'),
      icon: <Webhook size={18} />,
    },
    {
      title: 'Change password',
      // description: 'Change your authentication password',
      onTrigger: () => appState.openGlobalModal('reset-password'),
      icon: <Door size={18} />,
    },
  ];

  const spotlightActionsHookPage = [
    {
      title: 'Edit current cronhook',
      // description: 'Edit the current cron hook',
      onTrigger: () => appState.openGlobalModal('edit-cronhook'),
      icon: <Webhook size={18} />,
    },
    {
      title: 'Change password',
      // description: 'Change your authentication password',
      onTrigger: () => appState.openGlobalModal('reset-password'),
      icon: <Door size={18} />,
    },
  ];

  return (
    <SpotlightProvider
      actions={
        appState.selectedHook ? spotlightActionsHookPage : spotlightActionsMain
      }
      searchIcon={<Search size={18} />}
      searchPlaceholder="Search..."
      shortcut={['mod + P', 'mod + K', '/']}
      nothingFoundMessage="Nothing found..."
    >
      {children}
    </SpotlightProvider>
  );
}
