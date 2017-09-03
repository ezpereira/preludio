# preludio
Uma lib para carregar js e css somente quando necessário

# Como usar:

1. Criar uma instância do Preludio.

var preludio = new Preludio();

2. Definir qual elemento a página deve conter para carregar os arquivos.

var select2Files = [
    '/assets/css/libs/select2/select2.css',
    '/assets/js/libs/select2/select2.min.js',
    '/assets/js/custom.js'
];

preludio.load('input[name="id_cidade"]', select2Files);