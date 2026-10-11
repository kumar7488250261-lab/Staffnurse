import { DistrictData } from '../types';

export const BIHAR_DISTRICTS: Record<string, DistrictData> = {
  // Patna Division
  'Patna': {
    name: 'Patna',
    nameHindi: 'पटना',
    division: 'Patna',
    divisionHindi: 'पटना',
    adjacent: ['Nalanda', 'Vaishali', 'Saran', 'Bhojpur', 'Jehanabad', 'Lakhisarai', 'Begusarai', 'Samastipur'],
    isBihar: true,
  },
  'Nalanda': {
    name: 'Nalanda',
    nameHindi: 'नालंदा',
    division: 'Patna',
    divisionHindi: 'पटना',
    adjacent: ['Patna', 'Jehanabad', 'Gaya', 'Nawada', 'Sheikhpura', 'Lakhisarai'],
    isBihar: true,
  },
  'Bhojpur': {
    name: 'Bhojpur',
    nameHindi: 'भोजपुर (आरा)',
    division: 'Patna',
    divisionHindi: 'पटना',
    adjacent: ['Patna', 'Buxar', 'Rohtas', 'Arwal', 'Saran'],
    isBihar: true,
  },
  'Buxar': {
    name: 'Buxar',
    nameHindi: 'बक्सर',
    division: 'Patna',
    divisionHindi: 'पटना',
    adjacent: ['Bhojpur', 'Rohtas', 'Kaimur'],
    isBihar: true,
  },
  'Rohtas': {
    name: 'Rohtas',
    nameHindi: 'रोहतास (सासाराम)',
    division: 'Patna',
    divisionHindi: 'पटना',
    adjacent: ['Buxar', 'Bhojpur', 'Kaimur', 'Aurangabad', 'Arwal'],
    isBihar: true,
  },
  'Kaimur': {
    name: 'Kaimur',
    nameHindi: 'कैमूर (भभुआ)',
    division: 'Patna',
    divisionHindi: 'पटना',
    adjacent: ['Rohtas', 'Buxar'],
    isBihar: true,
  },

  // Magadh Division
  'Gaya': {
    name: 'Gaya',
    nameHindi: 'गया',
    division: 'Magadh',
    divisionHindi: 'मगध',
    adjacent: ['Jehanabad', 'Aurangabad', 'Nawada', 'Nalanda'],
    isBihar: true,
  },
  'Jehanabad': {
    name: 'Jehanabad',
    nameHindi: 'जहानाबाद',
    division: 'Magadh',
    divisionHindi: 'मगध',
    adjacent: ['Patna', 'Gaya', 'Nalanda', 'Arwal'],
    isBihar: true,
  },
  'Arwal': {
    name: 'Arwal',
    nameHindi: 'अरवल',
    division: 'Magadh',
    divisionHindi: 'मगध',
    adjacent: ['Jehanabad', 'Patna', 'Bhojpur', 'Rohtas', 'Aurangabad'],
    isBihar: true,
  },
  'Nawada': {
    name: 'Nawada',
    nameHindi: 'नवादा',
    division: 'Magadh',
    divisionHindi: 'मगध',
    adjacent: ['Gaya', 'Nalanda', 'Sheikhpura', 'Jamui'],
    isBihar: true,
  },
  'Aurangabad': {
    name: 'Aurangabad',
    nameHindi: 'औरंगाबाद',
    division: 'Magadh',
    divisionHindi: 'मगध',
    adjacent: ['Gaya', 'Rohtas', 'Arwal'],
    isBihar: true,
  },

  // Saran Division
  'Saran': {
    name: 'Saran',
    nameHindi: 'सारण (छपरा)',
    division: 'Saran',
    divisionHindi: 'सारण',
    adjacent: ['Siwan', 'Gopalganj', 'Vaishali', 'Patna', 'Bhojpur', 'Muzaffarpur'],
    isBihar: true,
  },
  'Siwan': {
    name: 'Siwan',
    nameHindi: 'सीवान',
    division: 'Saran',
    divisionHindi: 'सारण',
    adjacent: ['Saran', 'Gopalganj'],
    isBihar: true,
  },
  'Gopalganj': {
    name: 'Gopalganj',
    nameHindi: 'गोपालगंज',
    division: 'Saran',
    divisionHindi: 'सारण',
    adjacent: ['Siwan', 'Saran', 'East Champaran', 'West Champaran'],
    isBihar: true,
  },

  // Tirhut Division
  'Muzaffarpur': {
    name: 'Muzaffarpur',
    nameHindi: 'मुजफ्फरपुर',
    division: 'Tirhut',
    divisionHindi: 'तिरहुत',
    adjacent: ['Vaishali', 'Sitamarhi', 'Sheohar', 'East Champaran', 'Saran', 'Samastipur', 'Darbhanga'],
    isBihar: true,
  },
  'Vaishali': {
    name: 'Vaishali',
    nameHindi: 'वैशाली (हाजीपुर)',
    division: 'Tirhut',
    divisionHindi: 'तिरहुत',
    adjacent: ['Patna', 'Muzaffarpur', 'Samastipur', 'Saran'],
    isBihar: true,
  },
  'East Champaran': {
    name: 'East Champaran',
    nameHindi: 'पूर्वी चंपारण (मोतिहारी)',
    division: 'Tirhut',
    divisionHindi: 'तिरहुत',
    adjacent: ['West Champaran', 'Sheohar', 'Sitamarhi', 'Muzaffarpur', 'Gopalganj'],
    isBihar: true,
  },
  'West Champaran': {
    name: 'West Champaran',
    nameHindi: 'पश्चिम चंपारण (बेतिया)',
    division: 'Tirhut',
    divisionHindi: 'तिरहुत',
    adjacent: ['East Champaran', 'Gopalganj'],
    isBihar: true,
  },
  'Sitamarhi': {
    name: 'Sitamarhi',
    nameHindi: 'सीतामढ़ी',
    division: 'Tirhut',
    divisionHindi: 'तिरहुत',
    adjacent: ['Sheohar', 'Muzaffarpur', 'East Champaran', 'Madhubani', 'Darbhanga'],
    isBihar: true,
  },
  'Sheohar': {
    name: 'Sheohar',
    nameHindi: 'शिवहर',
    division: 'Tirhut',
    divisionHindi: 'तिरहुत',
    adjacent: ['Sitamarhi', 'East Champaran', 'Muzaffarpur'],
    isBihar: true,
  },

  // Darbhanga Division
  'Darbhanga': {
    name: 'Darbhanga',
    nameHindi: 'दरभंगा',
    division: 'Darbhanga',
    divisionHindi: 'दरभंगा',
    adjacent: ['Madhubani', 'Samastipur', 'Muzaffarpur', 'Sitamarhi', 'Saharsa'],
    isBihar: true,
  },
  'Madhubani': {
    name: 'Madhubani',
    nameHindi: 'मधुबनी',
    division: 'Darbhanga',
    divisionHindi: 'दरभंगा',
    adjacent: ['Darbhanga', 'Sitamarhi', 'Supaul'],
    isBihar: true,
  },
  'Samastipur': {
    name: 'Samastipur',
    nameHindi: 'समस्तीपुर',
    division: 'Darbhanga',
    divisionHindi: 'दरभंगा',
    adjacent: ['Darbhanga', 'Muzaffarpur', 'Vaishali', 'Patna', 'Begusarai'],
    isBihar: true,
  },

  // Kosi Division
  'Saharsa': {
    name: 'Saharsa',
    nameHindi: 'सहरसा',
    division: 'Kosi',
    divisionHindi: 'कोशी',
    adjacent: ['Supaul', 'Madhepura', 'Khagaria', 'Darbhanga'],
    isBihar: true,
  },
  'Supaul': {
    name: 'Supaul',
    nameHindi: 'सुपौल',
    division: 'Kosi',
    divisionHindi: 'कोशी',
    adjacent: ['Saharsa', 'Madhepura', 'Madhubani', 'Araria'],
    isBihar: true,
  },
  'Madhepura': {
    name: 'Madhepura',
    nameHindi: 'मधेपुरा',
    division: 'Kosi',
    divisionHindi: 'कोशी',
    adjacent: ['Saharsa', 'Supaul', 'Purnia', 'Khagaria', 'Bhagalpur'],
    isBihar: true,
  },

  // Purnia Division
  'Purnia': {
    name: 'Purnia',
    nameHindi: 'पूर्णिया',
    division: 'Purnia',
    divisionHindi: 'पूर्णिया',
    adjacent: ['Katihar', 'Araria', 'Kishanganj', 'Madhepura', 'Bhagalpur'],
    isBihar: true,
  },
  'Katihar': {
    name: 'Katihar',
    nameHindi: 'कटिहार',
    division: 'Purnia',
    divisionHindi: 'पूर्णिया',
    adjacent: ['Purnia', 'Bhagalpur'],
    isBihar: true,
  },
  'Araria': {
    name: 'Araria',
    nameHindi: 'अररिया',
    division: 'Purnia',
    divisionHindi: 'पूर्णिया',
    adjacent: ['Purnia', 'Kishanganj', 'Supaul'],
    isBihar: true,
  },
  'Kishanganj': {
    name: 'Kishanganj',
    nameHindi: 'किशनगंज',
    division: 'Purnia',
    divisionHindi: 'पूर्णिया',
    adjacent: ['Purnia', 'Araria'],
    isBihar: true,
  },

  // Bhagalpur Division
  'Bhagalpur': {
    name: 'Bhagalpur',
    nameHindi: 'भागलपुर',
    division: 'Bhagalpur',
    divisionHindi: 'भागलपुर',
    adjacent: ['Banka', 'Munger', 'Khagaria', 'Katihar', 'Purnia', 'Madhepura'],
    isBihar: true,
  },
  'Banka': {
    name: 'Banka',
    nameHindi: 'बांका',
    division: 'Bhagalpur',
    divisionHindi: 'भागलपुर',
    adjacent: ['Bhagalpur', 'Munger', 'Jamui'],
    isBihar: true,
  },

  // Munger Division
  'Munger': {
    name: 'Munger',
    nameHindi: 'मुंगेर',
    division: 'Munger',
    divisionHindi: 'मुंगेर',
    adjacent: ['Lakhisarai', 'Begusarai', 'Khagaria', 'Bhagalpur', 'Banka', 'Jamui'],
    isBihar: true,
  },
  'Begusarai': {
    name: 'Begusarai',
    nameHindi: 'बेगूसराय',
    division: 'Munger',
    divisionHindi: 'मुंगेर',
    adjacent: ['Samastipur', 'Patna', 'Lakhisarai', 'Munger', 'Khagaria'],
    isBihar: true,
  },
  'Khagaria': {
    name: 'Khagaria',
    nameHindi: 'खगड़िया',
    division: 'Munger',
    divisionHindi: 'मुंगेर',
    adjacent: ['Begusarai', 'Munger', 'Saharsa', 'Madhepura', 'Bhagalpur'],
    isBihar: true,
  },
  'Lakhisarai': {
    name: 'Lakhisarai',
    nameHindi: 'लखीसराय',
    division: 'Munger',
    divisionHindi: 'मुंगेर',
    adjacent: ['Patna', 'Nalanda', 'Sheikhpura', 'Munger', 'Jamui', 'Begusarai'],
    isBihar: true,
  },
  'Sheikhpura': {
    name: 'Sheikhpura',
    nameHindi: 'शेखपुरा',
    division: 'Munger',
    divisionHindi: 'मुंगेर',
    adjacent: ['Nalanda', 'Nawada', 'Lakhisarai', 'Jamui'],
    isBihar: true,
  },
  'Jamui': {
    name: 'Jamui',
    nameHindi: 'जमुई',
    division: 'Munger',
    divisionHindi: 'मुंगेर',
    adjacent: ['Lakhisarai', 'Sheikhpura', 'Nawada', 'Banka', 'Munger'],
    isBihar: true,
  },
};

export const BIHAR_DIVISIONS = [
  'Patna',
  'Tirhut',
  'Saran',
  'Darbhanga',
  'Kosi',
  'Purnia',
  'Bhagalpur',
  'Munger',
  'Magadh',
];

// Helper to check if two districts are adjacent or in the same division
export function areDistrictsNeighboring(d1: string, d2: string): boolean {
  if (d1 === d2) return true;
  const dist1 = BIHAR_DISTRICTS[d1];
  const dist2 = BIHAR_DISTRICTS[d2];
  if (!dist1 || !dist2) return false;
  return dist1.adjacent.includes(d2) || dist1.division === dist2.division;
}

// Function to extract or infer standard district name from posting hospital text
export function inferDistrictFromPosting(postingPlace: string): string {
  const text = postingPlace.toLowerCase();
  
  if (text.includes('west champaran') || text.includes('betiah') || text.includes('bagaha') || text.includes('narkatiyaganj') || text.includes('chanpattia') || text.includes('manjhaulia') || text.includes('lauriya') || text.includes('ramnagar') || text.includes('mainatand') || text.includes('sikta') || text.includes('thakraha') || text.includes('nautan')) {
    return 'West Champaran';
  }
  if (text.includes('east champaran') || text.includes('motihari') || text.includes('chakia') || text.includes('raxul') || text.includes('dhaka') || text.includes('areraj') || text.includes('kesaria') || text.includes('patahi') || text.includes('sugauli') || text.includes('harsidhi') || text.includes('madhuban') || text.includes('pakridayal') || text.includes('paharpur') || text.includes('mehsi') || text.includes('ghorasahan') || text.includes('adapur') || text.includes('chhauradano') || text.includes('tulkaulia') || text.includes('chiraiya')) {
    return 'East Champaran';
  }
  if (text.includes('muzaffarpur') || text.includes('skmch') || text.includes('minapur') || text.includes('kanti') || text.includes('kudhani') || text.includes('bochahan') || text.includes('sahebganj') || text.includes('muraul') || text.includes('gaighat') || text.includes('paroo') || text.includes('saraiya') || text.includes('motipur') || text.includes('katra') || text.includes('aurai')) {
    return 'Muzaffarpur';
  }
  if (text.includes('patna') || text.includes('pmch') || text.includes('nmch') || text.includes('igic') || text.includes('paliganj') || text.includes('masaudhi') || text.includes('barh') || text.includes('danapur') || text.includes('phulwari')) {
    return 'Patna';
  }
  if (text.includes('gaya') || text.includes('anmmch') || text.includes('sherghati') || text.includes('tikari') || text.includes('tekari') || text.includes('bodhgaya') || text.includes('belaganj') || text.includes('wajirganj') || text.includes('paraiya') || text.includes('manpur') || text.includes('atri') || text.includes('fatehpur') || text.includes('dumaria') || text.includes('imamganj') || text.includes('gurua') || text.includes('barachatti') || text.includes('khijarsarai') || text.includes('aamas')) {
    return 'Gaya';
  }
  if (text.includes('nalanda') || text.includes('pawapuri') || text.includes('bmims') || text.includes('biharsharif') || text.includes('hilsa') || text.includes('rajgir') || text.includes('rahui') || text.includes('paithna') || text.includes('giriyak') || text.includes('sarmera') || text.includes('ekangarsarai') || text.includes('kalyan bigha') || text.includes('islampur')) {
    return 'Nalanda';
  }
  if (text.includes('darbhanga') || text.includes('dmch') || text.includes('biraul') || text.includes('benipur') || text.includes('bahari') || text.includes('bahadurpur') || text.includes('singhwara') || text.includes('keoti') || text.includes('manigachhi') || text.includes('ghyanshyampur') || text.includes('jale')) {
    return 'Darbhanga';
  }
  if (text.includes('madhubani') || text.includes('benipatti') || text.includes('phulparas') || text.includes('jhanjharpur') || text.includes('jainagar') || text.includes('khutauna') || text.includes('bisfi') || text.includes('rajnagar') || text.includes('basopatti') || text.includes('babubarhi') || text.includes('lokahi') || text.includes('herlakhi') || text.includes('madhwapur') || text.includes('khajauli')) {
    return 'Madhubani';
  }
  if (text.includes('samastipur') || text.includes('ram janki') || text.includes('pusa') || text.includes('dalsinghsarai') || text.includes('roshara') || text.includes('patori') || text.includes('mohiuddinagar') || text.includes('hasanpur') || text.includes('bithan') || text.includes('khanpur') || text.includes('morwa') || text.includes('sarairanjan') || text.includes('ujiyarpur') || text.includes('singhiya') || text.includes('kalyanpur, samastipur') || text.includes('vibhutipur')) {
    return 'Samastipur';
  }
  if (text.includes('saran') || text.includes('chhapra') || text.includes('sonpur') || text.includes('dighwara') || text.includes('manjhi') || text.includes('parsa') || text.includes('garkha') || text.includes('marhaura') || text.includes('ekma') || text.includes('amnaur') || text.includes('rivilganj') || text.includes('jalalpur') || text.includes('taraiya') || text.includes('masrakh') || text.includes('baniyapur')) {
    return 'Saran';
  }
  if (text.includes('siwan') || text.includes('mahrajganj') || text.includes('hathua') || text.includes('pachrukhi') || text.includes('guthani') || text.includes('barhariya') || text.includes('goreyakothi') || text.includes('basantpur') || text.includes('daraundha') || text.includes('mairwa') || text.includes('hussainganj') || text.includes('aandar') || text.includes('siswan')) {
    return 'Siwan';
  }
  if (text.includes('gopalganj') || text.includes('kateya') || text.includes('bhore') || text.includes('thawe') || text.includes('sidhwaliya') || text.includes('uchakagaon') || text.includes('vijayipur') || text.includes('kuchaikote') || text.includes('baikunthpur') || text.includes('manjha') || text.includes('fulwariya') || text.includes('bhagwanpur hatt')) {
    return 'Gopalganj';
  }
  if (text.includes('vaishali') || text.includes('hajipur') || text.includes('mahua') || text.includes('lalganj') || text.includes('rajapakar') || text.includes('mahnaar') || text.includes('bhagwanpur, vaisali') || text.includes('patepur')) {
    return 'Vaishali';
  }
  if (text.includes('sitamarhi') || text.includes('belsand') || text.includes('parihar') || text.includes('bairgania') || text.includes('sonbarsa') || text.includes('sursand') || text.includes('runisaidpur') || text.includes('bajpatti') || text.includes('nanpur') || text.includes('bathnaha') || text.includes('riga') || text.includes('majorganj')) {
    return 'Sitamarhi';
  }
  if (text.includes('sheohar') || text.includes('piprahi') || text.includes('dumari katsari') || text.includes('tariyani')) {
    return 'Sheohar';
  }
  if (text.includes('bhojpur') || text.includes('koilwar') || text.includes('jagdishpur') || text.includes('bihiya') || text.includes('barhara') || text.includes('sahar, bhojpur') || text.includes('garhani') || text.includes('tarari') || text.includes('agiwaon') || text.includes('piro') || text.includes('charpokhari') || text.includes('udwantnagar') || text.includes('shahpur')) {
    return 'Bhojpur';
  }
  if (text.includes('buxar') || text.includes('dumraon') || text.includes('simari') || text.includes('brahmpur') || text.includes('nawanagar') || text.includes('rajpur') || text.includes('chaugain') || text.includes('kesath') || text.includes('itadhi')) {
    return 'Buxar';
  }
  if (text.includes('rohtas') || text.includes('sasaram') || text.includes('dehri') || text.includes('bikramganj') || text.includes('karakat') || text.includes('nasriganj') || text.includes('chenari') || text.includes('dawath') || text.includes('nauhatta') || text.includes('shivsagar') || text.includes('kargahar')) {
    return 'Rohtas';
  }
  if (text.includes('kaimur') || text.includes('bhabhua') || text.includes('mohania') || text.includes('kudra') || text.includes('ramgarh') || text.includes('adhaura') || text.includes('chainpur') || text.includes('bhagwanpur, kaimur') || text.includes('chand, kaimur')) {
    return 'Kaimur';
  }
  if (text.includes('aurangabad') || text.includes('daudnagar') || text.includes('nabinagar') || text.includes('rafiganj') || text.includes('kutumba') || text.includes('haspura') || text.includes('barun') || text.includes('madanpur') || text.includes('deo') || text.includes('obro') || text.includes('goh')) {
    return 'Aurangabad';
  }
  if (text.includes('jehanabad') || text.includes('ghosi') || text.includes('hulasganj') || text.includes('kako') || text.includes('shakurabad') || text.includes('makhdumpur')) {
    return 'Jehanabad';
  }
  if (text.includes('arwal') || text.includes('kurtha') || text.includes('karpi') || text.includes('sonbhadra banshi')) {
    return 'Arwal';
  }
  if (text.includes('nawada') || text.includes('rajauli') || text.includes('hisua') || text.includes('akbarpur') || text.includes('pakribarwa') || text.includes('warsaliganj') || text.includes('govindpur') || text.includes('nardiganj') || text.includes('kashichak') || text.includes('meskaur')) {
    return 'Nawada';
  }
  if (text.includes('jamui') || text.includes('jhajha') || text.includes('gidhौर') || text.includes('gidhour') || text.includes('khaira') || text.includes('sono') || text.includes('chakai') || text.includes('sikandra') || text.includes('islamnagar aliganj')) {
    return 'Jamui';
  }
  if (text.includes('sheikhpura') || text.includes('barbigha') || text.includes('ariari') || text.includes('ghatkusumbha') || text.includes('chewara')) {
    return 'Sheikhpura';
  }
  if (text.includes('lakhisarai') || text.includes('barahiya') || text.includes('surajgarha') || text.includes('halsi') || text.includes('pipariya') || text.includes('ramgarh chowk')) {
    return 'Lakhisarai';
  }
  if (text.includes('begusarai') || text.includes('teghra') || text.includes('gogri') || text.includes('manjhaul') || text.includes('barauni') || text.includes('bachhwara') || text.includes('cheriabariyapur') || text.includes('matihani') || text.includes('sahebpur kamal') || text.includes('balia') || text.includes('khudabandpur')) {
    return 'Begusarai';
  }
  if (text.includes('khagaria') || text.includes('gogri') || text.includes('alauli') || text.includes('chautham') || text.includes('beldaur') || text.includes('manshi') || text.includes('parbatta')) {
    return 'Khagaria';
  }
  if (text.includes('munger') || text.includes('haveli kharagpur') || text.includes('haweli kharagpur') || text.includes('dharahra') || text.includes('tarapur') || text.includes('bariarpur') || text.includes('sangrampur, munger') || text.includes('asarganj') || text.includes('tetia bamber')) {
    return 'Munger';
  }
  if (text.includes('bhagalpur') || text.includes('jlnmch') || text.includes('kahalgaon') || text.includes('navgachhia') || text.includes('naugachia') || text.includes('pirpainti') || text.includes('sultanganj') || text.includes('bihpur') || text.includes('gopalpur, bhagalpur') || text.includes('goradih') || text.includes('sabour') || text.includes('nathnagar')) {
    return 'Bhagalpur';
  }
  if (text.includes('banka') || text.includes('amarpur') || text.includes('katoria') || text.includes('shambhuganj') || text.includes('belhar') || text.includes('barahat') || text.includes('bounsi') || text.includes('chandan') || text.includes('rajaun') || text.includes('dhauraiya')) {
    return 'Banka';
  }
  if (text.includes('saharsa') || text.includes('simribhakhtiyarpur') || text.includes('saorbazar') || text.includes('navhatta') || text.includes('mahishi') || text.includes('kahuara') || text.includes('sonarsha') || text.includes('banma itahari')) {
    return 'Saharsa';
  }
  if (text.includes('madhepura') || text.includes('murliganj') || text.includes('singhesharsthan') || text.includes('singheshwar') || text.includes('uda kishanganj') || text.includes('bihariganj') || text.includes('kumarkhand') || text.includes('gamhariya') || text.includes('shankarpar')) {
    return 'Madhepura';
  }
  if (text.includes('supaul') || text.includes('nirmali') || text.includes('triveniganj') || text.includes('birpur') || text.includes('pipra, supaul') || text.includes('saraigarh bhaptiyahi') || text.includes('chhatapur') || text.includes('raghopur') || text.includes('kishunpur') || text.includes('marauna')) {
    return 'Supaul';
  }
  if (text.includes('purnia') || text.includes('purnea') || text.includes('banmankhi') || text.includes('dhamdaha') || text.includes('kasba') || text.includes('baisi') || text.includes('bhawanipur') || text.includes('amur') || text.includes('rupuili') || text.includes('dagarua') || text.includes('krityanand nagar') || text.includes('janki nagar') || text.includes('srinagar')) {
    return 'Purnia';
  }
  if (text.includes('katihar') || text.includes('manihari') || text.includes('barsoi') || text.includes('korha') || text.includes('falka') || text.includes('pranpur') || text.includes('azamnagar') || text.includes('kadwa') || text.includes('balrampur') || text.includes('ahmadpur') || text.includes('sameli') || text.includes('kursela') || text.includes('barari')) {
    return 'Katihar';
  }
  if (text.includes('araria') || text.includes('forbesganj') || text.includes('jokihat') || text.includes('raniganj') || text.includes('narpatganj') || text.includes('bhargama') || text.includes('palasi') || text.includes('kursakatta') || text.includes('sikti')) {
    return 'Araria';
  }
  if (text.includes('kishanganj') || text.includes('dighal bank') || text.includes('thakurganj') || text.includes('bahadurganj') || text.includes('pothia') || text.includes('kochadhaman') || text.includes('terhagachh')) {
    return 'Kishanganj';
  }

  return 'Bihar';
}
