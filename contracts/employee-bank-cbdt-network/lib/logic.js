/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {emp.bank.cbdt.network.AccountTransfer} accountTransfer
 * @transaction
 */
async function accountTransfer(tx) {

if(tx.to.owner.category == 'A'){
   tx.cbdt.value += tx.newValue * 1/10;
   tx.to.value += tx.newValue * 9/10;
}

if(tx.to.owner.category == 'B'){
   tx.cbdt.value += tx.newValue * 2/10;
   tx.to.value += tx.newValue * 8/10;

}

 tx.from.value -= tx.newValue;

 return getAssetRegistry('emp.bank.cbdt.network.Account')
   .then (function (assetRegistry) {
   return assetRegistry.update(tx.from);
})
   .then (function () {
   return getAssetRegistry('emp.bank.cbdt.network.Account');
})
   .then (function (assetRegistry) {
   return assetRegistry.update(tx.to);
})
 .then (function () {
   return getAssetRegistry('emp.bank.cbdt.network.Account');
})
 
 .then (function (assetRegistry) {
   return assetRegistry.update(tx.cbdt);
})
 .then (function () {
   return getAssetRegistry('emp.bank.cbdt.network.Account');
})
 .then (function (assetRegistry) {
   return assetRegistry.update(tx.bank);
});


    // Save the old value of the asset.
    const oldValue = tx.asset.value;

    // Update the asset with the new value.
    tx.asset.value = tx.newValue;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('emp.bank.cbdt.network.Account');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.asset);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('emp.bank.cbdt.network', 'SampleEvent');
    event.asset = tx.asset;
    event.oldValue = oldValue;
    event.newValue = tx.newValue;
    emit(event);
}
