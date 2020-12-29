import React from "react";

export default ({ degraded, meta, state }) => {

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
                    <div className="row">
                        <div className="col-6 text-muted text-log">
                            <ol>
                            { state && state.map( st  => (
                                <li>{ st }</li>
                            ))}
                            </ol>
                        </div>
                        <div className="col-6">
                        { meta &&
                            <dl>
                                <dd>Caractères / Tekens</dd>
                                <dt>{ meta.charstotal || '0' }</dt>
                                <dd>Pages / Paginas</dd>
                                <dt>{ meta.pages || '0' }</dt>
                                <dd>Langue / Taal</dd>
                                <dt>{ meta.language || '0' }</dt>
                            </dl>
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
}
