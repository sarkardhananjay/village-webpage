/* =========================================================================
   LOCAL BODY DATA — edit THIS file to manage Panchayat / Post Office / Health.
   -------------------------------------------------------------------------
   Each "item" (Panchayat, Post Office, Health Centre) has one or more
   "offices". For each office you can set: name, timing, address, phone,
   incharge, extra, services. Leave a field out (or "—") if unknown.
   The website builds the lists and detail pages automatically.
   ========================================================================= */

window.VILLAGE_LOCALBODY = {
  items: [

    {
      id: "panchayat", name: "Panchayat", icon: "🏛️",
      desc: "Gram Panchayat offices serving our area.",
      offices: [
        {
          name: "Nandanpur Gram Panchayat",
          timing: "Mon – Sat, 10:00 AM – 5:00 PM",
          address: "Nandanpur, near the main road",
          phone: "+910000000000",
          incharge: "Pradhan: —",
          services: "Birth/death certificates, schemes, water & road works, MGNREGA"
        },
        {
          name: "Belbari Gram Panchayat",
          timing: "Mon – Sat, 10:00 AM – 5:00 PM",
          address: "Belbari bazaar",
          phone: "+910000000000",
          incharge: "Pradhan: —",
          services: "Certificates, schemes, sanitation, MGNREGA"
        }
      ]
    },

    {
      id: "postoffice", name: "Post Office", icon: "📮",
      desc: "Branch post offices near the village.",
      offices: [
        {
          name: "Nandanpur Post Office",
          timing: "Mon – Sat, 9:00 AM – 4:00 PM",
          address: "Nandanpur",
          phone: "+910000000000",
          extra: "PIN code: —",
          services: "Savings account, money order, speed post, parcels"
        },
        {
          name: "Jaypur Post Office",
          timing: "Mon – Sat, 9:00 AM – 4:00 PM",
          address: "Jaypur",
          phone: "+910000000000",
          extra: "PIN code: —",
          services: "Savings account, money order, speed post"
        }
      ]
    },

    {
      id: "health", name: "Health Centre", icon: "🏥",
      desc: "Primary health centre / sub-centre.",
      offices: [
        {
          name: "Primary Health Centre",
          timing: "OPD 9:00 AM – 1:00 PM (Mon – Sat)",
          address: "—",
          phone: "+910000000000",
          incharge: "Doctor visits: —",
          services: "OPD, vaccination, first aid, maternity care, medicines"
        }
      ]
    }

  ]
};
