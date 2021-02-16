import React from "react";
import { Link } from "gatsby"
import LoadGif from '../../images/hourglass.gif';

const options = {year:'2-digit', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit', second:undefined}
const disp_date = (date) => {
    if (date == undefined)
        return '';
    const r = new Date(date);
    return r.toLocaleString('fr', options);

};

const DocList = ({list}) => (
    <table className="table table-bordered table-hover table-sm">
        <thead className="thead-dark">
        <tr>
            <th className="col" style={{width:'10%'}}>Id</th>
            <th className="col" style={{width:'50%'}}>Ecli</th>
            <th className="col" style={{width:'20%'}}>Création</th>
            <th className="col" style={{width:'20%'}}>Modification</th>
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
                <td className="text-muted">{ disp_date(item.date_created) }</td>
                <td className="text-muted">{ disp_date(item.date_updated) }</td>
            </tr>
        ))}
        </tbody>
        { list.length == 0 &&
        <tr>
            <td colspan="4" className="bg-secondary">
                <center><img className="loadgif" src={LoadGif} alt="loading" /></center>
            </td>
        </tr>
        }
    </table>
)

export default DocList;
