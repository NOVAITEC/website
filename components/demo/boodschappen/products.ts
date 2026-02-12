// Product database met categorie-mapping voor auto-suggesties
export const PRODUCT_DB: Record<string, string[]> = {
  'groente-fruit': [
    'Appels', 'Peren', 'Bananen', 'Sinaasappels', 'Mandarijnen', 'Citroenen', 'Limoenen',
    'Druiven', 'Aardbeien', 'Frambozen', 'Blauwe bessen', 'Kiwi', 'Mango', 'Ananas',
    'Avocado', 'Tomaten', 'Komkommer', 'Sla', 'Spinazie', 'Rucola', 'Broccoli',
    'Bloemkool', 'Courgette', 'Paprika', 'Wortels', 'Uien', 'Knoflook', 'Aardappelen',
    'Zoete aardappel', 'Champignons', 'Sperziebonen', 'Doperwten', 'Mais', 'Prei',
    'Selderij', 'Venkel', 'Bieten', 'Radijs', 'Aubergine', 'Bosui', 'Peterselie',
    'Basilicum', 'Koriander', 'Dille', 'Bieslook', 'Munt', 'Gember', 'Rode kool',
    'Witlof', 'Andijvie', 'Boerenkool', 'Snijbonen', 'Asperges', 'Artisjok',
  ],
  'zuivel': [
    'Melk', 'Halfvolle melk', 'Volle melk', 'Karnemelk', 'Yoghurt', 'Griekse yoghurt',
    'Kwark', 'Roomkaas', 'Crème fraîche', 'Slagroom', 'Kookroom', 'Boter',
    'Roomboter', 'Margarine', 'Goudse kaas', 'Belegen kaas', 'Oude kaas', 'Mozzarella',
    'Parmezaan', 'Brie', 'Camembert', 'Feta', 'Geitenkaas', 'Ricotta', 'Mascarpone',
    'Eieren', 'Scharreleieren', 'Vla', 'Pudding', 'Cottage cheese', 'Hüttenkäse',
    'Verse jus', 'Chocolademelk', 'Verse pasta',
  ],
  'vlees-vis': [
    'Kipfilet', 'Kippendijen', 'Kippenvleugels', 'Gehakt', 'Half-om-half gehakt',
    'Rundergehakt', 'Runderbiefstuk', 'Varkenshaas', 'Speklapjes', 'Slavink',
    'Worst', 'Rookworst', 'Bacon', 'Ham', 'Salami', 'Kipfilet plakken',
    'Zalm', 'Zalmfilet', 'Tonijn', 'Garnalen', 'Pangasius', 'Kabeljauw',
    'Schelvis', 'Makreel', 'Haring', 'Mosselen', 'Tilapia', 'Forel',
    'Lamsvlees', 'Lamsrack', 'Entrecote', 'Spareribs', 'Hamburger',
    'Shoarma', 'Döner', 'Tartaar', 'Ossenworst', 'Filet americain',
  ],
  'brood-bakkerij': [
    'Wit brood', 'Bruin brood', 'Volkoren brood', 'Meergranen brood', 'Tijgerbrood',
    'Croissants', 'Bolletjes', 'Pistolets', 'Stokbrood', 'Ciabatta', 'Focaccia',
    'Wraps', 'Tortilla', 'Pita brood', 'Naan brood', 'Beschuit', 'Crackers',
    'Ontbijtkoek', 'Cake', 'Muffins', 'Donuts', 'Appelflap', 'Saucijzenbrood',
    'Pannenkoeken', 'Poffertjes', 'Bloem', 'Zelfrijzend bakmeel', 'Gist',
    'Broodmix', 'Roggebrood', 'Pumpernickel', 'Knäckebröd',
  ],
  'dranken': [
    'Water', 'Spa blauw', 'Spa rood', 'Cola', 'Fanta', 'Sprite', 'Ice tea',
    'Sinaasappelsap', 'Appelsap', 'Multivitamine sap', 'Tomatensap',
    'Limonade', 'Ranja', 'Koffie', 'Espresso bonen', 'Koffiepads',
    'Thee', 'Groene thee', 'Muntthee', 'Kamillethee', 'Bier', 'Witte wijn',
    'Rode wijn', 'Rosé', 'Prosecco', 'Tonic', 'Ginger ale', 'Chocomel',
    'Plantaardige melk', 'Havermelk', 'Amandelmelk', 'Sojamelk', 'Kokosmelk',
    'Smoothie', 'Kombucha', 'Energiedrank',
  ],
  'conserven-pasta': [
    'Pasta', 'Spaghetti', 'Penne', 'Fusilli', 'Macaroni', 'Tagliatelle', 'Lasagne bladen',
    'Rijst', 'Basmatirijst', 'Jasminrijst', 'Risotto rijst', 'Noodles', 'Mie',
    'Couscous', 'Quinoa', 'Bulgur', 'Tomatenpuree', 'Gepelde tomaten', 'Passata',
    'Tomatensaus', 'Pesto', 'Olijfolie', 'Zonnebloemolie', 'Kokosolie',
    'Azijn', 'Balsamico', 'Sojasaus', 'Sambal', 'Ketjap', 'Sriracha',
    'Mayonaise', 'Ketchup', 'Mosterd', 'Honing', 'Pindakaas', 'Chocoladepasta',
    'Jam', 'Hagelslag', 'Bonen', 'Kidneybonen', 'Kikkererwten', 'Linzen',
    'Kokosmmelk blik', 'Tonijn blik', 'Mais blik', 'Olijven',
  ],
  'snacks': [
    'Chips', 'Tortilla chips', 'Noten', 'Pinda\'s', 'Cashewnoten', 'Walnoten',
    'Amandelen', 'Pistachenoten', 'Popcorn', 'Chocolade', 'Melkchocolade',
    'Pure chocolade', 'Witte chocolade', 'Koekjes', 'Biscuits', 'Stroopwafels',
    'Dropjes', 'Winegums', 'Snoep', 'Gevulde koeken', 'Speculaas', 'Kaakjes',
    'Mueslirepen', 'Energierepen', 'Rijstwafels', 'Soepstengels',
    'Borrelgarnituur', 'Borrelhapjes', 'Zoute sticks', 'Kroepoek',
  ],
  'diepvries': [
    'Diepvriespizza', 'Frites', 'Oven frites', 'Kroketten', 'Bitterballen',
    'Frikandellen', 'Vissticks', 'Diepvriesgroenten', 'Doperwten diepvries',
    'Spinazie diepvries', 'IJs', 'Vanille ijs', 'Magnum', 'Cornetto',
    'Diepvriesfruit', 'Bladerdeeg', 'Pizza bodem', 'Nasi', 'Bami',
    'Shoarma vlees', 'Gehaktballen diepvries', 'Pannenkoeken diepvries',
  ],
  'huishouden': [
    'Afwasmiddel', 'Vaatwasmiddel', 'Vaatwastabletten', 'Allesreiniger',
    'WC-reiniger', 'Glasreiniger', 'Schuurmiddel', 'Bleek', 'Wasmiddel',
    'Wasverzachter', 'Vlekkenverwijderaar', 'Keukenpapier', 'Toiletpapier',
    'Tissues', 'Vuilniszakken', 'Aluminium folie', 'Huishoudfolie', 'Bakpapier',
    'Schoonmaakdoekjes', 'Sponzen', 'Handschoenen', 'Lucifers', 'Kaarsen',
    'Batterijen', 'Lampen', 'Prullenbakzakken',
  ],
  'verzorging': [
    'Shampoo', 'Conditioner', 'Douchegel', 'Zeep', 'Handzeep',
    'Tandpasta', 'Tandenborstels', 'Mondwater', 'Deodorant',
    'Scheermesjes', 'Scheergel', 'Bodylotion', 'Handcrème', 'Gezichtscrème',
    'Zonnebrand', 'Lippenbalsem', 'Wattenstaafjes', 'Wattenschijfjes',
    'Maandverband', 'Tampons', 'Pleisters', 'Paracetamol', 'Ibuprofen',
    'Vitaminen', 'Multivitaminen',
  ],
  'overig': [
    'Zout', 'Peper', 'Paprikapoeder', 'Komijn', 'Kurkuma', 'Kaneel',
    'Nootmuskaat', 'Oregano', 'Tijm', 'Rozemarijn', 'Laurier',
    'Kerrie', 'Cayennepeper', 'Chilipeper', 'Knoflookpoeder',
    'Bouillonblokjes', 'Groentebouillon', 'Kippenbouillon', 'Runderbouillon',
    'Maizena', 'Bakpoeder', 'Vanillesuiker', 'Suiker', 'Basterdsuiker',
    'Poedersuiker', 'Cacao', 'Gelatine', 'Kokosvlokken', 'Rozijnen',
  ],
};

// Alle producten als platte lijst
export const ALL_PRODUCTS: Array<{ name: string; category: string }> = Object.entries(PRODUCT_DB)
  .flatMap(([category, products]) => products.map((name) => ({ name, category })));

// Zoek producten op naam (case-insensitive, begint met of bevat)
export function searchProducts(query: string, limit = 10): Array<{ name: string; category: string }> {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  const starts: Array<{ name: string; category: string }> = [];
  const contains: Array<{ name: string; category: string }> = [];

  for (const product of ALL_PRODUCTS) {
    const lower = product.name.toLowerCase();
    if (lower.startsWith(q)) {
      starts.push(product);
    } else if (lower.includes(q)) {
      contains.push(product);
    }
    if (starts.length + contains.length >= limit) break;
  }

  return [...starts, ...contains].slice(0, limit);
}

// Detecteer categorie van een product
export function detectCategory(name: string): string {
  const lower = name.toLowerCase().trim();

  // Exact match
  for (const [category, products] of Object.entries(PRODUCT_DB)) {
    if (products.some((p) => p.toLowerCase() === lower)) return category;
  }

  // Bevat match
  for (const [category, products] of Object.entries(PRODUCT_DB)) {
    if (products.some((p) => lower.includes(p.toLowerCase()))) return category;
  }

  // Eerste woord match
  const firstWord = lower.split(' ')[0];
  for (const [category, products] of Object.entries(PRODUCT_DB)) {
    if (products.some((p) => p.toLowerCase() === firstWord)) return category;
  }

  return 'overig';
}
