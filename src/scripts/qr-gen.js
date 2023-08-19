var merchant_name = 'Elementa Phase 1 CHS Festival';
var merchant_upi = 'elementap1@srcb'

function generateQRCode () {
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
    var context=`${building}-${flat}-${namesArray[0]}`;
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
    console.log(textVal);
    qrcode.makeCode(textVal);
    var message = document.getElementById("message")
    message.innerHTML = `Please pay using following UPI QR code: <br><br> Name : ${name.value}<br> Flat : ${building}-${flat}<br><br>`
    var reloadButton = document.getElementById("reloadbutton")
    reloadButton.innerHTML = `<br><br><input type="button" name="reload" value="Clear and reload form" onclick="reloadTheForm();"/>`
    window.scrollTo({
        top: 0,
        behavior: "smooth" 
      });
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

}

function reloadTheForm() {
    document.getElementById("upi").selectedIndex = 0;
    document.getElementById("amount").value=1000 
    document.getElementById("name").value = "";
    document.getElementById("flat").value = "";
    var dropdown = document.getElementById("building");
    dropdown.selectedIndex = 0; 
    var qrdiv = document.getElementById("qrdivcontainer");   
    qrdiv.innerHTML = `<div id="message"></div>
    <div id="qrcode"></div>
    <div id="reloadbutton"></div>` 
    var f_dropdown = document.getElementById("flat");
    f_dropdown.selectedIndex = 0; 
    window.scrollTo({
        top: 0,
        behavior: "smooth" 
      });  
}

