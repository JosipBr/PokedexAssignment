import React, { useState, useMemo } from "react";
import { useQuery, useQueries } from "@tanstack/react-query";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import Navbar from "../../components/Navbar/Navbar";
import SearchAndSortBar from "../../components/SearchAndSortBar/SearchAndSortBar";
import PokedexStyle from "./Pokedex.module.css";
import pokeball from "../../assets/images/pokeball.png";

export default function Pokedex() {
  const [offset, setOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("number-asc");
  const limit = 20;

  const { data: allPokemonList = [], isLoading: isLoadingList } = useQuery({
    queryKey: ["all-pokemon-list"],
    queryFn: async () => {
      const res = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0"
      );
      const json = await res.json();
      return json.results;
    },
    staleTime: Infinity,
  });

  const filteredList = useMemo(() => {
    let result = [...allPokemonList];

    if (searchTerm) {
      result = result.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const getIdFromUrl = (url) => {
      const parts = url.split("/").filter(Boolean);
      return parseInt(parts[parts.length - 1]);
    };

    if (sortOrder === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "name-desc") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOrder === "number-asc") {
      result.sort((a, b) => getIdFromUrl(a.url) - getIdFromUrl(b.url));
    } else if (sortOrder === "number-desc") {
      result.sort((a, b) => getIdFromUrl(b.url) - getIdFromUrl(a.url));
    }

    return result;
  }, [allPokemonList, searchTerm, sortOrder]);

  const visiblePokemons = filteredList.slice(offset, offset + limit);

  const detailedQueries = useQueries({
    queries: visiblePokemons.map((pokemon) => ({
      queryKey: ["pokemon", pokemon.name],
      queryFn: async () => {
        const res = await fetch(pokemon.url);
        return res.json();
      },
      staleTime: Infinity,
    })),
  });

  const detailedPokemonData = detailedQueries.map((query) => query.data);

  const handleNext = () => setOffset((prev) => prev + limit);
  const handlePrev = () => setOffset((prev) => Math.max(prev - limit, 0));

  return (
    <div>
      <SearchAndSortBar
        onSearch={(term) => {
          setOffset(0);
          setSearchTerm(term);
        }}
        onSortChange={(order) => {
          setOffset(0);
          setSortOrder(order);
        }}
      />

      {isLoadingList ? (
        <div className={PokedexStyle.initialLoading}>
          <img
            src={pokeball}
            alt="Loading Pokédex..."
            className={PokedexStyle.spinner}
          />
        </div>
      ) : (
        <>
          <div className={PokedexStyle.pokemonListWrapper}>
            <div className={PokedexStyle.pokemonList}>
              {detailedPokemonData.length === 0 ? (
                <div className={PokedexStyle.noResults}>
                  {searchTerm
                    ? "No Pokémon match your search."
                    : "Loading Pokémon..."}
                </div>
              ) : (
                detailedPokemonData.map((pokemon, index) => (
                  <div key={index} className={PokedexStyle.cardWrapper}>
                    {pokemon ? (
                      <PokemonCard pokemon={pokemon} />
                    ) : (
                      <div className={PokedexStyle.loadingCard}>
                        <img
                          src={pokeball}
                          alt="Loading..."
                          className={PokedexStyle.spinnerSmall}
                        />
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className={PokedexStyle.pagination}>
            <button
              onClick={handlePrev}
              disabled={offset === 0 || isLoadingList}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={offset + limit >= filteredList.length || isLoadingList}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
