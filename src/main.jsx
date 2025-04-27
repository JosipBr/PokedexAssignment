import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import About from "./pages/About/About.jsx";
import Pokedex from "./pages/Pokedex/Pokedex.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PokemonDetails from "./pages/PokemonDetails/PokemonDetails.jsx";

const queryClient = new QueryClient();

const router = createHashRouter([
  {
    path: "/",
    element: (
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    ),
    children: [
      {
        path: "/",
        element: <Pokedex />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/pokemon/:id",
        element: <PokemonDetails />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
