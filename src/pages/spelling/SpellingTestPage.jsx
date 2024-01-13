import React, { useState } from 'react';
import {
  Group,
  Space,
  Title
} from '@mantine/core';
import ResponsivePaper from "../../components/responsive/ResponsivePaper.jsx";
import SpellingTest from "../../components/spelling/SpellingTest.jsx";
import AccentControl from "../../components/spelling/AccentControl.jsx";
import SpellingResult from "../../components/spelling/SpellingResult.jsx";

function SpellingTestPage() {
  const [accent, setAccent] = useState('UK');
  const [step, setStep] = useState(0);
  const [result, setResult] = useState(null);

  return (
    <ResponsivePaper w="40%">
      <Group justify="space-between">
        <Title order={2}>Spelling Test</Title>
        <AccentControl onChange={value => setAccent(value)}/>
      </Group>
      <Space h="md" />
      { result ?
        <SpellingResult result={result} /> :
        <SpellingTest
          accent={accent}
          step={step}
          onNext={() => setStep(step + 1)}
          onFinish={result => setResult(result)}
        />
      }
    </ResponsivePaper>
  );
}

export default SpellingTestPage;
