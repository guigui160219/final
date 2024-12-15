import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
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
                justifyContent: 'center',
                alignItems: 'center',
            }}
        ><DrawerAppBar/>
        <Box flex="1" flexDirection="column">
          <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
              Word of the Day
            </Typography>
          </CardContent>
        </Card>
        </Box>
        
        </Box>
            
      );
  }