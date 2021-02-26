import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageResponse } from 'src/app/models/doctor/pageResponse';
import { Post } from 'src/app/models/news/post';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { AddNewsItemComponent } from '../../admin/add-news-item/add-news-item.component';

@Component({
  selector: 'app-news-ribbon',
  templateUrl: './news-ribbon.component.html',
  styleUrls: ['./news-ribbon.component.css']
})
export class NewsRibbonComponent implements OnInit {

  postsPageResponse!: PageResponse;
  isAdmin!:boolean;
  
  constructor(private postService: ApiService,
    public dialog: MatDialog,
    private authService:AuthService) { }

  ngOnInit(): void {
    this.postService.getEntity('posts').subscribe((data: PageResponse)=>{
      this.postsPageResponse=data;
      console.log(this.postsPageResponse);
    });

    this.isAdmin = this.authService.isInRole("admin");
  }

  createPost() {
    const dialogRef = this.dialog.open(AddNewsItemComponent, {
      width: '450px',
      data: ''
    });
    dialogRef.afterClosed().subscribe((result:Post) => {
      if (result === null || result === undefined) {
        return;
      }
      else {
        this.postsPageResponse.data.push(result);
      }
    });
  }

  deleteNewsItem( postToDelete: Post){
    this.postsPageResponse.data = this.postsPageResponse.data.filter(post=> post.id != postToDelete.id);
  }
}
