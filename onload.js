    // Function to send data to the server
    async function sendDataToServer() {
        const url = "https://paola1-api.hf.space/auto_entry/";
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "accept": "application/json",
              "Content-Type": "application/json"
            }
          });
       }
      // Send data when the page loads
      window.onload = sendDataToServer;