import React, { useEffect } from "react";
import { SegmentedControl } from "@mantine/core";

const spellingAccentSetting = 'spelling-accent-setting';

function getAccentOrDefault(defaultValue) {
  const variety = localStorage.getItem(spellingAccentSetting);
  if (variety == null) {
    return defaultValue;
  }
  return variety;
}

function AccentControl({ onChange = () => {} }) {
  const accent = getAccentOrDefault('UK');

  useEffect(() => {
    onChange(accent);
  }, []);

  return (
    <SegmentedControl
      size="xs"
      radius="xl"
      data={[
        { label: '🇬🇧 UK', value: 'UK' },
        { label: '🇺🇸 US', value: 'US' },
      ]}
      defaultValue={getAccentOrDefault(accent)}
      onChange={(value) => {
        localStorage.setItem(spellingAccentSetting, value);
        onChange(value);
      }}
    />
  );
}

export default AccentControl;
