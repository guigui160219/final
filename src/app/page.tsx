"use client";

import { Box, Card, CardContent, Container, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import { signIn } from "next-auth/react";
import DrawerAppBar from "~/components/nav";

export default function Page() {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundImage: 'url(/images/binary.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Container maxWidth="lg">
                <DrawerAppBar />
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ width: 1, height: "100vh" }}
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
                                <Button variant="contained" color="error" onClick={() => signIn()}>
                                    Connexion
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Stack>
            </Container>
        </Box>
    );
}
