import {
  Box,
  useMantineTheme,
  Tabs, Space
} from '@mantine/core';
import StyledTabs from "./AuthTabs";
import {useState} from "react";
import Login from "./Login";
import Signup from "./Signup";

export default function AuthBox() {
  const theme = useMantineTheme();

  const [activeTab, setActiveTab] = useState(1);

  return (
    <Box sx={{
      maxWidth: 400,
      marginTop: '100px',
      border: 'solid 2px',
      borderColor: theme.colors.gray[4],
      padding: '20px',
      borderRadius: '8px' }} mx="auto">

      <StyledTabs active={activeTab} onTabChange={setActiveTab}>
        <Space h="md" />
        <Tabs.Tab label="Log In" >
          <Login />
        </Tabs.Tab>
        <Tabs.Tab label="Sign Up" >
          <Signup />
        </Tabs.Tab>
      </StyledTabs>

    </Box>
  );
}