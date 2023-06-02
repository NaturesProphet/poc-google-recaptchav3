const http = require( 'http' );
const fs = require( 'fs' );

const server = http.createServer( ( req, res ) => {
  // Verifique se a solicitação é para o arquivo HTML desejado
  if ( req.url === '/page' ) {
    // Leia o arquivo HTML
    fs.readFile( __dirname + '/testPage.html', ( err, data ) => {
      if ( err ) {
        console.log( err )
        res.writeHead( 500, { 'Content-Type': 'text/plain' } );
        res.end( 'Erro interno do servidor' );
      } else {
        // Envie o conteúdo do arquivo HTML como resposta
        res.writeHead( 200, { 'Content-Type': 'text/html' } );
        res.end( data );
      }
    } );
  } else {
    // Caso contrário, retorne um erro 404 para qualquer outra solicitação
    res.writeHead( 404, { 'Content-Type': 'text/plain' } );
    res.end( 'Página não encontrada' );
  }
} );

// Inicie o servidor na porta desejada
server.listen( 4000, () => {
  console.log( 'Servidor web iniciado na porta 4000' );
} );