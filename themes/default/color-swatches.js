const names = ["Red", "Pink", "Purple", "Deep Purple", "Indigo", "Blue",
  "Light Blue", "Cyan", "Teal", "Green", "Light Green", "Lime", "Yellow",
  "Amber", "Orange", "Deep Orange", "Brown", "Grey", "Blue Grey"]
const main = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3",
  "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b",
  "#ffc107", "#ff9800", "#ff5722", "#795548", "#9e9e9e", "#607d8b"]
const lightest = ["#ffebee", "#fce4ec", "#f3e5f5", "#ede7f6", "#e8eaf6",
  "#e3f2fd", "#e1f5fe", "#e0f7fa", "#e0f2f1", "#e8f5e9", "#f1f8e9", "#f9fbe7",
  "#fffde7", "#fff8e1", "#fff3e0", "#fbe9e7", "#efebe9", "#fafafa", "#eceff1",
  "#ffffff"]
const accent = ["#b71c1c", "#880e4f", "#4a148c", "#311b92", "#1a237e",
  "#0d47a1", "#01579b", "#006064", "#004d40", "#1b5e20", "#33691e", "#827717",
  "#f57f17", "#ff6f00", "#e65100", "#bf360c", "#3e2723", "#212121", "#263238"]
const accentLight = ["#d32f2f", "#c2185b", "#7b1fa2", "#512da8", "#303f9f",
  "#1976d2", "#0288d1", "#0097a7", "#00796b", "#388e3c", "#689f38", "#afb42b",
  "#fbc02d", "#ffa000", "#f57c00", "#e64a19", "#5d4037", "#616161", "#455a64"]
const swatches = {}

for (var i=0; i<main.length; i++) {
  const name = names[i].toLowerCase().replace(' ', '-')
  swatches[name] = {
    main: main[i],
    accent: accent[i],
    lightest: lightest[i],
    accentLight: accentLight[i]
  }
}

export default swatches

