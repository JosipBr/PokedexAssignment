import React from "react";
import AboutStyle from "./About.module.css";
import pokeball from "../../assets/images/pokeball.png";

export default function About() {
  return (
    <div className={AboutStyle.container}>
      <div className={AboutStyle.header}>
        <img src={pokeball} alt="Pokéball" className={AboutStyle.logo} />
        <h1>About Pokédex App</h1>
      </div>

      <div className={AboutStyle.content}>
        <section className={AboutStyle.section}>
          <h2>What is this?</h2>
          <p>
            This Pokédex application is a digital encyclopedia of Pokémon. It
            provides detailed information about all Pokémon species, their
            stats, abilities, and more.
          </p>
        </section>

        <section className={AboutStyle.section}>
          <h2>Features</h2>
          <ul className={AboutStyle.features}>
            <li>Browse all Pokémon with pagination</li>
            <li>Search Pokémon by name</li>
            <li>View detailed information for each Pokémon</li>
            <li>See type matchups and weaknesses</li>
            <li>Compare stats with visual indicators</li>
          </ul>
        </section>

        <section className={AboutStyle.section}>
          <h2>Technologies Used</h2>
          <div className={AboutStyle.techGrid}>
            <div className={AboutStyle.techItem}>
              <h3>React</h3>
              <p>Frontend library for building user interfaces</p>
            </div>
            <div className={AboutStyle.techItem}>
              <h3>Vite</h3>
              <p>Fast development tooling and bundler</p>
            </div>
            <div className={AboutStyle.techItem}>
              <h3>React Query</h3>
              <p>Data fetching and state management</p>
            </div>
            <div className={AboutStyle.techItem}>
              <h3>PokéAPI</h3>
              <p>Comprehensive Pokémon RESTful API</p>
            </div>
          </div>
        </section>

        <section className={AboutStyle.section}>
          <h2>Disclaimer</h2>
          <p>
            This application is not affiliated with or endorsed by Nintendo,
            Game Freak, or The Pokémon Company. Pokémon and Pokémon character
            names are trademarks of Nintendo. All data is sourced from the
            public PokéAPI.
          </p>
        </section>
      </div>
    </div>
  );
}
