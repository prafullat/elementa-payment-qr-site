var merchant_name = 'Elementa Phase 1 CHS Festival';
var merchant_upi = 'elementap1@srcb'

function generateQRCode () {
    const urlParams = new URLSearchParams(window.location.search);
    var volunteer = urlParams.get('volunteer');
    if (!volunteer)  {
        volunteer = 0
    }

    var qrcodeDiv = document.getElementById("qrcode");
    qrcodeDiv.innerHTML = '';
    var qrcode = new QRCode(qrcodeDiv, {
        width : 250,
        height : 250
    });
    
    var amount = document.getElementById("amount");
    var name = document.getElementById("name");

    var flat_dropdown = document.getElementById("flat");
    var flat = flat_dropdown.options[flat_dropdown.selectedIndex].value;

    var building_dropdown = document.getElementById("building");
    var building = building_dropdown.options[building_dropdown.selectedIndex].value;
   
    var upi_dropdown = document.getElementById("upi");
    merchant_upi = upi_dropdown.options[upi_dropdown.selectedIndex].value
   
    const namesArray = name.value.split(" ");
    var context=`F_${building}-${flat}-${namesArray[0]}`;
    console.log(context)
    if (!(/^\d{3,4}$/.test(flat))) {
        alert("Input correct flat number with 3 or 4 digits")
        flat_dropdown.focus();
        return;
    }

    if (building_dropdown.selectedIndex == 0) {
        alert("Input building")
        building_dropdown.focus()
        return
    }
    if (!name.value) {
        alert("Input name");
        name.focus();
        return;
    }
    if (!amount.value) {
        alert("Input amount");
        amount.focus();
        return;
    }
    if (flat_dropdown.selectedIndex == 0) {
        alert("Input a flat number");
        flat_dropdown.focus();
        return;
    }
    
    var textVal = 'upi://pay?pn='+ merchant_name + '&pa='+ merchant_upi + '&am='+ amount.value + '&tn=' + context;
    var textValForLink = 'upi://pay?pn='+ encodeURIComponent(merchant_name) + '&pa='+ merchant_upi + '&am='+ amount.value + '&tn=' + context;
    console.log(textVal);
    qrcode.makeCode(textVal);
    var message = document.getElementById("message")
    message.innerHTML = `Please pay using following UPI QR code: <br><br> Name : ${name.value}<br> Flat : ${building}-${flat}<br><br>`
    
    var reloadButton = document.getElementById("reloadbutton")
    var paytmtconfirmation = document.getElementById("paymentconfirm")
    var qrbutton = document.getElementById("qrbutton")
    
    if (volunteer == 1) {
        paytmtconfirmation.innerHTML = `<label class="custom-checkbox">
        <input type="checkbox" id="paymentconfirmcheckbox" class="bigger-checkbox">
        Is the payment through QR code succcessful? (Volunteers, Please check this and click Save and reload.)
        </label>
    <br>
    `
    }
    if (volunteer == 0) {
            qrbutton.innerHTML = `<br><a href="${textVal}">
            <input type="button" name="pay_upi" value="Scan QR or Click to open your UPI App">
            </input><br>
        </a><br>` 
    } else {
        qrbutton.innerHTML = `<br><input type="button" name="share_upi" onclick="shareUPILink('${textValForLink}')" value="Please ask to scan QR or Click to Share UPI Link"/><br><br>`
    }
    if (volunteer == 1) {
        reloadButton.innerHTML = `<br><input type="button" name="reload" value="Save the payment confirmation and reload form" onclick="saveAndReloadTheForm();"/>`
    } else {
        reloadButton.innerHTML = `<a href="mailto:elementaph1chs@gmail.com,customercare.elementa@gmail.com?Subject=Festival%20Collection%20for%20${building}-${flat}&Body=Dear%20Team,%0D%0A%0D%0APlease%20record%20this%20payment%20in%20Adda,%20Details%20below:%0D%0AUPI:%20${merchant_upi}%0D%0AName:%20${name.value}%0D%0AAmount:%20${amount.value}%0D%0AFlat:%20${building}-${flat}%0D%0AI%20have%20attached%20the%20payment%20confirmation%20screenshot%20with%20payment%20reference%20number.%0D%0AI%20confirm%20that%20without%20payment%20confirmation%20screenshot,%20Society%20will%20not%20be%20able%20to%20record%20the%20payment.">
        <input type="button" name="email_" value="Please email payment confirmation after successful payment">
        </input><br>
    </a><br>`
    }
    window.scrollTo({
        top: 0,
        behavior: "smooth" 
      });
}

function shareUPILink(upiLink) {
    if( navigator.canShare ) {
        navigator.share({
            title: 'Payment Link (Please do not forward, Ask to regenerate)',
            text: `${upiLink}`,
        })
        .then( () => console.log( 'Share was successful.' ) )
        .catch( (error) => window.alert( `Sharing failed, Please copy the link and share, UPI Link: ${upiLink}`) );
        }
    else {
        window.alert( `Browser does not support sharing Please copy the link and share UPI Link: ${upiLink}` );
    }
}

function loadValue() {
     document.getElementById("upi").selectedIndex = 0;
     document.getElementById("amount").value=1000
     var options = [];
     for (let i = 1; i <= 15; i++) {
        let a  = (i * 100)
        for (let j = 1; j <= 6; j++) {
            let k = a + j
            options.push(k)
        }
     }
     var flat_dropdown = document.getElementById("flat");
     flat_dropdown.innerHTML = `<option value="" disabled selected>Select your flat number</option>`
     options.forEach((optionText, index) => {
        const option = document.createElement("option");
        option.value = optionText
        option.text = optionText;
        flat_dropdown.appendChild(option);
      });    
    const urlParams = new URLSearchParams(window.location.search);
    var volunteer = urlParams.get('volunteer');
    if (!volunteer)  {
        volunteer = 0
    }      
    cashbutton = document.getElementsByName("addcashbutton")[0] 
    viewallbutton = document.getElementsByName("viewallbutton")[0]
    if (volunteer == 0) {
        cashbutton.style.visibility = "hidden";
        viewallbutton.style.visibility = "hidden";
    } else {
    }
}

function addCashEntry() {
    saveAndReloadTheForm("cash")
}

function jsonToCsv(jsonData) {
    let csv = '';
    // Get the headers
    let headers = Object.keys(jsonData[0]);
    csv += headers.join(',') + '\n';
    // Add the data
    jsonData.forEach(function (row) {
        let data = headers.map(header => JSON.stringify(row[header])).join(','); 
        csv += data + '\n';
    });
    return csv;
}

function viewAllEntries() {
    if(localStorage) {
        confirmations = JSON.parse(localStorage.getItem("confirmations") || "[]");
        entries_div = document.getElementById("entries_table")
        entries_div.innerHTML = ""
        
         // Get the container element where the table will be inserted
         let container = document.getElementById("entries_table");
        
        let header = document.createElement("h3")
        if (confirmations) {
            header.innerHTML = `${confirmations.length} Payment confirmations found locally`
            container.appendChild(header)
            if (confirmations.length == 0)
                return
        }

         // Create the table element
         let table = document.createElement("table");
         
         // Get the keys (column names) of the first object in the JSON data
         let cols = Object.keys(confirmations[0]);
         
         // Create the header element
         let thead = document.createElement("thead");
         let tr = document.createElement("tr");
         
         // Loop through the column names and create header cells
         cols.forEach((item) => {
            let th = document.createElement("th");
            th.innerText = item; // Set the column name as the text of the header cell
            tr.appendChild(th); // Append the header cell to the header row
         });
         thead.appendChild(tr); // Append the header row to the header
         table.append(tr) // Append the header to the table
         
         // Loop through the JSON data and create table rows
         confirmations.forEach((item) => {
            let tr = document.createElement("tr");
            
            // Get the values of the current object in the JSON data
            let vals = Object.values(item);
            
            // Loop through the values and create table cells
            vals.forEach((elem) => {
               let td = document.createElement("td");
               td.innerText = elem; // Set the value as the text of the table cell
               tr.appendChild(td); // Append the table cell to the table row
            });
            table.appendChild(tr); // Append the table row to the table
         });
         container.appendChild(table) // Append the table to the container element

        // Create a CSV file and allow the user to download it
        let csvData = jsonToCsv(confirmations); // Add .items.data
        let blob = new Blob([csvData], { type: 'text/csv' });
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = 'payment_confirmations.csv';
        document.body.appendChild(a);
        a.click();

        const file = new File( [csvData], "payment_confirmations.csv", {type: "text/csv"} );
        if( navigator.canShare && navigator.canShare( { files: [ file ] } ) ) {
        navigator.share({
            files: [ file ],
            title: 'Payment Confirmation CSV',
            text: 'Hi Team, Please see CSV file containing payment confirmation.',
        })
        .then( () => console.log( 'Share was successful.' ) )
        .catch( (error) => console.log( 'Sharing failed', error.message ) );
        }
        else {
        console.log( "can't share this" );
        }

    } else {
        alert("Local storage feature is not supported on this browser")
    }
}

function saveAndReloadTheForm(payment_type="upi") {
    var paymentconfirm = document.getElementById("paymentconfirmcheckbox")
    var payment_checked = true
    if (paymentconfirm) {
        payment_checked = paymentconfirm.checked
    }
    const upi_dropdown = document.getElementById("upi");
    var merchant_upi = upi_dropdown.options[upi_dropdown.selectedIndex].value

    var amount = document.getElementById("amount").value;
    var name = document.getElementById("name").value;
    
    var flat_dropdown = document.getElementById("flat");
    var flat = flat_dropdown.options[flat_dropdown.selectedIndex].value;

    var building_dropdown = document.getElementById("building");
    var building = building_dropdown.options[building_dropdown.selectedIndex].value;
   
    if(localStorage) {
        if (payment_type == "cash") {

            if (!(/^\d{3,4}$/.test(flat))) {
                alert("Input correct flat number with 3 or 4 digits")
                flat_dropdown.focus();
                return;
            }
        
            if (building_dropdown.selectedIndex == 0) {
                alert("Input building")
                building_dropdown.focus()
                return
            }
            if (!name) {
                alert("Input name");
                name.focus();
                return;
            }
            if (!amount) {
                alert("Input amount");
                amount.focus();
                return;
            }
            if (flat_dropdown.selectedIndex == 0) {
                alert("Input a flat number");
                flat_dropdown.focus();
                return;
            }
            merchant_upi = "NotApplicable"
        }
        confirmations = JSON.parse(localStorage.getItem("confirmations") || "[]");
        const currentDate = new Date();
        const dateString = currentDate.toLocaleDateString();
        const timeString = currentDate.toLocaleTimeString();
        var contribution_type = "festival_contribution" 
        confirmations.push({ "name": name, "building": building, "flat": flat, "amount": amount, "payment_type": payment_type, "upi": merchant_upi, "payment_confirmed": payment_checked, "contribution_type": contribution_type, "txn_datetime": `${dateString}-${timeString}` })
        localStorage.setItem("confirmations", JSON.stringify(confirmations));
    } else {
        alert("Local storage feature is not supported on this browser")
    }

    document.getElementById("upi").selectedIndex = 0;
    document.getElementById("amount").value=1000 
    document.getElementById("name").value = "";
    document.getElementById("flat").value = "";
    var dropdown = document.getElementById("building");
    dropdown.selectedIndex = 0; 
    var qrdiv = document.getElementById("qrdivcontainer");   
    qrdiv.innerHTML = `<div id="message"></div>
    <div id="qrcode"></div>
    <div id="paymentconfirm"></div>
    <div id="reloadbutton"></div>` 
    var f_dropdown = document.getElementById("flat");
    f_dropdown.selectedIndex = 0; 
    window.scrollTo({
        top: 0,
        behavior: "smooth" 
      });  
    alert("Thanks for your donation, Form has been saved and reloaded.")
  
}


