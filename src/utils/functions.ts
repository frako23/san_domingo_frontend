export async function get_user_data(name: string, lastname: string, email: string) {
    try {
        const response = await fetch('http://localhost:8000/create_user/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                lastname,
                email
            })
        });

        // Si la respuesta no es OK, lanza un error
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Error alregistrar el usuario');
        }

        const data = await response.json();
        console.log("Respuesta de la API:", data);

        // Aquí puedes manejar la respuesta de tu API, por ejemplo,
        // guardando un token de sesión propio si lo generas.

    } catch (err) {
        console.error("Error al enviar el token a la API:", JSON.stringify(err, null, 2));
        // Muestra un mensaje de error al usuario
        alert("Hubo un problema al iniciar sesión. Inténtalo de nuevo.");
    }
}

// Esta es la nueva función que registra a los usuarios en el sistema
export async function createUser(name: string, lastname: string, email: string) {
    try {
        const response = await fetch('http://localhost:8000/create_user/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                lastname,
                email
            })
        });

        // Si la respuesta no es OK, lanza un error
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Error alregistrar el usuario');
        }

        const data = await response.json();
        console.log("Respuesta de la API:", data);

        // Aquí puedes manejar la respuesta de tu API, por ejemplo,
        // guardando un token de sesión propio si lo generas.

    } catch (err) {
        console.error("Error al enviar el token a la API:", JSON.stringify(err, null, 2));
        // Muestra un mensaje de error al usuario
        alert("Hubo un problema al iniciar sesión. Inténtalo de nuevo.");
    }
}

// Esta es la nueva función que encapsula la lógica de la API
export async function sendTokenToApi(idToken: string) {
    try {
        const response = await fetch('http://localhost:8000/api/v1/login/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_token: idToken })
        });

        // Si la respuesta no es OK, lanza un error
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Error al autenticar con la API');
        }

        const data = await response.json();
        console.log("Respuesta de la API:", data);

        // Aquí puedes manejar la respuesta de tu API, por ejemplo,
        // guardando un token de sesión propio si lo generas.

    } catch (err) {
        console.error("Error al enviar el token a la API:", err);
        // Muestra un mensaje de error al usuario
        alert("Hubo un problema al iniciar sesión. Inténtalo de nuevo.");
    }
}

export async function get_current_user_data(idToken: string) {
    try {
        const response = await fetch('http://localhost:8000/get_current_user/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${idToken}`
            },
        });

        // Si la respuesta no es OK, lanza un error
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Error al autenticar con la API');
        }

        const data = await response.json();
        console.log("Respuesta de la API:", data);

        // Aquí puedes manejar la respuesta de tu API, por ejemplo,
        // guardando un token de sesión propio si lo generas.

    } catch (err) {
        console.error("Error al enviar el token a la API:", JSON.stringify(err, null, 2));
        // Muestra un mensaje de error al usuario
        alert("Hubo un problema al iniciar sesión. Inténtalo de nuevo.");
    }
}