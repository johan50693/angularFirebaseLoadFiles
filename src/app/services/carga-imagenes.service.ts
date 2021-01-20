import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FileItem } from '../models/file-item.models';
// import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  private carpeta_imagenes='img';

  constructor(private db: AngularFirestore) { 
    
  }

  cargarImagenesFirebase(imagenes: FileItem[]){
    console.log(imagenes);
  }

  private guardarImage(imagen: {nombre: string, url: string}){
    
    this.db.collection(`${this.carpeta_imagenes}`)
            .add(imagen);
  }

}
