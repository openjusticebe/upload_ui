const parseText = (entities, raw) => {
    console.log('Render text', entities);
    for (let e_key in entities) {
        let e = entities[e_key];
        e.text.forEach( w => {
            let re = new RegExp(w, "gi");
            raw = raw
                // .replaceAll(/`qu'(?=${w})`/g, 'que ')
                // .replaceAll(`d'(?=${w})`, 'de ')
                .replace(re, `[ ${e.placeholder} ]`);
            });
    }
    return raw;
}


export default parseText;
