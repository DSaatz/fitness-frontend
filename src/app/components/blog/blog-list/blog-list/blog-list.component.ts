import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { BlogService, BlogPost } from '../../../../services/blog/blog.service';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MarkdownComponent],
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

  getContentPreview(content: string): string {
    // Remove any markdown headings
    const withoutHeadings = content.replace(/^#+\s+[^\n]+/gm, '');
    
    // Get first 200 characters, stopping at the last complete word
    const preview = withoutHeadings.trim().substring(0, 200).replace(/\s+[^\s]*$/, '');
    
    // Add ellipsis if content was truncated
    return preview.length < withoutHeadings.trim().length ? `${preview}...` : preview;
  }
}