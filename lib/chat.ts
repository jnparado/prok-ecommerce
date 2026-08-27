import {
  aboutCopy,
  coffeeProducts,
  espressoMachines,
  flavourProducts,
  grinders,
  siteContact,
} from "@/lib/site";

export function getChatKnowledge() {
  const machines = espressoMachines
    .map((item) => {
      const groups = "groups" in item && item.groups ? `${item.groups}-group` : "";
      const uses = "uses" in item && Array.isArray(item.uses) ? item.uses.join(", ") : "";
      return `- ${item.name} (${item.brand}${groups ? `, ${groups}` : ""}${uses ? `; ${uses}` : ""})`;
    })
    .join("\n");

  const millList = grinders
    .map((item) => {
      const series = "series" in item && item.series ? `, ${item.series}` : "";
      const uses = "uses" in item && Array.isArray(item.uses) ? `; ${item.uses.join(", ")}` : "";
      const detail = "detail" in item && item.detail ? ` — ${item.detail}` : "";
      return `- ${item.name} (${item.brand}${series}${uses})${detail}`;
    })
    .join("\n");

  const coffee = coffeeProducts
    .map((item) => `- ${item.name} (${item.brand}, ${item.category}${item.detail ? `, ${item.detail}` : ""})`)
    .join("\n");

  const flavours = flavourProducts
    .map((item) => `- ${item.name} [${item.tab}]`)
    .join("\n");

  return `
Company: ${siteContact.legalName} (Prokrate).
Address: ${siteContact.address}
Phone: ${siteContact.phones.join(" · ")}
Website: ${siteContact.website}

About: ${aboutCopy.company}

Pages:
- Espresso machines: /espresso-machines
- Grinders: /grinders
- Coffee: /coffee
- Flavours (Catcher Gourmet syrups, sauces, powdered mix): /flavours
- Cleaning: /cleaning-solution
- Training: /training
- Services: /services
- About: /about-us
- Privacy: /privacy-policy

Espresso machines:
${machines}

Grinders:
${millList}

Coffee (Marcafé beans and pods):
${coffee}

Catcher Gourmet flavours:
${flavours}

Brands we represent include Casadio, Eureka 1920, Slayer, La Nuova Era, Marcafé, Catcher Gourmet, puly CAFF, didiesse, and DOGE.
`.trim();
}

export function getChatSystemPrompt() {
  return `You are the Prokrate Assistant on ${siteContact.website}. You help café, restaurant, hotel, office, and home buyers with Prokrate's catalog of espresso machines, grinders, coffee, flavours, cleaning, training, and service.

Rules:
- Answer only from the catalog facts below. If you are unsure, say so and point them to ${siteContact.phones.join(" or ")} or the showroom in Davao City.
- Do not invent prices, stock, or delivery dates. Quotes come from the sales team.
- Keep replies short (2–6 sentences). Use markdown links to site paths when useful, e.g. [espresso machines](/espresso-machines).
- Be warm, professional, and specific. Prefer naming real products from the list.
- If they want to visit or order, give the address and phone.

Catalog facts:
${getChatKnowledge()}`;
}

export function fallbackChatReply(message: string) {
  const q = message.toLowerCase();
  const phone = siteContact.phones.join(" · ");

  if (/address|where|location|davao|visit|map|showroom|contact|phone|call|hours/.test(q)) {
    return `We're ${siteContact.legalName}, at ${siteContact.address}. Call ${phone}. You can also use the contact details in the site footer.`;
  }

  if (/syrup|sauce|flavour|flavor|catcher|chocolate|hazelnut|matcha|powder/.test(q)) {
    return `Catcher Gourmet flavours are on [Flavours](/flavours) — syrups (Chocolate, White Chocolate, Hazelnut, Caramel, Matcha, and more), sauces, and powdered mixes. Tell me a flavour and I can point you to the right tab. For orders, call ${phone}.`;
  }

  if (/grind|eureka|mignon|firenze|silenzio|helios/.test(q)) {
    return `We carry Eureka 1920 grinders, including the Mignon series for home/office and Firenze / Helios for cafés. Browse [grinders](/grinders) or call ${phone} for a recommendation.`;
  }

  if (/espresso|machine|slayer|casadio|doge|group|fenix/.test(q)) {
    return `Our espresso lineup includes Casadio, Slayer, DOGE, and more — from 1-group home/office machines to 2-group café bars. See [espresso machines](/espresso-machines). Share your setting (café, hotel, office, home) and I can narrow it down.`;
  }

  if (/coffee|bean|marcafe|marcafé|pod|idillio|arabica/.test(q)) {
    return `Marcafé roasted beans and pods are on [Coffee](/coffee). Idillio is 100% Arabica; we also have espresso-bar blends like Crema Bar Super and Diamante. Call ${phone} for current bags and pricing.`;
  }

  if (/train|barista|class|course/.test(q)) {
    return `Barista training is listed on [Training](/training). For dates and fees, call ${phone}.`;
  }

  if (/service|repair|maintain|clean|puly/.test(q)) {
    return `We offer after-sales service and cleaning solutions. See [Services](/services) and [Cleaning Solution](/cleaning-solution), or call ${phone}.`;
  }

  if (/brand|casadio|slayer|eureka/.test(q)) {
    return `Brands we represent include Casadio, Eureka 1920, Slayer, La Nuova Era, Marcafé, Catcher Gourmet, puly CAFF, didiesse, and DOGE. The full list is on [Brands](/brands).`;
  }

  return `I can help with espresso machines, grinders, Marcafé coffee, Catcher Gourmet flavours, training, and service. Ask about a product, or call ${phone} — ${siteContact.address}.`;
}
