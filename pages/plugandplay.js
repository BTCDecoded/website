import React from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";

const platforms = [
  {
    name: "Start9",
    docsLink: "https://start9.com/docs",
    supportLink: "https://start9.com/support",
  },
  {
    name: "Umbrel",
    docsLink: "https://umbrel.com/docs",
    supportLink: "https://umbrel.com/support",
  },
  {
    name: "Parmanode",
    docsLink: "https://parmanode.com/docs",
    supportLink: "https://parmanode.com/support",
  },
  {
    name: "Mynode",
    docsLink: "https://mynodebtc.com/docs",
    supportLink: "https://mynodebtc.com/support",
  },
];

export default function PlugAndPlay() {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box
      sx={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        marginTop: "80px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Plug and Play Node Documentation
      </Typography>
      <Typography variant="body1" gutterBottom>
        Select your platform below to explore documentation and support options
        for your Plug and Play Bitcoin Node.
      </Typography>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="Platform Tabs"
        sx={{ marginBottom: "20px" }}
      >
        {platforms.map((platform, index) => (
          <Tab key={index} label={platform.name} />
        ))}
      </Tabs>
      {platforms.map(
        (platform, index) =>
          selectedTab === index && (
            <Box key={index}>
              <Typography variant="h5" gutterBottom>
                {platform.name} Documentation
              </Typography>
              <Typography variant="body1">
                <a
                  href={platform.docsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Documentation
                </a>
              </Typography>
              <Typography variant="body1">
                <a
                  href={platform.supportLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Support
                </a>
              </Typography>
            </Box>
          ),
      )}
    </Box>
  );
}
