# ToDoListApp
ToDoList App (React-Native/Node.js/MongoDB)

Pour lancer le projet :


## Backend :

 - Une fois à la racine du projet se rendre dans le dossier Backend et utilisez la commande :


    npm install


 - Créez ensuite un fichier .env et ajoutez ceci :

    
    MONGO_URI=mongodb://localhost:27017/tasks-db
    
    PORT=3000


 - Entrez ensuite cette commande :

    node server.js


## Frontend :

 - Une fois à la racine du projet se rendre dans le dossier Frontend.

Editez le fichier src/Config.js et entrez votre adresse IP à la place des étoiles.

Revenez la base du dossier Frontend et utilisez la commande :

  
  npm install
  
  npx expo start

   - Appuyez ensuite sur a pour lancer l'emulateur.



## Pour tester :

Après avoir lancé le Backend et le Frontend via l'emulateur. Vous serez sur une page blanche avec deux boutons.

Le bouton simuler ajoutera 10 tasks (créées une par une toutes les 5 secondes dans le backend). L'ajout au front se fera automatiquement (check toutes les 5 secondes si il y a eu un ajout grâce à un webSocket).

Le boutons Delete all tasks permet de delete toutes les tasks dans le backend (cela permet de reset les tasks), dans ce cas là, rechargez l'application en utlisant 'r' dans le terminal gérant le front.



## API :

POST API_URL/simulate : Simulation d'ajout de 10 tasks

GET API_URL/tasks : Get toutes les tasks

DELETE API_URL/tasks : Delete toutes les tasks

