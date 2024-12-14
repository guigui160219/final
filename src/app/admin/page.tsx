import { Box } from "@mui/material";
import DrawerAppBar from "~/components/nav";

export default function AdminPage() {
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
        ><DrawerAppBar/>
        </Box>
    );
}
  