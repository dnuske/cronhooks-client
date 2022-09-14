import { Box, useMantineTheme } from '@mantine/core';
import Link from 'next/link';

export default function CronhookListItem({ cronhook }) {
  const theme = useMantineTheme();

  return (
    <Link href={`/webhook/${cronhook.id}`}>
      <Box
        sx={{
          display: 'flex',
          cursor: 'pointer',
          border: 'solid 2px white',
          paddingLeft: 6,
          paddingRight: 6,
          width: '100%',
          '&:hover': {
            backgroundColor: theme.colors.gray[3],
            border: 'solid 2px',
            borderColor: theme.colors.blue[7],
            borderRadius: 4,
          },
        }}
      >
        <div style={{ flexShrink: 0 }}>{cronhook.method} -&nbsp;</div>
        <div
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {cronhook.url}
        </div>
        <div style={{ flexShrink: 0 }}>
          &nbsp;- {cronhook.cron} -{' '}
          {cronhook.last_hit ? cronhook.last_hit : 'no hits yet'}
        </div>
      </Box>
    </Link>
  );
}
