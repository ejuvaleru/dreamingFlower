export class FileUpload {
    $key: string;
    urlImage: string;
    file: File;
    // Al crearse debe recibir un objeto de tipo File
    constructor(url) {
        this.urlImage = url;
    }
}
