"use client";

import React, { useState, useEffect } from "react";
import { Box, Card, Typography } from "@mui/material";
import DrawerAppBar from "~/components/nav";
import { PieChart } from "@mui/x-charts";

export default function AdminPage() {
  const [data, setData] = useState<string | number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ws = new WebSocket("wss://nodered.helhatechniquecharleroi.xyz/ws/out405");

    ws.onopen = () => {
      console.log("WebSocket connecté !");
      ws.send("Connexion établie avec succès !");
    };

    ws.onmessage = (event: MessageEvent) => {
      console.log("Message reçu :", event.data);
      setData(event.data);
    };

    ws.onerror = (event: Event) => {
      console.error("Erreur WebSocket :", event);
      setError(`Erreur WebSocket : ${JSON.stringify(event)}`);
    };

    ws.onclose = (event: CloseEvent) => {
      console.warn("Connexion WebSocket fermée :", event);
      setError(`Connexion fermée : Code ${event.code}, Raison : ${event.reason}`);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#bdf8f7",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <DrawerAppBar />
      <Box
        display="flex"
        flex="1"
        padding="16px"
        borderRadius="30px"
        justifyContent="space-around"
        gap="20px"
      >
        <Card sx={{ padding: "16px", width: "300px" }}>
          <Typography variant="h4" gutterBottom>
            Current
          </Typography>
          {error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <Typography>{data || "Aucune donnée reçue"}</Typography>
          )}
        </Card>
        <Card sx={{ padding: "16px", width: "300px" }}>
        <Typography variant="h4" gutterBottom>
            Voltage
          </Typography>
          {error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <Typography>{data || "Aucune donnée reçue"}</Typography>
          )}
        </Card>
        <Card sx={{ padding: "16px", width: "300px" }}>
        <Typography variant="h4" gutterBottom>
            Aled
          </Typography>
          {error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <Typography>{data || "Aucune donnée reçue"}</Typography>
          )}
        </Card>
      </Box>
      <PieChart
        colors={["darkslateblue", "blue", "darkblue"]}
        series={[
          {
            data: [
              { id: 0, value: data, label: "series A" },
              { id: 1, value: 2, label: "series B" },
              { id: 2, value: 1, label: "series C" },
            ],
          },
        ]}
        width={400}
        height={200}
      />
    </Box>
  );
}
