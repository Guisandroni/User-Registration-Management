

export function buildRoutePatch(path){

    const routeParameters = /:([a-zA-Z]+)/g
//     regex mostra o caminho (path) da operação
//     no caso ira mostrar o caminho do ID usuario
    const pathWithParameters = path.replaceAll(routeParameters, '(?<$1>[a-z0-9\-_]+)')
    const pathRegex = new RegExp (`^${pathWithParameters}`)
    

    

    return pathRegex
}