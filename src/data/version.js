// This file contains version information for the application
// It is automatically imported and used to display version information in the UI

export const versionInfo = {
  version: "1.2.0",
  releaseDate: "May 30, 2025",
  releaseNotes: [
    "Fixed navigation issues in multi-book implementation",
    "Improved URL synchronization for better user experience",
    "Enhanced state management between book pages",
    "Fixed book selection and navigation tracking",
    "Optimized page transitions for smoother reading experience",
    "Improved backward compatibility with legacy routes",
  ],
  previousVersions: [
    {
      version: "1.1.0",
      releaseDate: "May 28, 2025",
      releaseNotes: [
        "Updated user interface elements for better engagement",
        "Fixed compatibility issues with modern browsers",
        "Improved performance and loading times",
        "Enhanced interactive elements for better learning experience",
        "GitHub Pages deployment optimized",
        "Added detailed build information for better tracking",
      ],
    },
    {
      version: "1.0.0",
      releaseDate: "May 30, 2024",
      releaseNotes: [
        "Initial release of Milo the Math Mouse",
        "12 interactive pages with educational activities",
        "Math, literacy, and critical thinking puzzles",
        "Child-friendly UI with colorful design",
      ],
    },
  ],
  // Build information
  buildTimestamp: new Date().toISOString(),
  buildEnvironment: {
    buildDate: new Date().toDateString(),
    buildTime: new Date().toTimeString(),
    // Use Vite's build info if available (in production), or current info if not (in development)
    nodeVersion:
      typeof window !== "undefined" && window.__BUILD_INFO__
        ? window.__BUILD_INFO__.nodeVersion
        : "dev",
    buildBy:
      typeof window !== "undefined" && window.__BUILD_INFO__
        ? window.__BUILD_INFO__.buildBy
        : "development",
    gitCommit:
      typeof window !== "undefined" && window.__BUILD_INFO__
        ? window.__BUILD_INFO__.commitHash
        : "local",
    gitBranch:
      typeof window !== "undefined" && window.__BUILD_INFO__
        ? window.__BUILD_INFO__.gitBranch
        : "local",
  },
};

// Function to get a formatted version string
export const getVersionString = () => {
  return `v${versionInfo.version}`;
};

// Function to get a formatted release date string
export const getReleaseDate = () => {
  return versionInfo.releaseDate;
};

// Function to get full version history including current version
export const getVersionHistory = () => {
  return [
    {
      version: versionInfo.version,
      releaseDate: versionInfo.releaseDate,
      releaseNotes: versionInfo.releaseNotes,
    },
    ...(versionInfo.previousVersions || []),
  ];
};

// Function to format build timestamp in user-friendly format
export const getFormattedBuildTimestamp = () => {
  const buildDate = new Date(versionInfo.buildTimestamp);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };
  return buildDate.toLocaleString(undefined, options);
};
