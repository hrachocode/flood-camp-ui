export const energyTypes = ["Solar", "Wind", "Hydro", "Hydrogen"];

export const countries = [
  { id: "1", value: "USA" },
  { id: "2", value: "Russia" },
  { id: "3", value: "France" },
  { id: "4", value: "Italy" },
];

export const regions: { [x: string]: { id: string; value: string }[] } = {
  USA: [{ id: "1", value: "Arizona" }],
  Russia: [
    { id: "2", value: "Moscow" },
    { value: "St. Petersburg", id: "3" },
  ],
  France: [{ id: "4", value: "Lyon" }],
  Italy: [{ value: "Toscana", id: "5" }],
};
