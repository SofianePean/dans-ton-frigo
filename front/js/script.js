const app = {
    baseUrl : `http://localhost:5000`,
    init: () => {
        app.makeTheadInDom();
        app.makeDeleteItemInDom();
        
    },

    showMenu : () => {
        let menu = document.querySelector('.navbar-burger');
        let navbar = document.getElementById('navbarMenu');
        console.log(navbar)
        menu.addEventListener('click', () => {
            menu.classList.toggle('is-active')
            if (menu.classList.contains('is-active')) {
                navbar.classList.remove('is-hidden');
            } else {
                navbar.classList.add('is-hidden');
            };
            
        });
    },

    makeTheadInDom : async () => {
        const data = await fetch(`${app.baseUrl}/items`);
        const items = await data.json();
       const tbody = document.querySelector('.tbody');
       for (const item of items) {
           const tr = document.createElement('tr');
            // Ajout de l'id sur chaque div tr
            tr.setAttribute('data-item-id', item.id);
            const td = document.createElement('td');
           for (const values in item) {
               // Exclusion du champ category
               if (values !== 'category_id') {
                   if (values === 'category') {
                    td.textContent = item[values].name;
                    td.classList.add('cell');
                    td.style.textAlign = 'center'
                    tr.appendChild(td);
                    // Récupération de la date et transformation en date FR
                   } else if (values === 'expirationdate') {
                    const td = document.createElement('td');
                    const date = new Date(item[values]).toLocaleDateString();
                    const currentDays = parseInt(app.getCurrentDate());
                    const nbDays = parseInt(date) - currentDays;
                    td.textContent = date;
                    td.classList.add('cell');
                    td.style.textAlign = 'center'
                    app.checkNbDayBeforeExpiration(nbDays, tr);
                    tr.appendChild(td);
                   } 
                   else {
                    const td = document.createElement('td');
                    td.textContent = item[values];
                    td.classList.add('cell')
                    td.style.textAlign = 'center'
                    tr.appendChild(td);
                   }  
                   
               };
               
           }
           // Ajout de la poubelle à chaque fin de tr
           app.makeDeleteItemInDom(tr)
           tbody.appendChild(tr);
       };
    },
    makeDeleteItemInDom : (row) => {
        // Ajout d'un test, autrement erreur console (AppendChild of undefined)
        if(row) {
            const deleteItem = document.createElement('i');
            deleteItem.classList.add('far');
            deleteItem.classList.add('fa-trash-alt');
            row.appendChild(deleteItem);
        }
    },

    getCurrentDate : () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = dd + '/' + mm + '/' + yyyy;
        console.log(today)
        return today
    },

    checkNbDayBeforeExpiration : (nbDays,tr) => {
        if (nbDays >10) {
            tr.classList.add('good');
        } else if (nbDays <10 && nbDays >5){
            tr.classList.add('warning');
        } else {
            tr.classList.add('danger');
        }
    },

}

document.addEventListener('DOMContentLoaded', app.init);