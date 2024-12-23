"use client";

import React, { useState, useEffect } from "react";
import { Box, Card, Typography, CircularProgress } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import DrawerAppBar from "~/components/nav";

export default function AdminPage() {
  const [liveData, setLiveData] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    const ws = new WebSocket("ws://130.130.130.28:1880/ws/cheeseburger");
    let receivedData: any = {};

    ws.onopen = () => {
      console.log("WebSocket connecté !");
      setIsLoading(false);
      ws.send("Connexion établie avec succès !");
    };

    ws.onmessage = (msg: MessageEvent) => {
      try {
        const data = JSON.parse(msg.data);
        console.log("Données reçues:", data);

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
          console.log("Toutes les données nécessaires sont disponibles :", receivedData);

          const {
            powerFactor,
            airConsumed,
            voltage,
            activePower,
            current,
            energyConsumed,
          } = receivedData;

          // Mise à jour des données live
          setLiveData({
            powerFactor,
            airConsumed,
            voltage,
            activePower,
            current,
            energyConsumed,
          });

          // Ajout des données au graphique
          setChartData((prevData) => {
            const newData = [
              ...prevData,
              {
                time: new Date().toLocaleTimeString(),
                powerFactor,
                airConsumed,
                voltage,
                activePower,
                current,
                energyConsumed,
              },
            ];
            return newData.slice(-20); // Garder les 20 dernières entrées
          });

          receivedData = {}; // Réinitialisation pour la prochaine itération
        }
      } catch (error) {
        console.error("Erreur lors du traitement des données JSON reçues:", msg.data, error);
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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

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
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <DrawerAppBar />
      <Box width="100%" maxWidth="1200px" mt={4}>
        {/* Graphique pour la consommation d'énergie */}
        <Card sx={{ padding: "20px", marginBottom: "20px" }}>
          <Typography variant="h4" gutterBottom>
            Données en temps réel - Consommation d'Énergie (Wh)
          </Typography>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  dataKey="energyConsumed"
                  stroke="#d45087"
                  name="Énergie Consommée (Wh)"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <Typography>Aucune donnée reçue pour le graphique</Typography>
          )}
        </Card>

        {/* Graphique pour les autres mesures */}
        <Card sx={{ padding: "20px", marginBottom: "20px" }}>
          <Typography variant="h5" gutterBottom>
            Données en temps réel - Voltage, Puissance Active et Air consommé (V & W & L)
          </Typography>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line dataKey="voltage" stroke="#8884d8" name="Voltage (V)" />
                <Line
                  dataKey="activePower"
                  stroke="#ffc658"
                  name="Puissance Active (W)"
                />
                <Line
                  dataKey="airConsumed"
                  stroke="#0088FE"
                  name="Air Consommé (L)"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <Typography>Aucune donnée reçue pour le graphique</Typography>
          )}
        </Card>
        {/* Graphique pour la consommation d'énergie */}
        <Card sx={{ padding: "20px", marginBottom: "20px" }}>
          <Typography variant="h4" gutterBottom>
            Données en temps réel - Facteur de Puissance et Courant (W & A)
          </Typography>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  dataKey="powerFactor"
                  stroke="#ff7300"
                  name="Facteur de Puissance (W)"
                />
                <Line dataKey="current" stroke="#82ca9d" name="Courant (A)" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <Typography>Aucune donnée reçue pour le graphique</Typography>
          )}
        </Card>

        {/* Cartes des mesures */}
        <Box display="flex" flexWrap="wrap" justifyContent="space-between">
          {liveData ? (
            Object.entries(liveData).map(([key, value]) => (
              <Card
                key={key}
                sx={{
                  padding: "16px",
                  width: "calc(33% - 10px)",
                  marginBottom: "20px",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Typography>
                <Typography variant="h4">
                  {value !== undefined && value !== null
                    ? typeof value === "number"
                      ? value.toLocaleString()
                      : value.toString()
                    : "N/A"}
                  {key === "voltage"
                    ? " V"
                    : key === "current"
                    ? " A"
                    : key === "activePower"
                    ? " W"
                    : key === "energyConsumed"
                    ? " Wh"
                    : key === "airConsumed"
                    ? " L"
                    : ""}
                </Typography>
              </Card>
            ))
          ) : (
            <Typography>Aucune donnée en direct reçue</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
