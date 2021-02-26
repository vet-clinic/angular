import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditPost } from 'src/app/models/news/editPost';
import { Post } from 'src/app/models/news/post';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-news-item',
  templateUrl: './edit-news-item.component.html',
  styleUrls: ['./edit-news-item.component.css']
})
export class EditNewsItemComponent implements OnInit {
  postGroup!: FormGroup;
  postData!: Post;

  titleControl = new FormControl('', [Validators.required, Validators.maxLength(25)]);
  subtitleControl = new FormControl(null, [Validators.required, Validators.maxLength(50)]);
  mainTextControl = new FormControl('', [Validators.required, Validators.maxLength(500)]);

  constructor(public dialogRef: MatDialogRef<EditNewsItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Post,
    private apiService: ApiService) {

    this.postData = data;

    this.postGroup = new FormGroup({
      title: this.titleControl,
      subtitle: this.subtitleControl,
      mainText: this.mainTextControl
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const post: EditPost = {
      title: this.titleControl.value,
      subtitle: this.subtitleControl.value,
      mainText: this.mainTextControl.value,
      photo: 'photo'
    };

    this.apiService.updateEntity('posts', (this.postData.id ? this.postData.id : 0), post)
      .subscribe(() => {
        this.data = {
          id: this.postData.id,
          title: post.title,
          subtitle: post.subtitle,
          mainText: post.mainText,
          photo: ''
        };
        this.dialogRef.close(this.data);
        console.log(this.data);
      },
        error => {
          console.log(error);
        });

  }

  public onNoClick(): void {
    this.dialogRef.close(null);
  }

}
