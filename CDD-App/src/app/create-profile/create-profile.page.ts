import { Component, OnInit } from '@angular/core';
import { ProfileModel } from '../Models/ProfileModel';
import { NavigationExtras, Router } from '@angular/router';
import { DBContextService } from '../services/dbcontext.service';

//upload img
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

export interface FILE {
  name: string;
  filepath: string;
  size: number;
}

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.page.html',
  styleUrls: ['./create-profile.page.scss'],
})
export class CreateProfilePage implements OnInit {
  // upload img
  ngFireUploadTask: AngularFireUploadTask;

  progressNum: Observable<number>;

  progressSnapshot: Observable<any>;

  fileUploadedPath: Observable<string>;

  files: Observable<FILE[]>;

  FileName: string;
  FileSize: number;

  isImgUploading: boolean;
  isImgUploaded: boolean;

  private ngFirestoreCollection: AngularFirestoreCollection<FILE>;

  imgUrl: string;
  uploadUrl: string;

  // --------------------------------------

  private childName: string;
  private childBirthday: Date;
  private childGender: string;
  private childProfileImg: string;
  private childData: ProfileModel;

  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage,

    private service: DBContextService,
    private router: Router
  ) {
    this.isImgUploading = false;
    this.isImgUploaded = false;

    this.ngFirestoreCollection =
      angularFirestore.collection<FILE>('filesCollection');
    this.files = this.ngFirestoreCollection.valueChanges();

    this.childData = new ProfileModel();
  }

  ngOnInit() {
    this.imgUrl = '../../assets/icon/girl.png';
    console.log('before : ' + this.imgUrl);
  }

  createProfile() {
    this.childData.childName = this.childName;
    this.childData.childBirthday = this.childBirthday;
    this.childData.childGender = this.childGender;
    this.childData.childProfileImg = this.uploadUrl;
    console.log(this.childData);

    this.service.createProfileChild(this.childData).then((it: ProfileModel) => {
      console.log(it);
    });
    this.router.navigate(['child-list']);
  }

  saveAndGoMenu() {
    this.createProfile();
    let navigationExtras: NavigationExtras = {
      state: {
        data: this.childData,
      },
    };
    this.router.navigate(['menu'], navigationExtras);
  }

  // upload img
  fileUpload(event: FileList) {
    const file = event.item(0);

    if (file.type.split('/')[0] !== 'image') {
      console.log('File type is not supported!');
      return;
    }

    this.isImgUploading = true;
    this.isImgUploaded = false;

    this.FileName = file.name;

    const fileStoragePath = `filesStorage/${new Date().getTime()}_${file.name}`;

    const imageRef = this.angularFireStorage.ref(fileStoragePath);

    this.ngFireUploadTask = this.angularFireStorage.upload(
      fileStoragePath,
      file
    );

    this.progressNum = this.ngFireUploadTask.percentageChanges();
    this.progressSnapshot = this.ngFireUploadTask.snapshotChanges().pipe(
      finalize(() => {
        this.fileUploadedPath = imageRef.getDownloadURL();

        this.fileUploadedPath.subscribe(
          (resp) => {
            this.fileStorage({
              name: file.name,
              filepath: resp,
              size: this.FileSize,
            });
            this.isImgUploading = false;
            this.isImgUploaded = true;
            this.uploadUrl = resp;
            console.log('resp : ' + resp);
          },
          (error) => {
            console.log(error);
          }
        );
      }),
      tap((snap) => {
        this.FileSize = snap.totalBytes;
      })
    );
  }

  fileStorage(image: FILE) {
    const ImgId = this.angularFirestore.createId();

    this.ngFirestoreCollection
      .doc(ImgId)
      .set(image)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
