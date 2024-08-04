const id_user = 1903
const api     = "http://localhost:3000/api";

async function handleSubmitFile(event) {
  event.preventDefault();
  const data = new FormData();

  data.append('id_user', id_user);
  data.append('text', document.getElementById('text').value);
  data.append('file', document.getElementById('file').files[0]);

  const response = await fetch(`${api}/single/upload`,{
    method: "POST",
    body: data
  })

  const results = await response.json();

  results.success
    ? alert(results.message)
    : alert(results.message)
}

async function handleSubmitFiles(event) {
  event.preventDefault();

  const data = new FormData();  
  let uploads = document.getElementById('files').files;
  
  if (uploads.length <= 3) { 
    data.append('id_user', id_user);
    data.append('description', document.getElementById('description').value);

    for(let i = 0; i < uploads.length; i++) {
      data.append(`files`, uploads[i])
    }

    const response = await fetch(`${api}/multiple/uploads`,{
      method: "POST",
      body: data
    })
  
    const results = await response.json();
  
    results.success 
      ? alert(results.message)
      : alert(results.message)
  } else {
    alert('Limite de 3 arquivos excedido');
  }  
}