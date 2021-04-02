const placeholders = {
    'email': [],
    'RN': [],
    'IBAN': [],
    'company': [],
    'phonenumber': [],
    'organization' : [
    ],
    'place': [
    ],
    'country': [
    ],
    'person': [
    ],
    'address' : [
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
        return this.store[id];
    },
    types: function() {
        return Object.keys(placeholders);
    }
    
}

export default PlaceholderManager
