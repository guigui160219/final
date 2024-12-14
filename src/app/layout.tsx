// app/layout.js
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
    children,
  }:{children: React.ReactNode;

  })
  {return (
    <html lang="fr">
      <head>
        <title>Groupe 2</title>
      </head>
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}