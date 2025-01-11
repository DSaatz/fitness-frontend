import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogService, BlogPost } from '../../../../services/blog/blog.service';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  posts: BlogPost[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.blogService.getAllPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  deletePost(id: string) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.blogService.deletePost(id).subscribe(() => {
        this.loadPosts();
      });
    }
  }
}
