

  async sendPostRequest(generatetoken, firstName, lastName, Addressline1, Addressline2) {
    const randomString = this.generateAlphanumeric(3);
    const url = "https://staging.tvs.autovertplug.com/loan/create";

    const ordernumber = "b26dae9845c0461f9bf396572ebdfc22-26" + randomString;
    console.log("GeneratedOrderNumber:", ordernumber);

    const postData = {
      order_number: "b26dae9845c0461f9bf396572ebdfc22-26"+ randomString,
      dob: "2024-07-23",
      sku: "N6192690NH",
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
      dealer_code: "14574",
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
      "x-api-key": generatetoken,
      "Authorization": "Basic OWYzZmMwYmQ1Zjg5NDdjYjgxMmQwYTlkNGI3MjhkOTI3ZDM0OmRlMjRmZTQwMDk5NjE5YzY1OTlkMTU3N2VjODFjNjdkZmVhMw==",
    };

    try {
      const response = await axios.post(url, postData, { headers });
      console.log("POST Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("POST Request failed:", error.response?.status, error.response?.data || error.message);
      throw error;
    }
  }