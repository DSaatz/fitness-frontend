import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClientModule } from '@angular/common/http';
import { BlogService } from './blog.service';
import { BlogListComponent } from '../../components/blog/blog-list/blog-list/blog-list.component';
import { BlogEditorComponent } from '../../components/blog/blog-editor/blog-editor/blog-editor.component';
import { BlogViewComponent } from '../../components/blog/blog-view/blog-view/blog-view.component';


const routes: Routes = [
  { path: '', component: BlogListComponent },
  { path: 'new', component: BlogEditorComponent },
  { path: 'edit/:id', component: BlogEditorComponent },
  { path: 'view/:id', component: BlogViewComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  providers: [BlogService]
})
export class BlogModule { }