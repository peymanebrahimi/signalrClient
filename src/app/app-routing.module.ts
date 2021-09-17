import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'chat', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule) },
  {
    path: 'testing',
    loadChildren: () => import('./testing/testing.module').then(x => x.TestingModule)
  },
  { path: '**', redirectTo: 'chat' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
