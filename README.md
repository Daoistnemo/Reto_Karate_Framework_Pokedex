Este proyecto consiste en una API RESTful que gestiona información sobre Pokémon, permitiendo realizar operaciones como obtener todos los Pokémon, obtener un Pokémon específico por su ID, obtener Pokémon por tipo, y realizar operaciones CRUD (crear, leer, actualizar y eliminar) sobre los datos de los Pokémon.

La API está construida utilizando Node.js con el framework Express, y los datos de los Pokémon se almacenan en un archivo JSON (pokemon.json). Los Pokémon incluyen información como su nombre, tipo, peso, altura, habilidades y descripción.

Operaciones principales de la API:

GET /api/pokemon: Obtiene todos los Pokémon.
GET /api/pokemon/:id: Obtiene un Pokémon por su ID.
GET /api/pokemon/tipo/:tipo: Obtiene los Pokémon que coinciden con un tipo específico (por ejemplo, Fuego, Agua, etc.).
POST /api/pokemon: Permite agregar un nuevo Pokémon.
PUT /api/pokemon/:id: Permite actualizar la información de un Pokémon.
DELETE /api/pokemon/:id: Elimina un Pokémon.
La API se usa para probar el funcionamiento de las solicitudes y respuestas, y tiene un enfoque de pruebas con herramientas como Karate para validar las respuestas y asegurarse de que los datos y las operaciones se manejan correctamente.

Es un proyecto ideal para aprender sobre la creación de APIs RESTful, el manejo de datos en formato JSON y las pruebas automatizadas de APIs.
