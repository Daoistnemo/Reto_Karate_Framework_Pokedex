const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Cargar datos del archivo JSON
const loadPokemonData = () => {
    try {
        const data = fs.readFileSync('pokemon.json', 'utf8');
        return JSON.parse(data).pokemon;
    } catch (error) {
        console.error('Error al cargar el archivo JSON:', error);
        return [];
    }
};

// GET - Obtener todos los Pokémon
app.get('/api/pokemon', (req, res) => {
    const pokemon = loadPokemonData();
    res.json(pokemon);
});

// GET - Obtener un Pokémon por ID
app.get('/api/pokemon/:id', (req, res) => {
    const pokemon = loadPokemonData();
    const foundPokemon = pokemon.find(p => p.id === parseInt(req.params.id));
    if (foundPokemon) {
        res.json(foundPokemon);
    } else {
        res.status(404).json({ message: 'Pokémon no encontrado' });
    }
});

// GET - Obtener Pokémon por tipo
app.get('/api/pokemon/tipo/:tipo', (req, res) => {
    // Cargar los datos de Pokémon desde el archivo JSON
    const pokemon = loadPokemonData();

    // Filtrar los Pokémon que contienen el tipo especificado en la URL
    const pokemonPorTipo = pokemon.filter(p => p.type.includes(req.params.tipo));

    // Responder con la lista de Pokémon filtrados por tipo
    res.json(pokemonPorTipo);
});


// POST - Agregar un nuevo Pokémon
app.post('/api/pokemon', (req, res) => {
    const pokemon = loadPokemonData();
    const newPokemon = req.body;
    
    // Validar datos requeridos
    if (!newPokemon.name || !newPokemon.type) {
        return res.status(400).json({ message: 'Nombre y tipo son requeridos' });
    }
    
    // Asignar nuevo ID
    newPokemon.id = Math.max(...pokemon.map(p => p.id)) + 1;
    pokemon.push(newPokemon);
    
    // Guardar en el archivo
    const data = { pokemon: pokemon };
    fs.writeFileSync('pokemon.json', JSON.stringify(data, null, 2));
    res.status(201).json(newPokemon);
});

// PUT - Actualizar un Pokémon
app.put('/api/pokemon/:id', (req, res) => {
    const pokemon = loadPokemonData();
    const id = parseInt(req.params.id);
    const pokemonIndex = pokemon.findIndex(p => p.id === id);
    
    if (pokemonIndex !== -1) {
        pokemon[pokemonIndex] = { ...pokemon[pokemonIndex], ...req.body };
        const data = { pokemon: pokemon };
        fs.writeFileSync('pokemon.json', JSON.stringify(data, null, 2));
        res.json(pokemon[pokemonIndex]);
    } else {
        res.status(404).json({ message: 'Pokémon no encontrado' });
    }
});

// DELETE - Eliminar un Pokémon
app.delete('/api/pokemon/:id', (req, res) => {
    const pokemon = loadPokemonData();
    const id = parseInt(req.params.id);
    const pokemonIndex = pokemon.findIndex(p => p.id === id);
    
    if (pokemonIndex !== -1) {
        pokemon.splice(pokemonIndex, 1);
        const data = { pokemon: pokemon };
        fs.writeFileSync('pokemon.json', JSON.stringify(data, null, 2));
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Pokémon no encontrado' });
    }
});

app.listen(port, () => {
    console.log(`API de Pokémon corriendo en http://localhost:${port}`);
});