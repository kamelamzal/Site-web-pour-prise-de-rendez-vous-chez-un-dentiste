import React, { useState } from "react";
import "./SearchDentists.css";
import DentistCard from "../components/DentistCard"; // Import du composant carte dentiste

const dentistsData = [
  { id: 1, name: "Dr. Hakim KESSI", specialty: "Orthodontie", city: "Bouzeguen", available: "Dimanche - Lundi - Mercredi - Jeudi - Vendredi " },
  { id: 2, name: "Dr. Mohand KESSI", specialty: "Implants dentaires", city: "Bouzeguen", available: "Dimanche - Mardi - Mercredi  - Jeudi - Samedi" }
  
];

const SearchDentists = () => {
  const [search, setSearch] = useState("");

  const filteredDentists = dentistsData.filter(
    (dentist) =>
      dentist.name.toLowerCase().includes(search.toLowerCase()) ||
      dentist.specialty.toLowerCase().includes(search.toLowerCase()) ||
      dentist.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="search-container">
      <h2>🔍 Trouver un dentiste</h2>
      <input
        type="text"
        placeholder="Rechercher par nom, spécialité ou ville..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="dentists-list">
        {filteredDentists.length > 0 ? (
          filteredDentists.map((dentist) => <DentistCard key={dentist.id} dentist={dentist} />)
        ) : (
          <p>❌ Aucun dentiste trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default SearchDentists;
