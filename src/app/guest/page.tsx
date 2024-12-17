import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import DrawerAppBar from "~/components/nav";

export default function GuestPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#bdf8f7',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <DrawerAppBar />
      <Card sx={{ maxWidth: 700, width: '100%', m: 2 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14, mb: 2 }}>
            Demander à un admin de vous autoriser l'accès
          </Typography>
          <Button variant="contained" href="mailto:la218774@student.helha.be">
            Demander l'accès à l'admin
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

