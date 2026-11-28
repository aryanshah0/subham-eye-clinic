// The six treatment pages, in Gujarati and English.
// Clinic-specific claims come only from Dr. Shah's confirmed facts (docs/QUESTIONS.md).
// General medical explanations and all FAQs are DRAFTS awaiting Dr. Shah's approval (docs/INFO-AUDIT.md).
import type { L } from "./site";

export type Part = "lens" | "nerve" | "retina" | "cornea" | "surface";
export type Section = { h: L; p?: L; list?: L<string[]>; note?: L; photo?: "ot" | "consult" | "tests" | "kerato"; lenses?: { name: L; d: L }[] };
export type Treatment = {
  slug: string;
  icon: string;
  part: Part;
  name: L;
  chip: L;
  card: L;
  title: L;
  description: L;
  intro: L;
  partNote: L;
  facts: { k: L; v: L }[]; // "at a glance" strip under the page heading; every value repeats a fact stated in the page text
  bring: L<string[]>;
  drops?: boolean; // add the "drops may blur your vision" note under What to bring
  sections: Section[];
  faqs: { q: L; a: L }[];
};

const SIGNS_NOTE: L = {
  gu: "આ લક્ષણોનાં બીજાં કારણો પણ હોઈ શકે. ફક્ત આંખની તપાસથી જ ખબર પડે.",
  en: "These signs can have other causes. Only an eye examination can tell.",
};

export const TREATMENTS: Treatment[] = [
  {
    slug: "cataract-surgery",
    icon: "i-cataract",
    part: "lens",
    name: { gu: "મોતિયાનું ઓપરેશન", en: "Cataract surgery" },
    chip: { gu: "મોતિયો", en: "Cataract" },
    card: {
      gu: "પોતાના થિયેટરમાં ફેકો ઓપરેશન, સામાન્ય રીતે ટાંકા વગર — મોનોફોકલ, ટોરિક કે મલ્ટિફોકલ/EDOF લેન્સ સાથે.",
      en: "Phaco surgery in our own theatre, usually without stitches, with a monofocal, toric or multifocal/EDOF lens.",
    },
    title: { gu: "જામનગરમાં મોતિયાનું ઓપરેશન", en: "Cataract surgery in Jamnagar" },
    description: {
      gu: "જામનગરમાં ડૉ. રાજીવ શાહ દ્વારા ક્લિનિકના પોતાના થિયેટરમાં ફેકો મોતિયાનું ઓપરેશન, સામાન્ય રીતે ટાંકા વગર. મોનોફોકલ, ટોરિક, મલ્ટિફોકલ/EDOF લેન્સ.",
      en: "Phaco cataract surgery in Jamnagar, usually without stitches, by Dr. Rajeev Shah in the clinic’s own theatre. Monofocal, toric, multifocal/EDOF lenses.",
    },
    intro: {
      gu: "આંખની અંદરનો કુદરતી લેન્સ ધૂંધળો થઈ જાય તેને મોતિયો કહે છે. ઉંમર સાથે તે સામાન્ય છે. ઓપરેશનથી ધૂંધળો લેન્સ કાઢીને તેની જગ્યાએ સ્વચ્છ કૃત્રિમ લેન્સ મૂકવામાં આવે છે.",
      en: "A cataract (motiyo in Gujarati, motiyabind in Hindi) is when the natural lens inside the eye becomes cloudy. It is common with age. It is treated by surgery that replaces the cloudy lens with a clear artificial lens.",
    },
    partNote: { gu: "મોતિયો: આંખની અંદરનો લેન્સ ધૂંધળો થઈ જાય.", en: "Cataract: the lens inside the eye becomes cloudy." },
    facts: [
      { k: { gu: "પદ્ધતિ", en: "Method" }, v: { gu: "ફેકો (અલ્ટ્રાસાઉન્ડ), સામાન્ય રીતે ટાંકા વગર", en: "Phaco (ultrasound), usually without stitches" } },
      { k: { gu: "ક્યાં", en: "Where" }, v: { gu: "ક્લિનિકના પોતાના ઓપરેશન થિયેટરમાં", en: "The clinic’s own operation theatre" } },
      { k: { gu: "લેન્સ", en: "Lenses" }, v: { gu: "મોનોફોકલ, ટોરિક, મલ્ટિફોકલ/EDOF", en: "Monofocal, toric, multifocal/EDOF" } },
      { k: { gu: "મેડિક્લેમ", en: "Mediclaim" }, v: { gu: "રિઇમ્બર્સમેન્ટથી", en: "By reimbursement" } },
    ],
    bring: {
      gu: ["ચશ્મા, જૂના આંખના રિપોર્ટ અને પ્રિસ્ક્રિપ્શન", "આપ લેતા હો તે દવાઓની યાદી — ડાયાબિટીસ કે બ્લડ પ્રેશરની દવા પણ", "મેડિક્લેમ હોય તો પૉલિસીની વિગતો"],
      en: ["Your glasses, old eye reports and prescriptions", "A list of the medicines you take, including for diabetes or blood pressure", "Your policy details, if you have mediclaim"],
    },
    drops: true,
    sections: [
      {
        h: { gu: "આ લક્ષણો દેખાઈ શકે", en: "Signs you may notice" },
        list: {
          gu: ["ઝાંખું કે ધૂંધળું દેખાવું", "લાઇટથી ચમક લાગવી, ખાસ કરીને રાત્રે", "રંગો ફિક્કા દેખાવા", "ચશ્માના નંબર વારંવાર બદલાવા"],
          en: ["Blurred or cloudy vision", "Glare from lights, especially at night", "Colours look faded", "Your glasses number keeps changing"],
        },
        note: SIGNS_NOTE,
      },
      {
        h: { gu: "સુભમ્ આઈ ક્લિનિકમાં ઓપરેશન", en: "Surgery at Subham Eye Clinic" },
        photo: "ot",
        p: {
          gu: "ડૉ. શાહ ક્લિનિકના પોતાના ઓપરેશન થિયેટરમાં ફેકો ઓપરેશન કરે છે. નાના છેદમાંથી અલ્ટ્રાસાઉન્ડ વડે ધૂંધળો લેન્સ કાઢવામાં આવે છે અને વાળેલો લેન્સ આંખમાં મૂકવામાં આવે છે. સામાન્ય રીતે ટાંકાની જરૂર પડતી નથી.",
          en: "Dr. Shah performs phaco surgery in the clinic’s own operation theatre. The cloudy lens is removed through a small opening using ultrasound, and a folded lens is placed inside the eye. The opening usually needs no stitches.",
        },
      },
      {
        h: { gu: "લેન્સના પ્રકાર", en: "Lens options" },
        lenses: [
          { name: { gu: "મોનોફોકલ", en: "Monofocal" }, d: { gu: "એક અંતરે, સામાન્ય રીતે દૂરનું, સ્પષ્ટ દેખાય. વાંચવા માટે સામાન્ય રીતે ચશ્મા જોઈએ.", en: "Clear vision at one distance, usually far. Reading glasses are usually still needed." } },
          { name: { gu: "ટોરિક", en: "Toric" }, d: { gu: "સિલિન્ડર નંબર (એસ્ટિગ્મેટિઝમ) પણ સુધારે.", en: "Also corrects astigmatism (a cylindrical number)." } },
          { name: { gu: "મલ્ટિફોકલ / EDOF", en: "Multifocal / EDOF" }, d: { gu: "એકથી વધુ અંતરે ચશ્માની જરૂર ઘટાડવાનો હેતુ. દરેક આંખ માટે યોગ્ય ન પણ હોય.", en: "Aims to reduce the need for glasses at more than one distance. Not suitable for every eye." } },
        ],
        note: { gu: "આંખની તપાસ પછી ડૉ. શાહ જણાવશે કે આપના માટે કયો લેન્સ યોગ્ય છે.", en: "After examining your eyes, Dr. Shah will advise which lens suits you." },
      },
      {
        h: { gu: "ઓપરેશન પછી", en: "After surgery" },
        p: {
          gu: "ઓપરેશન પછીના દિવસો માટે ટીપાં અને સ્પષ્ટ સૂચનાઓ આપવામાં આવે છે, અને ફરી બતાવવાનો સમય નક્કી કરવામાં આવે છે. ક્લિનિકમાં આપેલી સૂચનાઓનું પાલન કરો.",
          en: "You are given eye drops and clear instructions for the days after surgery, and follow-up visits are arranged. Please follow the instructions given at the clinic.",
        },
        list: {
          gu: [
            "ટીપાં નાખતાં કે મલમ લગાડતાં પહેલાં હાથ સાબુથી બરાબર સાફ કરો.",
            "ટીપાં કે મલમ આંખના પોપચાની નીચેની બાજુએ જ લગાડો.",
            "આંખની સુરક્ષા માટે હંમેશાં કાળાં ચશ્માં પહેરો.",
            "ઓપરેશન થયેલી આંખ ચોળો નહીં.",
            "ઓપરેશન થયું હોય એ પડખે સૂઓ નહીં.",
            "ઓપરેશન થયેલી આંખ ધૂઓ નહીં અને માથું પલાળીને સ્નાન ન કરો.",
            "ધૂળ, તડકો અને ધુમાડાથી દૂર રહો.",
            "નાનાં બાળકો સાથે રમવાનું ટાળો, જેથી આંખને હાથ કે કોઈ વસ્તુ ન લાગે.",
            "કસરત ન કરો અને ભારે વજન ન ઊંચકો, જેથી આંખ પર જોર ન પડે.",
            "મસાજ, પ્રવાસ કે આંચકા લાગે એવી કોઈ પણ પ્રવૃત્તિ ટાળો.",
            "ખાંસી, શરદી કે કબજિયાત હોય તો તરત તેનો ઇલાજ કરાવો.",
            "ખાવા-પીવાનું બધું લઈ શકાય છે; ડાયાબિટીસ હોય તો ડાયાબિટીસનો ખોરાક ચાલુ રાખો.",
          ],
          en: [
            "Wash your hands well with soap before putting in drops or ointment.",
            "Put the drops or ointment only in the lower eyelid.",
            "Always wear dark glasses to protect the eye.",
            "Don’t rub the operated eye.",
            "Don’t sleep on the side of the operated eye.",
            "Don’t wash the operated eye, and don’t wet your head while bathing.",
            "Stay away from dust, sun and smoke.",
            "Avoid playing with small children, so that no hand or object touches the eye.",
            "Don’t exercise or lift heavy things that strain the eye.",
            "Avoid massage, travel or any activity with jerks.",
            "If you have a cough, cold or constipation, get it treated at once.",
            "You can eat and drink everything as usual; if you have diabetes, keep to your diabetic diet.",
          ],
        },
        note: {
          gu: "આ સૂચનાઓ ક્લિનિકના ડિસ્ચાર્જ પત્રકમાંથી છે. તીવ્ર દુખાવો થાય, નજર ઓછી થાય કે કંઈ સમજ ન પડે તો તરત ક્લિનિકને ફોન કરો — ઇમરજન્સી માટે ૨૪×૭.",
          en: "These instructions are from the clinic’s discharge sheet. If you have severe pain, your vision drops, or anything is unclear, call the clinic at once — 24×7 for emergencies.",
        },
      },
    ],
    faqs: [
      { q: { gu: "શું ઓપરેશન ક્લિનિકમાં જ થાય છે?", en: "Is the operation done at the clinic itself?" }, a: { gu: "હા. ડૉ. શાહ ક્લિનિકના પોતાના ઓપરેશન થિયેટરમાં મોતિયાનું ઓપરેશન કરે છે.", en: "Yes. Dr. Shah performs cataract surgery in the clinic’s own operation theatre." } },
      { q: { gu: "મોતિયાનું ઓપરેશન ક્યારે કરાવવું?", en: "When should a cataract be operated?" }, a: { gu: "મોતિયો 'પાકે' તેની રાહ જોવાની જરૂર નથી. ઝાંખું દેખાવાથી રોજિંદા કામમાં તકલીફ પડવા લાગે ત્યારે સામાન્ય રીતે ઓપરેશનની સલાહ અપાય છે — તપાસ પછી ડૉ. શાહ સલાહ આપશે.", en: "There is no need to wait for a cataract to become ‘ripe’. Surgery is usually advised when blurred vision starts to affect daily life — Dr. Shah will advise after an examination." } },
      { q: { gu: "શું ટાંકા લેવા પડે છે?", en: "Are stitches needed?" }, a: { gu: "ફેકો ઓપરેશન નાના છેદમાંથી થાય છે, જેમાં સામાન્ય રીતે ટાંકાની જરૂર પડતી નથી.", en: "Phaco surgery is done through a small opening that usually needs no stitches." } },
      { q: { gu: "મારા માટે કયો લેન્સ યોગ્ય છે?", en: "Which lens is right for me?" }, a: { gu: "મોનોફોકલ, ટોરિક અને મલ્ટિફોકલ/EDOF લેન્સ ઉપલબ્ધ છે. આંખની તપાસ પછી ડૉ. શાહ જણાવે છે કે આપના માટે કયો યોગ્ય છે.", en: "Monofocal, toric and multifocal/EDOF lenses are available. Dr. Shah advises which suits you after examining your eyes." } },
      { q: { gu: "શું ઓપરેશન પછી મોતિયો ફરી આવી શકે?", en: "Can a cataract come back after surgery?" }, a: { gu: "મોતિયો ફરી આવતો નથી. પરંતુ કેટલાક લોકોમાં મહિનાઓ કે વર્ષો પછી નવા લેન્સની પાછળનું પાતળું પડ ઝાંખું થાય છે (પોસ્ટીરિયર કેપ્સ્યુલ ઓપેસિફિકેશન). તેની સારવાર ક્લિનિકમાં YAG લેસરથી થાય છે.", en: "A cataract does not come back. In some people, the thin layer behind the new lens becomes cloudy months or years later (posterior capsule opacification). This is treated at the clinic with the YAG laser." } },
      { q: { gu: "શું મેડિક્લેમ ચાલે છે?", en: "Is mediclaim accepted?" }, a: { gu: "હા, રિઇમ્બર્સમેન્ટથી: વીમા કંપની પાસે ક્લેમ કરવા માટેના બધા કાગળો ક્લિનિક આપે છે. કેશલેસ સુવિધા નથી.", en: "Yes, by reimbursement: the clinic gives you all the papers to claim from your insurer. Cashless treatment is not available." } },
    ],
  },
  {
    slug: "glaucoma",
    icon: "i-glaucoma",
    part: "nerve",
    name: { gu: "ઝામર (ગ્લુકોમા)", en: "Glaucoma" },
    chip: { gu: "ઝામર", en: "Glaucoma" },
    card: { gu: "આંખના દબાણની તપાસ, ટીપાં અને ઝામરનું ઓપરેશન.", en: "Eye-pressure checks, drops and glaucoma surgery." },
    title: { gu: "જામનગરમાં ઝામર (ગ્લુકોમા)ની સારવાર", en: "Glaucoma care in Jamnagar" },
    description: {
      gu: "સુભમ્ આઈ ક્લિનિક, જામનગરમાં ડૉ. રાજીવ શાહ દ્વારા ઝામરની સારવાર: આંખના દબાણની તપાસ, ટીપાં અને ક્લિનિકના પોતાના થિયેટરમાં ઝામરનું ઓપરેશન.",
      en: "Glaucoma care by Dr. Rajeev Shah at Subham Eye Clinic, Jamnagar: eye-pressure checks, eye drops and glaucoma surgery in the clinic’s own operation theatre.",
    },
    intro: {
      gu: "ઝામર (ગ્લુકોમા) એ આંખની એવી તકલીફ છે જેમાં ઑપ્ટિક નર્વને નુકસાન થાય છે, ઘણી વાર આંખનું દબાણ વધવાથી. ઝામરથી ગયેલી દૃષ્ટિ પાછી આવતી નથી, એટલે વહેલી ખબર પડવી જરૂરી છે.",
      en: "Glaucoma (zamar in Gujarati, kala motia in Hindi) is a group of eye conditions that damage the optic nerve, often because of high pressure inside the eye. Vision lost to glaucoma cannot be brought back, so finding it early matters.",
    },
    partNote: { gu: "ઝામરમાં ઑપ્ટિક નર્વને નુકસાન થાય છે, ઘણી વાર આંખનું દબાણ વધવાથી.", en: "Glaucoma damages the optic nerve, often because of high pressure in the eye." },
    facts: [
      { k: { gu: "તપાસ", en: "What is checked" }, v: { gu: "આંખનું દબાણ અને ઑપ્ટિક નર્વ", en: "Eye pressure and the optic nerve" } },
      { k: { gu: "સારવાર", en: "Treatment" }, v: { gu: "ટીપાં; જરૂર પડે તો ઓપરેશન", en: "Eye drops; surgery when needed" } },
      { k: { gu: "ઓપરેશન ક્યાં", en: "Where surgery is done" }, v: { gu: "ક્લિનિકના પોતાના ઓપરેશન થિયેટરમાં", en: "The clinic’s own operation theatre" } },
      { k: { gu: "ફરી તપાસ", en: "Follow-up" }, v: { gu: "નિયમિત તપાસ જરૂરી", en: "Regular check-ups" } },
    ],
    bring: {
      gu: ["હાલ વાપરતા હો તે આંખનાં ટીપાં", "જૂના આંખના રિપોર્ટ અને પ્રિસ્ક્રિપ્શન", "આપ લેતા હો તે દવાઓની યાદી"],
      en: ["The eye drops you use now", "Old eye reports and prescriptions", "A list of the medicines you take"],
    },
    drops: true,
    sections: [
      {
        h: { gu: "આ લક્ષણો દેખાઈ શકે", en: "Signs you may notice" },
        list: {
          gu: ["શરૂઆતમાં ઘણી વાર કોઈ લક્ષણ નથી હોતાં", "બાજુની દૃષ્ટિ ધીમે ધીમે ઓછી થવી", "અચાનક આંખમાં દુખાવો, લાલાશ, માથાનો દુખાવો અને લાઇટની આસપાસ રંગીન કુંડાળાં સાથે ઝાંખું દેખાવું — તેમાં તાત્કાલિક સારવાર જોઈએ"],
          en: ["Often no symptoms in the early stages", "Slow loss of side vision", "Sudden eye pain, redness, headache and blurred vision with coloured rings around lights — this needs urgent care"],
        },
        note: SIGNS_NOTE,
      },
      {
        h: { gu: "સુભમ્ આઈ ક્લિનિકમાં સારવાર", en: "Care at Subham Eye Clinic" },
        photo: "consult",
        p: {
          gu: "ડૉ. શાહ આંખનું દબાણ તપાસે છે અને ઑપ્ટિક નર્વની તપાસ કરે છે. સારવાર સામાન્ય રીતે ટીપાંથી શરૂ થાય છે; જરૂર પડે તો ક્લિનિકના પોતાના ઓપરેશન થિયેટરમાં ઝામરનું ઓપરેશન કરવામાં આવે છે.",
          en: "Dr. Shah checks the pressure in the eye and examines the optic nerve. Treatment usually starts with eye drops; when needed, glaucoma surgery is done in the clinic’s own operation theatre.",
        },
      },
    ],
    faqs: [
      { q: { gu: "શું ઝામર મટી શકે?", en: "Can glaucoma be cured?" }, a: { gu: "થયેલું નુકસાન પાછું આવતું નથી. આંખનું દબાણ કાબૂમાં રાખીને બાકીની દૃષ્ટિ બચાવવી એ સારવારનો હેતુ છે.", en: "Damage already done cannot be reversed. Treatment aims to protect the remaining vision by controlling the eye pressure." } },
      { q: { gu: "કોણે તપાસ કરાવવી જોઈએ?", en: "Who should get checked?" }, a: { gu: "૪૦ વર્ષથી વધુ ઉંમરના સૌએ, અને જેમના કુટુંબમાં ઝામર હોય કે જેમને ડાયાબિટીસ હોય તેમણે નિયમિત આંખની તપાસ કરાવવી જોઈએ.", en: "Anyone over 40, and people with a family history of glaucoma or with diabetes, should have regular eye check-ups." } },
      { q: { gu: "શું લાંબા સમય સુધી ટીપાં નાખવાં પડશે?", en: "Will I need drops for a long time?" }, a: { gu: "ઝામરમાં સામાન્ય રીતે લાંબા ગાળાની સારવાર અને નિયમિત તપાસ જોઈએ. ડૉ. શાહને પૂછ્યા વગર ટીપાં બંધ ન કરો.", en: "Glaucoma usually needs long-term treatment and regular check-ups. Do not stop the drops without asking Dr. Shah." } },
    ],
  },
  {
    slug: "diabetic-eye-checkup",
    icon: "i-retina",
    part: "retina",
    name: { gu: "ડાયાબિટીસમાં આંખની તપાસ", en: "Diabetic eye check-ups" },
    chip: { gu: "ડાયાબિટીસ", en: "Diabetic eye" },
    card: { gu: "OCT સ્કેન અને પડદાના ફોટા સાથે રેટિનાની તપાસ.", en: "Check-ups of the retina with OCT scans and retina photographs." },
    title: { gu: "જામનગરમાં ડાયાબિટીસમાં આંખની તપાસ", en: "Diabetic eye check-ups in Jamnagar" },
    description: {
      gu: "સુભમ્ આઈ ક્લિનિક, જામનગરમાં ડાયાબિટીસમાં આંખની તપાસ: ડૉ. રાજીવ શાહ દ્વારા OCT સ્કેન અને પડદાના ફોટા સાથે રેટિનાની તપાસ.",
      en: "Diabetic eye check-ups at Subham Eye Clinic, Jamnagar: retina examination with OCT scans and retina photographs by Dr. Rajeev Shah.",
    },
    intro: {
      gu: "ડાયાબિટીસ રેટિનાની — આંખની પાછળના જોવાના પડદાની — નાની રક્તવાહિનીઓને નુકસાન કરી શકે. મોટે ભાગે તકલીફ વધી ન જાય ત્યાં સુધી કોઈ લક્ષણ દેખાતાં નથી, એટલે ડાયાબિટીસ હોય તેમણે નિયમિત આંખની તપાસ કરાવવી જરૂરી છે.",
      en: "Diabetes can damage the small blood vessels of the retina, the seeing layer at the back of the eye. This often causes no symptoms until it is advanced, so people with diabetes need regular eye check-ups.",
    },
    partNote: { gu: "ડાયાબિટીસ રેટિનાને નુકસાન કરી શકે — આંખની પાછળનો જોવાનો પડદો.", en: "Diabetes can damage the retina, the seeing layer at the back of the eye." },
    facts: [
      { k: { gu: "તપાસ કોણ કરે", en: "Who examines you" }, v: { gu: "ડૉ. રાજીવ શાહ", en: "Dr. Rajeev Shah" } },
      { k: { gu: "જરૂર પડે તો", en: "Where needed" }, v: { gu: "પડદાના ફોટા અને OCT સ્કેન", en: "Retina photographs and OCT scan" } },
      { k: { gu: "કેટલી વાર", en: "How often" }, v: { gu: "ઓછામાં ઓછું વર્ષમાં એક વાર", en: "At least once a year" } },
      { k: { gu: "ટીપાં", en: "Eye drops" }, v: { gu: "થોડા કલાક ઝાંખું દેખાઈ શકે", en: "Can blur vision for a few hours" } },
    ],
    bring: {
      gu: ["તાજેતરના સુગરના રિપોર્ટ", "આપ લેતા હો તે દવાઓની યાદી", "ચશ્મા અને જૂના આંખના રિપોર્ટ"],
      en: ["Your recent sugar reports", "A list of the medicines you take", "Your glasses and old eye reports"],
    },
    sections: [
      {
        h: { gu: "ક્લિનિકમાં તપાસ", en: "The check-up at the clinic" },
        photo: "consult",
        p: {
          gu: "ડૉ. શાહ રેટિનાની તપાસ કરે છે અને જરૂર પડે તો ફંડસ કેમેરાથી પડદાના ફોટા તથા OCT સ્કેન કરે છે, જેમાં રેટિનાનાં પડ વિગતે દેખાય છે.",
          en: "Dr. Shah examines the retina and, where needed, takes retina photographs with the fundus camera and an OCT scan, which shows the layers of the retina in detail.",
        },
      },
      {
        h: { gu: "આ લક્ષણો હોય તો વહેલા બતાવો", en: "Signs to report early" },
        list: {
          gu: ["ઝાંખું કે ટુકડે ટુકડે દેખાવું", "કાળા ડાઘ કે તરતા કણ દેખાવા", "રાત્રે જોવામાં તકલીફ"],
          en: ["Blurred or patchy vision", "Dark spots or floaters", "Difficulty seeing at night"],
        },
        note: SIGNS_NOTE,
      },
    ],
    faqs: [
      { q: { gu: "ડાયાબિટીસ હોય તો કેટલી વાર આંખ તપાસાવવી?", en: "How often should I get my eyes checked if I have diabetes?" }, a: { gu: "ઓછામાં ઓછું વર્ષમાં એક વાર, અથવા ડૉ. શાહ કહે તો વધુ વાર.", en: "At least once a year, or more often if Dr. Shah advises." } },
      { q: { gu: "મને બરાબર દેખાય છે, તો પણ તપાસ જરૂરી છે?", en: "My vision is fine. Do I still need a check-up?" }, a: { gu: "હા. શરૂઆતમાં રેટિનાના નુકસાનનાં ઘણી વાર કોઈ લક્ષણ હોતાં નથી.", en: "Yes. Diabetic damage to the retina often has no symptoms in the early stages." } },
      { q: { gu: "રેટિનાને નુકસાન થયું હોય તો સારવાર છે?", en: "Is there treatment if the retina is affected?" }, a: { gu: "જરૂર પડે તો ડૉ. શાહ ક્લિનિકમાં ગ્રીન લેસરથી ડાયાબિટીક રેટિનોપથીની સારવાર કરે છે. તપાસ પછી ડૉ. શાહ સમજાવશે કે આપની આંખ માટે શું જરૂરી છે.", en: "Where needed, Dr. Shah treats diabetic retinopathy with the green laser at the clinic. After the check-up, Dr. Shah will explain what your eyes need." } },
      { q: { gu: "શું આંખમાં ટીપાં નાખવામાં આવશે?", en: "Will drops be put in my eyes?" }, a: { gu: "ઘણી વાર હા. તેનાથી થોડા કલાક ઝાંખું દેખાઈ શકે, એટલે કોઈને સાથે લાવો અને જાતે વાહન ચલાવીને ઘરે ન જાઓ.", en: "Often yes. They can blur your vision for a few hours, so come with someone and don’t drive yourself home." } },
    ],
  },
  {
    slug: "eye-injuries",
    icon: "i-injury",
    part: "cornea",
    name: { gu: "આંખની ઇજા અને ઇમરજન્સી", en: "Eye injuries and emergencies" },
    chip: { gu: "ઇજા", en: "Injury" },
    card: { gu: "૨૪×૭: આંખમાં કણ, કેમિકલથી ઇજા અને કોર્નિયાની ઇજાનું ઓપરેશન.", en: "Seen 24×7: foreign bodies, chemical injuries and repair of corneal injuries." },
    title: { gu: "જામનગરમાં આંખની ઇજા અને ઇમરજન્સી ૨૪×૭", en: "Eye injuries and emergencies 24×7 in Jamnagar" },
    description: {
      gu: "સુભમ્ આઈ ક્લિનિક, જામનગરમાં આંખની ઇજા અને ઇમરજન્સી ૨૪×૭: આંખમાં કણ, કેમિકલથી ઇજા અને કોર્નિયાની ઇજાનું ઓપરેશન. ફોન 0288 256 3274.",
      en: "Eye injuries and emergencies seen 24×7 at Subham Eye Clinic, Jamnagar: foreign bodies, chemical injuries, corneal injury repair. Call 0288 256 3274.",
    },
    intro: {
      gu: "આંખની ઇજામાં તરત સારવાર જરૂરી છે. ડૉ. શાહ ૨૪×૭ આંખની ઇમરજન્સી જુએ છે — ગમે ત્યારે ક્લિનિકના નંબર પર ફોન કરો.",
      en: "Eye injuries need prompt care. Dr. Shah sees eye emergencies 24×7 — call the clinic number at any hour.",
    },
    partNote: { gu: "ઇજા અને આંખમાં પડેલા કણની અસર મોટે ભાગે કોર્નિયા પર થાય — આગળની પારદર્શક બારી.", en: "Injuries and foreign bodies most often affect the cornea, the clear front window." },
    facts: [
      { k: { gu: "ક્યારે", en: "When" }, v: { gu: "૨૪×૭, દિવસ-રાત ગમે ત્યારે", en: "24×7, any time of day or night" } },
      { k: { gu: "પહેલાં ફોન કરો", en: "Call first" }, v: { gu: "0288 256 3274", en: "0288 256 3274" } },
      { k: { gu: "સારવાર", en: "What is treated" }, v: { gu: "આંખમાં કણ, કેમિકલ અને કોર્નિયાની ઇજા", en: "Foreign bodies, chemical and corneal injuries" } },
      { k: { gu: "ઓપરેશન ક્યાં", en: "Where surgery is done" }, v: { gu: "ક્લિનિકના પોતાના ઓપરેશન થિયેટરમાં", en: "The clinic’s own operation theatre" } },
    ],
    bring: {
      gu: ["કેમિકલ ઊડ્યું હોય તો તેનું નામ કે ડબ્બો", "આંખમાં નાખેલાં ટીપાં કે લીધેલી દવા"],
      en: ["The chemical’s name or container, after a splash", "Any eye drops or medicine you have already used"],
    },
    sections: [
      {
        h: { gu: "પહેલાં શું કરવું", en: "What to do first" },
        list: {
          gu: ["કેમિકલ ઊડે તો: આંખને પુષ્કળ ચોખ્ખા પાણીથી સતત ધોતા રહો; એ દરમિયાન બીજા કોઈને ક્લિનિકમાં ફોન કરવા કહો", "આંખમાં કંઈ પડે તો: આંખ ચોળશો નહીં", "આંખમાં કંઈ ખૂંપી ગયું હોય તો: જાતે કાઢવાનો પ્રયત્ન ન કરો — આંખને હળવેથી ઢાંકીને ક્લિનિક આવો"],
          en: ["Chemical splash: keep rinsing the eye with plenty of clean water while someone calls the clinic", "Something in the eye: do not rub it", "Something stuck in the eye: do not try to pull it out — cover the eye gently and come to the clinic"],
        },
      },
      {
        h: { gu: "તરત આવો", en: "Come at once for" },
        list: {
          gu: ["આંખમાં કેમિકલ ઊડવું", "આંખમાં કાપો, જોરથી વાગવું કે કંઈ ખૂંપી જવું", "ઇજા પછી અચાનક દુખાવો કે ઓછું દેખાવું"],
          en: ["A chemical splash in the eye", "A cut, a hard hit, or something stuck in the eye", "Sudden pain or loss of vision after an injury"],
        },
      },
      {
        h: { gu: "સુભમ્ આઈ ક્લિનિકમાં સારવાર", en: "Care at Subham Eye Clinic" },
        photo: "ot",
        p: {
          gu: "ડૉ. શાહ આંખમાંથી કણ કાઢે છે, કેમિકલથી થયેલી ઇજાની સારવાર કરે છે અને ક્લિનિકના પોતાના ઓપરેશન થિયેટરમાં કોર્નિયાની ઇજાનું ઓપરેશન કરે છે.",
          en: "Dr. Shah removes foreign bodies, treats chemical injuries and repairs injuries of the cornea in the clinic’s own operation theatre.",
        },
      },
    ],
    faqs: [
      { q: { gu: "શું રાત્રે ઇમરજન્સીમાં ક્લિનિક ખુલ્લું હોય છે?", en: "Is the clinic open at night for emergencies?" }, a: { gu: "હા. આંખની ઇમરજન્સી ૨૪×૭ જોવામાં આવે છે — પહેલાં 0288 256 3274 પર ફોન કરો.", en: "Yes. Eye emergencies are seen 24×7 — call 0288 256 3274 first." } },
      { q: { gu: "કેમિકલ ઊડે તો શું કરવું?", en: "What should I do after a chemical splash?" }, a: { gu: "તરત જ પુષ્કળ ચોખ્ખા પાણીથી આંખ ધુઓ અને રસ્તામાં પણ ધોતા રહો. શક્ય હોય તો કેમિકલનું નામ કે ડબ્બો સાથે લાવો.", en: "Rinse the eye immediately with plenty of clean water and keep rinsing on the way. Bring the chemical’s name or container if you can." } },
      { q: { gu: "આંખમાં કંઈ પડે તો આંખ ચોળવી?", en: "Should I rub my eye if something gets in it?" }, a: { gu: "ના. ચોળવાથી કોર્નિયા પર ઘસરકો પડી શકે. હળવેથી પલકારા મારો અને ન નીકળે તો ક્લિનિક આવો.", en: "No. Rubbing can scratch the cornea. Blink gently, and come to the clinic if it does not come out." } },
    ],
  },
  {
    slug: "pterygium-chalazion",
    icon: "i-lid",
    part: "surface",
    name: { gu: "ટેરીજીયમ અને પોપચાની ગાંઠ", en: "Pterygium and chalazion" },
    chip: { gu: "ટેરીજીયમ", en: "Pterygium" },
    card: { gu: "આંખની સપાટી અને પોપચાની ગાંઠનું ક્લિનિકના થિયેટરમાં નાનું ઓપરેશન.", en: "A growth on the eye or a lump in the eyelid: small operations in our own theatre." },
    title: { gu: "જામનગરમાં ટેરીજીયમ અને પોપચાની ગાંઠનું ઓપરેશન", en: "Pterygium and chalazion surgery in Jamnagar" },
    description: {
      gu: "ટેરીજીયમ અને પોપચાની ગાંઠ (કેલેઝિયન): સુભમ્ આઈ ક્લિનિક, જામનગરમાં ડૉ. રાજીવ શાહ દ્વારા ક્લિનિકના પોતાના થિયેટરમાં નાનું ઓપરેશન.",
      en: "Pterygium and chalazion: small operations by Dr. Rajeev Shah in the clinic’s own operation theatre at Subham Eye Clinic, Jamnagar.",
    },
    intro: {
      gu: "આંખની સપાટી અને પોપચાની બે સામાન્ય તકલીફો — જરૂર પડે તો બંનેનું ક્લિનિકના પોતાના થિયેટરમાં નાનું ઓપરેશન થાય છે.",
      en: "Two common conditions of the eye surface and eyelid, both treated with a small operation in the clinic’s own theatre when needed.",
    },
    partNote: { gu: "ટેરીજીયમ: આંખની સપાટી પર માંસ જેવો ભાગ વધવો.", en: "Pterygium: a growth of tissue onto the surface of the eye." },
    facts: [
      { k: { gu: "ટેરીજીયમ", en: "Pterygium" }, v: { gu: "તકલીફ કરે તો નાનું ઓપરેશન", en: "A small operation if it causes trouble" } },
      { k: { gu: "પોપચાની ગાંઠ", en: "Chalazion" }, v: { gu: "ઘણી ગાંઠો ગરમ શેકથી બેસી જાય", en: "Many settle with warm compresses" } },
      { k: { gu: "ઓપરેશન ક્યાં", en: "Where surgery is done" }, v: { gu: "ક્લિનિકના પોતાના ઓપરેશન થિયેટરમાં", en: "The clinic’s own operation theatre" } },
      { k: { gu: "મેડિક્લેમ", en: "Mediclaim" }, v: { gu: "રિઇમ્બર્સમેન્ટથી", en: "By reimbursement" } },
    ],
    bring: {
      gu: ["ચશ્મા, જૂના આંખના રિપોર્ટ અને પ્રિસ્ક્રિપ્શન", "આપ લેતા હો તે દવાઓની યાદી — ડાયાબિટીસ કે બ્લડ પ્રેશરની દવા પણ"],
      en: ["Your glasses, old eye reports and prescriptions", "A list of the medicines you take, including for diabetes or blood pressure"],
    },
    sections: [
      {
        h: { gu: "ટેરીજીયમ (આંખમાં માંસ વધવું)", en: "Pterygium" },
        p: {
          gu: "આંખના સફેદ ભાગમાંથી કોર્નિયા તરફ વધતો માંસ જેવો ભાગ. તડકા અને ધૂળવાળા વાતાવરણમાં તે સામાન્ય છે. તકલીફ કરે કે આંખની વચ્ચે તરફ વધે તો નાના ઓપરેશનથી કાઢી શકાય છે.",
          en: "A fleshy growth that spreads from the white of the eye onto the cornea. It is common in sunny, dusty conditions. If it causes trouble or grows towards the centre of the eye, it can be removed with a small operation.",
        },
      },
      {
        h: { gu: "પોપચાની ગાંઠ (કેલેઝિયન)", en: "Chalazion" },
        photo: "ot",
        p: {
          gu: "પોપચાની તેલ-ગ્રંથિ બંધ થવાથી થતી ગાંઠ, જેમાં સામાન્ય રીતે દુખાવો થતો નથી. ઘણી ગાંઠો ગરમ શેકથી બેસી જાય છે; ન બેસે તો નાના ઓપરેશનથી કાઢી શકાય છે.",
          en: "A lump in the eyelid, usually not painful, caused by a blocked oil gland. Many settle with warm compresses; one that does not can be removed with a small operation.",
        },
      },
    ],
    faqs: [
      { q: { gu: "શું ઓપરેશન ક્લિનિકમાં જ થાય છે?", en: "Is the operation done at the clinic?" }, a: { gu: "હા, ક્લિનિકના પોતાના ઓપરેશન થિયેટરમાં.", en: "Yes, in the clinic’s own operation theatre." } },
      { q: { gu: "ટેરીજીયમ કાઢ્યા પછી ફરી થઈ શકે?", en: "Can a pterygium come back after removal?" }, a: { gu: "કેટલાક લોકોમાં ફરી થઈ શકે. આપની આંખ માટે શું અપેક્ષા રાખવી તે ડૉ. શાહ સમજાવશે.", en: "It can come back in some people. Dr. Shah will explain what to expect for your eye." } },
      { q: { gu: "શું પોપચાની ગાંઠ અને આંજણી એક જ છે?", en: "Is a chalazion the same as a stye?" }, a: { gu: "ના. આંજણી સામાન્ય રીતે પોપચાની કિનારે દુખાવાવાળી, ચેપવાળી ફોલ્લી હોય છે; પોપચાની ગાંઠ સામાન્ય રીતે પોપચાની અંદર દુખાવા વગરની ગાંઠ હોય છે.", en: "No. A stye is usually a painful, infected bump at the edge of the lid; a chalazion is usually a lump inside the lid that does not hurt." } },
    ],
  },
  {
    slug: "eye-tests-contact-lenses",
    icon: "i-glasses",
    part: "lens",
    name: { gu: "આંખની તપાસ અને કોન્ટેક્ટ લેન્સ", en: "Eye tests and contact lenses" },
    chip: { gu: "તપાસ", en: "Eye tests" },
    card: { gu: "કમ્પ્યુટરથી ચશ્માના નંબરની તપાસ અને કોન્ટેક્ટ લેન્સ.", en: "Computerised eye testing for glasses numbers, and contact lenses." },
    title: { gu: "જામનગરમાં આંખની તપાસ અને કોન્ટેક્ટ લેન્સ", en: "Eye tests and contact lenses in Jamnagar" },
    description: {
      gu: "સુભમ્ આઈ ક્લિનિક, જામનગરમાં આંખની તપાસ: ચશ્માના નંબરની કમ્પ્યુટરથી તપાસ, ડૉ. રાજીવ શાહ દ્વારા આંખની તપાસ અને કોન્ટેક્ટ લેન્સ.",
      en: "Eye check-ups at Subham Eye Clinic, Jamnagar: computerised eye testing for glasses numbers, an eye examination by Dr. Rajeev Shah, and contact lenses.",
    },
    intro: {
      gu: "નિયમિત આંખની તપાસથી તકલીફ વહેલી પકડાય છે — ક્યારેક આપને ખબર પડે તે પહેલાં.",
      en: "A regular eye check-up finds problems early — sometimes before you notice them.",
    },
    partNote: { gu: "આંખનો નંબર કોર્નિયા અને લેન્સ પ્રકાશને કેવી રીતે વાળે છે તેના પર આધાર રાખે છે.", en: "Your glasses number depends on how the cornea and lens bend light." },
    facts: [
      { k: { gu: "ચશ્માનો નંબર", en: "Glasses number" }, v: { gu: "કમ્પ્યુટરથી તપાસ", en: "Computerised testing" } },
      { k: { gu: "આંખની તપાસ", en: "Eye examination" }, v: { gu: "ડૉ. રાજીવ શાહ દ્વારા", en: "By Dr. Rajeev Shah" } },
      { k: { gu: "કોન્ટેક્ટ લેન્સ", en: "Contact lenses" }, v: { gu: "ક્લિનિકમાં ઉપલબ્ધ", en: "Available at the clinic" } },
      { k: { gu: "એપોઇન્ટમેન્ટ", en: "Appointment" }, v: { gu: "ફોનથી", en: "By phone" } },
    ],
    bring: {
      gu: ["હાલ પહેરતા હો તે ચશ્મા", "જૂનાં પ્રિસ્ક્રિપ્શન અને આંખના રિપોર્ટ", "પહેરતા હો તો કોન્ટેક્ટ લેન્સ"],
      en: ["The glasses you wear now", "Old prescriptions and eye reports", "Your contact lenses, if you wear them"],
    },
    sections: [
      {
        h: { gu: "તપાસ ક્યારે કરાવવી", en: "When to come for a check-up" },
        list: {
          gu: ["દૂરનું કે નજીકનું બરાબર ન દેખાય", "વાંચતી વખતે માથું દુખે કે આંખ થાકે", "બાળક ટીવીની બહુ નજીક બેસે કે બોર્ડ ન વાંચી શકે", "ડાયાબિટીસ હોય કે કુટુંબમાં ઝામર હોય"],
          en: ["Trouble seeing far or near", "Headache or tired eyes while reading", "A child who sits very close to the TV or cannot read the board", "Diabetes, or glaucoma in the family"],
        },
      },
      {
        h: { gu: "તપાસમાં શું થાય", en: "At the check-up" },
        photo: "tests",
        list: {
          gu: ["ઑટો‑રિફ્રેક્ટોમીટરથી ચશ્માના નંબરની કમ્પ્યુટર તપાસ", "ડૉ. શાહ દ્વારા આંખની તપાસ"],
          en: ["Computerised testing of your glasses number with an auto‑refractometer", "An eye examination by Dr. Shah"],
        },
      },
      {
        h: { gu: "કોન્ટેક્ટ લેન્સ", en: "Contact lenses" },
        photo: "kerato",
        p: {
          gu: "ક્લિનિકમાં કોન્ટેક્ટ લેન્સ ઉપલબ્ધ છે. કેરાટોમીટરથી કોર્નિયાનો વળાંક માપવામાં આવે છે, અને લેન્સ આપની આંખ માટે યોગ્ય છે કે નહીં તે ડૉ. શાહ જણાવશે.",
          en: "Contact lenses are available at the clinic. The curve of your cornea is measured with a keratometer, and Dr. Shah will advise whether lenses suit your eyes.",
        },
      },
    ],
    faqs: [
      { q: { gu: "આંખની તપાસ માટે એપોઇન્ટમેન્ટ જોઈએ?", en: "Do I need an appointment for an eye test?" }, a: { gu: "સમય માટે 0288 256 3274 પર ફોન કરો.", en: "Please call 0288 256 3274 for a time." } },
      { q: { gu: "આંખ કેટલી વાર તપાસાવવી?", en: "How often should I get my eyes tested?" }, a: { gu: "બાળકો અને મોટાંએ નિયમિત આંખ તપાસાવવી જોઈએ; ૪૦ વર્ષ પછી સામાન્ય રીતે દર એક-બે વર્ષે તપાસની સલાહ અપાય છે, અથવા ડૉ. શાહ કહે તેમ.", en: "Children and adults should have their eyes checked regularly; after 40, a check-up every one to two years is commonly advised, or as Dr. Shah suggests." } },
      { q: { gu: "શું ક્લિનિકમાંથી કોન્ટેક્ટ લેન્સ મળે?", en: "Can I get contact lenses at the clinic?" }, a: { gu: "હા, કોન્ટેક્ટ લેન્સ ઉપલબ્ધ છે. પહેલાં ડૉ. શાહ તપાસશે કે તે આપની આંખ માટે યોગ્ય છે.", en: "Yes, contact lenses are available. Dr. Shah will first check that they suit your eyes." } },
    ],
  },
];
