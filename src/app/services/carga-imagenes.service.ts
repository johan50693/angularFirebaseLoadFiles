import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FileItem } from '../models/file-item.models';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {
  private carpeta_imagenes='img';

  constructor(private db: AngularFirestore) {}

  cargarImagenesFirebase(imagenes: FileItem[]){
    const storageRef = firebase.storage().ref();
    for (const item of imagenes) {
      item.estaSubiendo=true;
      if(item.progreso>=100){
        continue;
      }
      
      const uploadTask: firebase.storage.UploadTask=storageRef
        .child(`${this.carpeta_imagenes}/${item.nombreArchivo}`)
        .put(item.archivo);
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          item.progreso= (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          console.log(item.progreso);
        },
        (error) => console.error('Error al subir ',error),
        () => {
          console.log('imagen cargada correctamente');
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            item.url = downloadURL;
            item.estaSubiendo = false;
 
            this.guardarImagen({nombre: item.nombreArchivo,url: item.url,});
          });
        })
    }
  }

  private guardarImagen(imagen: {nombre: string, url: string}){
    
    this.db.collection(`${this.carpeta_imagenes}`)
            .add(imagen);
  }

}
