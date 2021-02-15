import React from "react";
import { Link } from "gatsby"

const DocList = ({list}) => (
    <table className="table table-bordered table-hover table-sm">
        <thead className="thead-dark">
        <tr>
            <th className="col" style={{width:'20%'}}>Id</th>
            <th className="col">Ecli</th>
        </tr>
        </thead>
        <tbody>
        { list.map((item) => (
            <tr key={ item.id }>
                <td>
                    <Link to={"/admin/edit/" + item.id}>
                        <i className="icon-pencil pr-2" />
                        { item.id }
                    </Link>
                </td>
                <td>{ item.ecli }</td>
            </tr>
        ))}
        </tbody>
    </table>
)

export default DocList;
