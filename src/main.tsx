import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RootLayout from "./routes/RootLayout.tsx";
import NotFoundPage from "./routes/NotFoundPage.tsx";
import AlbumDetails from "./routes/AlbumDetails.tsx";
import { FavoriteProvider } from "./context/FavoritesContext.tsx";
import Favorites from "./routes/Favorites.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFoundPage />,

    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/album/:id",
        element: <AlbumDetails />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FavoriteProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </FavoriteProvider>
  </StrictMode>
);
