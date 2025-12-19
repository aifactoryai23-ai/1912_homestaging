import React from "react";

/**
 * Stores the currently selected preset (from Styles / Discover lists).
 * Keep this in a separate file so multiple components can share the same selection.
 */
const SelectedPresetContext = React.createContext(null);

export function SelectedPresetProvider({ children }) {
  const [selectedPreset, setSelectedPreset] = React.useState(null);

  const value = React.useMemo(
    () => ({ selectedPreset, setSelectedPreset }),
    [selectedPreset]
  );

  return (
    <SelectedPresetContext.Provider value={value}>
      {children}
    </SelectedPresetContext.Provider>
  );
}

export function useSelectedPreset() {
  const ctx = React.useContext(SelectedPresetContext);
  if (!ctx) {
    throw new Error("useSelectedPreset must be used within SelectedPresetProvider");
  }
  return ctx;
}
