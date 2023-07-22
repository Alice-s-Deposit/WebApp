import React from 'react';

export const InfoList = () => {
  return (
    <div className="info-list">
      <ul>
        <li><b>Step 1</b>: Generate <b>ETH burner address</b><br></br>It's saved en encrypted localy with your password.</li>
        <li>⚠️<b>WARNING: COPY AND SAVE THE PUBLIC & PRIVATE KEY</b></li>
        <li><b>Step 2</b>: Generate a shielded address, <b>zkBOB address</b></li>
        <li>⚠️<b>WARNING: IMPERATIVELY COPY THE MNEMONIC SEED</b></li>
        <li><b>Step 3</b>: Send funds to burner address (ETH only)</li>
        <li>⚠️<b>WARNING: do not connect the address to an RPC that is not yours or that is not routed.</b></li>
        <li><b>Step 4</b>: Direct deposit</li>
        <li><b>Step 5: to withdraw your funds go on zkBob platform and import a zkAccount : past the generated mnemonic.</b></li>
      </ul>
    </div>
  );
};

