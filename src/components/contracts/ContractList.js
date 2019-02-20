import React from 'react';
import ContractSummary from './ContractSummary';

const ContractList = ({contracts}) => {
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
}
 export default ContractList;
 