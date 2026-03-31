import { Server } from "../contexts/VPNContext";

export const servers: Server[] = [
  {
    id: "us-new-york",
    country: "United States",
    flag: "🇺🇸",
    ping: 45,
    cities: [
      { id: "us-ny-1", name: "New York", ping: 45 },
      { id: "us-la-1", name: "Los Angeles", ping: 65 },
      { id: "us-chicago-1", name: "Chicago", ping: 55 },
    ],
  },
  {
    id: "uk-london",
    country: "United Kingdom",
    flag: "🇬🇧",
    ping: 78,
    cities: [
      { id: "uk-lon-1", name: "London", ping: 78 },
      { id: "uk-man-1", name: "Manchester", ping: 82 },
    ],
  },
  {
    id: "ca-toronto",
    country: "Canada",
    flag: "🇨🇦",
    ping: 52,
    cities: [
      { id: "ca-tor-1", name: "Toronto", ping: 52 },
      { id: "ca-van-1", name: "Vancouver", ping: 68 },
    ],
  },
  {
    id: "de-frankfurt",
    country: "Germany",
    flag: "🇩🇪",
    ping: 92,
    cities: [
      { id: "de-fra-1", name: "Frankfurt", ping: 92 },
      { id: "de-ber-1", name: "Berlin", ping: 95 },
    ],
  },
  {
    id: "fr-paris",
    country: "France",
    flag: "🇫🇷",
    ping: 88,
    cities: [
      { id: "fr-par-1", name: "Paris", ping: 88 },
      { id: "fr-mar-1", name: "Marseille", ping: 94 },
    ],
  },
  {
    id: "jp-tokyo",
    country: "Japan",
    flag: "🇯🇵",
    ping: 145,
    cities: [
      { id: "jp-tok-1", name: "Tokyo", ping: 145 },
      { id: "jp-osa-1", name: "Osaka", ping: 148 },
    ],
  },
  {
    id: "au-sydney",
    country: "Australia",
    flag: "🇦🇺",
    ping: 185,
    cities: [
      { id: "au-syd-1", name: "Sydney", ping: 185 },
      { id: "au-mel-1", name: "Melbourne", ping: 188 },
    ],
  },
  {
    id: "sg-singapore",
    country: "Singapore",
    flag: "🇸🇬",
    ping: 125,
    cities: [{ id: "sg-sin-1", name: "Singapore", ping: 125 }],
  },
  {
    id: "nl-amsterdam",
    country: "Netherlands",
    flag: "🇳🇱",
    ping: 85,
    cities: [
      { id: "nl-ams-1", name: "Amsterdam", ping: 85 },
      { id: "nl-rot-1", name: "Rotterdam", ping: 87 },
    ],
  },
  {
    id: "se-stockholm",
    country: "Sweden",
    flag: "🇸🇪",
    ping: 98,
    cities: [{ id: "se-sto-1", name: "Stockholm", ping: 98 }],
  },
];
