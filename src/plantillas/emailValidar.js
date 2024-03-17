
/** htmlEmail es una plantilla html que es un diseño para el correo que le llegara
    al usuario para validarse, esto incluye el link que debe clickear */
export const htmlEmail = (validarUsuario) => {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <section>
        <h1>Bienvenido: </h1>
        <div>
            <p>Bienvenido a su aplicacion Sion-Nodejs, aqui puede guadar sus tareas diarias</p>
        </div>
        <div>
            <p>Haz click en el siguiente enlace para validar su correo</p>
            <a href="http://localhost:3000/validar/${validarUsuario}">http://localhost:3000/validar/${validarUsuario}</a>
        </div>
    </section>    
</body>
</html>
`;
    return html;
}

/** htmlEmailCambiarClave es una plantilla html que es un diseño para el correo que
    le llegara al usuario para cambiar su clave de acceso al sistema, esto incluye
    el link que debe clickear */
export const htmlEmailCambiarClave = (validarUsuario) => {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <section>
        <h1>Bienvenido: </h1>
        <div>
            <p>Bienvenido a su aplicacion Sion-Nodejs, aqui puede guadar sus tareas diarias</p>
        </div>
        <div>
            <p>Haz click en el siguiente enlace para su cambio de clave</p>
            <a href="http://localhost:3000/clavesCambiar/${validarUsuario}">http://localhost:3000/validar/${validarUsuario}</a>
        </div>
    </section>    
</body>
</html>
`;    
    return html;
}