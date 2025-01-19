    function showConnectionMessage(event) {
      event.preventDefault();  

      const prenom = document.getElementById('prenom').value;
      
      alert("Bonjour " + prenom);
      
      setTimeout(function() {
        window.location.href = "/index.html";  
      }, 1000);  // 
    }
