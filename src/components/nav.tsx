"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarGroup } from "@mui/material";
import { useRouter } from "next/navigation";

// Définir le type pour les éléments de navigation
type Page = {
  label: string;
  route: string;
  isAdmin: boolean;
};

const navItems: Page[] = [
  {
    label: "Accueil",
    route: "/",
    isAdmin: false,
  },
  {
    label: "Admin",
    route: "/admin",
    isAdmin: true, // Visible uniquement pour les admins
  },
  {
    label: "Guest",
    route: "/guest",
    isAdmin: false, // Visible pour tout le monde
  },
];

function DrawerAppBar() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="absolute" sx={{ backgroundColor: "#001331" }}>
        <Toolbar>
          {/* Titre principal */}
          <Typography
            variant="h6"
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
            color="#bdf8fd"
          >
            Groupe 2
          </Typography>

          {/* Avatars */}
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <AvatarGroup max={3} sx={{ ml: 2 }}>
              <Avatar alt="Emeric" src="/images/Emeric.jpg" />
              <Avatar alt="Florian" src="/images/Florian1.jpg" />
              <Avatar alt="Guillaume" src="/images/Guillaume.jpg" />
            </AvatarGroup>
          </Box>

          {/* Navigation */}
          <Box sx={{ display: { xs: "none", sm: "block" }, textAlign: "center" }}>
            {navItems.map((item) => {
              // Logique pour filtrer les éléments de navigation
              if (item.isAdmin && !session?.user?.isAdmin) return null; // Admin page : seulement pour admins

              return (
                <Button
                  key={item.label}
                  sx={{ color: "#bdf8fd", mx: 1 }}
                  onClick={() => router.push(item.route)}
                >
                  {item.label}
                </Button>
              );
            })}
          </Box>

          {/* Bouton Déconnexion */}
          {session ? (
            <Button onClick={() => signOut()} sx={{ color: "#bdf8fd" }}>
              Déconnexion
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default DrawerAppBar;
