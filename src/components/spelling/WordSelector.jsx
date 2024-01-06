import { Autocomplete, Button, Group } from '@mantine/core';
import axios from "axios";
import { useRef, useState } from "react";
import { getHotkeyHandler } from "@mantine/hooks";

function WordSelector({ onSubmit = () => {} }) {
  const [data, setData] = useState([]);
  const timestamp = useRef(new Date());
  const [currentValue, setCurrentValue] = useState('');

  const handleChange = (value) => {
    setCurrentValue(value);

    const currentDate = new Date();
    timestamp.current = currentDate;

    if (value.length < 2) {
      setData([]);
      return;
    }

    setTimeout(() => {
      if (timestamp.current !== currentDate) {
        return;
      }
      axios
        .get('/api/v1/words/suggestions', {
          params: {
            prefix: value
          }
        }).then((r) => {
          setData(r.data.map(word => word.text));
        })
    }, 500);

  };

  return (
    <Group grow preventGrowOverflow={false} gap="xs">
      <Autocomplete
        placeholder="Enter your word"
        data={data}
        onChange={handleChange}
        onKeyDown={getHotkeyHandler([
          ['Enter', () => onSubmit(currentValue)]
        ])}
      />
      <Button maw={80} onClick={() => onSubmit(currentValue)}>Add</Button>
    </Group>
  );
}

export default WordSelector;
