import { Text, Accordion } from '@mantine/core';
import HitListItem from './HitListItem';

const HitList = ({ hookHits }) => {
  const items = hookHits.map((hook, i) => (
    <Accordion.Item label={<HitListItem hook={hook} />} key={hook.id}>
      {hook.response_data ? (
        <div>{hook.response_data}</div>
      ) : (
        <Text>[empty-response]</Text>
      )}
    </Accordion.Item>
  ));

  return (
    <Accordion initialItem={-1} iconPosition="right" style={{ width: '90%' }}>
      {items}
    </Accordion>
  );
};

export default HitList;
