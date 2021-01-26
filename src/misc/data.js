export const CATEGORIES = [
    {'id':'other', name_fr:'Autre',name_nl:'Overige'},
    {'id':'covid', name_fr:'Covid-19',name_nl:'Covid-19'},
    {'id':'anatocism', name_fr:'Anatocisme',name_nl:'Anatocisme'},
]

export const YEARS = [
    2021,
    2020,
    2019,
    2018,
    2017,
    2016,
    2015,
    2014,
    2013,
    2012,
    2011,
    2010,
    2009,
    2008,
    2007,
    2006,
    2005,
    2004,
    2003,
    2002,
    2001,
    2000,
];

// Source : https://www.tribunaux-rechtbanken.be/nl/rechtbanken-en-hoven/hof-van-cassatie

export const COURTS = [
    {
        "label_fr": "Juridictions suprêmes",
        "label_nl": "Hooggerechtshoven",
        "list": [
            {"id": "GHCC", "name_fr": "Cour Constitutionnelle", "name_nl": "Grondwettelijk Hof", "def": false},
            {"id": "RSCE", "name_fr": "Conseil d'État", "name_nl": "Raad van State", "def": false},
            {"id": "CASS", "name_fr": "Cour de Cassation", "name_nl": "Hof van Cassatie", "def": false},
        ]
    }, {
        "label_fr": "Cour d'appel",
        "label_nl": "Hof van beroep",
        "list" : [
            {"id": "CABRL", "name_fr": "Cour d'appel de Bruxelles", "name_nl": "Hov van Beroep Brussel", "def": false},
            {"id": "CALIE", "name_fr": "Cour d'appel de Liège", "name_nl": "Hof van Beroep Luik", "def": "fr"},
            {"id": "CAMON", "name_fr": "Cour d'appel de Mons", "name_nl": "Hof van Beroep Bergen", "def": "fr"},
            {"id": "HBANT", "name_fr": "Cour d'appel d'Anvers", "name_nl": "Hof van Beroep Antwerpen", "def": "nl"},
            {"id": "HBGNT", "name_fr": "Cour d'appel de Gand", "name_nl": "Hof van Beroep Gent", "def": "nl"},
        ]
    }, {
        "label_fr": "Cour du travail",
        "label_nl": "Arbeidshof",
        "list" : [
            {"id": "CTBRL", "name_fr": "Cour du travail de Bruxelles", "name_nl": "Arbeidshof Brussel", "def": "nl"},
            {"id": "AHANT", "name_fr": "Cour du travail d'Anvers", "name_nl": "Arbeidshof Antwerpen", "def": "nl"},
            {"id": "AHGNT", "name_fr": "Cour du travail de Gand", "name_nl": "Arbeidshof Gent", "def": "nl"},
            {"id": "CTLIE", "name_fr": "Cour du travail de Liège", "name_nl": "Arbeidshof Luik", "def": "nl"},
            {"id": "CTMON", "name_fr": "Cour du travail de Mons", "name_nl": "Arbeidshof Bergen", "def": "nl"},
        ]
    }, {
        "label_fr": "tribunaux de première instance",
        "label_nl": "Rechtbank van eerste aanleg",
        "list" : [
            {"id": "EAANT", "name_fr": "Tribunal de première instance d'Anvers", "name_nl": "Rechtbank eerste aanleg Antwerpen"},
            {"id": "EAWVL", "name_fr": "Tribunal de première instance de Flandre Occidentale", "name_nl": ""},
            {"id": "EAOVL", "name_fr": "Tribunal de première instance de Flandre Orientale", "name_nl": ""},
            {"id": "EALIM", "name_fr": "Tribunal de première instance du Limbourg", "name_nl": ""},
            {"id": "EALEU", "name_fr": "Tribunal de première instance de Louvain", "name_nl": ""},
            {"id": "EABRL", "name_fr": "Tribunal de première instance néerlandophone de Bruxelles", "name_nl": ""},
            {"id": "PIBRL", "name_fr": "Tribunal de première instance francophone de Bruxelles", "name_nl": ""},
            {"id": "PIHAI", "name_fr": "Tribunal de première instance du Hainaut", "name_nl": ""},
            {"id": "PINAM", "name_fr": "Tribunal de première instance de Namur", "name_nl": ""},
            {"id": "PIEUP", "name_fr": "Tribunal de première instance d'Eupen", "name_nl": ""},
            {"id": "PILIE", "name_fr": "Tribunal de première instance de Liège", "name_nl": ""},
            {"id": "PILUX", "name_fr": "Tribunal de première instance du Luxembourg", "name_nl": ""},
            {"id": "PIBRW", "name_fr": "Tribunal de première instance du Brabant Wallon", "name_nl": ""},
        ]
    }, {
        "label_fr": "Tribunal du travail",
        "label_nl": "Arbeidsrechtbank",
        "list" : [
            {"id": "ARANT", "name_fr": "Tribunal du travail d'Anvers", "name_nl": ""},
            {"id": "ARGNT", "name_fr": "Tribunal du travail de Gand", "name_nl": ""},
            {"id": "ARLEU", "name_fr": "Tribunal du travail de Louvain", "name_nl": ""},
            {"id": "ARBRL", "name_fr": "Tribunal du travail néerlandophone de Bruxelles", "name_nl": ""},
            {"id": "TTBRL", "name_fr": "Tribunal du travail francophone de Bruxelles", "name_nl": ""},
            {"id": "TTHAI", "name_fr": "Tribunal du travail du Hainaut", "name_nl": ""},
            {"id": "TTLIE", "name_fr": "Tribunal du travail de Liège", "name_nl": ""},
            {"id": "TTBRW", "name_fr": "Tribunal du travail du Brabant Wallon", "name_nl": ""},
            {"id": "TREUP", "name_fr": "Tribunal du travail d'Eupen", "name_nl": ""},
        ]
    }, {
        "label_fr": "Tribunal de l'entreprise",
        "label_nl": "Ondernemingsrechtbank",
        "list" : [
            {"id": "ORANT", "name_fr": "Tribunal de l'entreprise d'Anvers", "name_nl": "Ondernemingsrechtbank Antwerpen"},
            {"id": "ORGNT", "name_fr": "Tribunal de l'entreprise de Gand", "name_nl": ""},
            {"id": "ORBRL", "name_fr": "Tribunal de l'entreprise néerlandophone de Bruxelles", "name_nl": ""},
            {"id": "ORLEU", "name_fr": "Tribunal de l'entreprise de Louvain", "name_nl": ""},
            {"id": "TEBRL", "name_fr": "Tribunal de l'entreprise francophone de Bruxelles ", "name_nl": ""},
            {"id": "TELIE", "name_fr": "Tribunal de l'entreprise de Liège", "name_nl": ""},
            {"id": "TEBRW", "name_fr": "Tribunal de l'entreprise du Brabant Wallon ", "name_nl": ""},
            {"id": "TEHAI", "name_fr": "Tribunal de l'entreprise du Hainaut", "name_nl": ""},
            {"id": "TEEUP", "name_fr": "Tribunal de l'entreprise d'Eupen", "name_nl": ""},
        ]
    }, {
        "label_fr": "Tribunal de police",
        "label_nl": "Politierechtbank",
        "list" : [
            {"id": "PRANT", "name_fr": "Tribunal de police d'Anvers", "name_nl": "Politierechtbank Antwerpen"},
            {"id": "PRWVL", "name_fr": "Tribunal de police de Flandre Occidentale", "name_nl": "Politierechtbank West-Vlaanderen"},
            {"id": "PROVL", "name_fr": "Tribunal de police de Flandre Orientale", "name_nl": "Politierechtbank Oost-Vlaanderen"},
            {"id": "PRLIM", "name_fr": "Tribunal de police du Limbourg", "name_nl": "Politierechtbank Limburg"},
            {"id": "PRLEU", "name_fr": "Tribunal de police de Louvain", "name_nl": "Politierechtbank Leuven"},
            {"id": "PRHAL", "name_fr": "Tribunal de police de Halle", "name_nl": "Politierechtbank Halle"},
            {"id": "PRVIL", "name_fr": "Tribunal de police de Vilvoorde", "name_nl": "Politierechtbank Vilvoorde"},
            {"id": "PRBRL", "name_fr": "Tribunal de police néerlandophone de Bruxelles", "name_nl": "Nederlandstalige politierechtbank Brussel"},
            {"id": "TPBRL", "name_fr": "Tribunal de police francophone de Bruxelles", "name_nl": "Franstalige politierechtbank Brussel"},
            {"id": "TPHAI", "name_fr": "Tribunal de police du Hainaut", "name_nl": "Politierechtbank Henegouwen"},
            {"id": "TPNAM", "name_fr": "Tribunal de police de Namur", "name_nl": "Politierechtbank Namen"},
            {"id": "TPLIE", "name_fr": "Tribunal de police de l'arrondissement de Liège", "name_nl": "Politierechtbank Luik"},
            {"id": "TPEUP", "name_fr": "Tribunal de police d'Eupen", "name_nl": "Politierechtbank Eupen"},
            {"id": "TPLUX", "name_fr": "Tribunal de police du Luxembourg", "name_nl": "Politierechtbank Luxemburg"},
            {"id": "TPBRW", "name_fr": "Tribunal de police du Brabant Wallon", "name_nl": "Politierechtbank Waals Brabant"},
        ]
    }, {
        "label_fr": "Justice de paix",
        "label_nl": "Vredegerecht",
        "list" : [
            {"id": "VGANT", "name_fr": "Anvers", "name_nl": "Antwerpen"},
            {"id": "VGWVL", "name_fr": "Flandre Occidentale", "name_nl": "West-Vlaanderen"},
            {"id": "VGOVL", "name_fr": "Flandre Orientale", "name_nl": "Oost-Vlaanderen"},
            {"id": "VGLIM", "name_fr": "Limbourg", "name_nl": "Limburg"},
            {"id": "VGLEU", "name_fr": "Louvain", "name_nl": "Leuven"},
            {"id": "VGBRL", "name_fr": "Bruxelles - néerlandophone", "name_nl": "Brussel - Nederlandstalig"},
            {"id": "JPBRL", "name_fr": "Bruxelles - francophone", "name_nl": "Brussel - Franstalig"},
            {"id": "JPHAI", "name_fr": "Hainaut", "name_nl": "Henegouwen"},
            {"id": "JPNAM", "name_fr": "Namur", "name_nl": "Namen"},
            {"id": "JPLIE", "name_fr": "Liège", "name_nl": "Luik"},
            {"id": "JPEUP", "name_fr": "Eupen", "name_nl": "Eupen"},
            {"id": "JPLUX", "name_fr": "Luxembourg", "name_nl": "Luxemburg"},
            {"id": "JPBRW", "name_fr": "Brabant Wallon", "name_nl": "Waals Brabant"},
        ]
    }, {
        "label_fr": "Divers",
        "label_nl": "Verschillende",
        "list" : [
            {"id": "NTRCND", "name_fr": "Conseil national de discipline ", "name_nl": ""},
            {"id": "GBAPE", "name_fr": "Autorité de protection des données ", "name_nl": ""},
            {"id": "COPRIV", "name_fr": "Commission pour la Protection de la Vie privée", "name_nl": ""},
            {"id": "COHSAV", "name_fr": "Commission pour l'aide financière aux victimes d'actes intentionnels de violence et aux sauveteurs occasionnels", "name_nl": ""},
            {"id": "COVHDP", "name_fr": "Commission d'indemnisation de la détention préventive inopérante", "name_nl": ""},
            {"id": "XXXXX", "name_fr": "Non répertorié", "name_nl": "Niet vermeld"},
            {"id": "?????", "name_fr": "Ne sait pas", "name_nl": "Weet het niet"},
        ]
    },
]
