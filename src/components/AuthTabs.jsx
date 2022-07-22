import { TabsProps, Tabs } from '@mantine/core';

export default function StyledTabs(props) {
  return (
    <Tabs
      variant="unstyled"
      styles={(theme) => ({
        root: {
          width: '100%',
        },
        tabsListWrapper: {
          width: '100%',
          display: 'flex'
        },
        tabsList: {
          width: '100%',
          display: 'flex'

        },
        tabControl: {
          flexGrow: 1,
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
          color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[9],
          border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[4]}`,
          fontSize: theme.fontSizes.md,
          padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,

          '&:not(:first-of-type)': {
            flexGrow: 1,
            borderLeft: 0,
          },

          '&:first-of-type': {
            flexGrow: 1,
            borderTopLeftRadius: theme.radius.md,
            borderBottomLeftRadius: theme.radius.md,
          },

          '&:last-of-type': {
            flexGrow: 1,
            borderTopRightRadius: theme.radius.md,
            borderBottomRightRadius: theme.radius.md,
          },
        },

        tabActive: {
          backgroundColor: theme.colors.blue[7],
          borderColor: theme.colors.blue[7],
          color: theme.white,
        },
      })}
      {...props}
    />
  );
}

