import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

import { DBContextService } from '../services/dbcontext.service';
import { ProfileModel } from '../Models/ProfileModel';

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
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
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

  //update profile
  private childName: string;
  private childBirthday: Date;
  private childGender: string;
  private childProfileImg: string;
  private updateData: ProfileModel;

  // get data
  childProfiledata: any;

  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage,

    private service: DBContextService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // update data
    this.isImgUploading = false;
    this.isImgUploaded = false;

    this.ngFirestoreCollection =
      angularFirestore.collection<FILE>('filesCollection');
    this.files = this.ngFirestoreCollection.valueChanges();

    this.updateData = new ProfileModel();
    // -------------------------------------------

    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.childProfiledata =
          this.router.getCurrentNavigation().extras.state.data;
        console.log(this.childProfiledata);
      }
    });
  }

  ngOnInit() {
    this.imgUrl = this.childProfiledata.childProfileImg;
  }

  updateProfileChild(data: any) {
    // var updateData = new ProfileModel();
    this.updateData._id = this.childProfiledata._id;
    this.updateData.childName = this.childProfiledata.childName;
    this.updateData.childBirthday = this.childProfiledata.childBirthday;
    this.updateData.childGender = this.childProfiledata.childGender;
    this.updateData.childProfileImg = this.imgUrl;
    console.log(this.updateData);
    // let id = updateData._id;

    this.service
      .UpdateProfileChild(this.updateData._id, this.updateData)
      .then((it: ProfileModel) => {
        console.log(it);
      });
      // this.refresh();
      this.router.navigate(['child-list']);
  }

  refresh(): void {
    window.location.reload();
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
            this.imgUrl = resp;
            console.log('imgUrl : ' + this.imgUrl);
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
