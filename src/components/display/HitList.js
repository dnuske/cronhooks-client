import { Text, Accordion } from '@mantine/core';
import HitListItem from './HitListItem';

const HitList = ({ hookHits }) => {
  const newArray = hookHits.slice(0, 10).reverse();

  const items = newArray.map((hook, i) => (
    <Accordion.Item label={<HitListItem hook={hook} />} key={hook.id}>
      {hook.response_data ? (
        <div dangerouslySetInnerHTML={{ __html: hook.response_data }}></div>
      ) : (
        <Text>Empty response</Text>
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
