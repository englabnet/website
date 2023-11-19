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
        Welcome to Englab. Your privacy is important to us.
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
        Englab is an online platform that provides users with tools to improve their English skills.
        These Services may change from time to time without prior notice to you and we may stop (permanently or temporarily)
        providing the Services (or any features within the Services) to you or to users generally and may not be able to provide you with prior notice.
      </Text>
      <Space h="lg" />
      <Title order={3}>General Use</Title>
      <Space h="xs" />
      <Text>
        The Services may include advertisements, which may be targeted to the Content or information on the Services,
        queries made through the Services, or other information. The types and extent of advertising on the Services are
        subject to change. In consideration for Englab granting you access to and use of the Services,
        you agree that Englab and its third party providers and partners may place such advertising on the Services
        or in connection with the display of Content or information from the Services whether submitted by you or others.
      </Text>
      <Space h="lg" />
      <Title order={3}>General Restrictions</Title>
      <Space h="xs" />
      <Text>
        You are prohibited from acquiring, storing, showing, or aiding in the distribution of any content from Englab
        that is acquired by scraping, crawling, spidering, or any other means or software that bypasses the official APIs
        (referred to collectively as &quot;Non-Official Content&quot;). This prohibition is in effect regardless of whether (1)
        the Non-Official Content was sourced directly or through an intermediary, like a customer or external developer,
        and (2) whether the Non-Official Content is retained or exhibited within the Application or any other platform,
        product, or service.
      </Text>
      <Space h="lg" />
      <Title order={3}>YouTube</Title>
      <Space h="xs" />
      <Text>
        Englab uses YouTube API Services to gather content and to play videos.
        As such, users are agreeing to be bound by the <Link target="_blank" to={'https://www.youtube.com/t/terms'}>YouTube Terms of Service</Link>.
      </Text>
      {/*<Space h="lg" />*/}
      {/*<Title order={3}>Englab Account</Title>*/}
      {/*<Space h="xs" />*/}
      {/*<Text>*/}
      {/*  TBD*/}
      {/*</Text>*/}
      <Space h="lg" />
      <Title order={3}>Content Owner</Title>
      <Space h="xs" />
      <Text>
        Content owners that wish to delete their content from Englab can do so by submitting a request via email.
      </Text>
      {/*<Space h="lg" />*/}
      {/*<Title order={3}>Registration</Title>*/}
      {/*<Space h="xs" />*/}
      {/*<Text>*/}
      {/*  TBD*/}
      {/*</Text>*/}
      <Space h="lg" />
      <Title order={3}>Disclaimer</Title>
      <Space h="xs" />
      <Text>
        ENGLAB.NET endeavors to offer precise information on its website, but does not guarantee the accuracy of such information.
        ENGLAB.NET reserves the right to modify its services at any time without prior notice. Periodic updates to the website may be made by ENGLAB.NET.
        The Terms of Service (TOS) provided here represent the complete agreement regarding the usage of the ENGLAB.NET website.
        ENGLAB.NET may update these TOS at any time without providing notice. All rights not explicitly granted in these TOS are reserved by ENGLAB.NET.
      </Text>
      <Space h="xs" />
      <Text>
        ALL INFORMATION ON THIS SITE IS PROVIDED &quot;AS IS&quot; WITH ALL FAULTS WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED.
        ENGLAB.NET DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, THOSE OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
      </Text>
      <Space h="lg" />
      <Title order={3}>Copyright</Title>
      <Space h="xs" />
      <Text>
        All content and materials available on the ENGLAB.NET website, including but not limited to texts, images, logos,
        graphics, software, documents, and services (collectively referred to as &quot;Materials&quot;),
        are the copyrighted property of ENGLAB.NET and any third-party content providers.
        Unauthorized copying, reproduction, distribution, republication, downloading, display, posting,
        or transmission of any Materials from ENGLAB.NET in any form or by any means is strictly prohibited without prior
        express written consent from ENGLAB.NET.
      </Text>
      <Space h="xs" />
      <Text>
        Commercial exploitation of ENGLAB.NET Materials without the express written permission of ENGLAB.NET is also not allowed.
        No part of the ENGLAB.NET website grants any license or right under ENGLAB.NET&apos;s intellectual property, except as explicitly specified.
      </Text>
      <Space h="xs" />
      <Text>
        Users are responsible for acquiring the necessary permissions for any utilization of ENGLAB.NET Materials.
        ENGLAB.NET allows the use of its Materials for personal, non-commercial purposes under certain conditions,
        such as the inclusion of copyright and permission notices in the used Materials, ensuring that the Materials
        are used strictly for personal, non-commercial aims, and that the Materials are not altered in any form.
      </Text>
      <Space h="xs" />
      <Text>
        The permission to use ENGLAB.NET Materials is subject to immediate revocation without notice if the
        Terms of Service (TOS) are violated. Upon revocation, any downloaded or printed Materials must be promptly destroyed.
      </Text>
      <Space h="xs" />
      <Text>
        Unauthorized usage of Materials from ENGLAB.NET may breach copyright, trademark, and privacy laws.
      </Text>
      <Space h="lg" />
      <Title order={3}>Contact Us</Title>
      <Space h="xs" />
      <Text>
        If you have any questions, please contact us directly at <Link to="mailto: contact@englab.net">contact@englab.net</Link>
      </Text>
    </ResponsivePaper>
  );
}

export default TermPage;
