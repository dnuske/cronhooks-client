import {
  Box,
  useMantineTheme,
  Tabs, Space, Paper
} from '@mantine/core';
import StyledTabs from "./AuthTabs";
import {useState} from "react";
import Login from "./Login";
import Signup from "./Signup";

export default function AuthBox() {
  const theme = useMantineTheme();

  const [activeTab, setActiveTab] = useState(1);

  return (
    <Paper shadow="sm" radius="md" p="sm" sx={{maxWidth: 400, marginTop: 100}} mx="auto" withBorder>

      <StyledTabs active={activeTab} onTabChange={setActiveTab}>
        <Space h="md" />
        <Tabs.Tab label="Log In" >
          <Login />
        </Tabs.Tab>
        <Tabs.Tab label="Sign Up" >
          <Signup />
        </Tabs.Tab>
      </StyledTabs>

    </Paper>
  );
}