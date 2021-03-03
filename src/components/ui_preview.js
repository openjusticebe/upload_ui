import React, { useState, useEffect} from "react";
import {
  useQueryParams,
  StringParam,
  NumberParam,
  ArrayParam,
  withDefault,
} from 'use-query-params';

const PreviewUi = ()  => {
    // const link = `${process.env.GATSBY_DATA_API}/hash/${hash}`
    // const [link, setLink] = useQueryParam("hash", StringParam);
    const [query, setQuery] = useQueryParams({
      hash: StringParam,
    });
    const { hash: hash} = query;

    return (
        <div className="col-12 mb-5 shadow rounded border py-3 my-3">
            <p>Lien personnel / Persoonlijke link :<br />
                <a href={ `${process.env.GATSBY_DATA_API}/hash/${hash}` } rel="no-follow">
                    { `${process.env.GATSBY_DATA_API}/hash/${hash}` }
                </a>
            </p>

            <p>Fichier PDF / PDF Bestand :<br />
                <a href={ `${process.env.GATSBY_DATA_API}/d/pdf/${hash}` } rel="no-follow">
                    { `${process.env.GATSBY_DATA_API}/d/pdf/${hash}` }
                </a>
            </p>
        </div>
    )
}

export default PreviewUi
