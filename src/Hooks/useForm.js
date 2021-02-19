import React from 'react'

const types = {
    email: {
        regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'Email inválido'
    },
    password: {
        regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
        message: 'Deve conter pelo menos 1 número, 1 letra maúscula, 1 minúscula. Com no mínimo 8 caracteres.'
    }
}

const useForm = (type) => {
    const [value, setValue] = React.useState('')
    const [error, setError] = React.useState('')

    function onChange({target}) {
        if(error) validate(target.value)
        setValue(target.value)
    }

    function validate(value) {
        if(type === false) return true;
        if(value.length === 0) {
            setError('Preencha um valor.')
            return false;
        } else if(types[type] && !types[type].regex.test(value)) {
            setError(types[type].message)
            return false
        } 

        setError(null)
        return true
    }

    return {
        value,
        setValue,
        onChange,
        error,
        validate: () => validate(value),
        onBlur: () => validate(value)
    }
}

export default useForm
