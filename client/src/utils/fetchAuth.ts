import { FormData } from './../types/formDataType';

interface AuthResponse {
    status: string;
    message?: string;
    error?: string;
    token?: string;
    userId?: string;
}

export async function fetchAuth(isRegister: boolean = false, form: FormData){
    const apiUrl = import.meta.env.VITE_REACT_URL_API
    const url = isRegister ? `${apiUrl}/auth/register` : `${apiUrl}/auth/login`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form),
    })
    const data = await response.json();
    if(data.status === 'success'){
        if(!isRegister){
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
        }
        const response: AuthResponse = {
            status: data.status,
            message: data.message,
            token: data.token,
            userId: !isRegister ? data.user.id : null
        }
        return response;
    } else if (data.status === 'error'){
        const response: AuthResponse = {
            status: data.status,
            error: data.error,
        }
        console.log('Error en la respuesta del servidor:', response.error);
        return response;
    }               
}