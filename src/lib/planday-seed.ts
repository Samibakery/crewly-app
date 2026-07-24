// De 33 medarbejdere hentet fra Planday (Bakery by Hermann), 2026-07-24.
// Sami M er bevidst udeladt (det er ejeren/admin, allerede medlem).
// wage_group: BU18 -> 'under18', ellers 'over18'. Grundtimeløn tastes manuelt senere.

export type SeedEmployee = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  employee_number: string;
  hired_date: string | null; // ISO
  wage_group: "over18" | "under18";
  planday_type: string;
};

export const PLANDAY_EMPLOYEES: SeedEmployee[] = [
  { first_name: "Aida", last_name: "Azizi", email: "aidaaziziaida@gmail.com", phone: "+4552506029", employee_number: "14354", hired_date: "2021-08-21", wage_group: "over18", planday_type: "BO18" },
  { first_name: "Alberte Sophie", last_name: "Mardahl", email: "Alberte.mardahl@gmail.com", phone: "+4553645158", employee_number: "25052", hired_date: "2025-03-01", wage_group: "under18", planday_type: "BU18" },
  { first_name: "Alina", last_name: "Nikitchuk", email: "alina.niki12@gmail.com", phone: "+4571611553", employee_number: "1186245", hired_date: null, wage_group: "over18", planday_type: "BO18" },
  { first_name: "Amalie", last_name: "Skau Gottlieb", email: "Amalie.gottlieb@icloud.com", phone: "+4542570015", employee_number: "15808", hired_date: "2026-07-14", wage_group: "over18", planday_type: "BO18" },
  { first_name: "Andrea Rasbech", last_name: "Jensen", email: "andrearasbech@icloud.com", phone: "+4593841387", employee_number: "16786", hired_date: "2026-03-01", wage_group: "under18", planday_type: "BU18" },
  { first_name: "Antonia", last_name: "Lindskov Hopmann", email: "Antonia@hopmann.dk", phone: "+4542223237", employee_number: "16292", hired_date: null, wage_group: "over18", planday_type: "BO18" },
  { first_name: "Astrid", last_name: "Sandholm Figgins", email: "astridfiggins2008@gmail.com", phone: "+4520755577", employee_number: "16868", hired_date: "2026-07-14", wage_group: "under18", planday_type: "BU18" },
  { first_name: "Axel", last_name: "Henrik Parkhøj", email: "axelhp2002@outlook.dk", phone: "+4561463966", employee_number: "25341", hired_date: "2026-07-01", wage_group: "over18", planday_type: "BO18" },
  { first_name: "Carolina Emilie", last_name: "Håkonsson", email: "Carolinahakonsson@icloud.com", phone: "+4527242277", employee_number: "27486", hired_date: "2025-03-20", wage_group: "over18", planday_type: "BO18" },
  { first_name: "Caroline Rose", last_name: "Gram", email: "carolinegram04@gmail.com", phone: "+4523245393", employee_number: "1201906", hired_date: null, wage_group: "over18", planday_type: "BO18" },
  { first_name: "David", last_name: "Bjerregaard Kressner", email: "david@kressner.dk", phone: "+4520820889", employee_number: "27097", hired_date: "2026-01-26", wage_group: "under18", planday_type: "BU18" },
  { first_name: "Ellen Engedal", last_name: "Kronborg", email: "ellenkron@protonmail.com", phone: "+4552505729", employee_number: "16562", hired_date: "2022-08-28", wage_group: "over18", planday_type: "BO18" },
  { first_name: "Emilie", last_name: "Bruun Kristiansen", email: "ebk1711@gmail.com", phone: "+4542330799", employee_number: "25428", hired_date: null, wage_group: "over18", planday_type: "BO18" },
  { first_name: "Emilie", last_name: "Ingeborg Vendelby Mikkelsen", email: "emilieingeborg@outlook.dk", phone: "+4522276218", employee_number: "16452", hired_date: "2025-01-03", wage_group: "under18", planday_type: "BU18" },
  { first_name: "Eva Elisabeth", last_name: "Philipsen", email: "evaphi2010@gmail.com", phone: "+4540953103", employee_number: "27074", hired_date: "2025-08-04", wage_group: "under18", planday_type: "BU18" },
  { first_name: "Frede", last_name: "Bruun Kristiansen", email: "fredebruunkristiansen@gmail.com", phone: "+4542259899", employee_number: "15436", hired_date: "2025-01-14", wage_group: "over18", planday_type: "BO18" },
  { first_name: "Frederikke", last_name: "Thorsager Andersen", email: "frederikkethandersen@gmail.com", phone: "+4581725103", employee_number: "16620", hired_date: "2021-10-18", wage_group: "over18", planday_type: "BO18" },
  { first_name: "Frida", last_name: "Jungløv", email: "Fridajungloev@gmail.com", phone: "+4551914919", employee_number: "15358", hired_date: "2022-01-13", wage_group: "over18", planday_type: "Butikschef" },
  { first_name: "Julie Marie", last_name: "Kierkegaard", email: "juli793u@gmail.com", phone: "+4560565715", employee_number: "15104", hired_date: "2025-10-26", wage_group: "over18", planday_type: "BO18" },
  { first_name: "Kajsa", last_name: "Hunter Gøtze", email: "kajsahgotze@gmail.com", phone: "+4551793982", employee_number: "16596", hired_date: "2026-07-01", wage_group: "under18", planday_type: "BU18" },
  { first_name: "Kamilla", last_name: "Adam Ali", email: "kamillaaali@icloud.com", phone: "+4542413932", employee_number: "25140", hired_date: "2026-06-22", wage_group: "over18", planday_type: "BO18" },
  { first_name: "Kartika", last_name: "Kira Sacopayo", email: "kartika3kss@live.dk", phone: "+4528769788", employee_number: "17004", hired_date: "2024-07-15", wage_group: "over18", planday_type: "BO18" },
  { first_name: "Laura", last_name: "Harborg Hermansen", email: "laurahermansen1@icloud.com", phone: "+4520907563", employee_number: "15610", hired_date: null, wage_group: "under18", planday_type: "BU18" },
  { first_name: "Mahmoud", last_name: "El-khatib", email: "mahmoud.e91@gmail.com", phone: null, employee_number: "12609", hired_date: null, wage_group: "over18", planday_type: "BO18" },
  { first_name: "Melissa", last_name: "Camur Hatem", email: "Camurmelissa715@gmail.com", phone: "+4542203786", employee_number: "1202447", hired_date: "2026-05-18", wage_group: "under18", planday_type: "BU18" },
  { first_name: "Molly Sofie", last_name: "Meirum", email: "mollysofiemei@gmail.com", phone: "+4530271882", employee_number: "16312", hired_date: "2026-06-01", wage_group: "over18", planday_type: "BO18" },
  { first_name: "Signe", last_name: "Jungløv", email: "signe.jungloev@gmail.com", phone: "+4530231569", employee_number: "16266", hired_date: null, wage_group: "over18", planday_type: "BO18" },
  { first_name: "Silja", last_name: "Vestergaard Kaasgaard", email: "siljavk@icloud.com", phone: "+4552408056", employee_number: "16492", hired_date: "2025-09-21", wage_group: "over18", planday_type: "BO18" },
  { first_name: "Siri", last_name: "Muff Iversen", email: "sirimuff@gmail.com", phone: "+4560558038", employee_number: "16196", hired_date: "2026-07-01", wage_group: "over18", planday_type: "BO18" },
  { first_name: "Sofia", last_name: "Rich", email: "soanrich@gmail.com", phone: "+4521293609", employee_number: "36738", hired_date: null, wage_group: "over18", planday_type: "BO18" },
  { first_name: "Sofie Sønderby", last_name: "Persson", email: "1234persson@gmail.com", phone: "+4542391059", employee_number: "26590", hired_date: "2026-03-01", wage_group: "over18", planday_type: "BO18 HVERDAGE" },
  { first_name: "Therese Rose", last_name: "Nilsson", email: "therese.r.nilsson@gmail.com", phone: "+4520421668", employee_number: "25530", hired_date: "2025-09-15", wage_group: "under18", planday_type: "BU18" },
];
