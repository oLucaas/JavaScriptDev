document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário
    const cpf = document.getElementById('cpf').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const telefone = document.getElementById('telefone').value;
    const successMessage = document.getElementById('success-message');

    // Remove mensagens de sucesso e erros anteriores
    successMessage.style.display = 'none';
    clearErrors(); 

    let isValid = true;

    // --- 1. Validação de CPF (11 dígitos) ---
    if (!validarCPF(cpf)) {
        displayError('error-cpf', 'CPF deve conter exatamente 11 dígitos numéricos.');
        isValid = false;
    }

    // --- 2. Validação de Data de Nascimento (Não pode ser futuro, e deve ser maior de 18 anos) ---
    if (!validarDataNascimento(dataNascimento)) {
        displayError('error-dataNascimento', 'Você deve ser maior de 18 anos e a data não pode ser futura.');
        isValid = false;
    }

    // --- 3. Validação de Telefone (10 ou 11 dígitos numéricos) ---
    if (!validarTelefone(telefone)) {
        displayError('error-telefone', 'Telefone inválido (deve ter 10 ou 11 dígitos, ex: 11987654321).');
        isValid = false;
    }

    // --- Envio Final ---
    if (isValid) {
        // Simula o envio de dados para o servidor
        successMessage.style.display = 'block';
        console.log('Dados validados e prontos para envio ao servidor.');
    }
});

// =========================================================================
// FUNÇÕES DE VALIDAÇÃO
// =========================================================================

/**
 * Verifica se o CPF tem 11 dígitos e é numérico.
 * @param {string} cpf - CPF sem formatação.
 * @returns {boolean} True se válido.
 */
function validarCPF(cpf) {
    // Remove qualquer formatação (se houver, embora o input já limite a 11)
    const cleanedCPF = cpf.replace(/\D/g, '');
    
    // Requisito: verificar se tem 11 dígitos
    if (cleanedCPF.length !== 11) {
        return false;
    }
    // Requisito implícito: garantir que são apenas números
    if (!/^\d{11}$/.test(cleanedCPF)) {
        return false;
    }
    // NOTA: Para validação completa (dígitos verificadores), seria necessário um algoritmo mais complexo.
    return true;
}

/**
 * Valida a data de nascimento: não é futura e tem idade mínima (18 anos).
 * @param {string} dateString - Data de nascimento no formato YYYY-MM-DD.
 * @returns {boolean} True se válida.
 */
function validarDataNascimento(dateString) {
    if (!dateString) return false;

    const dataNasc = new Date(dateString);
    const hoje = new Date();

    // 1. Não pode ser data futura
    if (dataNasc > hoje) {
        return false;
    }

    // 2. Validação de idade mínima (18 anos)
    const dataMinima = new Date(hoje.getFullYear() - 18, hoje.getMonth(), hoje.getDate());

    if (dataNasc > dataMinima) {
        return false; // Usuário é menor de 18 anos
    }

    return true;
}

/**
 * Valida o telefone: 10 (apenas fixo) ou 11 (celular) dígitos numéricos.
 * @param {string} telefone - Número de telefone (DDD + número).
 * @returns {boolean} True se válido.
 */
function validarTelefone(telefone) {
    const cleanedTel = telefone.replace(/\D/g, '');

    // Aceita 10 dígitos (DDD + 8 ou 9 dígitos) ou 11 (DDD + 9 + 8 dígitos)
    // Ex: 1123456789 (10) ou 11987654321 (11)
    if (!/^\d{10,11}$/.test(cleanedTel)) {
        return false;
    }
    return true;
}

// =========================================================================
// FUNÇÕES DE UI
// =========================================================================

/**
 * Exibe a mensagem de erro no elemento de ID especificado.
 * @param {string} elementId - ID do div de erro.
 * @param {string} message - Mensagem de erro a ser exibida.
 */
function displayError(elementId, message) {
    document.getElementById(elementId).textContent = message;
}

/**
 * Limpa todas as mensagens de erro.
 */
function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });
}