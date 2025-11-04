const { expect, browser } = require('@wdio/globals');
const ApiResponses = require('../pageobjects/ApiResponses.js');

describe('TVSM URL Generate', () => {
    it('URL Generate through API Responses', async () => {
        var alphanumeric = ApiResponses.generateAlphanumeric(5);
        console.log("AlphanumericString:", alphanumeric);
        
    var generateToken = await ApiResponses.httpGetToken();
    await browser.pause(3000);
    console.log("GenerateToken:", generateToken);
        try {
            console.log('Calling sendPostRequest...');
            var postResponse = await ApiResponses.sendPostRequest(
                generateToken,
                "TestFirstName",
                "TestLastName",
                "Test Address Line 1",
                "Test Address Line 2"
            );
            console.log("TVSMPOSTResponse:", postResponse.data.application_link);
        } catch (err) {
            console.error('Error from sendPostRequest:', err && (err.response?.data || err.message || err));
            throw err; 
        } 
        
               
                let tvsUrl = postResponse.data.application_link;
                console.log("TVSURL:", tvsUrl);
                await browser.url(tvsUrl);
                await browser.pause(5000);
                let browserurl = await browser.getUrl();
                console.log("Browser URL:", browserurl);
                expect(browserurl).toBe(tvsUrl);
    });
});
