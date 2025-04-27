import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PokemonDetailsStyle from "./PokemonDetails.module.css";

export default function PokemonDetails() {
  const { id } = useParams();

  const {
    isLoading: pokemonLoading,
    isError: pokemonError,
    data: pokemon,
  } = useQuery({
    queryKey: ["pokemon", id],
    queryFn: () =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
        res.json()
      ),
  });

  const {
    isLoading: speciesLoading,
    isError: speciesError,
    data: species,
  } = useQuery({
    queryKey: ["pokemon-species", id],
    queryFn: () =>
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) =>
        res.json()
      ),
    enabled: !!pokemon,
  });

  const getFlavorText = () => {
    if (speciesLoading) return "Loading description...";
    if (speciesError) return "Couldn't load description";

    const englishEntries = species.flavor_text_entries.filter(
      (entry) => entry.language.name === "en"
    );

    const preferredGames = [
      "scarlet",
      "violet",
      "sword",
      "shield",
      "sun",
      "moon",
      "x",
      "y",
      "black",
      "white",
    ];

    for (const game of preferredGames) {
      const entry = englishEntries.find((e) => e.version.name === game);
      if (entry) {
        return entry.flavor_text
          .replace(/\f/g, " ")
          .replace(/\s+/g, " ")
          .trim();
      }
    }

    return (
      englishEntries[0]?.flavor_text
        .replace(/\f/g, " ")
        .replace(/\s+/g, " ")
        .trim() || "No description available"
    );
  };

  if (pokemonLoading)
    return <div className={PokemonDetailsStyle.loading}>Loading...</div>;
  if (pokemonError)
    return (
      <div className={PokemonDetailsStyle.error}>Error loading Pokémon</div>
    );

  const types = pokemon.types.map((type) => type.type.name);
  const stats = pokemon.stats.map((stat) => ({
    name: stat.stat.name,
    value: stat.base_stat,
  }));

  return (
    <div className={PokemonDetailsStyle.container}>
      <div className={PokemonDetailsStyle.header}>
        <h1 className={PokemonDetailsStyle.title}>
          #{pokemon.id.toString().padStart(3, "0")} {pokemon.name}
        </h1>
        <h2 className={PokemonDetailsStyle.subtitle}>{pokemon.name}</h2>
        <p className={PokemonDetailsStyle.description}>{getFlavorText()}</p>
      </div>

      <div className={PokemonDetailsStyle.content}>
        <div className={PokemonDetailsStyle.imageSection}>
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className={PokemonDetailsStyle.mainImage}
          />
        </div>

        <div className={PokemonDetailsStyle.detailsSection}>
          <div className={PokemonDetailsStyle.versions}>
            <div className={PokemonDetailsStyle.detailItem}>
              <span className={PokemonDetailsStyle.detailLabel}>Height</span>
              <span className={PokemonDetailsStyle.detailValue}>
                {(pokemon.height / 10).toFixed(1)} m
              </span>
            </div>
            <div className={PokemonDetailsStyle.detailItem}>
              <span className={PokemonDetailsStyle.detailLabel}>Weight</span>
              <span className={PokemonDetailsStyle.detailValue}>
                {(pokemon.weight / 10).toFixed(1)} kg
              </span>
            </div>
            <div className={PokemonDetailsStyle.detailItem}>
              <span className={PokemonDetailsStyle.detailLabel}>Abilities</span>
              <span className={PokemonDetailsStyle.detailValue}>
                {pokemon.abilities
                  .map((ability) => ability.ability.name)
                  .join(", ")}
              </span>
            </div>
          </div>

          <div className={PokemonDetailsStyle.typeSection}>
            <h3 className={PokemonDetailsStyle.sectionTitle}>Type</h3>
            <div className={PokemonDetailsStyle.typeContainer}>
              {types.map((type) => (
                <span
                  key={type}
                  className={PokemonDetailsStyle.typeBadge}
                  style={{ backgroundColor: getTypeColor(type) }}
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          <div className={PokemonDetailsStyle.statsSection}>
            <h3 className={PokemonDetailsStyle.sectionTitle}>Stats</h3>
            <div className={PokemonDetailsStyle.statsGrid}>
              {stats.map((stat) => (
                <div key={stat.name} className={PokemonDetailsStyle.statItem}>
                  <span className={PokemonDetailsStyle.statName}>
                    {formatStatName(stat.name)}
                  </span>
                  <span className={PokemonDetailsStyle.statValue}>
                    {stat.value}
                  </span>
                  <div className={PokemonDetailsStyle.statBar}>
                    <div
                      className={PokemonDetailsStyle.statBarFill}
                      style={{ width: `${(stat.value / 255) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getTypeColor(type) {
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
  return typeColors[type] || "#777";
}

function formatStatName(name) {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
