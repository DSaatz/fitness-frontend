import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { BlogService, BlogPost } from '../../../../services/blog/blog.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-blog-editor',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, MarkdownComponent],
  templateUrl: './blog-editor.component.html',
  styleUrls: ['./blog-editor.component.css']
})
export class BlogEditorComponent implements OnInit {
  blogForm: FormGroup;
  isEditing = false;
  postId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      userId: [environment.MOCK_USER_ID]
    });
  }

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('id');
    if (this.postId) {
      this.isEditing = true;
      this.blogService.getPost(this.postId).subscribe(post => {
        this.blogForm.patchValue(post);
      });
    }
  }

  onSubmit() {
    if (this.blogForm.valid) {
      const post = this.blogForm.value;
      
      if (this.isEditing && this.postId) {
        this.blogService.updatePost(this.postId, post).subscribe(() => {
          this.router.navigate(['/blog']);
        });
      } else {
        this.blogService.createPost(post).subscribe(() => {
          this.router.navigate(['/blog']);
        });
      }
    }
  }
}