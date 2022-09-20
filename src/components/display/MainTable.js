import { Table } from '@mantine/core';
import dayjs from 'dayjs';
import Link from 'next/link';
import { formatDate } from '../../hooks/formatDate';

const MainTable = ({ cronhooks }) => {
  const rows = cronhooks.map((hook) => (
    <Link href={`/webhook/${hook.id}`} key={hook.id}>
      <tr
        style={{
          cursor: 'pointer',
        }}
      >
        <td>
          {hook.url.length <= 34 ? hook.url : hook.url.substring(0, 35) + '...'}
        </td>
        <td>{hook.method}</td>
        <td>{hook.cron}</td>
        <td>
          {hook.last_hit
            ? formatDate(dayjs(hook.started_at).toISOString())
            : 'No hit yet'}
        </td>
      </tr>
    </Link>
  ));

  return (
    <Table horizontalSpacing="sm" verticalSpacing="md" highlightOnHover>
      <thead>
        <tr>
          <th>Url</th>
          <th>Verb</th>
          <th>Cron</th>
          <th>Last hit</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default MainTable;
