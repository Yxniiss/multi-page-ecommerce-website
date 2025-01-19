    function showRegistrationMessage(event) {
      event.preventDefault(); 

      const prenom = document.getElementById('prenom').value;
      
      alert("Bienvenue, " + prenom + " !");

      setTimeout(function() {
        window.location.href = "/index.html";  
      }, 1000);  
    }
