import React, { useState } from "react";
import { Link } from "react-router-dom";
import PokemonCardStyle from "./PokemonCard.module.css";

// Color mapping for Pokémon types
const typeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

export default function PokemonCard({ pokemon }) {
  const [imageLoaded, setImageLoaded] = useState();

  return (
    <div className={PokemonCardStyle.card}>
      <Link to={`/pokemon/${pokemon.id}`}>
        <div className={PokemonCardStyle.imageWrapper}>
          {!imageLoaded && <div className={PokemonCardStyle.imageLoading} />}
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className={PokemonCardStyle.image}
            style={{ opacity: imageLoaded ? 1 : 0 }}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <h2 className={PokemonCardStyle.name}>{pokemon.name}</h2>
      </Link>
      <div className={PokemonCardStyle.type}>
        {pokemon.types.map((typeInfo) => (
          <span
            key={typeInfo.type.name}
            className={PokemonCardStyle.typeLabel}
            style={{ backgroundColor: typeColors[typeInfo.type.name] }}
          >
            {typeInfo.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}
