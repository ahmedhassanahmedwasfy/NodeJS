import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../../@core/services/notification.service';
import {ProfileService} from '../../../@core/services/profile.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'ngx-profileForm',
  templateUrl: './profileForm.component.html',
  styleUrls: ['./profileForm.component.scss']
})
export class ProfileComponent implements OnInit {

  userDetails: any = {};
  editable: boolean = true;
  editMode: boolean = false;
  selectedImage = null;
  userImage: any;
  imgURL: any;
  message: string;

  constructor(private profileService: ProfileService, private router: Router, private notificationService: NotificationService,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.profileService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      });
    if(this.userDetails.image_Id){
      this.getProfileImage()
    }

  }

  editClick() {


    this.editable = false;
    this.editMode = true;
    //this.profileService.getUserProfileImage();
  }

  clickCancel() {
    this.ngOnInit();
    this.editable = true;
    this.editMode = false;

  }

  onFileSelected(event) {
    this.selectedImage = event.target.files[0];
  }

  onUpload() {
    const uploadImage = new FormData();
    uploadImage.append('image', this.selectedImage, this.selectedImage.name);
    this.profileService.uploadImage(uploadImage).subscribe(() => {
      this.notificationService.showToasterSuccess('profileToasters.uploadImage', 'profileToasters.successHeader');
    });
  }

  async saveEditProfile() {
    await this.profileService.editUserProfile(this.userDetails).subscribe(() => {
      this.notificationService.showToasterSuccess('profileToasters.updateSucc', 'profileToasters.successHeader');
      this.clickCancel();
    });
  }

  async getProfileImage() {
    let tmp = await this.profileService.getUserProfileImage().toPromise();
    if(tmp){
      this.userImage = 'data:image/png;base64,' + tmp;
    }

   }

  preview(files) {
    if (files.length === 0)
      return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    const reader = new FileReader();
    this.userImage = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.userImage = reader.result;
    };
  }


}

