import { Text, ThemeIcon, Badge } from '@mantine/core';
import dayjs from 'dayjs';
import { CircleCheck, InfoCircle, CircleX } from 'tabler-icons-react';
import { formatDate } from '../../hooks/formatDate';

function HitListItem({ hook }) {
  const handleIcon = (status) => {
    switch (status) {
      case 200:
        return (
          <ThemeIcon
            color="teal"
            size={32}
            radius="xl"
            style={{
              marginRight: 10,
            }}
          >
            <CircleCheck size={26} />
          </ThemeIcon>
        );
        break;
      case 404:
        return (
          <ThemeIcon
            color="red"
            size={32}
            radius="xl"
            style={{
              marginRight: 10,
            }}
          >
            <CircleX size={26} />
          </ThemeIcon>
        );
        break;
      case 500:
        return (
          <Badge color="red" variant="filled">
            {status}
          </Badge>
        );
        break;
      default:
        return (
          <ThemeIcon
            color="cyan"
            size={32}
            radius="xl"
            style={{
              marginRight: 10,
            }}
          >
            <InfoCircle size={26} />
          </ThemeIcon>
        );
        break;
    }
  };

  const handleStatusBadge = (status) => {
    switch (status) {
      case 200:
        return (
          <Badge color="lime" variant="filled">
            {status}
          </Badge>
        );
        break;
      case 404:
        return (
          <Badge color="red" variant="filled">
            {status}
          </Badge>
        );
        break;
      case 500:
        return (
          <Badge color="red" variant="filled">
            {status}
          </Badge>
        );
        break;
      default:
        return (
          <Badge color="cyan" variant="filled">
            {status}
          </Badge>
        );
        break;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      {handleIcon(hook.response_status)}
      <div>
        <Text>
          Status Code:{' '}
          {hook.response_status ? (
            handleStatusBadge(hook.response_status)
          ) : (
            <Badge color="cyan" variant="filled">
              NO STATUS RESPONSE
            </Badge>
          )}
        </Text>
        <div
          style={{
            display: 'flex',
            marginTop: 3,
          }}
        >
          <Text size="sm" color="dimmed" weight={400}>
            {formatDate(dayjs(hook.started_at).toISOString())}
          </Text>
          <Text size="sm" color="dimmed" weight={400} style={{ marginLeft: 4 }}>
            ({dayjs(hook.finished_at).diff(dayjs(hook.started_at), '')} ms)
          </Text>
        </div>
      </div>
    </div>
  );
}

export default HitListItem;
