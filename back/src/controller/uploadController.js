const connection = require('../config/db');

async function uploadSingleFile(request, response) {
  const params = Array(
    request.body.id_user,
    request.body.text,
    request.file.filename
  );

  const query = "INSERT INTO files(id_user, description, file) VALUES(?,?);";

  connection.query(query, params, (err, results) => {
    if (results) {
      response
        .status(201)
        .json({
          success: true,
          message: "Sucesso!",
          data: results
        })
    } else {
      response
        .status(400)
        .json({
          success: false,
          message: "Sem sucesso!",
          data: err
        })
    }
  })
}

async function uploadMultipleFiles(request, response) {
  const params = Array(
    request.body.id_user,
    request.body.description,
  );

  const query = "INSERT INTO files(id_user,description,file) VALUES(?,?,?);";

  try {
    request.files.forEach(file => {
      params.push(file.filename);
      connection.query(query, params);
    });

    response
      .status(201)
      .json({
        success: true,
        message: `Sucesso! ${request.files.length} arquivos salvos!`
      })
  } catch (e) {
    console.log(e)
    response
      .status(400)
      .json({
        success: false,
        message: "Ooops! Erro de execução no banco de dados",
      })
  }
}

module.exports = {
  uploadSingleFile,
  uploadMultipleFiles
}