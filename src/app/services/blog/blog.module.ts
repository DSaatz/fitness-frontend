// services/blog/blog.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClientModule } from '@angular/common/http';
import { BlogListComponent } from '../../components/blog/blog-list/blog-list/blog-list.component';
import { BlogEditorComponent } from '../../components/blog/blog-editor/blog-editor/blog-editor.component';
import { BlogViewComponent } from '../../components/blog/blog-view/blog-view/blog-view.component';
import { BlogService } from './blog.service';

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
    RouterModule.forChild(routes),
    MarkdownModule.forChild()
  ],
  providers: [BlogService]
})
export class BlogModule { }