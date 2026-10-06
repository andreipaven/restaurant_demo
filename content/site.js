// One source for the restaurant's own details. Change them here and they
// change everywhere: header, footer, contact page, metadata.
export const site = {
  name: "Obsiddian",
  established: "Est. 2009",
  phone: "0712 345 678",
  phoneHref: "tel:+40712345678",
  email: "masa@obsiddian.ro",
  eventsEmail: "evenimente@obsiddian.ro",
  address: {
    street: "Strada Cetății 14",
    detail: "curte interioară, a doua intrare",
    postcode: "550160",
    city: "Sibiu",
    country: "România",
  },
};

// Who built the site.
export const author = {
  name: "Xtezi Soft",
  url: "https://xtezisoft.com",
};

export const addressLine = `${site.address.street}, ${site.address.city}`;

export const mailHref = `mailto:${site.email}`;
export const eventsMailHref = `mailto:${site.eventsEmail}`;

// Slots offered in the booking form. The kitchen takes its last order at 22:30.
export const bookingSlots = [
  "12:00",
  "13:00",
  "14:00",
  "17:00",
  "18:00",
  "19:00",
  "19:30",
  "20:00",
  "21:00",
];

export const partySizes = [1, 2, 3, 4, 5, 6, 8];
