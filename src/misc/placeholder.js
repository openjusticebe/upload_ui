const placeholders = {
    'organization' : [
        'Acme Inc.',
        'Camion Int.',
        'Business Pro',
        'Conseil et Fils',
        'Morgen en Zoon',
        'Evel&CO',
        'Fly Air',
        'Zv. Inc.',
    ],
    'place': [
        'Beleriand',
        'Eriador',
        'Rhûn',
        'Harad',
        'Ered Luin',
        'Fangorn',
        'Gondor',
        'Isengard',
        'Mordor',
        'Rohan',
        'Amon Hen',
        'Bruinen',
        'Baranduin',
        'Erebor',
    ],
    'country': [
        'Agamar',
        'Akiva',
        'Alderaan',
        'Ando',
        'Corellia',
        'Crait',
        'Hoth',
        'Sullust',
        'Teht',
        'Zeffo',
        'Yavin',
        'Eriadu',
        'Exegol',
        'Florrum',
        'Fondor',
    ],
    'person': [
        'A. Lydan',
        'B. Syrin',
        'C. Ptorik',
        'D. Joz',
        'E. Varog',
        'F. Gethrod',
        'G. Hezra',
        'H. Feron',
        'I. Ophni',
        'J. Colborn',
        'K. Fintis',
        'L. Gatlin',
        'M. Jinto',
        'N. Hagalbar',
        'O. Krinn',
        'P. Lenox',
        'K. Revvyn',
        'R. Hodus',
        'S. Dimian',
        'T. Paskel',
        'U. Kontas',
        'V. Weston',
        'W. Azamarr',
        'X. Jather',
        'Y. Tekren',
        'Z. Jareth',
        'A. Adon',
        'B. Zaden',
        'C. Eune',
        'D. Graff',
        'E. Tez',
        'F. Jessop',
        'G. Gunnar',
        'H. Pike',
        'I. Domnhar',
        'J. Baske',
        'K. Jerrick',
        'L. Mavrek',
        'M. Riordan',
        'N. Wulfe',
        'O. Straus',
        'P. Tyvrik',
        'K. Henndar',
        'R. Favroe',
        'S. Whit',
        'T. Jaris',
        'U. Renham',
        'V. Kagran',
        'W. Lassrin',
        'X. Vadim',
        'Y. Arlo',
        'Z. Quintis',
        'A. Vale',
        'B. Caelan',
        'C. Yorjan',
        'D. Khron',
        'E. Ishmael',
        'F. Jakrin',
        'G. Fangar',
        'H. Roux',
        'I. Baxar',
        'J. Hawke',
        'K. Gatlen',
        'L. Barak',
        'M. Nazim',
        'N. Kadric',
        'O. Paquin',
        'P. Kent',
        'K. Moki',
        'R. Rankar',
        'S. Lothe',
        'T. Ryven',
        'U. Clawsen',
        'V. Pakker',
        'W. Embre',
        'X. Cassian',
        'Y. Verssek',
        'Z. Dagfinn',
        'O. Ebraheim',
        'P. Nesso',
        'K. Eldermar',
        'R. Rivik',
        'S. Rourke',
        'T. Barton',
        'U. Hemm',
        'V. Sarkin',
        'W. Blaiz',
        'X. Talon',
        'Y. Agro',
        'Z. Zagaroth',
        'A. Turrek',
        'B. Esdel',
        'C. Lustros',
        'D. Zenner',
        'E. Baashar',
        'F. Dagrod',
        'G. Gentar',
        'H. Feston',
    ]
}

const PlaceholderManager = {
    store: {},
    list: {},
    get: function(type, id) {
        if (id in this.store)
            return this.store[id];

        var len = type in this.list
            ? this.list[type] + 1
            : 1;

        this.list[type] = len;

        this.store[id] = `${type}_${len}`;
        // this.store[id] = placeholders[type][Math.floor(Math.random() * len)];
        return this.store[id];
    },
    types: function() {
        return Object.keys(placeholders);
    }
    
}

export default PlaceholderManager
