"use client";

import { Box, Card, CardActions, CardContent, CardMedia, Container, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import { signIn } from "next-auth/react";
import DrawerAppBar from "~/components/nav";

export default function Page() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#bdf8f7",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "16px",
            }}
        >
            <Container maxWidth="lg">
                <DrawerAppBar />
                {/* Utilisation de Stack pour aligner les cartes côte à côte */}
                <Stack
                    direction="row" // Définit l'alignement horizontal
                    spacing={2} // Espace entre les cartes
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        flexWrap: "wrap", // Permet de passer à la ligne si l'écran est trop petit
                        mt: 4, // Ajoute un espace en haut
                    }}
                >
                    <Card sx={{ maxWidth: 400, textAlign: "center" }}>
                        <CardContent>
                            <Typography variant="h2" gutterBottom>
                                Bienvenue
                            </Typography>
                            <Typography variant="body1" textAlign="center">
                                Connectez-vous
                            </Typography>
                            <Box sx={{ mt: 2 }}>
                                <Button variant="contained" color="primary" onClick={() => signIn()}>
                                    Connexion
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>

                    <Card sx={{ maxWidth: 675 }}>
                        <CardMedia
                            component="img"
                            height="400"
                            image="/images/SIF-400_Sello_FR.png" // Chemin relatif à "public"
                            alt="SIF-400 Sello"
                        />
                        <CardContent>
                            <Typography variant="h4" gutterBottom>
                                Mini Usine
                            </Typography>
                            <Typography variant="body1">Voici une image de la mini Usine 4.0 sur laquelle nous avons pu travailler et réaliser notre projet industriel de 3ème année</Typography>
                        </CardContent>
                    </Card>
                    {/* <Card sx={{ maxWidth: 400, textAlign: "center" }}>
                        <CardContent>
                            <Typography variant="h4" gutterBottom>
                                Bonjour
                            </Typography>
                            <Typography variant="body1">Deuxième carte</Typography>
                        </CardContent>
                    </Card */}
                </Stack>
            </Container>
        </Box>
    );
}
