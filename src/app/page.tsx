"use client";

import Link from "next/link";
import {Box, Card, CardContent, Container, Stack, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import React from "react";

import { signIn } from "next-auth/react";



export default function Home() {
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
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ width: 1, height: "100vh" }}
                >
                 <Card sx={{ maxWidth: 400 }}>
                        <CardContent >
                            <Typography variant="h2" gutterBottom>
                                Bienvenue
                            </Typography>
                            <Typography variant="body1">
                                Connectez-vous pour afficher la page admin
                            </Typography>
                            <Grid container spacing={2} alignItems="center" sx={{ mt: 2 }}>
                                <Grid>
                                    <Button variant="contained" color="error" onClick={() => signIn()}>
                                        Admin
                                    </Button>
                                </Grid>
                                <Grid>
                                    <Button variant="contained" color="success" onClick={() => signIn()}>
                                        User
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card> 
                </Stack>
            </Container>
        </Box>
  );
}
