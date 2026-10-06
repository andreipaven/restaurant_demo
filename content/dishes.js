import dessert01 from "@/public/images/dessert-01.jpg";
import dessert02 from "@/public/images/dessert-02.jpg";
import dish01 from "@/public/images/dish-01.jpg";
import dish02 from "@/public/images/dish-02.jpg";
import dish03 from "@/public/images/dish-03.jpg";
import dish04 from "@/public/images/dish-04.jpg";
import drink01 from "@/public/images/drink-01.jpg";
import drink02 from "@/public/images/drink-02.jpg";
import drink03 from "@/public/images/drink-03.jpg";
import kitchen from "@/public/images/kitchen.jpg";
import main01 from "@/public/images/main-01.jpg";
import main02 from "@/public/images/main-02.jpg";
import platter from "@/public/images/platter.jpg";
import side01 from "@/public/images/side-01.jpg";
import side02 from "@/public/images/side-02.jpg";
import side03 from "@/public/images/side-03.jpg";
import side04 from "@/public/images/side-04.jpg";
import side05 from "@/public/images/side-05.jpg";
import starter01 from "@/public/images/starter-01.jpg";
import starter02 from "@/public/images/starter-02.jpg";
import signature01 from "@/public/images/signature-01.jpg";
import signature02 from "@/public/images/signature-02.jpg";
import signature03 from "@/public/images/signature-03.jpg";
import soup01 from "@/public/images/soup-01.jpg";
import soup02 from "@/public/images/soup-02.jpg";
import soup03 from "@/public/images/soup-03.jpg";

// Prices and photos live here; the words for every dish live in
// messages/<locale>.json under `dishes`, keyed by the same id.
export const dishes = {
  mushroomSoup: { image: soup01, price: 28, nutrition: { kcal: 280, protein: 7, fat: 19, carbs: 18 } },
  beefSoup: { image: soup02, price: 34, nutrition: { kcal: 320, protein: 22, fat: 12, carbs: 28 } },
  chickenSoup: { image: soup03, price: 26, nutrition: { kcal: 260, protein: 20, fat: 9, carbs: 22 } },

  lobster: { image: dish01, price: 168, nutrition: { kcal: 540, protein: 38, fat: 32, carbs: 14 } },
  risotto: { image: dish02, price: 112, nutrition: { kcal: 620, protein: 26, fat: 24, carbs: 72 } },
  tagliatelle: { image: signature03, price: 86, nutrition: { kcal: 680, protein: 21, fat: 28, carbs: 84 } },
  sashimi: { image: dish03, price: 145, nutrition: { kcal: 420, protein: 34, fat: 12, carbs: 44 } },
  rolls: { image: signature02, price: 78, nutrition: { kcal: 390, protein: 18, fat: 11, carbs: 52 } },
  tartare: { image: starter01, price: 72, nutrition: { kcal: 380, protein: 26, fat: 24, carbs: 14 } },
  bread: { image: starter02, price: 24, nutrition: { kcal: 290, protein: 8, fat: 12, carbs: 38 } },
  duck: { image: main01, price: 96, nutrition: { kcal: 610, protein: 42, fat: 38, carbs: 18 } },
  salmon: { image: main02, price: 118, nutrition: { kcal: 520, protein: 40, fat: 28, carbs: 16 } },

  potatoes: { image: side01, price: 18, nutrition: { kcal: 240, protein: 4, fat: 11, carbs: 32 } },
  parsnip: { image: side02, price: 20, nutrition: { kcal: 210, protein: 3, fat: 9, carbs: 29 } },
  sprouts: { image: side03, price: 22, nutrition: { kcal: 190, protein: 6, fat: 12, carbs: 14 } },
  salad: { image: signature01, price: 64, nutrition: { kcal: 230, protein: 8, fat: 16, carbs: 13 } },
  polenta: { image: side04, price: 19, nutrition: { kcal: 260, protein: 7, fat: 9, carbs: 38 } },
  carrots: { image: side05, price: 20, nutrition: { kcal: 180, protein: 2, fat: 8, carbs: 26 } },

  chocolate: { image: dish04, price: 54, nutrition: { kcal: 480, protein: 6, fat: 29, carbs: 48 } },
  cake: { image: dessert01, price: 38, nutrition: { kcal: 520, protein: 7, fat: 27, carbs: 62 } },
  tiramisu: { image: dessert02, price: 36, nutrition: { kcal: 450, protein: 8, fat: 26, carbs: 44 } },

  wineRed: { image: drink01, price: 24, nutrition: { kcal: 125, protein: 0, fat: 0, carbs: 4 } },
  wineWhite: { image: drink02, price: 26, nutrition: { kcal: 118, protein: 0, fat: 0, carbs: 3 } },
  cellar: { image: drink03, price: 140 },
};

// The order the categories appear in on the menu page.
export const menuCategories = [
  { id: "starters", items: ["sashimi", "rolls", "tartare", "bread", "salad"] },
  { id: "soups", items: ["mushroomSoup", "beefSoup", "chickenSoup"] },
  { id: "mains", items: ["lobster", "salmon", "duck", "risotto", "tagliatelle"] },
  { id: "sides", items: ["polenta", "potatoes", "carrots", "parsnip", "sprouts"] },
  { id: "dessert", items: ["chocolate", "cake", "tiramisu"] },
  { id: "drinks", items: ["wineRed", "wineWhite", "cellar"] },
];

export const heroDishes = ["lobster", "risotto", "sashimi", "chocolate"];

export const signatureDishes = ["salad", "rolls", "tagliatelle"];

export const platterImage = platter;
export const kitchenImage = kitchen;

export const platterStats = [
  { id: "statPieces", value: "8" },
  { id: "statGuests", value: "2" },
  { id: "statSince", value: "2009" },
];

export const houseStats = [
  { id: "statTables", value: "18" },
  { id: "statSuppliers", value: "23" },
  { id: "statYears", value: "16" },
];

export function priceOf(id) {
  return `${dishes[id].price} lei`;
}
