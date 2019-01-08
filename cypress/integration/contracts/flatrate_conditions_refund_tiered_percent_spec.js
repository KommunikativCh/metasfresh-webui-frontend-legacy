/// <reference types="Cypress" />

import { createAndCompleteTransition, createAndCompleteRefundPercentConditions } from '../../support/utils/contract';
import { BPartner, BPartnerLocation } from '../../support/utils/bpartner';
import { DiscountSchema, DiscountBreak } from '../../support/utils/discountschema';

describe('Create tiered percent-based refund conditions', function() {
    before(function() {
        // login before each test and open the flatrate conditions window
        cy.loginByForm();
    });
    
    it('Create tiered percent-based refund conditions and a vendor with a respective contract', function () {
        const timestamp = new Date().getTime(); // used in the document names, for ordering

        const transitionName = `${timestamp} tiered percent-based refund conditions (Cypress Test)`;
        createAndCompleteTransition(transitionName, null, null);
        cy.screenshot()

        const conditionsName = `${timestamp} tiered percent-based refund conditions (Cypress Test)`;
        createAndCompleteRefundPercentConditions(conditionsName, transitionName, 'T'/*Tiered / Gestaffelte Rückvergütung*/);
        cy.screenshot()

        const discountSchemaName = `${timestamp} accumulated amount-based refund conditions (Cypress Test)`;
        new DiscountSchema
            .builder(discountSchemaName)
            .addDiscountBreak(new DiscountBreak
                .builder()
                .setBreakValue(0)
                .setBreakDiscount(0)
                .build())
            .build()
            .apply()
        cy.screenshot()

        const bPartnerName = `t5 tiered percent-based refund conditions ${timestamp}`;
        new BPartner
            .builder(bPartnerName)
            .setVendor(true)
            .setVendorDiscountSchema(discountSchemaName)
            .addLocation(new BPartnerLocation
                .builder('Address1')
                .setCity('Cologne')
                .setCountry('Deutschland')
                .build())
            .build()
            .apply()

        cy.executeHeaderAction('C_Flatrate_Term_Create_For_BPartners')
            .selectInListField('C_Flatrate_Conditions_ID', conditionsName, conditionsName)
            .writeIntoStringField('StartDate', '01/01/2019{enter}')
            .pressStartButton();
        cy.screenshot()
    });
});
