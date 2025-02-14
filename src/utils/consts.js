export const IL18N = {
  en: {
    search: 'Search',
    filters: 'Filters',
    weight: 'Weight',
    height: 'Height',
    base: 'Base',
    stats: 'Stats',
    attack: 'Attack',
    defense: 'Defense',
    sp_attack: 'Sp. Attack',
    sp_defense: 'Sp. Defense',
    speed: 'Speed',
    filter_by_id: 'Filter by id range',
    min: 'Min:',
    max: 'Max:',
    filter_by_type: 'Filter by type',
    reset_filters: 'Reset filters',
    filter: 'Filter',
    all: 'All',
    no_results: 'No results found',
    error1: 'The minimum value must be less than the maximum',
    error2: 'The minimum value must be greater than',
    error3: 'The maximum value is',
    results_found: 'Results found:',
    not_found: 'Not found',
  },
  es: {
    search: 'Buscar',
    filters: 'Filtros',
    weight: 'Peso',
    height: 'Altura',
    base: 'Base',
    stats: 'Estadísticas',
    attack: 'Ataque',
    defense: 'Defensa',
    sp_attack: 'Ataque esp.',
    sp_defense: 'Defensa esp.',
    speed: 'Velocidad',
    filter_by_id: 'Filtrar por rango de id',
    min: 'Mín:',
    max: 'Máx:',
    filter_by_type: 'Filtrar por tipo',
    reset_filters: 'Reiniciar filtros',
    filter: 'Filtrar',
    all: 'Todos',
    no_results: 'No se encontraron resultados',
    error1: 'El valor mínimo debe ser menor que el máximo',
    error2: 'El valor mínimo debe ser mayor a',
    error3: 'El valor máximo es',
    results_found: 'Resultados encontrados:',
    not_found: 'No encontrado',
  },
  fr: {
    search: 'Rechercher',
    filters: 'Filtres',
    weight: 'Poids',
    height: 'Taille',
    base: 'Base',
    stats: 'Statistiques',
    attack: 'Attaque',
    defense: 'Défense',
    sp_attack: 'Attaque spé.',
    sp_defense: 'Défense spé.',
    speed: 'Vitesse',
    filter_by_id: "Filtrer par plage d'id",
    min: 'Min:',
    max: 'Max:',
    filter_by_type: 'Filtrer par type',
    reset_filters: 'Réinitialiser les filtres',
    filter: 'Filtrer',
    all: 'Tous',
    no_results: 'Aucun résultat trouvé',
    error1: 'La valeur minimale doit être inférieure à la valeur maximale',
    error2: 'La valeur minimale doit être supérieure à',
    error3: 'La valeur maximale est',
    results_found: 'Résultats trouvés:',
    not_found: 'Non trouvé',
  },
  pt: {
    search: 'Procurar',
    filters: 'Filtros',
    weight: 'Peso',
    height: 'Altura',
    base: 'Base',
    stats: 'Estatísticas',
    attack: 'Ataque',
    defense: 'Defesa',
    sp_attack: 'Ataque esp.',
    sp_defense: 'Defesa esp.',
    speed: 'Velocidade',
    filter_by_id: 'Filtrar por faixa de id',
    min: 'Min:',
    max: 'Máx:',
    filter_by_type: 'Filtrar por tipo',
    reset_filters: 'Redefinir filtros',
    filter: 'Filtrar',
    all: 'Todos',
    no_results: 'Nenhum resultado encontrado',
    error1: 'O valor mínimo deve ser menor que o valor máximo',
    error2: 'O valor mínimo deve ser maior que',
    error3: 'O valor máximo é',
    results_found: 'Resultados encontrados:',
    not_found: 'Não encontrado',
  },
}

export const API_FCC_PREFIX =
  'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/'

export const API_ALL_POKEMON =
  'https://pokeapi.co/api/v2/pokemon/?limit=10279&offset=0'

export const API_POKEMON_FILTERED_BY_TYPE_PREFIX =
  'https://pokeapi.co/api/v2/type/'

export const API_POKEMON_SEARCH_POKEMON = 'https://pokeapi.co/api/v2/pokemon/'

export const POKEMON_IMG_PREFIX =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'

export const FALLBACK_IMG =
  'https://images.vexels.com/media/users/3/134743/isolated/lists/97ae591756f3dc69db88c09fd097319a-emoticon-de-emoji-de-cara-triste.png'

export const FILTERS_INITIAL_STATE = {
  minId: 1,
  maxId: 10279,
  type: 'all',
}

export const RESULTS_PER_PAGE = 20
