import React from 'react';
import moment from 'moment';

const ContractSummary = ({contract}) => {
    
    const currentDate = moment(contract.createdAt.toDate()).calendar();
    return (
        <div className = "card z-depth-4 contract-summary">
                <div className = "card-content grey-text text-darken-3">
                    <span className = "card-title">{contract.title}</span>

                    <p>____</p>
                    <p>Enregistré par {contract.authorFirstName} {contract.authorLastName} - {currentDate}</p>
                </div>
            </div>

    );
}

export default ContractSummary;