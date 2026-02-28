import { Card, CardContent, Typography } from "@mui/material";

export default function Splash({ setSelectedWorkflow, Workflow }) {
  return (
    <div
      className="workflow-toggle"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "16px",
        height: "100vh",
      }}
    >
      <Card
        onClick={() => setSelectedWorkflow(Workflow.Developers)}
        style={{
          cursor: "pointer",
          width: "400px",
          height: "400px",
          padding: "24px",
          textAlign: "center",
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            DEVS
          </Typography>
        </CardContent>
      </Card>
      <Card
        onClick={() => setSelectedWorkflow(Workflow.Nodes)}
        style={{
          cursor: "pointer",
          width: "400px",
          height: "400px",
          padding: "24px",
          textAlign: "center",
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            NODES
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
