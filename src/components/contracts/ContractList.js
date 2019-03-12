import React from 'react';
import ContractSummary from './ContractSummary';

const ContractList = ({contracts}) => {
    if (contracts && contracts.length !== 0) {
        console.log('contracts ==> ', contracts.length);

        return (    
        <div className = "contract-list section">
            {
                contracts && contracts.map(contract => {
                    return (
                            <ContractSummary 
                                contract = {contract}
                                contract_id = {contract.id}
                                key = {contract.id}/> 
                    );  
                })
            }

        </div>
    );
    } else {
        console.log('VIDE!!!!!');   
        return <div className="section"><blockquote>Vous n'avez pas de contrats ...</blockquote></div>}
}
 export default ContractList;
 