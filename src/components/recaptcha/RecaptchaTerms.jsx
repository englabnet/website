import React from "react";
import { Text } from "@mantine/core";

function RecaptchaTerms() {
  return (
    <Text size='xs' c="dimmed" m={5}>
      This site is protected by reCAPTCHA and the Google {"\n"}
      <a href="https://policies.google.com/privacy">Privacy Policy</a> and {"\n"}
      <a href="https://policies.google.com/terms">Terms of Service</a> apply.
    </Text>
  );
}

export default RecaptchaTerms;
