import React from 'react';
import { Divider, List, Space, Text, Title } from '@mantine/core';
import ResponsivePaper from "../components/ResponsivePaper.jsx";
import { Link } from "react-router-dom";

function TermPage() {
  return (
    <ResponsivePaper w="80%">
      <Title order={2}>Privacy Policy</Title>
      <Space h="md" />
      <Text>
        Welcome to englab. Your privacy is important to us.
        This Privacy Policy provides information about the personal data we collect from you, how we use it,
        and how it is protected when you use our website.
        By using our site, you consent to our data practices.
        For any changes to this policy, we recommend that you review it periodically.
      </Text>
      <Space h="lg" />
      <Title order={3}>Information Collection</Title>
      <Space h="xs" />
      <Text>
        We gather various types of information to provide and improve our services to you. Here is personal information that we may collect:
      </Text>
      <List>
        <List.Item>Your name or username.</List.Item>
        <List.Item>Your email address.</List.Item>
        <List.Item>Your social account ID (such as Facebook or Google).</List.Item>
      </List>
      <Text>
        Further information might be collected if you choose to provide it, for instance, by completing sections in your profile.
      </Text>
      <Space h="xs" />
      <Text>
        Additionally, we collect non-personal data about how you interact with our website,
        which may include the pages you view, the time spent on those pages, and other diagnostic data.
        This information is used purely for the purposes of analytics and tracking the number of visitors to our site.
      </Text>
      <Space h="lg" />
      <Title order={3}>Use of Information</Title>
      <Space h="xs" />
      <Text>
        The information we collect is vital in helping us deliver a superior service to our users.
        Here is how we utilise your data:
      </Text>
      <List>
        <List.Item>To maintain and improve our website and services.</List.Item>
        <List.Item>To make you a registered member of our website.</List.Item>
        <List.Item>To personalize your experience.</List.Item>
        <List.Item>We may also use your email address to inform you of activity on our site or reply to your feedback.</List.Item>
      </List>
      <Space h="lg" />
      <Title order={3}>Data Storage and Protection</Title>
      <Space h="xs" />
      <Text>
        We are committed to ensuring that any information that you provide to us is safe and secure.
        In order to prevent any unauthorized access or disclosure, we have implemented suitable measures and
        procedures to safeguard and secure the information that we collect.
      </Text>
      <Space h="lg" />
      <Title order={3}>Sharing of Information</Title>
      <Space h="xs" />
      <Text>
        Your trust is important to us, which is why we do not sell, rent, or trade your personal information with third parties.
        Englab is committed to keeping your personal information confidential.
        We believe in transparency and only use your information as described in this Privacy Policy.
      </Text>
      <Space h="lg" />
      <Title order={3}>User Rights</Title>
      <Space h="xs" />
      <Text>
        You have the right to access and obtain a copy of your personal data that we hold. Please contact us to do so.
        If you believe that your information with us is incomplete or inaccurate, you can reach out to us to request an update or correction.
      </Text>
      <Space h="xs" />
      <Text>
        You also have the right to request the deletion of your personal data. Please contact us you want us to erase your information.
      </Text>
      <Space h="lg" />
      <Title order={3}>CCPA Privacy Rights</Title>
      <Space h="xs" />
      <Text>
        Under the CCPA, among other rights, California consumers have the following rights:
      </Text>
      <List>
        <List.Item>Right to know and access: You have the right to request that we disclose certain information to you about our collection and use of your personal information.</List.Item>
        <List.Item>Right to Delete: You have the right to request that we delete any of your personal information that we collected from you and retained (with some exceptions).</List.Item>
        <List.Item>Right to opt-out: If we sell your personal information, you have the right to opt-out of the sale of your personal information.</List.Item>
        <List.Item>Right to non-discrimination: We will not discriminate against you for exercising any of your CCPA rights.</List.Item>
      </List>
      <Space h="lg" />
      <Title order={3}>GDPR Data Protection Rights</Title>
      <Space h="xs" />
      <Text>
        We would like to ensure that you are completely informed about all your rights regarding data protection. very user is entitled to the following:
      </Text>
      <List>
        <List.Item>The right to access: You have the right to access your personal data. This means you can request and receive a copy of your personal data, as well as ask for other details about how the data is used.</List.Item>
        <List.Item>The right to rectification: You can have inaccurate personal data corrected. If the data is incomplete, you can request that it be completed.</List.Item>
        <List.Item>The right to erasure: This allows you to request the deletion or removal of personal data where there is no compelling reason for its continued processing.</List.Item>
        <List.Item>The right to restrict processing: Under certain circumstances, you have the right to block or suppress the processing of your personal data.</List.Item>
        <List.Item>The right to object to processing: You have the right to object to the processing of your personal data in certain circumstances, including an absolute right to stop your data being used for direct marketing.</List.Item>
        <List.Item>The right to data portability: This right allows you to obtain and reuse your personal data for your own purposes across different services. You can move, copy or transfer personal data easily from one IT environment to another in a safe and secure way, without hindrance to usability.</List.Item>
        <List.Item>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</List.Item>
      </List>
      <Space h="lg" />
      <Title order={3}>Acceptance of this policy</Title>
      <Space h="xs" />
      <Text>
        Persistent usage of our website indicates your agreement with this policy.
        If you do not accept the policy then please do not use this site.
        Additionally, during the registration process, we will further request your explicit acceptance of the privacy policy.
      </Text>
      <Space h="lg" />
      <Title order={3}>YouTube</Title>
      <Space h="xs" />
      <Text>
        Englab uses YouTube API Services to gather content and to play videos.
        As such, users are agreeing to be bound by the <Link target="_blank" to={'https://policies.google.com/privacy'}>Google privacy policy</Link>.
      </Text>
      <Space h="lg" />
      <Title order={3}>Customer Service</Title>
      <Space h="xs" />
      <Text>
        We may communicate with you in response to your inquiries. Communication is done via email.
      </Text>
      <Space h="lg" />
      <Title order={3}>Changes to the Privacy Policy</Title>
      <Space h="xs" />
      <Text>
        We may make changes to this policy at any moment. You may be asked to review and re-accept the information in this policy if it changes in the future.
      </Text>
      <Space h="lg" />
      <Divider />
      <Space h="lg" />
      <Title order={2}>Terms of Service</Title>
      <Space h="md" />
      <Text>
        Info
      </Text>
    </ResponsivePaper>
  );
}

export default TermPage;
