import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { BlogService, BlogPost } from '../../../../services/blog/blog.service';

@Component({
  selector: 'app-blog-view',
  standalone: true,
  imports: [CommonModule, RouterModule, MarkdownComponent],
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css']
})
export class BlogViewComponent implements OnInit {
  post: BlogPost | null = null;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.blogService.getPost(id).subscribe(post => {
        this.post = post;
      });
    }
  }
}