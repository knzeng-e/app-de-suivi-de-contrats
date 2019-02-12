import React from 'react';

const ContractSummary = ({contract}) => {
    return (
        <div className = "card z-depth-4 contract-summary">
                <div className = "card-content grey-text text-darken-3">
                    <span className = "card-title">{contract.title}</span>

                    <p>____</p>
                    <p>Enregistré par {contract.authorFistName}</p>
                </div>
            </div>

    );
}

export default ContractSummary;