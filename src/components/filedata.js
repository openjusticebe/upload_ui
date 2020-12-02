
import React from "react";

export default ({ degraded, meta }) => {

    return (
        <div className="row justify-content-center">
            <div className="col-8">
                <div>
                    { degraded &&
                    <div>
                        <p className="bg-warning text-dark">PDF Image détecté : le traitement prendra plus de temps,
                        le résultat peut en être dégradé</p>
                    </div>
                    }
                    { meta &&
                    <div>
                        <dl>
                            <dd>Caractères / Tekens</dd>
                            <dt>{ meta.charstotal || '0' }</dt>
                            <dd>Pages / Paginas</dd>
                            <dt>{ meta.pages || '0' }</dt>
                            <dd>Langue / Taal</dd>
                            <dt>{ meta.language || '0' }</dt>
                        </dl>
                    </div>
                    }
                </div>
            </div>
        </div>
        )
}
