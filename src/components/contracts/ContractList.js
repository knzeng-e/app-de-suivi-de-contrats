import React from 'react';
import ContractSummary from './ContractSummary';
import { Link } from 'react-router-dom';

const ContractList = ({contracts}) => {
    return (
        <div className = "contract-list section">
            {
                contracts && contracts.map(contract => {
                    return (
                        <Link to = {'/contract/' +  contract.id} key = {contract.id}>
                            <ContractSummary contract = {contract} />
                        </Link>
                    );
                    
                })
            }

        </div>
    );
}
 export default ContractList;
 