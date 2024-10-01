
        // Função para enviar os dados do formulário
        document.getElementById('userForm').addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const name = document.getElementById('name').value;
            const apelido = document.getElementById('apelido').value;

            const userData = { name, apelido };

            try {
                const response = await fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });

                if (response.status === 201) {
                    alert('Usuário cadastrado com sucesso!');
                //passando a função para listar quando enviar 
                    await usersList();
                } else {
                    alert('Erro ao cadastrar usuário.');
                }
            } catch (error) {
                console.error('Erro:', error);
            }
         
        });


        // Função para listar usuários
      async function usersList () {
    // document.getElementById('listarUsuarios').addEventListener('click', async () => {
    
            try {
                const response = await fetch('http://localhost:3000/users', {
                    method: 'GET',
                });

                if (response.ok) {
                    const users = await response.json();
                    const usersTable = document.getElementById('usersTable');
                    usersTable.innerHTML = ''; // Limpa a tabela antes de popular

                    // Itera sobre os usuários e cria uma linha para cada um
                    users.forEach(user => {
                        const row = `
                            <tr class="border">
                                <td>${user.id}</td>
                                <td>${user.name}</td>
                                <td>${user.apelido}</td>
                                <td>
                                    <button onclick="editarUsuario('${user.id}')">Editar</button>
                                    <button onclick="deletarUsuario('${user.id}')">Deletar</button>
                                </td>
                            </tr>
                        `;
                        usersTable.innerHTML += row;
                    });
                }
            } catch (error) {
                console.error('Erro ao listar usuários:', error);
            }
        };

        //ja mostra os usuarios da tabela ao carregar a pagina
        window.onload = usersList;
    


        // Função para editar um usuário (ainda será implementada)
        function editarUsuario(id) {
            const name = prompt("Novo nome:");
            const apelido = prompt("Novo apelido:");
            
            if (name && apelido) {
                fetch(`http://localhost:3000/users/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, apelido }),
                })
                .then(response => {
                    if (response.status === 204) {
                        alert('Usuário atualizado com sucesso!');
                        document.getElementById('listarUsuarios').click(); // Recarrega a lista de usuários
                    } else {
                        alert('Erro ao atualizar usuário.');
                    }
                })
                .catch(error => console.error('Erro ao atualizar usuário:', error));
            }
        }

        // Função para deletar um usuário
        function deletarUsuario(id) {
            if (confirm('Deseja deletar este usuário?')) {
                fetch(`http://localhost:3000/users/${id}`, {
                    method: 'DELETE',
                })
                .then(response => {
                    if (response.status === 204) {                                                
                        alert('Usuário deletado com sucesso!');
                        document.getElementById('listarUsuarios').click(); // Recarrega a lista de usuários
                    } else {
                        alert('Erro ao deletar usuário.');
                    }
                })
                .catch(error => console.error('Erro ao deletar usuário:', error));
            }
        }
    

