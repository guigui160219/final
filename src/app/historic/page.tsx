"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import DrawerAppBar from "~/components/nav";

interface DataPoint {
  time: string;
  powerFactor: number;
  airConsumed: number;
  voltage: number;
  activePower: number;
  current: number;
  energyConsumed: number;
}

export default function HistoricPage() {
  const [data, setData] = useState<DataPoint[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const ws = new WebSocket("ws://130.130.130.28:1880/ws/cheeseburger");
    let receivedData: any = {};

    ws.onopen = () => {
      console.log("WebSocket connecté !");
      setIsLoading(false);
    };

    ws.onmessage = (msg: MessageEvent) => {
      try {
        const data = JSON.parse(msg.data);
        receivedData[data.topic] = data.payload;

        const requiredKeys = [
          "powerFactor",
          "airConsumed",
          "voltage",
          "activePower",
          "current",
          "energyConsumed",
        ];

        if (requiredKeys.every((key) => key in receivedData)) {
          console.log("Toutes les données reçues pour l'historique :", receivedData);

          const newEntry: DataPoint = {
            time: new Date().toLocaleTimeString(),
            powerFactor: receivedData.powerFactor,
            airConsumed: receivedData.airConsumed,
            voltage: receivedData.voltage,
            activePower: receivedData.activePower,
            current: receivedData.current,
            energyConsumed: receivedData.energyConsumed,
          };

          setData((prevData) => [...prevData, newEntry]); // Ajouter la nouvelle ligne
          receivedData = {};
        }
      } catch (error) {
        console.error("Erreur lors du traitement des données WebSocket :", error);
        setError("Erreur lors du traitement des données WebSocket.");
      }
    };

    ws.onerror = (event: Event) => {
      console.error("Erreur WebSocket :", event);
      setError(`Erreur WebSocket : ${JSON.stringify(event)}`);
      setIsLoading(false);
    };

    ws.onclose = (event: CloseEvent) => {
      console.warn("Connexion WebSocket fermée :", event);
      setError(`Connexion fermée : Code ${event.code}, Raison : ${event.reason}`);
      setIsLoading(false);
    };

    return () => {
      ws.close();
    };
  }, []);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f4f4f9",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <DrawerAppBar />
      <Box width="100%" maxWidth="1200px" mt={4}>
        <Card sx={{ padding: "20px" }}>
          <Typography variant="h4" gutterBottom>
            Historique des Données
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Heure</TableCell>
                  <TableCell>Facteur de Puissance</TableCell>
                  <TableCell>Air Consommé (L)</TableCell>
                  <TableCell>Tension (V)</TableCell>
                  <TableCell>Puissance Active (W)</TableCell>
                  <TableCell>Courant (A)</TableCell>
                  <TableCell>Énergie Consommée (Wh)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.time}</TableCell>
                    <TableCell>{row.powerFactor.toFixed(2)}</TableCell>
                    <TableCell>{row.airConsumed.toLocaleString()}</TableCell>
                    <TableCell>{row.voltage.toLocaleString()}</TableCell>
                    <TableCell>{row.activePower.toLocaleString()}</TableCell>
                    <TableCell>{row.current.toLocaleString()}</TableCell>
                    <TableCell>{row.energyConsumed.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>
    </Box>
  );
}
