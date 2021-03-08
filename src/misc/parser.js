const parseText = (entities, raw) => {
    for (let e_key in entities) {
        let e = entities[e_key];
        for (let index = 0; index < e.text.length; index++) {
            let re = new RegExp(e.text[index], "gi");
            raw = raw
                // .replaceAll(/`qu'(?=${w})`/g, 'que ')
                // .replaceAll(`d'(?=${w})`, 'de ')
                .replace(re, `[ ${e.placeholder} ]`);
        }
        //e.text.forEach( w => {
        //    raw = raw
        //        // .replaceAll(/`qu'(?=${w})`/g, 'que ')
        //        // .replaceAll(`d'(?=${w})`, 'de ')
        //        .replace(re, `[ ${e.placeholder} ]`);
        //    });
    }

    // Add new page indicator
    raw = raw.replace(/\f([^\n]*)/, '--- $1 ---');
    return raw;
}


export default parseText;
