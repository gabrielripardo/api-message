const fs = require("fs")
const pathLib = require("path")

// Criar uma pasta
function createFolder(){
    fs.mkdir(pathLib.join(__dirname, "/test"), (error) => {
        if (error) {
            return console.log("Erro: ", error)
        }
    
        console.log("Pasta criada com sucesso!")
    })
}

// Criar um arquivo
function createFile(path, filename, content){
    fs.writeFile(
        pathLib.join(__dirname, path, filename),
        content+'\n',
        (error) => {
            if (error) {
                return console.log("Erro: ", error);
            }
            console.log("Arquivo criado com sucesso!");
        }
    )
}

// Editar um arquivo
function editFile(path, filename, content){
    const filePath = pathLib.join(__dirname, path, filename);
    console.log("filePath ", filePath);
    if (fs.existsSync(filePath)) {
        console.log("Arquivo já existe:", filePath);
        fs.appendFile(
            pathLib.join(__dirname, path, filename),
            content+'\n',
            (error) => {
                if (error) {
                    return console.log("Erro: ", error)
                }
    
                console.log("Arquivo modificado com sucesso!")
            }
        )  
    }else {
        createFile(path, filename, content);
    }
}

function readFile(){
    //Ler arquivo
    fs.readFile(pathLib.join(__dirname, "/test", 'test.txt'), 'utf8', (error, data) => {
        if (error) {
            return console.log("Erro ", error)
        }

        console.log("Conteúdo do arquivo: ", data)
    })
}

module.exports = {
    createFolder,
    createFile,
    editFile,
    readFile
};