import { Component } from '@angular/core';
import { BlogEditorComponent } from "./blog-editor/blog-editor/blog-editor.component";
import { BlogListComponent } from './blog-list/blog-list/blog-list.component';

@Component({
  selector: 'app-blog',
  imports: [BlogEditorComponent, BlogListComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {

}
