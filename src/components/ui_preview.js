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
            <p>Lien personnel / Persoonlijke link :</p>
            <a href={ `${process.env.GATSBY_DATA_API}/hash/${hash}` } rel="no-follow">
                { `${process.env.GATSBY_DATA_API}/hash/${hash}` }
            </a>

            <p>Fichier PDF / PDF Bestand</p>
            <a href={ `${process.env.GATSBY_DATA_API}/d/pdf/${hash}` } rel="no-follow">
                { `${process.env.GATSBY_DATA_API}/d/pdf/${hash}` }
            </a>
        </div>
    )
}

export default PreviewUi
