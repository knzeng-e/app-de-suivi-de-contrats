import React from 'react';
import moment from 'moment';

const ContractSummary = ({contract}) => {
    
    const currentDate = moment(contract.createdAt.toDate()).calendar();
    //const validityDate = new Date (contract.validity.seconds * 1000).toLocaleDateString();
    const dateTab = contract.validity/*.split('/');*/
    return (
        <div className = "card blue-grey darken-1 z-depth-4 contract-summary">
                <div className = "card-content white-text">
                    <span className = "card-title">{contract.title}</span>

                    <p>____</p>
                    <p>Enregistré par {contract.authorFirstName} {contract.authorLastName} - {currentDate}</p>
                    <p>Fin de validité le {dateTab}</p>
                </div>
            </div>

    );
}

export default ContractSummary;