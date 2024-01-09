import { Autocomplete, Button, Group } from '@mantine/core';
import axios from "axios";
import { useRef, useState } from "react";
import { useForm } from "@mantine/form";

function WordSelector({ onSubmit = () => {}, disabled = false }) {
  const form = useForm({
    initialValues: {
      value: '',
    }
  });

  const [data, setData] = useState([]);
  const timestamp = useRef(new Date());
  const [error, setError] = useState(null);

  const handleChange = (value) => {
    setError(null);
    form.reset();

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
          if (timestamp.current === currentDate) {
            setData(r.data.map(word => word.text));
          }
        })
    }, 500);

  };

  const handleSubmit = (values) => {
    axios
      .get('/api/v1/words', {
        params: {
          word: values.value
        }
      }).then((r) => {
        onSubmit(r.data);
        form.reset();
        timestamp.current = new Date();
        setData([]);
      }).catch(error => {
        setError(error.response.data.message);
      });
  };

  return (
    <form onSubmit={ form.onSubmit(values => handleSubmit(values)) }>
      <Group grow preventGrowOverflow={false} align="flex-start" gap="xs">
        <Autocomplete
          placeholder="Enter your word"
          data={data}
          {...form.getInputProps('value')}
          onChange={(value) => {
            handleChange(value);
            return form.getInputProps('value').onChange(value);
          }}
          error={error}
          disabled={disabled}
        />
        <Button maw={80} type='submit' disabled={disabled}>Add</Button>
      </Group>
    </form>
  );
}

export default WordSelector;
