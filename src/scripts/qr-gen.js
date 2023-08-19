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
    var flat = document.getElementById("flat");
    var dropdown = document.getElementById("building");
    var selectedOption = dropdown.options[dropdown.selectedIndex].value;
    const namesArray = name.value.split(" ");
    var context=`${selectedOption}-${flat.value}-${namesArray[0]}`;
    console.log(context)
    var selectedOption = dropdown.options[dropdown.selectedIndex].value;
    if (!(/^\d{3,4}$/.test(flat.value))) {
        alert("Input correct flat number with 3 or 4 digits")
        flat.focus();
        return;
    }

    if (dropdown.selectedIndex == 0) {
        alert("Input building")
        dropdown.focus()
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
    if (!flat.value) {
        alert("Input a flat number");
        flat.focus();
        return;
    }
    
    var textVal = 'upi://pay?pn='+ merchant_name + '&pa='+ merchant_upi + '&am='+ amount.value + '&tn=' + context;
    console.log(textVal);
    qrcode.makeCode(textVal);
    var message = document.getElementById("message")
    message.innerHTML = `Please pay using following UPI QR code: <br><br> Name : ${name.value}<br> Flat : ${selectedOption}-${flat.value}<br><br>`
    window.scrollTo({
        top: 0,
        behavior: "smooth" 
      });
}

function loadValue() {
     document.getElementById("upi").value=merchant_upi;
     document.getElementById("amount").value=1000
}


