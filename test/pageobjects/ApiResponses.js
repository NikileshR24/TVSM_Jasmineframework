const axios = require('axios');
class ApiResponses {
  static generateAlphanumeric(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  static async httpGetToken() {
    const address = "https://6yjguiuy68.execute-api.ap-south-1.amazonaws.com/dev/client/generate-token";
    try {
      const response = await axios.get(address);
      console.log("Response Data:", response.data);
      // Return only the token string (response.data.data) if present,
      // otherwise fall back to the full response.data
      return (response && response.data && response.data.data) ? response.data.data : response.data;
    } catch (error) {
      console.error("GET Request failed:", error.message);
      throw error;
    }
  }

  

 static async sendPostRequest(generatetoken, firstName, lastName, Addressline1, Addressline2) {
    const randomString = this.generateAlphanumeric(3);
    // NOTE: choose the correct environment URL for the token/auth you obtained
    const url = "https://staging.tvs.autovertplug.com/loan/create";
    // const url = "https://tvs.autovertplug.com/loan/create";

    // Normalize token: httpGetToken may return an object or the raw token string
    let token = generatetoken;
    try {
      if (generatetoken && typeof generatetoken === 'object') {
        // common shape: { statusCode, message, data: '<token>' }
        token = generatetoken.data || generatetoken.token || generatetoken;
      }
    } catch (e) {
      token = generatetoken;
    }
    // Masked debug info (don't print whole token in CI logs)
    try {
      if (typeof token === 'string') {
        console.log('Using token length=' + token.length + ' tokenPreview=' + token.slice(0,6) + '...' + token.slice(-6));
      } else {
        console.log('Using token of type:', typeof token, token);
      }
    } catch (e) {
      console.log('Token debug error', e && e.message);
    }

    const postData = {
      order_number: "b26dae9845c0461f9bf396572ebdfc22-26"+ randomString,
      dob: "2024-07-23",
      sku: "K41903605D",
      city: "Bengaluru",
      color: "Black",
      email: "test3@gmail.com",
      phone: "9360891398",
      pincode: "560018",
      discount: "0",
      landmark: "test AddressLandMark",
      order_id: "b26dae9845c0461f9bf396572ebdfc21-24-2",
      road_tax: "10771.8030000000",
      last_name: lastName,
      first_name: firstName,
      Accessories: [
        {
          accessory_sku: "string",
          accessory_name: "string",
          accessory_price: "0"
        }
      ],
      dealer_code: "11568",
      fame_subsidy: "0",
      advance_value: 0,
      charger_price: "0",
      on_road_price: "102223.8030000000",
      pricing_notes: "string",
      sales_channel: "string",
      state_subsidy: "0",
      address_line_1: Addressline1,
      address_line_2: Addressline2,
      address_line_3: Addressline2,
      smart_card_fee: "137.0000000000",
      application_for: "PERSONAL",
      should_redirect: false,
      application_type: "LOAN",
      ex_showroom_price: "80991",
      non_vehicle_amount: 0,
      advance_description: "string",
      rto_registration_fee: "300.0000000000",
      addon_insurance_price: "0",
      comprehensive_insurance_price: "0"
    };

    const headers = {
      "Content-Type": "application/json",
      
      "x-api-key": token,
      "X-Api-Key": token,
       //UAT Auth key
       "Authorization":"Basic dHZzdWF0YmNiNzdmMzM1M2VlMzU5ZWY0ZTI1OWUyOGZiMzBhOjdiNTBhOTlmYzY1ZTM5MzFjZDhhMzc5MWIxZTBhNzVjMGYzYQ=="
       //Prod Auth Key
      // "Authorization": "Basic OWYzZmMwYmQ1Zjg5NDdjYjgxMmQwYTlkNGI3MjhkOTI3ZDM0OmRlMjRmZTQwMDk5NjE5YzY1OTlkMTU3N2VjODFjNjdkZmVhMw==",
    };

    try {
      console.log('URL', url);
      const response = await axios.post(url, postData, { headers });
      console.log("POSTResponse:", response.data);
      return response.data;
    } catch (error) {
      console.error("POST Request failed:", error.response?.status, error.response?.data || error.message);
      throw error;
    }
  }

}

module.exports = ApiResponses;
