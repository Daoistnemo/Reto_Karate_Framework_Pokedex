Feature: Pruebas de API de Pokémon

Background:
    * url 'http://localhost:3000/api'

Scenario: Obtener todos los Pokémon
    Given path 'pokemon'
    When method get
    Then status 200
    And match response == '#[37]' // Verifica que hay 37 Pokémon
    And match each response contains { id: '#number', name: '#string', type: '#array' }

Scenario: Obtener un Pokémon específico
    Given path 'pokemon/25'
    When method get
    Then status 200
    And match response contains { id: 25, name: 'Pikachu', type: ['Eléctrico'] }

Scenario: Obtener Pokémon por tipo
    Given path 'pokemon/tipo/Agua'
    When method get
    Then status 200
    And print response


Scenario: Crear un nuevo Pokémon
    Given path 'pokemon'
    And request { name: 'MewTwo', type: ['Psíquico'], weight: 122.0, height: 2.0, abilities: ['Presión'], description: 'Un Pokémon creado por manipulación genética.' }
    When method post
    Then status 201
    And match response contains { name: 'MewTwo' }

Scenario: Actualizar un Pokémon existente
    Given path 'pokemon/1'
    And request { weight: 7.0 }
    When method put
    Then status 200
    And match response.weight == 7.0

Scenario: Eliminar un Pokémon
    Given path 'pokemon/1'
    When method delete
    Then status 204

