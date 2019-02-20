import React from 'react';
//import moment from 'moment';
import { Link } from 'react-router-dom';


const ContractSummary = ({contract, contract_id}) => {

    //const currentDate = moment(contract.createdAt.toDate()).calendar();
    //const validityDate = new Date (contract.validity.seconds * 1000).toLocaleDateString();
    const dateTab = contract.validity/*.split('/');*/
    let badge_caption;
    const looking = () => {
        
         if (contract.colorStatus === 'green'){
            //badge_caption = '[ + de 6 mois ]';
            badge_caption = dateTab ;
            return "new badge green darken-2 z-depth-4";
         }
            //return "card green darken-2 z-depth-4 contract-summary";
        if (contract.colorStatus === 'orange') {
            //badge_caption = '[ - de 6 mois ]';
            badge_caption = dateTab ;
            return "new badge orange darken-1 z-depth-4";
        }
            //return "card orange darken-2 z-depth-4 contract-summary";
        if (contract.colorStatus === 'red') {
            //badge_caption = '[ - de 3 mois ]';
            badge_caption = dateTab ;
            return "new badge red darken-4 z-depth-4";
        }
            //return "card red darken-4 z-depth-4 contract-summary";
        if (contract.colorStatus === 'black') {
            badge_caption = 'contrat expiré';
            return "new badge black z-depth-4";
        }
            //return "card black z-depth-4 contract-summary";
    }
    
    return (
    <ul className="collapsible">
        <li>
            <Link to = {'/contract/' +  contract_id}>
                <div className="collapsible-header hoverable">
                  <i className="material-icons">layers</i>
                    {contract.title}
                    <span className = {looking()} data-badge-caption= {badge_caption}></span>
                </div>
            </Link>
            <div className="collapsible-body"> 
            </div>
        </li>
    </ul>
    );
}

export default ContractSummary;