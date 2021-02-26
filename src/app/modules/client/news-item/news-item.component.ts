import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Post } from 'src/app/models/news/post';
import { ApiService } from 'src/app/services/api.service';
import { ConfimDialogComponent } from 'src/app/shared/components/dialogs/assess-dialog/confim-dialog.component';
import { EditNewsItemComponent } from '../../admin/edit-news-item/edit-news-item.component';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.css']
})
export class NewsItemComponent implements OnInit {

  @Input() post!: Post;
  @Input() isAdmin!:boolean;

  @Output() deleteItemEvent = new EventEmitter<Post>();

  constructor(public dialog: MatDialog,
    private apiService: ApiService) { }

  ngOnInit(): void {
  }

  goToSettings() {
    const dialogRef = this.dialog.open(EditNewsItemComponent, {
      width: '450px',
      data: this.post
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === null || result === undefined) {
        return;
      }
      else {
        this.post.title=result.title;
        this.post.subtitle=result.subtitle;
        this.post.mainText=result.mainText;
      }
    });
  }

  deletePost(){  
    
    this.apiService.deleteEntity("posts",this.post.id).subscribe(()=>{
      this.deleteItemEvent.emit(this.post);
    });
  }
  
  
  openAssessDialog() {
      const dialogRef = this.dialog.open(ConfimDialogComponent,{
        data: "Do you really want to remove this post?"
       });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.deletePost();
        }
      });
    }

}
