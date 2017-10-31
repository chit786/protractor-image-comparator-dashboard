import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


/*
  Generated class for the ImageServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImageServiceProvider {

  constructor(public http: Http) {
    
  }

  loadScenarios(scenarioPath:any){
    return new Promise(resolve =>{
        this.http.get('/api/scenarios?root=' + scenarioPath)
          .subscribe(res=>{
            resolve(res);
          })
    });
  }

  getImage(imgPath : any){
    return new Promise(resolve => {
      this.http.get('/api/file?path=' + imgPath)
        .subscribe(img=>{
          resolve(img);
        })
    });
  }

  acceptActualImage(basePath:any, actualPath:any){
      return new Promise(resolve=>{
        this.http.post('/api/file',{accepted:true,actfilepath:actualPath,basefilepath : basePath})
          .subscribe(res=>{
            resolve(res);
          });
      });
  }

}
